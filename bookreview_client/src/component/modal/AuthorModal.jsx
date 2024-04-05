import React from 'react';
import Modal from './Modal';
import {useForm} from "react-hook-form";
import Input from "../UI/Input";
import {
    lettersOnlyValidation,
    maxLengthValidation, minValueValidation,
    requiredValidation
} from "../../utils/validationUtils";
import toast from "react-hot-toast";
import AuthorService from "../../API/AuthorService";

const AuthorModal = ({isOpen, toggleModal, author}) => {

    const {
        register,
        handleSubmit,
        reset,
        formState: {
            errors,
        },
    } = useForm({
        defaultValues: {
            name: author ? author.name : '',
            lastname: author ? author.lastname : '',
            yearOfBirth: author ? author.yearOfBirth : ''
        },
    });

    const handleAdd = (data) => {

        const newAuthor = {
            name: data.name,
            lastname: data.lastname,
            yearOfBirth: data.yearOfBirth
        };
        if (!author) {
            AuthorService.createAuthor(newAuthor)
                .then(async response => {
                    console.log('Author added successfully:', response);
                    toggleModal();
                    window.location.reload()
                    toast.success("Автора додано успішно")
                })
                .catch(error => {
                    console.error('Error in adding author:', error);
                });
        } else {
            AuthorService.editAuthorById(author._id, newAuthor)
                .then(async response => {
                    console.log('Author updated successfully:', response);
                    toggleModal();
                    window.location.reload()
                    toast.success("Автора оновлено успішно")
                })
                .catch(error => {
                    console.error('Error in updating author:', error);
                });
        }

        reset();
        toggleModal();
    };


    const body = (
        <div className={'flex flex-col gap-2'}>

            <Input
                id="name"
                label="Імʼя"
                placeholder="Імʼя"
                register={register}
                errors={errors}
                validationOptions={{
                    ...lettersOnlyValidation,
                    ...requiredValidation,
                    ...maxLengthValidation(50),
                }}
            />

            <Input
                id="lastname"
                label="Прізвище"
                placeholder="Прізвище"
                register={register}
                errors={errors}
                validationOptions={{
                    ...lettersOnlyValidation,
                    ...requiredValidation,
                    ...maxLengthValidation(50),
                }}
            />

            <Input
                id="yearOfBirth"
                label="Рік народження"
                placeholder="Рік народження"
                register={register}
                errors={errors}
                type="number"
                validationOptions={{
                    ...requiredValidation,
                    ...minValueValidation(1),
                }}
            />

        </div>
    );

    return (
        <Modal
            isOpen={isOpen}
            title={author ? "Оновити автора" : "Створити адміна"}
            body={body}
            actionLabel={author ? "Оновити" :"Створити"}
            onSubmit={handleSubmit(handleAdd)}
            toggleModal={toggleModal}
        />
    );
};
export default AuthorModal;

import React from 'react';
import Modal from './Modal';
import {useForm} from "react-hook-form";
import Input from "../UI/Input";
import {
    emailValidation,
    lettersOnlyValidation,
    maxLengthValidation,
    passwordValidation,
    requiredValidation
} from "../../utils/validationUtils";
import UserService from "../../API/UserService";
import toast from "react-hot-toast";

const UserModal = ({isOpen, toggleModal, isCreateAdmin, profile}) => {

    const {
        register,
        handleSubmit,
        reset,
        formState: {
            errors,
        },
    } = useForm({
        defaultValues: {
            name: profile ? profile.name : '',
            lastname: profile ? profile.lastname : '',
            email: '',
            password: '',
        },
    });

    const handleRegistration = (data) => {

        const newUser = {
            name: data.name,
            lastname: data.lastname,
            email: data.email,
            password: data.password
        };
        const {name, lastname} = newUser
        if (profile) {
            UserService.editProfileById(profile.id, newUser)
                .then(async response => {

                    localStorage.setItem("currentUser", JSON.stringify({
                        name: newUser.name,
                        lastname: newUser.lastname,
                        id: profile.id,
                        email: profile.email,
                        role: profile.role}));

                    console.log('User updated successfully:', response);
                    toggleModal();
                    toast.success("Update success")
                })
                .catch(error => {
                    console.error('Error in update user:', error);
                });
        } else if (!isCreateAdmin) {
            UserService.registerUser(newUser)
                .then(async response => {
                    console.log('User register successfully:', response);
                    toggleModal();
                    toast.success("Registration success")
                })
                .catch(error => {
                    console.error('Error in registration user:', error);
                });
        } else {
            UserService.createAdmin(newUser)
                .then(async response => {
                    console.log('Admin register successfully:', response);
                    toggleModal();
                    toast.success("Creating success")
                })
                .catch(error => {
                    console.error('Error in creating admin:', error);
                });
        }
        reset();
        window.location.reload()
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
            {!profile &&
                <Input
                    id="email"
                    label="Електронна пошта"
                    placeholder="Електрона пошта"
                    register={register}
                    errors={errors}
                    validationOptions={{
                        ...requiredValidation,
                        ...emailValidation,
                    }}
                />
            }
            {!profile &&
                <Input
                    id="password"
                    label="Password"
                    placeholder="Password"
                    type="password"
                    register={register}
                    errors={errors}
                    validationOptions={{
                        ...requiredValidation,
                        ...passwordValidation
                    }}
                />
            }
        </div>
    );

    return (
        <Modal
            isOpen={isOpen}
            title={profile ? "Редагувати профіль" : isCreateAdmin ? "Створити адміна" : "Зареєструватися"}
            body={body}
            actionLabel={profile ? "Редагувати" : isCreateAdmin ? "Створити" : "Зареєструватися"}
            onSubmit={handleSubmit(handleRegistration)}
            toggleModal={toggleModal}
        />
    );
};
export default UserModal;

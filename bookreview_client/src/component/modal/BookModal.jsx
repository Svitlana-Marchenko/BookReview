import React, {useEffect, useState} from 'react';
import Modal from './Modal';
import {useForm} from "react-hook-form";
import Input from "../UI/Input";
import {
    maxLengthValidation, minValueValidation,
    requiredValidation
} from "../../utils/validationUtils";
import toast from "react-hot-toast";
import AuthorService from "../../API/AuthorService";
import FormSelect from "../UI/FormSelect";
import BookService from "../../API/BookService";

const BookModal = ({isOpen, toggleModal, book}) => {

    const [authors, setAuthors] = useState([]);

    useEffect(() => {
        fetchAuthors();
    }, []);

    const fetchAuthors = async () => {
        try {
            const response = await AuthorService.getAuthorPaginate(0, 0, "");
            setAuthors(response);
        } catch (error) {
            console.error('Failed to fetch authors:', error);
        }
    };


    const options = [
        {value: 'Action', name: 'Бойовик'},
        {value: 'Romance', name: 'Романтика'},
        {value: 'Fantasy', name: 'Фентезі'},
        {value: 'Drama', name: 'Драма'},
        {value: 'Crime', name: 'Кримінал'},
        {value: 'Adventure', name: 'Пригоди'},
        {value: 'Thriller', name: 'Трилер'},
        {value: 'Sci-fi', name: 'Наукова фантастика'},
        {value: 'Music', name: 'Музика'},
        {value: 'Family', name: 'Сімейний'},
    ];


    const {
        register,
        handleSubmit,
        reset,
        formState: {
            errors,
        },
    } = useForm({
        defaultValues: {
            title: book ? book.title : '',
            authorId: book ? book.author._id : '',
            description: book ? book.description : '',
            year: book ? book.year : '',
            genre: book ? book.genre : '',
            page: book ? book.page : ''
        },
    });

    const handleAdd = (data) => {

        const newBook = {
            title: data.title,
            authorId: data.authorId,
            description: data.description,
            year: data.year,
            genre: data.genre,
            page: data.page
        };
if(!book) {
    BookService.createBook(newBook)
        .then(async response => {
            console.log('Book added successfully:', response);
            toggleModal();
            window.location.reload()
            toast.success("Книгу додано успішно")
        })
        .catch(error => {
            console.error('Error in adding book:', error);
        });
} else{

    BookService.editBookById(book._id, newBook)
        .then(async response => {
            console.log('Book added successfully:', response);
            toggleModal();
            window.location.reload()
            toast.success("Книгу оновлено успішно")
        })
        .catch(error => {
            console.error('Error in adding book:', error);
        });
}
        reset();
        toggleModal();
    };


    const body = (
        <div className={'flex flex-col gap-2'}>

            <Input
                id="title"
                label="Назва"
                placeholder="Назва"
                register={register}
                errors={errors}
                validationOptions={{
                    ...requiredValidation,
                    ...maxLengthValidation(50),
                }}
            />

            <FormSelect
                id="authorId"
                label="Автора"
                register={register}
                errors={errors}
                options={authors.map(author => ({ value: author._id, name: `${author.name} ${author.lastname}` }))}
            />

            <Input
                id="description"
                label="Опис"
                placeholder="Опис"
                register={register}
                errors={errors}
                validationOptions={{
                    ...requiredValidation,
                    ...maxLengthValidation(2000),
                }}
                isTextArea
                required
            />

            <Input
                id="year"
                label="Рік видання"
                placeholder="Рік видання"
                register={register}
                errors={errors}
                type="number"
                validationOptions={{
                    ...requiredValidation,
                    ...minValueValidation(1),
                }}
            />

            <FormSelect
                id="genre"
                label="Жанр"
                register={register}
                errors={errors}
                options={options}
            />

            <Input
                id="page"
                label="Кількість сторінок"
                placeholder="Кількість сторінок"
                register={register}
                errors={errors}
                type="number"
                validationOptions={{
                    ...requiredValidation,
                    ...minValueValidation(1)
                }}
            />

        </div>
    );

    if(!authors){
        return <>Loading...</>
    }

    return (
        <Modal
            isOpen={isOpen}
            title={book ? "Оновити адміна" : "Створити книгу"}
            body={body}
            actionLabel={book ? "Оновити" : "Створити"}
            onSubmit={handleSubmit(handleAdd)}
            toggleModal={toggleModal}
        />
    );
};
export default BookModal;

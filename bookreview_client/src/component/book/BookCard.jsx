import React from 'react';
import Button from "../UI/Button";
import { useNavigate } from "react-router-dom";

const BookCard = ({ book }) => {
    const navigate = useNavigate();

    const navigateToBookDetails = () => {
        navigate(`/book/${book._id}`);
    };

    const navigateToAuthorDetails = () => {
        navigate(`/author/${book.author._id}`);
    };

    return (
        <div className="rounded-xl p-4 relative bg-blue-100">
            <span className={'absolute top-2 right-2 bg-blue-200 text-blue-600 font-bold py-2 px-4 rounded-3xl'}>
                {book.genre}
            </span>

            <div className={'flex flex-col gap-1'}>
                <p className="text-gray-500 font-bold text-sm" onClick={navigateToAuthorDetails}>
                    {book.author.name} {book.author.lastname}
                </p>
                <h2 className="text-3xl font-bold text-gray-800">{book.title}</h2>
            </div>

            <div className={'my-4'}>
                <p>Рік: <span className={'font-bold text-blue-600'}>{book.year}</span></p>
                <p>Кількість сторінок: <span className={'font-bold text-blue-600'}>{book.page}</span></p>
            </div>

            <div className={'flex flex-row justify-between items-center'}>
                <Button text={'Деталі'} handleClick={navigateToBookDetails} />
            </div>
        </div>
    );
};

export default BookCard;

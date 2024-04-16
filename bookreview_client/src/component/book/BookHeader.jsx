import React from 'react';
import { useNavigate } from 'react-router-dom';

const BookHeader = ({ book }) => {
    const navigate = useNavigate();

    const handleAuthorClick = () => {
        navigate(`/author/${book.author._id}`);
    };

    return (
        <div>
            <div className="bg-gray-100 rounded-xl p-4 relative">
                <span className={'absolute top-2 right-2 bg-blue-100 text-blue-600 font-bold py-2 px-4 rounded-3xl'}>
                    {book.genre}
                </span>
                <div className={'flex flex-col gap-1'}>
                    <p className="text-gray-500 font-bold text-sm cursor-pointer" onClick={handleAuthorClick}>
                        {book.author.name.toUpperCase()} {book.author.lastname.toUpperCase()}
                    </p>
                    <h2 className="text-3xl font-bold text-gray-800">{book.title}</h2>
                </div>
                <div className={'my-4'}>
                    <p className="mb-2">{book.description}</p>
                    <p>Рік: <span className={'font-bold text-blue-600'}>{book.year}</span></p>
                    <p>Кількість сторінок: <span className={'font-bold text-blue-600'}>{book.page}</span></p>
                </div>
            </div>
        </div>
    );
};

export default BookHeader;

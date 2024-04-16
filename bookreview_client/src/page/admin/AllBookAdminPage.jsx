import React from 'react';

import { useState, useEffect } from "react";
import Table from "../../component/table/Table";
import BookService from "../../API/BookService";
import toast from "react-hot-toast";
import BookModal from "../../component/modal/BookModal";
import Button from "../../component/UI/Button";

const AllBookPageAdmin = () => {
    const [dataMyTable, setdataMyTable] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [isAddBookModalOpen, setIsAddBookModalOpen] = useState(false);

    const toggleAddBookModal = () => {
        setIsAddBookModalOpen(!isAddBookModalOpen);
    };

    useEffect(() => {
        getMyTable()
    }, []);


    const getMyTable = async () => {
        try {
            const response = await BookService.getBookPaginate(0, 0, "");
            setdataMyTable(response || []);
            console.log(response)
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = (id) => {
        BookService.deleteBookById(id)
            .then(() => {
                window.location.reload()
                toast.success('Книжку видалено');
            })
            .catch((error) => {
                toast.error('Помилки при видаленні книжки');
                console.log(error)
            });
    };

    return (
        <>
            <div className={"m-8"}>

                <div className={"py-3"}>
                    <Button text={"Додати книгу"} handleClick={toggleAddBookModal}/>
                </div>

            <Table
                headers={[
                    { column: "_id", label: "ID" },
                    { column: "title", label: "Назва" },
                    { column: "genre", label: "Жанр" },
                    {column: "year", label: "Рік"},
                    {column: "page", label: "Сторінки"},
                ]}
                data={dataMyTable}
                isLoading={isLoading}
                loadingTag={<h1>Loading...</h1>}
                handleDelete={handleDelete}
                linkToClick={'/book/'}
            />
            </div>

            <BookModal isOpen={isAddBookModalOpen} toggleModal={toggleAddBookModal}/>
        </>
    );
}

export default AllBookPageAdmin;

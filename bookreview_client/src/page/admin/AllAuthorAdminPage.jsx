import React from 'react';

import { useState, useEffect } from "react";
import Table from "../../component/table/Table";
import toast from "react-hot-toast";
import Button from "../../component/UI/Button";
import AuthorService from "../../API/AuthorService";
import AuthorModal from "../../component/modal/AuthorModal";

const AllAuthorAdminPage = () => {

    const [dataMyTable, setdataMyTable] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [isAddAuthorModalOpen, setIsAddAuthorModalOpen] = useState(false);

    const toggleAddAuthorModal = () => {
        setIsAddAuthorModalOpen(!isAddAuthorModalOpen);
    };

    useEffect(() => {
        getMyTable()
    }, []);


    const getMyTable = async () => {
        try {
            const response = await AuthorService.getAuthorPaginate(0, 0, "");
            setdataMyTable(response || []);
            console.log(response)
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = (id) => {
       AuthorService.deleteAuthorById(id)
            .then(() => {
                window.location.reload()
                toast.success('Автора видалено');
            })
            .catch((error) => {
                toast.error('Помилки при видаленні автора');
                console.log(error)
            });
    };

    return (
        <>
            <div className={"m-8"}>

                <div className={"py-3"}>
                    <Button text={"Додати автора"} handleClick={toggleAddAuthorModal}/>
                </div>

                <Table
                    headers={[
                        { column: "_id", label: "ІД" },
                        { column: "name", label: "Імʼя" },
                        { column: "lastname", label: "Прізвище" },
                        {column: "yearOfBirth", label: "Рік народження"}
                    ]}
                    data={dataMyTable}
                    isLoading={isLoading}
                    loadingTag={<h1>Loading...</h1>}
                    handleDelete={handleDelete}
                    linkToClick={'/author/'}
                />
            </div>

            <AuthorModal isOpen={isAddAuthorModalOpen} toggleModal={toggleAddAuthorModal}/>
        </>
    );
}

export default AllAuthorAdminPage;



import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import toast from "react-hot-toast";
import Button from "../component/UI/Button";
import AuthorService from "../API/AuthorService";
import AuthorHeader from "../component/author/AuthorHeader";
import AuthorModal from "../component/modal/AuthorModal";


const AuthorPage = () => {

    const storedUserString = localStorage.getItem("currentUser");
    const currentUser = storedUserString ? JSON.parse(storedUserString) : null;

    const {id} = useParams()
    const [author, setAuthor] = useState();

    const [isAuthorModalOpen, setIsAuthorModalOpen] = useState(false);

    const toggleAuthorModal = () => {
        setIsAuthorModalOpen(!isAuthorModalOpen);
    };

    useEffect(() => {

        AuthorService.getAuthorById(id)
            .then((data) => {
                setAuthor(data);
            })
            .catch((error) => {
                console.error('Error fetching data from server:', error);
                toast.error('Book not found');
            });

    }, [id]);

    if (!author) {
        return <div className={"text-center"}>Loading</div>
    }

    return (
        <div className={"m-8"}>

            {
                currentUser && currentUser.role === 'ADMIN' &&
                <div className={"py-3"}>
                    <Button text={"Редагувати"} handleClick={toggleAuthorModal}/>
                </div>
            }

            <AuthorHeader author={author}/>

            <AuthorModal isOpen={isAuthorModalOpen} toggleModal={toggleAuthorModal} author={author}/>
        </div>
    );
};

export default AuthorPage;
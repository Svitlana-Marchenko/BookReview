import React, {useEffect, useState} from 'react';
import BookHeader from "../component/book/BookHeader";
import {useParams} from "react-router-dom";
import BookService from "../API/BookService";
import toast from "react-hot-toast";
import CommentList from "../component/comment/CommentList";
import CommentService from "../API/CommentService";
import CommentForm from "../component/comment/CommentForm";
import {Banner} from "../component/UI/Banner";
import Button from "../component/UI/Button";
import BookModal from "../component/modal/BookModal";


const BookPage = () => {

    const storedUserString = localStorage.getItem("currentUser");
    const currentUser = storedUserString ? JSON.parse(storedUserString) : null;

    const {id} = useParams()
    const [book, setBook] = useState();
    const [comments, setComments] = useState();

    const [isBookModalOpen, setIsBookModalOpen] = useState(false);

    const toggleBookModal = () => {
        setIsBookModalOpen(!isBookModalOpen);
    };

    useEffect(() => {

        BookService.getBookById(id)
            .then((data) => {
                setBook(data);
            })
            .catch((error) => {
                console.error('Error fetching data from server:', error);
                toast.error('Book not found');
            });

        CommentService.getCommentByBookId(id)
            .then((data) => {
                setComments(data);
            })
            .catch((error) => {
                console.error('Error fetching data from server:', error);
                toast.error('Comments not found');
            });

    }, [id]);

    if (!book || !comments) {
        return <div className={"text-center"}>Loading</div>
    }

    const addComment = async (commentData) => {
        try {
            const response = await CommentService.addCommentByBookId(id, commentData);
            console.log(response[0])
            setComments(prevComments => [...prevComments, response[0]]);
            toast.success('Comment added successfully');
        } catch (error) {
            console.error('Error adding comment:', error);
            toast.error('Failed to add comment');
        }
    };

    return (
        <div className={"m-8"}>
            {!currentUser &&
                <Banner message={"Увійдіть/зареєструйтеся, щоб залишати коментарі"} stage={'caution'}/>
            }

            {
                currentUser && currentUser.role === 'ADMIN' &&
                <div className={"py-3"}>
                    <Button text={"Редагувати"} handleClick={toggleBookModal}/>
                </div>
            }

            <BookHeader book={book}/>
            <p className={"py-3 text-center text-xl font-semibold"}>Comments</p>
            <div className="flex flex-col gap-6">
                <CommentList comments={comments}/>
                {currentUser &&
                    <CommentForm handleClick={addComment}/>
                }
            </div>

            <BookModal isOpen={isBookModalOpen} toggleModal={toggleBookModal} book={book}/>
        </div>
    );
};

export default BookPage;
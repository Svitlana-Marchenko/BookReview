import React from 'react';
import Button from "../UI/Button";
import { useForm } from 'react-hook-form';

const CommentForm = ({ handleClick }) => {
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = (data) => {
        console.log(data)
        handleClick(data);
        reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <textarea
                    {...register('text', { required: true })}
                    placeholder="Comment"
                    className="w-full bg-gray-100 rounded-xl border-4 border-gray-100 leading-normal resize-none py-2 px-3 font-medium placeholder-gray-700 focus:outline-none"
                ></textarea>
            </div>
            <div className="flex justify-end px-4 py-3">
                <Button
                    type="submit"
                    text="Add Comment"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
                />
            </div>
        </form>
    );
};

export default CommentForm;

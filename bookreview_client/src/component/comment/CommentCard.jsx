import React from 'react';

const CommentCard = ({comment}) => {

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const formattedDate = date.toLocaleDateString();
        const formattedTime = date.toLocaleTimeString(undefined, {hour: 'numeric', minute: 'numeric' });
        return `${formattedDate} ${formattedTime}`;
    };

    return (
        <div className="bg-gray-100 rounded-xl p-4 relative">

            <span
                className={'text-gray-500 absolute top-2 right-2 py-2 px-4'}>{formatDate(comment.createdAt)}</span>

            <div className={'flex flex-col gap-1'}>
                <p
                    className="font-bold"
                >{comment.user.name} {comment.user.lastname}</p>
            </div>

            <div className={'my-4'}>
                <p className="mb-2">{comment.text}</p>
            </div>

        </div>
    );
};

export default CommentCard;
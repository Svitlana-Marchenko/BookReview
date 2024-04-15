import React from 'react';
import CommentCard from "./CommentCard";

const CommentList = ({comments}) => {

    return (

        <div>
            <div className="flex flex-col gap-6">
                {comments.map((comment) => (
                    <CommentCard key={comment._id} comment = {comment}/>
                ))}
            </div>
        </div>
    );
};

export default CommentList;
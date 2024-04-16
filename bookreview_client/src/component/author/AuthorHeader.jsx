import React from 'react';

const AuthorHeader = ({author}) => {

    return (
        <div>

            <div className="bg-gray-100 rounded-xl p-4 relative">

                <div className={'flex flex-col gap-1'}>

                    <h2 className="text-3xl font-bold text-gray-800">
                        {author.name.toUpperCase()} {author.lastname.toUpperCase()}
                    </h2>
                </div>
                <div className={'my-4'}>
                    <p className="mb-2">{author.yearOfBirth}</p>
                </div>

            </div>

        </div>
    );
};

export default AuthorHeader;
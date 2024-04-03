import React from 'react';

const Button = ({text, handleClick, className, disabled, isIconOnly, icon}) => {
    if (isIconOnly) {
        return (
            <div className={"cursor-pointer"} onClick={handleClick}>
                {icon}
            </div>
        )
    }

    return (
        <>
            <button
                onClick={handleClick}
                className={`${disabled ? 'bg-gray-500' : 'bg-blue-500'} hover:bg-${disabled ? 'gray' : 'blue'}-700 text-white font-bold py-2 px-4 rounded ${className}`}
                disabled={disabled}>
                {text}
            </button>
        </>
    );
};

export default Button;
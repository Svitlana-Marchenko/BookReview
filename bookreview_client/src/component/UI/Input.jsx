import React from 'react';

const Input = ({
                     id,
                     label,
                     type = 'text',
                     placeholder,
                     register,
                     required,
                     errors,
                     isTextArea = false,
                     validationOptions,
                     style
                 }) => {
    const inputClasses = `
    peer
    w-full
    p-2
    font-light 
    bg-white 
    border-2
    rounded-md
    outline-none
    transition
    ${errors[id] ? 'border-black' : 'border-gray-200'}
    ${errors[id] ? 'focus:border-black' : 'focus:border-blue-500'}
    ${isTextArea ? 'h-24' : null}
  `;

    return (
        <div className="w-full relative">
            <label
                htmlFor={id}
                className={`
          text-blue-500
          duration-300 
          p-1
          transform 
          rounded-md
          ${errors[id] ? 'text-[#a62c2a]' : null}
        `}
            >
                {label}
            </label>
            {isTextArea ? (
                <textarea
                    id={id}
                    style={style}
                    {...register(id, { required, ...validationOptions })}
                    placeholder={placeholder}
                    className={inputClasses}
                    rows={8}
                />
            ) : (
                <input
                    id={id}
                    {...(register ? register(id, { required, ...validationOptions }) : {})}
                    placeholder={placeholder}
                    type={type}
                    style={style}
                    className={inputClasses}
                />
            )}
            {errors[id] && (
                <p className="text-red-500 text-sm mt-1">{errors[id]?.message?.toString()}</p>
            )}
        </div>
    );
};

export default Input;

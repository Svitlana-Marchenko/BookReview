import React from 'react';

const Select = ({options, defaultValue, value, onChange, label}) => {
    return (
        <div className="w-full relative">
            <label
                className={`
          text-blue-500
          duration-300 
          p-1
          transform 
          rounded-md
        `}
            >
                {label}
            </label>
            <select value={value}
                    onChange={onChange}
                    className=" peer
    w-full
    p-2
    font-light
    bg-white
    border-2
    rounded-md
    outline-none
    transition
    focus:border-blue-500
    border-gray-200">
                {
                    options.map(op =>
                        <option value={op.value} key={op.value}>{op.name}</option>
                    )
                }
            </select>
        </div>
    );
};

export default Select;
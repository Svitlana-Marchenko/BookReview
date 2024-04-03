import React from "react";

const FormSelect = ({
                        id,
                        label,
                        placeholder,
                        register,
                        required,
                        errors,
                        options,
                    }) => {
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
          ${errors[id] ? 'text-red-500' : ''}
        `}
            >
                {label}
            </label>
            <select
                id={id}
                {...register(id, { required })}
                className={`
          peer
          w-full
          p-2
          font-light 
          bg-white 
          border-2
          rounded-md
          outline-none
          transition
          ${errors[id] ? "border-black" : "border-gray-200"}
          ${errors[id] ? "focus:border-black" : "focus:border-blue-500"}
        `}
                defaultValue={options[0].value}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value} selected={option}>
                        {option.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default FormSelect;

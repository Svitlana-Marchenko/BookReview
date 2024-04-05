export const requiredValidation = {
    required: 'This field is required',
};

export const maxLengthValidation = (max) => ({
    maxLength: {
        value: max,
        message: `Must be less than ${max} characters`,
    },
});
export const lettersOnlyValidation = {
    pattern: {
        value: /^[A-Za-zА-Яа-яії ]+$/,
        message: 'Only letters are allowed',
    },
};
export const minValueValidation = (min) => ({
    validate: (value) => {
        const numericValue = parseFloat(value);
        return numericValue >= min || `Must be greater than or equal to ${min}`;
    },
});

export const passwordValidation = {
    pattern: {
        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
        message:
            'Password must contain at least one uppercase letter, one digit, and be at least 8 characters long',
    },
};
export const repeatPasswordValidation = {
    validate: (value, { newPassword }) =>
        value === newPassword || 'Passwords do not match',
};

export const emailValidation = {
    pattern: {
        value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/,
        message: 'Enter a valid email address',
    },
};



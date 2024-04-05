import React from 'react';
import Modal from './Modal';
import { jwtDecode } from "jwt-decode";
import {useForm} from "react-hook-form";
import {emailValidation, requiredValidation} from "../../utils/validationUtils";
import toast from "react-hot-toast";
import Input from "../UI/Input";
import UserService from "../../API/UserService";
const LoginModal = ({ isOpen, toggleModal, setUser }) => {

    const {
        register,
        handleSubmit,
        reset,
        formState: {
            errors,
        },
    } = useForm({
        defaultValues: {
            email: '',
            password: ''
        },
    });

    const onSubmit = async (data) => {
        UserService.login(data)
            .then( async (response) => {
                console.log('User login successfully:', response);
                const token = response.accessToken;
                localStorage.setItem('token', token);
                const id = jwtDecode(response.accessToken).user.id;
                const name = jwtDecode(response.accessToken).user.name;
                const lastname = jwtDecode(response.accessToken).user.lastname;
                const role = jwtDecode(response.accessToken).user.role;
                const email = jwtDecode(response.accessToken).user.email;
                localStorage.setItem("currentUser", JSON.stringify({name, lastname, id, email, role}));
                setUser(localStorage.getItem("currentUser"))
                console.log(localStorage.getItem("currentUser"))
                reset();
                toggleModal();
                window.location.reload()
                toast.success("Login success")
            })
            .catch(error => {
                console.error('Error in log in user:', error);
                toast.error("Error in login")
                reset();
            });
        toggleModal();
    }

    const body = (
        <div className={'flex flex-col gap-2'}>
            <Input
                id="email"
                label="Email"
                placeholder="Email"
                register={register}
                errors={errors}
                validationOptions={{
                    ...requiredValidation,
                    ...emailValidation
                }}
            />
            <Input
                id="password"
                label="Password"
                placeholder="Password"
                type="password"
                register={register}
                errors={errors}
                validationOptions={{
                    ...requiredValidation
                }}
            />
        </div>
    );

    return (
        <Modal
            isOpen={isOpen}
            title="Увійти"
            body={body}
            actionLabel="Увійти"
            onSubmit={handleSubmit(onSubmit)}
            toggleModal={toggleModal}
        />
    );
};
export default LoginModal;

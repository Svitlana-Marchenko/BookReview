import Sidebar from "./Sidebar";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import Button from "../UI/Button";
import LoginModal from "../modal/LoginModal";
import UserModal from "../modal/UserModal";
import {UserProfile} from "../profile/UserProfile";
const Navigation = () => {
    const storedUserString = localStorage.getItem("currentUser");
    const currentUser = storedUserString ? JSON.parse(storedUserString) : null;
    const[user, setUser] = useState(currentUser);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
    const navigate = useNavigate();
    const toggleLoginModal = () => {
        setIsLoginModalOpen(!isLoginModalOpen);
    };

    const toggleRegistrationModal = () => {
        setIsRegistrationModalOpen(!isRegistrationModalOpen);
    };

    const logout = () => {
        setUser(null)
        localStorage.clear()
        navigate("/book");
    }

    return (
        <nav className="flex items-center justify-between px-5 py-2">
            <div className="flex items-center gap-3">
                <Sidebar user={user} logout={logout}/>
                <p>BookReview</p>
            </div>
            {
                user
                    ?
                     <UserProfile name={user.name} surname={user.lastname}/>
                    :
                    <div className={'flex flex-row space-x-2'}>
                        <Button text={"Зареєструватися"} handleClick={toggleRegistrationModal}/>
                        <Button text={"Увійти"} handleClick={toggleLoginModal}/>
                    </div>
            }
            <LoginModal isOpen={isLoginModalOpen} toggleModal={toggleLoginModal} setUser={setUser}/>
            <UserModal isOpen={isRegistrationModalOpen} toggleModal={toggleRegistrationModal}/>
        </nav>
    )
}

export default Navigation;

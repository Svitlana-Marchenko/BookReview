import React from "react";
import {useRef, useState} from "react";
import {BiHomeSmile} from "react-icons/bi";
import {AiOutlineRollback} from "react-icons/ai";
import {GiHamburgerMenu} from "react-icons/gi";
import { useClickAway } from 'react-use'
import Button from "../UI/Button";
import Link from "../UI/Link";
import UserModal from "../modal/UserModal";
import {PiBookDuotone, PiChalkboardTeacher} from "react-icons/pi";
import {useNavigate} from "react-router-dom";


const Sidebar = ({user, logout}) => {

    const storedUserString = localStorage.getItem("currentUser");
    const currentUser = storedUserString ? JSON.parse(storedUserString) : null;

    const [open, setOpen] = useState(false)
    const ref = useRef(null)

    const navigate = useNavigate()

    useClickAway(ref, () => setOpen(false))
    const toggleSidebar = () => setOpen(prev => !prev)

    const [isAddAdminModalOpen, setIsAddAdminModalOpen] = useState(false);

    const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);

    const toggleAddAdminModal = () => {
        setIsAddAdminModalOpen(!isAddAdminModalOpen);
        toggleSidebar();
    };

    const toggleEditProfileModal = () => {
        setIsEditProfileModalOpen(!isEditProfileModalOpen);
        toggleSidebar();
    };

    const toggleExit = () => {
        toggleSidebar();
        logout();
    }

    function handleLogoClick() {
        navigate("/")
        toggleSidebar()
    }

    return (
        <>
            <Button
                isIconOnly
                handleClick={toggleSidebar}
                icon={<GiHamburgerMenu/>}
            />
            {open && (
                <>
                    <div
                        aria-hidden="true"
                        className="fixed bottom-0 left-0 right-0 top-0 z-40 bg-[rgba(0,0,0,0.1)] backdrop-blur-sm"
                    ></div>
                    <div
                        className="fixed top-0 bottom-0 left-0 z-50 w-full h-screen max-w-xs rounded-r-xl bg-white p-4"
                        ref={ref}
                        aria-label="Sidebar"
                    >
                        <div className="flex items-center justify-between p-3">
                            <span onClick={handleLogoClick}>BookReview</span>
                            <Button isIconOnly handleClick={toggleSidebar} icon={<AiOutlineRollback />}/>
                        </div>
                        <div className={'flex flex-col gap-2 py-5'}>
                            <Link href={"/book"} title={"Книги"} toggleSidebar={toggleSidebar} Icon={BiHomeSmile}/>


                            {
                                user && user.role === "ADMIN" && (
                                    <>
                                        <Link href={"/admin/book"} title={"Усі книги"} toggleSidebar={toggleSidebar} Icon={PiBookDuotone}/>
                                        <Link href={"/admin/author"} title={"Усі автори"} toggleSidebar={toggleSidebar} Icon={PiChalkboardTeacher}/>
                                        <Button handleClick={toggleAddAdminModal} text={"Створити адміна"}/>
                                    </>
                                )
                            }

                            {
                                user && (
                                    <div className={"flex flex-col gap-2"}>
                                        <Button handleClick={toggleEditProfileModal} text={"Оновити профіль"}/>
                                        <Button handleClick={toggleExit} text={"Вийти"}/>
                                    </div>
                                )
                            }


                        </div>
                    </div>
                </>
            )}
            <UserModal isOpen={isAddAdminModalOpen} toggleModal={toggleAddAdminModal} isCreateAdmin={true}/>
            <UserModal isOpen={isEditProfileModalOpen} toggleModal={toggleEditProfileModal} profile={currentUser}/>

        </>
    )
}

export default Sidebar;

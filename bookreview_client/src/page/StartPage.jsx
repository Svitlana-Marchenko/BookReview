import React from 'react';

import {useNavigate} from "react-router-dom";
import Button from "../component/UI/Button";


const StartPage = () => {

    const navigate = useNavigate()

    return (
        <section id="home" className="flex justify-center gap-20 px-16">
            <div className="relative w-2/5 flex flex-col justify-center items-start  padding-x">
                <p className="text-2xl font-montserrat text-blue-700">
                    Book review
                </p>
                <h1 className="mt-10 font-palanquin text-8xl font-bold">
          <span className="whitespace-nowrap  relative z-40 pr-10">
            Знайти свою нову
          </span>
                    <br />
                    <span className="text-blue-700 inline-block mt-3">КНИЖКУ</span>{" "}
                </h1>
                <p className="font-montserrat text-gray-600 text-lg leading-8 mt-6 mb-14 sm:max-w-sm">
                    Найкращий сайт для пошуку книжок для читання
                </p>
                <Button text="Обрати книжку" className={"text-2xl"} handleClick={() => navigate("/book")}/>
            </div>

            <div className="relative flex-1 flex justify-center items-center min-h-screen bg-primary bg-hero bg-cover bg-center">
                <img
                    src={"/image/image1.webp"}
                    alt="main image"
                    height={700}
                    width={710}
                    className="object-contain relative z-10"
                />
            </div>
        </section>
    );
};

export default StartPage;
import {useState} from "react";
import {IoClose} from "react-icons/io5";

export const Banner = ({message, stage="default", disabled}) => {
    const [isClosed, setIsClosed] = useState(false);
    const toggleBanner = () => {
        setIsClosed((prev) => !prev);
    }

    let stageStyles;

    switch (stage) {
        case 'caution':
            stageStyles = 'bg-yellow-100 text-yellow-800 border-yellow-800';
            break;
        case 'danger':
            stageStyles = 'bg-red-100 text-red-800 border-red-800';
            break;
        case 'success':
            stageStyles = 'bg-green-100 text-green-800 border-green-800';
            break;
        default:
            stageStyles = 'bg-gray-100 text-gray-600 border-gray-400';
            break;
    }

    return (
        !isClosed &&
        <div className={`border border-2 rounded-md py-2 px-4 my-2 flex flex-row justify-between items-center ${stageStyles}`}>
            <p className={'w-10/12'}>
                {message}
            </p>
            {!disabled&&<IoClose onClick={toggleBanner} className={'cursor-pointer'}/>}
        </div>
    )
}

import {BiUser} from "react-icons/bi";

export const UserProfile = ({name, surname}) => {

    return (
        <div className='flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 hover:bg-blue-100 hover:text-blue-500'>
            <BiUser/>
            <p className='text-sm font-medium'>{name} {surname}</p>
        </div>
    )
}

const Link = ({title,toggleSidebar,href,Icon}) => {
    return (
        <a
            onClick={toggleSidebar}
            href={href}
            className="flex items-center justify-between p-3 rounded-xl transition-all hover:bg-blue-100 hover:text-blue-500"
        >
            <span>{title}</span>
            <div>
                {
                    Icon&&(<Icon className="text-2xl"/>)
                }
            </div>
        </a>
    )
}

export default Link;

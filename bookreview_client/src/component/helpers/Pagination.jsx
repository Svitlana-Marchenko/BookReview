import Button from "../UI/Button";

const Pagination = ({total, limit, setPage }) => {
    const totalPages = Math.ceil(total / limit);

    const onClick = (newPage) => {
        setPage(newPage + 1);
    };

    return (
        <div >
            {totalPages > 0 &&
                [...Array(totalPages)].map((val, index) => (
                    <Button
                        key={index}
                        text={index+1}
                        handleClick={() => onClick(index)}
                    />

                ))}
        </div>
    );
};

export default Pagination;
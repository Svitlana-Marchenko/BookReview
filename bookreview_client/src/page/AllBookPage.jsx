import React, {useState, useEffect} from 'react';
import BookService from "../API/BookService";
import Button from "../component/UI/Button";
import BookList from "../component/book/BookList";
import Input from "../component/UI/Input";
import Select from "../component/UI/Select";


const AllBookPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [pageSize, setPageSize] = useState(5);

    const [books, setBooks] = useState([]);

    const [search, setSearch] = useState('')

    const fetchBooks = async () => {
        try {
            const response = await BookService.getBookPaginate(currentPage, pageSize, search);

            const {totalCount, books} = response;
            const totalPages = Math.ceil(totalCount / pageSize);
            setBooks(books);
            setTotalPages(totalPages);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchBooks(currentPage);

        // const interval = setInterval(() => fetchBooks(), 5000);
        //
        // return () => {
        //     clearInterval(interval);
        // };
    }, [currentPage, search, pageSize]);

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleSearchChange = (e) => {
        setSearch(e.target.value.toLowerCase());
    };

    const options = [
        {value: 1, name: '1'},
        {value: 5, name: '5'},
        {value: 10, name: '10'},
        {value: 25, name: '25'},
        {value: 50, name: '50'},
        {value: 100, name: '100'}
    ];


    return (
        <div className="m-8">
            <div className={"py-3 flex flex-row w-1/2 gap-2"}>

                <Select
                    label={"Кількість елементів на сторінці"}
                    className="form-control form-select"
                    value={pageSize}
                    onChange={(e) => {
                        setPageSize(parseInt(e.target.value, 10));
                        setCurrentPage(1);
                    }}
                    options={options}
                />

                <Input
                    id="searchInput"
                    label="Пошук за назвою"
                    placeholder="Введіть назву для пошуку..."
                    register={() => ({
                        onChange: handleSearchChange
                    })}
                    required={false}
                    errors={{}}
                />

            </div>
            <BookList books={books}/>
            <div className={"flex flex-row gap-2 py-3"}>
                <Button text={"Previous page"} handleClick={handlePrevPage} disabled={currentPage === 1}/>
                <Button text={"Next page"} handleClick={handleNextPage} disabled={currentPage === totalPages}/>
            </div>
        </div>
    );
};

export default AllBookPage;
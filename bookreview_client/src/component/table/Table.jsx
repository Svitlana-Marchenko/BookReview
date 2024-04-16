import React, {useState} from "react";
import Button from "../UI/Button";
import Select from "../UI/Select";
import Input from "../UI/Input";
import {useNavigate} from "react-router-dom";

const TableHeader = ({
                         headers, onSortColumnChange, sortColumn, sortDirection,
                     }) => {
    const handleHeaderClick = (column) => {
        onSortColumnChange(column);
    };

    return (<thead className="bg-blue-50">
    <tr>
        {headers.map((header) => (<th
            key={header.column}
            onClick={() => handleHeaderClick(header.column)}
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
        >
            {header.label}{" "}
            {sortColumn === header.column && (<span>{sortDirection === "asc" ? "↑" : "↓"}</span>)}
        </th>))}
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
        >
          Дія
        </th>
    </tr>
    </thead>);
};

const TableBody = ({
                       headers, data, currentPage, itemsPerPage, sortColumn, sortDirection, isLoading, onDelete, linkToClick
                   }) => {
    const startIdx = (currentPage - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;

    const navigate = useNavigate()

    const handleRowClick = (id) => {
        navigate(`${linkToClick}${id}`);
    };

    // Sort data based on the default sorting column and direction
    const sortedData = [...data].sort((a, b) => {
        const columnA = a[sortColumn];
        const columnB = b[sortColumn];

        if (columnA < columnB) {
            return sortDirection === "asc" ? -1 : 1;
        }
        if (columnA > columnB) {
            return sortDirection === "asc" ? 1 : -1;
        }
        return 0;
    });

    const paginatedData = sortedData.slice(startIdx, endIdx);

    const handleDelete = (id) => {
        onDelete(id)
    };

    return (<>
        <tbody>
        {!isLoading && paginatedData.map((item) => (
            <tr key={item._id}>
            {headers.map((header) => (
                <td className={"cursor-pointer"}
                    key={header.column}
                    onClick={linkToClick ? () => handleRowClick(item._id) : undefined}
                >
                    {item[header.column]}
                </td>
            ))}
                <td>
                <Button
                    text="Видалити"
                    handleClick={() => handleDelete(item._id)}
                />
            </td>

        </tr>))}
        </tbody>
    </>);
};

const Pagination = ({
                        currentPage, totalNumberOfPages, handlePageChange, maxPageNumbers = 5,
                    }) => {
    const pageNumbers = Array.from({length: totalNumberOfPages}, (_, index) => index + 1);

    const renderPageNumbers = () => {
        if (totalNumberOfPages <= maxPageNumbers) {
            return pageNumbers;
        }

        const middleIndex = Math.floor(maxPageNumbers / 2);

        if (currentPage <= middleIndex) {
            return [...pageNumbers.slice(0, maxPageNumbers - 1), "...", totalNumberOfPages,];
        } else if (currentPage >= totalNumberOfPages - middleIndex) {
            return [1, "...", ...pageNumbers.slice(-maxPageNumbers + 1)];
        } else {
            const startPage = currentPage - middleIndex + 1;
            const endPage = currentPage + middleIndex - 1;
            return [1, "...", ...pageNumbers.slice(startPage, endPage), "...", totalNumberOfPages,];
        }
    };

    return (
        <div className="flex justify-between">

            <ul className="flex gap-2">
                <li className="page-item">
                    <Button
                        text={`<`}
                        className={"page-link " + (currentPage === 1 ? "disabled" : "")}
                        handleClick={() => handlePageChange(1)}
                        disabled={currentPage === 1}
                    />
                </li>
                {renderPageNumbers().map((pageNumber, index) => (
                    <li key={index} className="page-item">
                        <Button
                            text={`${pageNumber}`}
                            className={`page-link ${currentPage === pageNumber ? "active" : ""}`}
                            handleClick={() => handlePageChange(pageNumber)}
                            disabled={currentPage === pageNumber || pageNumber === "..."}
                        />
                    </li>
                ))}
                <li className="page-item">
                    <Button
                        text={`>`}
                        className={"page-link " + (currentPage === totalNumberOfPages ? "disabled" : "")}
                        handleClick={() => handlePageChange(totalNumberOfPages)}
                        disabled={currentPage === totalNumberOfPages}
                    />
                </li>
            </ul>
        </div>
    );

};

const Table = ({headers, data, isLoading, loadingTag, handleDelete, linkToClick}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState("");
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [sortColumn, setSortColumn] = useState(headers[0].column);
    const [sortDirection, setSortDirection] = useState("asc");


    const filteredData = data.filter((item) => headers.some((header) => String(item[header.column])
        .toLowerCase()
        .includes(searchValue.toLowerCase())));

    const totalNumberOfPages = Math.ceil(filteredData.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleSortColumnChange = (column) => {
        if (sortColumn === column) {
            setSortDirection((prevDirection) => prevDirection === "asc" ? "desc" : "asc");
        } else {
            setSortColumn(column);
            setSortDirection("asc");
        }
    };

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value);
        setCurrentPage(1); // Reset to the first page when searching
    };

    const options = [
        {value: 1, name: '1'},
        {value: 5, name: '5'},
        {value: 10, name: '10'},
        {value: 25, name: '25'},
        {value: 50, name: '50'},
        {value: 100, name: '100'}
    ];

    return (<>
        <div className="row justify-content-between">
            <div className="flex flex-row gap-2">
                    <Select
                        label={"Кількість елементів на сторінці"}
                        className="form-control form-select"
                        value={itemsPerPage}
                        onChange={(e) => {
                            setItemsPerPage(parseInt(e.target.value, 10));
                            setCurrentPage(1);
                        }}
                        options={options}
                    />

                    <Input
                        label="Пошук за назвою"
                        placeholder="Введіть назву для пошуку..."
                        register={() => ({
                            onChange: handleSearchChange
                        })}
                        required={false}
                        errors={{}}
                        value={searchValue}
                    />

            </div>
        </div>
        <br></br>

        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto ">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                <table className="min-w-full leading-normal">
                    <TableHeader
                        headers={headers}
                        onSortColumnChange={handleSortColumnChange}
                        sortColumn={sortColumn}
                        sortDirection={sortDirection}
                    />
                    <TableBody
                        linkToClick={linkToClick}
                        headers={headers}
                        data={filteredData}
                        currentPage={currentPage}
                        itemsPerPage={itemsPerPage}
                        sortColumn={sortColumn}
                        sortDirection={sortDirection}
                        isLoading={isLoading}
                        loadingTag={loadingTag}
                        onDelete={handleDelete}
                    />
                </table>
            </div>
        </div>
        {isLoading ? (<div style={{textAlign: "center", width: "200px", margin: "0 auto"}}>
            <p>{loadingTag}</p>
        </div>) : ("")}

        <Pagination
            currentPage={currentPage}
            totalNumberOfPages={totalNumberOfPages}
            handlePageChange={handlePageChange}
        />

    </>);
};

export default Table;
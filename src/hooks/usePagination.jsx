import { useState, useEffect } from 'react';

function usePagination({ totalCount, initialPage = 1, initialItemsPerPage = 5 }) {
    const [page, setPage] = useState(initialPage);
    const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);
    const [paginatedData, setPaginatedData] = useState([]);

    const updatePaginatedData = (data) => {
        const startIndex = (page - 1) * itemsPerPage;
        const paginatedItems = data.slice(startIndex, startIndex + itemsPerPage);
        setPaginatedData(paginatedItems);
    };

    useEffect(() => {
        setPage(initialPage);
    }, [totalCount, initialPage]);

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const handleItemsPerPageChange = (newItemsPerPage) => {
        setItemsPerPage(newItemsPerPage);
        setPage(1); // Reset to first page when items per page change
    };

    const pageCount = Math.ceil(totalCount / itemsPerPage);

    return {
        page,
        itemsPerPage,
        pageCount,
        paginatedData,
        handlePageChange,
        handleItemsPerPageChange,
        updatePaginatedData,
    };
}

export default usePagination;

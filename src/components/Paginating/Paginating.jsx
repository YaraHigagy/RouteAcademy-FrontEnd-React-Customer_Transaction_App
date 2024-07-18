import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { MenuItem, Select } from '@mui/material';

function Paginating({ totalCount, onPageChange, onItemsPerPageChange, currentPage, itemsPerPage, pageCount }) {
    const handleChangePage = (event, value) => {
        onPageChange(value);
    };

    const handleChangeItemsPerPage = (event) => {
        const value = event.target.value;
        onItemsPerPageChange(parseInt(value, 10));
    };

    return (
        <Stack className='d-flex justify-content-between align-items-center' direction="row" spacing={2} alignItems="center">
            <Pagination
                count={pageCount}
                page={currentPage}
                onChange={handleChangePage}
                variant="outlined"
                shape="rounded"
                siblingCount={1} // Number of sibling pages shown on each side of the current page
            />
            <Select value={itemsPerPage.toString()} onChange={handleChangeItemsPerPage} displayEmpty>
                <MenuItem value="5">5 per page</MenuItem>
                <MenuItem value="10">10 per page</MenuItem>
                <MenuItem value="25">25 per page</MenuItem>
                <MenuItem value="50">50 per page</MenuItem>
                <MenuItem value="1000">Show All</MenuItem>
            </Select>
        </Stack>
    );
}

export default Paginating;

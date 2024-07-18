import React, { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

import Style from './TransactionsTable.module.css';
import CustomerTransactionRow from '../CustomerTransactionRow/CustomerTransactionRow';
import { CustomerContext } from '../../context/CustomerContext';
import { TransactionContext } from '../../context/TransactionContext';
import { SearchValueContext } from '../../context/SearchValueContext';
import useWindowSize from '../../hooks/useWindowSize';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Paginating from '../Paginating/Paginating';
import usePagination from '../../hooks/usePagination';

function TransactionsTable() {
    const [combinedList, setCombinedList] = useState([]);
    const { getCustomers } = useContext(CustomerContext);
    const { getTransactions } = useContext(TransactionContext);
    const { searchInputValue, minAmount, maxAmount, setOriginalList } = useContext(SearchValueContext);
    const { page, itemsPerPage, pageCount, paginatedData, handlePageChange, handleItemsPerPageChange, updatePaginatedData } = usePagination({totalCount: combinedList.length,});
    const size = useWindowSize();

    async function getAllCustomersTransactions() {
        const customersResponse = await getCustomers();
        const transactionsResponse = await getTransactions();

        const customers = customersResponse;
        const transactions = transactionsResponse;

        const combined = transactions.map(transaction => {
            const customer = customers.find(c => c.id === transaction.customer_id);
            return {
                ...transaction,
                customerName: customer ? customer.name : 'Unknown'
            };
        });

        const sortedCombined = combined.sort((a, b) => (b.date.localeCompare(a.date) || a.customerName.localeCompare(b.customerName)));

        setOriginalList(sortedCombined);
        setCombinedList(sortedCombined);

        let filteredCombined = sortedCombined;
            if (searchInputValue) {
                filteredCombined = filteredCombined.filter(item =>
                    item.customerName.toLowerCase().includes(searchInputValue.toLowerCase())
                );
            }
            if (minAmount && maxAmount) {
                filteredCombined = filteredCombined.filter(item =>
                    Number(item.amount) >= Number(minAmount) && Number(item.amount) <= Number(maxAmount)
                );
            }

            setCombinedList(filteredCombined); // Update combined list after filtering
            updatePaginatedData(filteredCombined); // Update paginated data

        // if(minAmount && maxAmount) {
        //     const filteredCombined = combined.filter(item => (item.amount >= minAmount && item.amount <= maxAmount));
            
        //     setCombinedList(filteredCombined);
        // } else if(minAmount && !maxAmount) {
        //     const filteredCombined = combined.filter(item => item.amount >= minAmount);
            
        //     setCombinedList(filteredCombined);
        // } else if(!minAmount && maxAmount) {
        //     const filteredCombined = combined.filter(item => item.amount <= maxAmount);
            
        //     setCombinedList(filteredCombined);
        // }
    }

    useEffect(() => {
        getAllCustomersTransactions();
    }, [searchInputValue, minAmount, maxAmount]);

    useEffect(() => {
        updatePaginatedData(combinedList);
    }, [combinedList, page, itemsPerPage]);

    return <>
        <div className='border-bottom pb-3 d-flex flex-wrap justify-content-between align-items-center'>
            <h3 className='h5 fw-bold'>Transactions</h3>
            <div>
                <div><span>Number of Customers:</span> <span className='text-accent fw-bold'>{combinedList?.length}</span></div>
                <div className='d-flex flex-wrap justify-content-between align-items-center'>
                    <span><FontAwesomeIcon icon="fa-solid fa-circle" size='xs' className='opacity-75 text-danger' /> &lt;= 1000</span> 
                    <span><FontAwesomeIcon icon="fa-solid fa-circle" size='xs' className='opacity-75 text-success' /> &gt; 1000</span>
                </div>
            </div>
        </div>
        <table className="table table-hover text-center">
            {size.width > 992 &&
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Date</th>
                        <th scope="col">Amount (EGP)</th>
                    </tr>
                </thead>
            }
            <tbody className={`${size.width > 992 && 'table-group-divider'}`}>
                {combinedList?.length > 0 ? (
                    // combinedList?.map((combined, index) => (
                        paginatedData?.map((combined, index) => (
                        <CustomerTransactionRow customersTransactions={combined} index={index} key={combined.id} />
                    ))
                ) : (
                    <tr>
                        <th colSpan="2" className='fw-semibold fs-3'>No Transactions yet.</th>
                    </tr>
                )}
            </tbody>
        </table>
        <Paginating
            totalCount={combinedList.length}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
            currentPage={page}
            itemsPerPage={itemsPerPage}
            pageCount={pageCount}
        />
    </>
}

export default TransactionsTable
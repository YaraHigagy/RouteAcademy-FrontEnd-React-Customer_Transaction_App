import React, { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

import Style from './Customer.module.css';
import CustomerCollapse from '../CustomerCollapse/CustomerCollapse';
import { CustomerContext } from '../../context/CustomerContext';
import { TransactionContext } from '../../context/TransactionContext';
import useWindowSize from '../../hooks/useWindowSize';
import { SearchValueContext } from '../../context/SearchValueContext';

function Customer({customer, index}) {
    // const [transactionsDetails, setTransactionsDetails] = useState(null);
    const [isCustomerSelected, setIsCustomerSelected] = useState(false);
    const [isCollapseOpen, setIsCollapseOpen] = useState(false);
    const { getCustomerTransactions } = useContext(TransactionContext);
    const { setSelectedCustomer, setTransactionsDetails, isSelected, setIsSelected, selectedCustomerId, setSelectedCustomerId, originalList } = useContext(SearchValueContext);
    const size = useWindowSize();

    // async function getAllCustomerTransactions() {
    //     const transactions = await getCustomerTransactions(customer.id);
    //     setTransactionsDetails(transactions);
    // }
    
    const handleCollapse = async (customerId) => {
        const transactions = await getCustomerTransactions(customerId);
        setTransactionsDetails(transactions);
        setSelectedCustomer(customer);
        setIsSelected(!isCustomerSelected);
        setSelectedCustomerId(customerId);
        setIsCollapseOpen(!isCollapseOpen);
    }

    const totalAmount = originalList
                            .filter((transaction) => transaction.customer_id === customer.id)
                            .reduce((accumulator, transaction) => {
                                return accumulator + transaction.amount;
                            }, 0);

    useEffect(() => {
        
    }, []);

    return <>
        <li className={`list-group-item list-group-item-action border-0 rounded-2 my-2 ${isCollapseOpen && selectedCustomerId === customer.id ? 'active' : ''}`}
            role='button' key={customer.id} data-bs-toggle="collapse" data-bs-target={`#collapseExample-${customer.id}`} aria-expanded="false" aria-controls={`collapseExample-${customer.id}`} onClick={() => handleCollapse(customer.id)}>
            {/* <th className='w-5' scope="row">{index + 1}</th> */}
            {/* <div>
                <div className='d-flex justify-content-between align-items-center'>
                    <span>{customer.name}</span>
                    <span className='fs-5 text-black-50'>:</span>
                </div> */}
                {/* <CustomerCollapse selectedCustomer={customer} transactionsDetails={transactionsDetails}/> */}
                {/* {size.width <= 992 && isSelected && <CustomerCollapse />} */}
            {/* </div> */}
            <div className='d-flex flex-wrap justify-content-start align-items-center'>
                <div className='bg-accent rounded-circle p-2 fs-sm'>
                    <span>{customer.name.split(" ").map(word => word.charAt(0).toUpperCase()).join('')}</span>
                </div>
                <div className='ps-3'>
                    <p className='mb-1'><strong>{customer.name}</strong></p>
                    <span className='text-black-50 fs-sm'>{customer.name}</span>
                </div>
                <div className='ms-auto'>
                    <span className={`fw-bold opacity-75 ${totalAmount < 1000 ? 'text-danger' : 'text-success'}`}>{totalAmount.toLocaleString()}</span>
                </div>
            </div>
        </li>
    </>
}

export default Customer
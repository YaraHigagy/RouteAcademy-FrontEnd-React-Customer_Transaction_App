import React, { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

import Style from './Customer.module.css';
import CustomerCollapse from '../CustomerCollapse/CustomerCollapse';
import { TransactionContext } from '../../context/TransactionContext';
import useWindowSize from '../../hooks/useWindowSize';
import { SearchValueContext } from '../../context/SearchValueContext';

function Customer({customer, index}) {
    const [isCustomerSelected, setIsCustomerSelected] = useState(false);
    const { getCustomerTransactions } = useContext(TransactionContext);
    const { setSelectedCustomer, setTransactionsDetails, isSelected, setIsSelected, selectedCustomerId, setSelectedCustomerId, originalList } = useContext(SearchValueContext);
    const size = useWindowSize();

    const handleCollapse = async (customerId) => {
        const transactions = await getCustomerTransactions(customerId);
        setTransactionsDetails(transactions);
        setSelectedCustomer(customer);
        setSelectedCustomerId(customerId);
        setIsSelected(!isCustomerSelected);
    }

    const totalAmount = originalList
        .filter((transaction) => transaction.customer_id === customer.id)
        .reduce((accumulator, transaction) => {
            return accumulator + transaction.amount;
        }, 0);


    useEffect(() => {
        
    }, []);

    return <>
        <li className={`list-group-item list-group-item-action border-0 rounded-2 my-2 ${selectedCustomerId === customer.id ? 'active' : ''}`} 
        id={`customer-${customer.id}`} role='button' key={customer.id} data-bs-toggle="collapse" data-bs-target={`#collapseExample-${customer.id}`} aria-expanded="false" aria-controls={`collapseExample-${customer.id}`} onClick={() => handleCollapse(customer.id)} >
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
            <div>
                {size.width < 768 && (selectedCustomerId === customer.id) && 
                    <CustomerCollapse />
                }
            </div>
        </li>
    </>
}

export default Customer
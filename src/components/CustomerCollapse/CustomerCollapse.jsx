import React, { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

import Style from './CustomerCollapse.module.css';
import { TransactionContext } from '../../context/TransactionContext';
import { CustomerContext } from '../../context/CustomerContext';
import Chart from 'react-google-charts';
import { LineChart } from '@mui/x-charts';
import { SearchValueContext } from '../../context/SearchValueContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function CustomerCollapse() {
    // function CustomerCollapse({selectedCustomer, transactionsDetails}) {
    const { selectedCustomer, transactionsDetails } = useContext(SearchValueContext);
    // Return null if selectedCustomer is null or undefined
    if (!selectedCustomer || !transactionsDetails || transactionsDetails.length === 0) {
        return null;
    }
    const yAmounts = transactionsDetails ? transactionsDetails.map(obj => obj.amount) : [];
    const xDates = transactionsDetails ? transactionsDetails.map(obj => obj.date) : [];

    const handleChildClick = (event) => {
        event.stopPropagation();
        console.log('selectedCustomer:' + selectedCustomer);
    };

    useEffect(() => {
        
    }, []);

    return <>
        <div className="collapse my-2" id={`collapseExample-${selectedCustomer.id}`}
            onClick={handleChildClick}>
            <div className="card card-body border-0 shadow-sm">
                <h4 className='h5 fw-bold border-bottom pb-3'>All Transactions for <strong className='text-accent'>{selectedCustomer.name}</strong></h4>
                <div className='row'>
                    <ul className='col-lg-4 list-group list-unstyled d-flex px-md-3 my-2'>
                        <li className='text-end fs-sm pe-2 mb-1'><span>Amount (EGP)</span></li>
                        {transactionsDetails?.length > 0 ? (
                            transactionsDetails?.map((transaction) => (
                                    <li className='list-group-item list-group-item-action border-0 rounded-2 my-1 bg-accent' key={transaction.id}>
                                        <div className='d-flex justify-content-between align-items-center'>
                                            <FontAwesomeIcon icon="fa-solid fa-circle" size='xs' className={`opacity-75 ${transaction.amount <= 1000 ? 'text-danger' : 'text-success'}`} />
                                            <span className={`text-black-50 fs-sm`}>{transaction.date}</span>
                                            <span className={`fw-bold opacity-75 ${transaction.amount <= 1000 ? 'text-danger' : 'text-success'}`}>{transaction.amount}</span>
                                        </div>
                                    </li>
                            ))
                        ) : (
                            <p colSpan="2" className='fw-semibold fs-4'>No Transactions yet.</p>
                        )}
                    </ul>
                    <div className='col-lg-8 justify-self-center'>
                        <LineChart
                            // width={500}   // Full width of parent container
                            // style={{ width: '100%' }}
                            height={300}     // Fixed height for consistency
                            series={[
                                { data: yAmounts, label: 'Transaction Amount (EGP)' },
                            ]}
                            xAxis={[{ scaleType: 'point', data: xDates }]}
                        />
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default CustomerCollapse
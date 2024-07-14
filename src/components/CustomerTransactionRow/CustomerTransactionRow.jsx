import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

import Style from './CustomerTransactionRow.module.css';
import useWindowSize from '../../hooks/useWindowSize';

function CustomerTransactionRow({customersTransactions, index}) {
    const size = useWindowSize();

    useEffect(() => {
        
    }, []);

    return <>
        {size.width >= 992 &&
            <tr className='my-1' key={customersTransactions.id}>
                <th className='w-5 align-middle' scope="row">{index + 1}</th>
                <td>
                    <div className='d-flex flex-wrap justify-content-start align-items-center text-start'>
                        <div className='bg-accent rounded-circle p-4'>
                            <span>{customersTransactions.customerName.split(" ").map(word => word.charAt(0).toUpperCase()).join('')}</span>
                        </div>
                        <div className='ps-3'>
                            <p className='mb-1'><strong>{customersTransactions.customerName}</strong></p>
                            <span className='text-black-50 fs-sm'>{customersTransactions.customerName}</span>
                        </div>
                    </div>
                </td>
                <td className='text-black-50 fs-sm align-middle'>{customersTransactions.date}</td>
                <td className='align-middle'>
                    <div className='ms-auto'>
                        <span className={`fw-bold opacity-75 ${customersTransactions.amount <= 1000 ? 'text-danger' : 'text-success'}`}>{customersTransactions.amount.toLocaleString()}</span>
                    </div>
                </td>
            </tr>
        }




        {size.width < 992 && 
            <tr className='rounded-5 my-1' key={customersTransactions.id}>
                <td colSpan={4} className='border-0'>
                    <div className='d-flex flex-wrap justify-content-start align-items-center px-3 px-md-5 text-start'>
                        <div className='bg-accent rounded-circle p-4'>
                            <span>{customersTransactions.customerName.split(" ").map(word => word.charAt(0).toUpperCase()).join('')}</span>
                        </div>
                        <div className='ps-3'>
                            <p className='mb-1'><strong>{customersTransactions.customerName}</strong></p>
                            <span className='text-black-50 fs-sm'>{customersTransactions.date}</span>
                        </div>
                        <div className='ms-auto'>
                            <span className={`fw-bold opacity-75 ${customersTransactions.amount <= 1000 ? 'text-danger' : 'text-success'}`}>{customersTransactions.amount.toLocaleString()}</span>
                        </div>
                    </div>
                </td>
            </tr>
        }
    </>
}

export default CustomerTransactionRow
import React, { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import Style from './TransactionsGraph.module.css';
import { LineChart } from '@mui/x-charts';
import { SearchValueContext } from '../../context/SearchValueContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function TransactionsGraph() {
    const { selectedCustomer, transactionsDetails, originalList } = useContext(SearchValueContext);
    // Return null if selectedCustomer is null or undefined
    // if (!selectedCustomer || !transactionsDetails || transactionsDetails.length === 0) {
    //     return null;
    // }
    // const yAmountsForSelectedCustomer = transactionsDetails ? transactionsDetails.map(obj => obj.amount) : [];
    // const xDatesForSelectedCustomer = transactionsDetails ? transactionsDetails.map(obj => obj.date) : [];



    const [transactionData, setTransactionData] = useState([]);
    const [xDates, setXDates] = useState([]);

    useEffect(() => {
        // Group transactions by customer and date, and sort dates in ascending order
        const groupedTransactions = originalList.reduce((acc, transaction) => {
            const { customer_id, customerName, amount, date } = transaction;
            if (!acc[customer_id]) {
                acc[customer_id] = {
                    customerName,
                    transactions: {}
                };
            }
            if (!acc[customer_id].transactions[date]) {
                acc[customer_id].transactions[date] = [];
            }
            acc[customer_id].transactions[date].push(amount);
            return acc;
        }, {});

        // Extract the unique and sorted dates for the x-axis
        const dates = [...new Set(originalList.map(transaction => transaction.date))].sort((a, b) => new Date(a) - new Date(b));
        setXDates(dates);

        // Create the result array for series
        const data = Object.keys(groupedTransactions).map(customer_id => {
            const customerTransactions = groupedTransactions[customer_id].transactions;
            const amounts = dates.map(date => {
                if (customerTransactions[date]) {
                    return customerTransactions[date].reduce((sum, amount) => sum + amount, 0); // Sum of amounts for the same date
                }
                return 0;
            });
            return {
                data: amounts,
                label: `${groupedTransactions[customer_id].customerName}`
            };
        });

        setTransactionData(data);
    }, [originalList]);

    const renderTooltip = (props, customerName) => (
        <Tooltip id="button-tooltip" {...props}>
            {customerName}
        </Tooltip>
    );

    return <>
        <div className="my-2">
            <div className="card card-body border-0 shadow-sm">
                <h4 className='h5 fw-bold border-bottom pb-3'>All Transactions for <strong className='text-accent'>All customers</strong></h4>
                {/* <h4 className='h5 fw-bold border-bottom pb-3'>All Transactions for <strong className='text-accent'>{selectedCustomer.name}</strong></h4> */}
                <div className='row m-2'>
                    <ul className='col-lg-4 list-group list-unstyled d-flex flex-row flex-wrap gap-2 px-md-3'>
                        <li className='col-12 text-end fs-sm pe-2 mb-1'><span>Amount (EGP)</span></li>
                        {originalList?.length > 0 ? (
                            originalList?.map((transaction) => (
                                <OverlayTrigger
                                key={transaction.id}
                                placement="top"
                                delay={{ show: 250, hide: 400 }}
                                overlay={(props) => renderTooltip(props, transaction.customerName)}
                            >
                                <li className='col list-group-item list-group-item-action border-0 rounded-2 bg-accent' role='button'>
                                    <div className='d-flex justify-content-between align-items-center gap-4'>
                                        <FontAwesomeIcon icon="fa-solid fa-circle" size='xs' className={`opacity-75 ${transaction.amount <= 1000 ? 'text-danger' : 'text-success'}`} />
                                        <span className={`text-black-50 fs-sm`}>{transaction.date}</span>
                                        <span className={`fw-bold opacity-75 ${transaction.amount <= 1000 ? 'text-danger' : 'text-success'}`}>{transaction.amount}</span>
                                    </div>
                                </li>
                            </OverlayTrigger>
                            ))
                        ) : (
                            <p colSpan="2" className='fw-semibold fs-4'>No Transactions yet.</p>
                        )}
                    </ul>
                    <div className='col-lg-8 justify-self-center'>
                    <LineChart
                        height={400}     // Fixed height for consistency
                        series={
                            // [{ data: yAmounts, label: 'Transaction Amount (EGP)' }],
                            transactionData
                        }
                        xAxis={[{ scaleType: 'point', data: xDates }]}
                    />
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default TransactionsGraph
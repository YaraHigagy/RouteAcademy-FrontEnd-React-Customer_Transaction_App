import React, { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import Style from './TransactionsGraph.module.css';
import { BarChart, LineChart } from '@mui/x-charts';
import { SearchValueContext } from '../../context/SearchValueContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function TransactionsGraph() {

    const [isLines, setIsLines] = useState(true);

    const { selectedCustomer, transactionsDetails, originalList } = useContext(SearchValueContext);

    const [transactionData, setTransactionData] = useState([]);
    const [xDates, setXDates] = useState([]);
    const [xCustomers, setXCustomers] = useState([]);
    const [yTotals, setYTotals] = useState([]);
    const [yTotalsPerDay, setYTotalsPerDay] = useState([]);

    useEffect(() => {
        // Group transactions by customer and date, and sort dates in ascending order
        const groupedTransactions = originalList.reduce((acc, transaction) => {
            const { customer_id, customerName, amount, date } = transaction;
            if (!acc[customer_id]) {
                acc[customer_id] = {
                    customerName,
                    transactions: {},
                    totalAmount: 0
                };
            }
            if (!acc[customer_id].transactions[date]) {
                acc[customer_id].transactions[date] = [];
            }
            acc[customer_id].transactions[date].push(amount);
            acc[customer_id].totalAmount += amount;
            return acc;
        }, {});

        // Extract the unique and sorted dates for the x-axis
        const dates = [...new Set(originalList.map(transaction => transaction.date))].sort((a, b) => new Date(a) - new Date(b));
        setXDates(dates);

        // Create the result array for series and compute totals per day
        const totalsPerDay = dates.map(date => {
            return originalList
                .filter(transaction => transaction.date === date)
                .reduce((sum, transaction) => sum + transaction.amount, 0);
        });

        // Create the result array for series and compute totals
        const data = [];
        const totals = [];
        const customers = [];
        for (const customer_id in groupedTransactions) {
            const customerTransactions = groupedTransactions[customer_id].transactions;
            const amounts = dates.map(date => {
                if (customerTransactions[date]) {
                    return customerTransactions[date].reduce((sum, amount) => sum + amount, 0); // Sum of amounts for the same date
                }
                return 0;
            });

            data.push({
                data: amounts,
                label: `${groupedTransactions[customer_id].customerName}`
            });

            totals.push(groupedTransactions[customer_id].totalAmount);

            customers.push(groupedTransactions[customer_id].customerName);
        }
        setTransactionData(data);
        setYTotals(totals);
        setXCustomers(customers);
        setYTotalsPerDay(totalsPerDay);

    }, [originalList]);

    const renderTooltip = (props, customerName) => (
        <Tooltip id="button-tooltip" {...props}>
            {customerName}
        </Tooltip>
    );

    // Calculate the minimum value from yTotalsPerDay and set y-axis minimum value
    const minYValue = Math.min(...yTotalsPerDay);
    const yAxisMinValue = minYValue > 0 ? minYValue * 0.975 : minYValue * 1.1;

    return <>
        <div className="my-2">
            <div className="card card-body border-0 shadow-sm">
                <div className='d-flex justify-content-between align-items-cemter border-bottom pb-3 fw-bold'>
                    <h4 className='h5 fw-bold'>All Transactions for <strong className='text-accent'>All customers</strong></h4>
                    <ul className="nav nav-pills fs-sm" id="pills-tab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button className="nav-link active" id="pills-perDay-tab" data-bs-toggle="pill" data-bs-target="#pills-perDay" type="button" role="tab" aria-controls="pills-perDay" aria-selected="true">Amount Per Day</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="pills-totals-tab" data-bs-toggle="pill" data-bs-target="#pills-totals" type="button" role="tab" aria-controls="pills-totals" aria-selected="false">Totals</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="pills-totalsPerDay-tab" data-bs-toggle="pill" data-bs-target="#pills-totalsPerDay" type="button" role="tab" aria-controls="pills-totalsPerDay" aria-selected="false">Totals Per Day</button>
                        </li>
                    </ul>
                </div>
                <div className='row m-2' >
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
                        <div className="tab-content" id="pills-tabContent">
                            <div className="tab-pane fade show active" id="pills-perDay" role="tabpanel" aria-labelledby="pills-perDay-tab" tabIndex={0}>
                                <div>
                                    {isLines ? (<LineChart
                                        height={400}     // Fixed height for consistency
                                        series={
                                            transactionData
                                        }
                                        xAxis={[{ scaleType: 'point', data: xDates }]}
                                        margin={{ top: 110}}
                                    />) : (
                                        <BarChart
                                        height={400}
                                        series={
                                            transactionData
                                        }
                                        xAxis={[{ scaleType: 'band', data: xDates }]}
                                        margin={{ top: 110}}
                                    />
                                    )}
                                    <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link active" id="pills-lines-tab" data-bs-toggle="pill" data-bs-target="#pills-lines" type="button" role="tab" aria-controls="pills-lines" aria-selected="true" onClick={() => setIsLines(true)}>Lines</button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link" id="pills-bars-tab" data-bs-toggle="pill" data-bs-target="#pills-bars" type="button" role="tab" aria-controls="pills-bars" aria-selected="false" onClick={() => setIsLines(false)}>Bars</button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="pills-totals" role="tabpanel" aria-labelledby="pills-totals-tab" tabIndex={0}>
                                <LineChart
                                    height={400}     // Fixed height for consistency
                                    series={[
                                        { data: yTotals, label: 'Total (EGP)' }
                                    ]}
                                    xAxis={[{ scaleType: 'point', data: xCustomers }]}
                                />
                            </div>
                            <div className="tab-pane fade" id="pills-totalsPerDay" role="tabpanel" aria-labelledby="pills-totalsPerDay-tab" tabIndex={0}>
                                <BarChart
                                    height={400}     // Fixed height for consistency
                                    series={[
                                        { data: yTotalsPerDay, label: 'Total (EGP)' }
                                    ]}
                                    xAxis={[{ scaleType: 'band', data: xDates }]}
                                    yAxis={[{ min: yAxisMinValue }]}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default TransactionsGraph
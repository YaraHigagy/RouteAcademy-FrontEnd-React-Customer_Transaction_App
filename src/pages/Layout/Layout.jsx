import React, { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

import Style from './Layout.module.css';
import { Outlet } from 'react-router-dom';
import TransactionsTable from '../../components/TransactionsTable/TransactionsTable';
import Searching from '../../components/Search/Searching';
import CustomersTable from '../../components/CustomersTable/CustomersTable';
import CustomerCollapse from '../../components/CustomerCollapse/CustomerCollapse';
import useWindowSize from '../../hooks/useWindowSize';
import { SearchValueContext } from '../../context/SearchValueContext';
import TransactionsGraph from '../../components/TransactionsGraph/TransactionsGraph';

function Layout() {
    const { isSelected } = useContext(SearchValueContext);
    const size = useWindowSize();

    useEffect(() => {
        
    }, [size]);

    return <>
        <div className='container-fluid bg-light'>
            <div className='row'>
                <div className='col-lg-3 px-3 py-5 bg-white d-flex flex-wrap align-content-start gap-5'>
                        <div className='col-12 shadow-sm p-3 bg-light h-fit rounded-2 order-2 order-lg-1'>
                            <Searching />
                        </div>
                        <div className='col-12 shadow-sm p-3 bg-light rounded-2 h-fit order-1 order-lg-2'>
                            <CustomersTable />
                        </div>
                </div>
                <div className='col-lg-9 py-5 p-lg-5'>
                    <div className='mb-lg-5'>
                        {size.width >= 992 && isSelected && <CustomerCollapse />}
                        <TransactionsGraph />
                    </div>
                    <div className='shadow-sm p-3 p-md-5 bg-white rounded-2'>
                        <TransactionsTable />
                    </div>
                </div>
            </div>
            {/* <Outlet /> */}
        </div>
    </>
}

export default Layout
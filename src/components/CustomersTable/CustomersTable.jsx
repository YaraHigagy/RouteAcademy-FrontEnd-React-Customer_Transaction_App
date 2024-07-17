import React, { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

import Style from './CustomersTable.module.css';
import { CustomerContext } from '../../context/CustomerContext';
import Customer from '../Customer/Customer';
import { TransactionContext } from '../../context/TransactionContext';
import { SearchValueContext } from '../../context/SearchValueContext';
import useWindowSize from '../../hooks/useWindowSize';
import CustomerCollapse from '../CustomerCollapse/CustomerCollapse';

function CustomersTable() {
    const [customersList, setCustomersList] = useState(null);
    const { getCustomers } = useContext(CustomerContext);
    const { isSelected } = useContext(SearchValueContext);
    const size = useWindowSize();

    async function getAllCustomers() {
        let res = await getCustomers();
        setCustomersList(res.sort((a, b) => a.name.localeCompare(b.name)));
    }

    useEffect(() => {
        getAllCustomers();
    }, []);

    return <>
        <div>
            <h3 className='h5 fw-bold border-bottom pb-3'>Customers <span className='fs-sm fw-lighter text-end'>(Double Click First)</span></h3>
            <ul className='list-group list-unstyled d-flex flex-wrap flex-row px-md-2'>
                <div className='col-12 col-md-4 col-lg-12'>
                    <li className='text-end fs-sm pe-2 mb-1'><span>Total Amounts (EGP)</span></li>
                    {customersList?.length > 0 ? (
                        customersList?.map((customer, index) => (
                            <Customer customer={customer} index={index} key={customer.id} />
                        ))
                    ) : (
                        <li>
                            <span colSpan="2" className='fw-semibold fs-3'>No Customers yet.</span>
                        </li>
                    )}
                </div>
                {size.width < 992 && size.width >= 768 && isSelected && 
                    <li className='col-12 col-md-8 px-3'>
                        <CustomerCollapse />
                    </li>
                }
            </ul>
        </div>
    </>
}

export default CustomersTable
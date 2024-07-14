import React, { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

import Style from './Searching.module.css';
import { SearchValueContext } from '../../context/SearchValueContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Searching() {
    const { searchInputValue, setSearchInputValue, minAmount, maxAmount, setMinAmount, setMaxAmount } = useContext(SearchValueContext);

    function handleSubmit(e) {
        e.preventDefault();
    }

    function handleSearchValue(val) {
        setSearchInputValue(val);
    }

    const handleMinSelectChange = (event) => {
        setMinAmount(event.target.value);
    };

    const handleMaxSelectChange = (event) => {
        setMaxAmount(event.target.value);
    };

    const handleResetFilters = () => {
        setSearchInputValue('');
        setMinAmount('');
        setMaxAmount('');
    };

    useEffect(() => {
        setMinAmount('');
        setMaxAmount('');
    }, []);

    return <>
        <div className="form-floating mb-3 text-black-50">
            <input type="search" id="floatingInput" className="form-control" placeholder=""
                onInput={(e) => setSearchInputValue(e.target.value)} value={searchInputValue}
                />
            <label htmlFor="floatingInput"><FontAwesomeIcon icon="fas fa-search" /><span className='ps-2'>Customer name</span></label>
        </div>

        <h4 className='h6 fw-bold pt-3'>Transaction amount (EGP) :</h4>
        <div>
            <form onSubmit={handleSubmit}>
                <div className='d-flex align-items-center gap-3'>
                    <div className="input-group">
                        <select className="form-select" id="inputGroupSelect01" 
                            value={minAmount}
                            onChange={handleMinSelectChange}>
                            <option value="" disabled>Min ...</option>
                            <option value={500}>500</option>
                            <option value={1000}>1000</option>
                            <option value={1500}>1500</option>
                            <option value={2000}>2000</option>
                        </select>
                    </div>
                    <span>to</span>
                    <div className="input-group">
                        <select className="form-select" id="inputGroupSelect02" 
                            value={maxAmount}
                            onChange={handleMaxSelectChange}>
                            <option value="" disabled>Max ...</option>
                            <option value={1000}>1000</option>
                            <option value={1500}>1500</option>
                            <option value={2000}>2000</option>
                            <option value={2500}>2500</option>
                        </select>
                    </div>
                </div>
            </form>
        </div>

        <button className="btn btn-outline-secondary mt-3" onClick={handleResetFilters}>Reset Filters</button>
    </>
}

export default Searching
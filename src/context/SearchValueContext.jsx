import axios from "axios";
import { createContext, useState } from "react";

export let SearchValueContext = createContext();

function SearchValueContextProvider(props) {

    const [apiError, setApiError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [userId, setUserId] = useState('');
    const [isSelected, setIsSelected] = useState(false);

    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [originalList, setOriginalList] = useState([]);
    const [transactionsDetails, setTransactionsDetails] = useState([]);
    const [selectedCustomerId, setSelectedCustomerId] = useState(null);

    const [searchInputValue, setSearchInputValue] = useState('');
    const [minAmount, setMinAmount] = useState(0);
    const [maxAmount, setMaxAmount] = useState(0);

    return <SearchValueContext.Provider value={{ selectedCustomer, setSelectedCustomer, searchInputValue, transactionsDetails, setTransactionsDetails, setSearchInputValue, minAmount, setMinAmount, maxAmount, setMaxAmount, isSelected, setIsSelected, selectedCustomerId, setSelectedCustomerId, originalList, setOriginalList }}>
        {props.children}
    </SearchValueContext.Provider>
}

export default SearchValueContextProvider
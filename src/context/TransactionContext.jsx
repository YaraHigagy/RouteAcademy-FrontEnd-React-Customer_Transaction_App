import axios from "axios";
import { createContext, useContext, useState } from "react";
import { ApiAddressContext } from "./ApiAddressContext";

export let TransactionContext = createContext();

function TransactionContextProvider(props) {

    const { apiAddress, setApiAddress } = useContext(ApiAddressContext);
    const [apiError, setApiError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [userId, setUserId] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [numOfTransactions, setNumOfTransactions] = useState(localStorage.getItem('NumOfTransactions'));
    localStorage.setItem('NumOfTransactions', numOfTransactions? numOfTransactions : 0);

    let headers = {
        token: localStorage.getItem('UserToken')
    }

    function addTransaction(transactionId) {
        return axios.post(`${apiAddress}transactions`, {
            transactionId
        }, {
            headers
        })
        .then((res) => res)
        .catch((err) => err)
    }

    function getTransactions() {
        return axios.get(`${apiAddress}transactions`, {
            headers
        }).then((res) => {
            // setUserId(res.data.data.TransactionOwner);
            // setTransactionId(res.data.data._id);
            return res.data;
        })
            .catch((err) => err)
    }

    function getCustomerTransactions(customer_id) {
        return axios.get(`${apiAddress}transactions?customer_id=${customer_id}`, {
            headers
        }).then((res) => {
            // setUserId(res.data.data.TransactionOwner);
            // setTransactionId(res.data.data._id);
            return res.data;
        })
            .catch((err) => err)
    }

    function removeTransaction(transactionId) {
        return axios.delete(`${apiAddress}transactions/${transactionId}`, {
            headers
        }).then((res) => res)
            .catch((err) => err)
    }

    function updateTransaction(transactionId, amount) {
        return axios.put(`${apiAddress}transactions/${transactionId}`, {
            amount
        }, {
            headers
        })
        .then((res) => res)
        .catch((err) => err)
    }

    function clearTransactions() {
        return axios.delete(`${apiAddress}transactions`, {
            headers
        }).then((res) => res)
            .catch((err) => err)
    }

    // function getUserOrders() {
    //     return axios.get(`${apiAddress}orders/user/${userId}`, {
    //         headers
    //     }).then((res) => res.data.find(obj => obj.user._id === userId))
    //         .catch((err) => err)
    // }

    return <TransactionContext.Provider value={{addTransaction, getTransactions, getCustomerTransactions, removeTransaction, updateTransaction, clearTransactions, numOfTransactions, setNumOfTransactions}}>
        {props.children}
    </TransactionContext.Provider>
}

export default TransactionContextProvider
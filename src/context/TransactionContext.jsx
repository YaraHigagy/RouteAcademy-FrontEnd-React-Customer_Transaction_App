import axios from "axios";
import { createContext, useState } from "react";

export let TransactionContext = createContext();

function TransactionContextProvider(props) {

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
        return axios.post(`http://localhost:3000/transactions`, {
            transactionId
        }, {
            headers
        })
        .then((res) => res)
        .catch((err) => err)
    }

    function getTransactions() {
        return axios.get(`http://localhost:3000/transactions`, {
            headers
        }).then((res) => {
            // setUserId(res.data.data.TransactionOwner);
            // setTransactionId(res.data.data._id);
            return res.data;
        })
            .catch((err) => err)
    }

    function getCustomerTransactions(customer_id) {
        return axios.get(`http://localhost:3000/transactions?customer_id=${customer_id}`, {
            headers
        }).then((res) => {
            // setUserId(res.data.data.TransactionOwner);
            // setTransactionId(res.data.data._id);
            return res.data;
        })
            .catch((err) => err)
    }

    function removeTransaction(transactionId) {
        return axios.delete(`http://localhost:3000/transactions/${transactionId}`, {
            headers
        }).then((res) => res)
            .catch((err) => err)
    }

    function updateTransaction(transactionId, amount) {
        return axios.put(`http://localhost:3000/transactions/${transactionId}`, {
            amount
        }, {
            headers
        })
        .then((res) => res)
        .catch((err) => err)
    }

    function clearTransactions() {
        return axios.delete(`http://localhost:3000/transactions`, {
            headers
        }).then((res) => res)
            .catch((err) => err)
    }

    // function getUserOrders() {
    //     return axios.get(`http://localhost:3000/orders/user/${userId}`, {
    //         headers
    //     }).then((res) => res.data.find(obj => obj.user._id === userId))
    //         .catch((err) => err)
    // }

    return <TransactionContext.Provider value={{addTransaction, getTransactions, getCustomerTransactions, removeTransaction, updateTransaction, clearTransactions, numOfTransactions, setNumOfTransactions}}>
        {props.children}
    </TransactionContext.Provider>
}

export default TransactionContextProvider
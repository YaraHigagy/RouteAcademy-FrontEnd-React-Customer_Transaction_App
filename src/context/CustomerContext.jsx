import axios from "axios";
import { createContext, useState } from "react";

export let CustomerContext = createContext();

function CustomerContextProvider(props) {

    const [apiError, setApiError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [userId, setUserId] = useState('');
    const [customerId, setCustomerId] = useState('');
    const [numOfCustomers, setNumOfCustomers] = useState(localStorage.getItem('NumOfCustomers'));
    localStorage.setItem('NumOfCustomers', numOfCustomers? numOfCustomers : 0);

    let headers = {
        // token: localStorage.getItem('UserToken')
    }

    function addCustomer(customerId) {
        return axios.post(`http://localhost:3000/customers`, {
            customerId
        }, {
            headers
        })
        .then((res) => res)
        .catch((err) => err)
    }

    function getCustomers() {
        return axios.get(`http://localhost:3000/customers`, {
            headers
        }).then((res) => {
            return res.data;
        })
            .catch((err) => err)
    }

    function removeCustomer(customerId) {
        return axios.delete(`http://localhost:3000/customers/${customerId}`, {
            headers
        }).then((res) => res)
            .catch((err) => err)
    }

    function updateCustomer(customerId, name) {
        return axios.put(`http://localhost:3000/customers/${customerId}`, {
            name
        }, {
            headers
        })
        .then((res) => res)
        .catch((err) => err)
    }

    function clearCustomers() {
        return axios.delete(`http://localhost:3000/customers`, {
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

    return <CustomerContext.Provider value={{addCustomer, getCustomers, removeCustomer, updateCustomer, clearCustomers, customerId, setCustomerId, numOfCustomers, setNumOfCustomers}}>
        {props.children}
    </CustomerContext.Provider>
}

export default CustomerContextProvider
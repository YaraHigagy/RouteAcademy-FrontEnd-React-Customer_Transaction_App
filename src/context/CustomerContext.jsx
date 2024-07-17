import axios from "axios";
import { createContext, useContext, useState } from "react";
import { ApiAddressContext } from "./ApiAddressContext";

export let CustomerContext = createContext();

function CustomerContextProvider(props) {

    const { apiAddress, setApiAddress } = useContext(ApiAddressContext);
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
        return axios.post(`${apiAddress}customers`, {
            customerId
        }, {
            headers
        })
        .then((res) => res)
        .catch((err) => err)
    }

    function getCustomers() {
        return axios.get(`${apiAddress}customers`, {
            headers
        }).then((res) => {
            return res.data;
        })
            .catch((err) => err)
    }

    function removeCustomer(customerId) {
        return axios.delete(`${apiAddress}customers/${customerId}`, {
            headers
        }).then((res) => res)
            .catch((err) => err)
    }

    function updateCustomer(customerId, name) {
        return axios.put(`${apiAddress}customers/${customerId}`, {
            name
        }, {
            headers
        })
        .then((res) => res)
        .catch((err) => err)
    }

    function clearCustomers() {
        return axios.delete(`${apiAddress}customers`, {
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

    return <CustomerContext.Provider value={{addCustomer, getCustomers, removeCustomer, updateCustomer, clearCustomers, customerId, setCustomerId, numOfCustomers, setNumOfCustomers}}>
        {props.children}
    </CustomerContext.Provider>
}

export default CustomerContextProvider
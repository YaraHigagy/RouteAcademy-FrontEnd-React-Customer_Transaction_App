import axios from "axios";
import { createContext, useState } from "react";

export let ApiAddressContext = createContext();

function ApiAddressContextProvider(props) {

    const [apiAddress, setApiAddress] = useState('https://customer-transaction-db-json-server.vercel.app/');
    // const [apiAddress, setApiAddress] = useState('http://localhost:3000/');
    // const [apiError, setApiError] = useState('');
    // const [isLoading, setIsLoading] = useState(false);

    let headers = {
        // token: localStorage.getItem('UserToken')
    } 

    return <ApiAddressContext.Provider value={{apiAddress, setApiAddress}}>
        {props.children}
    </ApiAddressContext.Provider>
}

export default ApiAddressContextProvider
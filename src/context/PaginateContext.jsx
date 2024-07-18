import axios from "axios";
import { createContext, useState } from "react";

export let PaginateContext = createContext();

function PaginateContextProvider(props) {

    const [paginateList, setPaginateList] = useState([]);

    return <PaginateContext.Provider value={{paginateList, setPaginateList}}>
        {props.children}
    </PaginateContext.Provider>
}

export default PaginateContextProvider
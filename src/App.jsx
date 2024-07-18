import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './pages/Layout/Layout';
import CustomersTable from './components/CustomersTable/CustomersTable';
import CustomerContextProvider from './context/CustomerContext';
import TransactionContextProvider from './context/TransactionContext';
import TransactionsTable from './components/TransactionsTable/TransactionsTable';
import SearchValueContextProvider from './context/SearchValueContext';
import ApiAddressContextProvider from './context/ApiAddressContext';
import PaginateContextProvider from './context/PaginateContext';

const router = createBrowserRouter([
  {path:'', element: <Layout />, children: [
      {index: true, element: <CustomersTable />},
  ]}
]);

function App() {
  return (
    <>
      <ApiAddressContextProvider>
        <PaginateContextProvider>
          <SearchValueContextProvider>
            <CustomerContextProvider>
              <TransactionContextProvider>
                <RouterProvider router={router}></RouterProvider>
              </TransactionContextProvider>
            </CustomerContextProvider>
          </SearchValueContextProvider>
        </PaginateContextProvider>
      </ApiAddressContextProvider>
    </>
  )
}

export default App

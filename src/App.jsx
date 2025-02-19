import { Children, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Cart from './components/Cart/Cart';
import Products from './components/Products/Products';
import Categories from './components/Categories/Categories';
import Brands from './components/Brands/Brands';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import ERROR from './components/ERROR/ERROR';
import AuthContextProvider from './components/context/AuthContext'
import Guard from './components/Guard/Guard'
import AuthGuard from './components/AuthGuard/AuthGuard'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ProductsDetails from './components/ProductsDetails/ProductsDetails'
import { CartProvider } from './components/CartContext/CartContext';
import { ToastContainer } from 'react-toastify';
import { WishlistProvider } from './components/context/WishlistContext/WishlistContext';
import 'react-toastify/dist/ReactToastify.css';
import Wishlist from './components/Wishlist/Wishlist'
import Order from './components/Order/Order'
import PaymentSuccess from './components/paymentstatus/Paymentsuccess'
import PaymentCancel from './components/paymentstatus/Paymentcancel'
import Orders from './components/Orders/Orders'



function App() {
  const queryClient = new QueryClient()
  const routes = createHashRouter([ 
    {
      path: '/',  
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Guard><Home /></Guard>
        },
        {
          path: 'cart',
          element: <Guard><Cart /></Guard>
        },
        {
          path: 'Wishlist',
          element: <Guard><Wishlist /></Guard>
        },
        {
          path: 'products',
          element: <Guard><Products /></Guard>
        },
        {
          path: 'order',
          element: <Guard><Order /></Guard>
        },
        {
          path: 'categories',
          element: <Guard><Categories /></Guard>
        },
        {
          path: 'brands',
          element: <Guard><Brands /></Guard>
        },
        {
          path: 'allorders',
          element: <Guard><Orders/></Guard>
        },
        {
          path: 'login',
          element: <AuthGuard><Login /></AuthGuard>
        },
        {
          path: 'register',
          element: <AuthGuard><Register /></AuthGuard>
        },
        {
          path: 'paymentsuccess',
          element: <Guard><PaymentSuccess/></Guard>
        },
        {
          path: 'paymentcancel',
          element: <Guard><PaymentCancel/></Guard>
        },
        {
          path: 'details/:id',
          element: <Guard><ProductsDetails /></Guard>
        },
        {
          path: '*',
          element: <ERROR />
        }
      ]
    }
  ])

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <CartProvider>
            <WishlistProvider>
              <RouterProvider router={routes} />
              <ToastContainer />
            </WishlistProvider>
          </CartProvider>
        </AuthContextProvider>
      </QueryClientProvider>
    </>
  )
}

export default App

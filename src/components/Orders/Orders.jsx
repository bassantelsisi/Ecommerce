// components/Orders/Orders.jsx

import { useAuth } from '../context/useAuth';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Orders() {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { getUserId, isTokenValid } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            setIsLoading(true);
            try {
                if (!isTokenValid()) {
                    throw new Error('Invalid or expired token');
                }

                const userId = getUserId();
                if (!userId) {
                    throw new Error('User ID not found');
                }

                const response = await axios.get(
                    `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`,
                    {
                        headers: { token: localStorage.getItem('token') }
                    }
                );

                if (response.data) {
                    setOrders(response.data);
                }
            } catch (error) {
                console.error('Error fetching orders:', error);
                setError(error.message || 'Error loading orders');
                toast.error(error.response?.data?.message || 'Error loading orders');

                if (error.message.includes('token')) {
                    navigate('/login');
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrders();
    }, [navigate]);

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="bg-red-50 border-l-4 border-red-500 p-4">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-red-700">
                                {error}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="container mx-auto px-4 py-8">
                <h2 className="text-2xl font-bold mb-4">My Orders</h2>
                <div className="bg-white rounded-lg shadow-md p-6 text-center">
                    <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                        />
                    </svg>
                    <p className="mt-4 text-gray-600">You haven't placed any orders yet.</p>
                    <button
                        onClick={() => navigate('/products')}
                        className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                    >
                        Start Shopping
                    </button>
                </div>
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="container mx-auto px-4 py-8">
                <h2 className="text-2xl font-bold mb-4">My Orders</h2>
                <div className="bg-white rounded-lg shadow-md p-6 text-center">
                    <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                        />
                    </svg>
                    <p className="mt-4 text-gray-600">You haven't placed any orders yet.</p>
                    <button
                        onClick={() => navigate('/products')}
                        className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                    >
                        Start Shopping
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-6">My Orders</h2>
            <div className="space-y-6">
                {orders.map((order) => (
                    <div
                        key={order._id}
                        className="bg-white rounded-lg shadow-md p-6"
                    >
                        <div className="flex justify-between items-center mb-4">
                            <div>
                                <h3 className="text-lg font-semibold">
                                    Order #{order._id.slice(-6)}
                                </h3>
                                <p className="text-gray-600">
                                    Placed on: {new Date(order.createdAt).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium
                                ${order.isPaid ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}
                            >
                                {order.isPaid ? 'Paid' : 'Cash on Delivery'}
                            </span>
                        </div>

                        <div className="border-t border-gray-200 pt-4">
                            <h4 className="font-medium mb-2">Shipping Address:</h4>
                            <p className="text-gray-600">
                                {order.shippingAddress.details}, {order.shippingAddress.city}
                            </p>
                            <p className="text-gray-600">
                                Phone: {order.shippingAddress.phone}
                            </p>
                        </div>

                        <div className="border-t border-gray-200 mt-4 pt-4">
                            <h4 className="font-medium mb-2">Order Items:</h4>
                            <div className="space-y-4">
                                {order.cartItems.map((item) => (
                                    <div
                                        key={`${order._id}-${item._id}`}
                                        className="flex items-center space-x-4"
                                    >
                                        <img
                                            src={item.product.imageCover}
                                            alt={item.product.title}
                                            className="w-16 h-16 object-cover rounded"
                                        />
                                        <div className="flex-1">
                                            <h5 className="font-medium">
                                                {item.product.title}
                                            </h5>
                                            <p className="text-gray-600">
                                                Quantity: {item.count}
                                            </p>
                                        </div>
                                        <p className="font-medium">
                                            ${(item.price * item.count).toFixed(2)}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="border-t border-gray-200 mt-4 pt-4">
                            <div className="flex justify-between items-center">
                                <span className="font-medium">Total Amount:</span>
                                <span className="text-xl font-bold">
                                    ${order.totalOrderPrice.toFixed(2)}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Orders;
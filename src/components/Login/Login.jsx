// Login.jsx
import { useFormik } from 'formik';
import React, { useContext, useState } from 'react';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

const validationSchema = yup.object().shape({
    email: yup.string()
        .required('email is required')
        .email('please enter valid email'),
    password: yup.string()
        .required('password is required')
        .matches(/^[A-z0-9_]{6,30}$/, 'from 6 to 30 characters, letters, numbers and underscore only'),
});

function Login() {
    const [loadingbutton, setLoadingButton] = useState(false);
    const navigate = useNavigate();
    const { setToken } = useContext(AuthContext);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            setLoadingButton(true);
            try {
                const res = await axios.post(
                    'https://ecommerce.routemisr.com/api/v1/auth/signin',
                    values
                );

                if (res.data.message === 'success') {
                    localStorage.setItem('token', res.data.token);
                    setToken(res.data.token);
                    toast.success('Successfully logged in!');
                    navigate('/'); // Immediate navigation
                }
            } catch (err) {
                console.error('Login error:', err);
                toast.error(err.response?.data?.message || 'Error logging in');
            } finally {
                setLoadingButton(false);
            }
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto py-6">
            <div className="relative z-0 w-full mb-5 group">
                <input
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="email"
                    name="email"
                    id="email"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                />
                <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Email
                </label>
            </div>
            {formik.errors.email && formik.touched.email && (
                <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    <span className="font-medium">Error!</span> {formik.errors.email}
                </div>
            )}

            <div className="relative z-0 w-full mb-5 group">
                <input
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="password"
                    name="password"
                    id="password"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                />
                <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Password
                </label>
            </div>
            {formik.errors.password && formik.touched.password && (
                <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    <span className="font-medium">Error!</span> {formik.errors.password}
                </div>
            )}

            <button
                type="submit"
                disabled={loadingbutton}
                className="text-white bg-green-500 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center disabled:bg-gray-400"
            >
                {loadingbutton ? 'Logging in...' : 'Login'}
            </button>
        </form>
    );
}

export default Login;
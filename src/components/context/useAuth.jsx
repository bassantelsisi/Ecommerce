// hooks/useAuth.js
import { jwtDecode } from 'jwt-decode'; 
import { useState } from 'react';

export const useAuth = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getDecodedToken = () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            if (token) {
                return jwtDecode(token);
            }
            return null;
        } catch (error) {
            setError('Error decoding token');
            return null;
        } finally {
            setLoading(false);
        }
    };

    const getUserId = () => {
        const decoded = getDecodedToken();
        return decoded?.id;
    };

    const isTokenValid = () => {
        const decoded = getDecodedToken();
        if (!decoded) return false;
        
        const currentTime = Date.now() / 1000;
        return decoded.exp > currentTime;
    };

    return {
        getDecodedToken,
        getUserId,
        isTokenValid,
        loading,
        error
    };
};
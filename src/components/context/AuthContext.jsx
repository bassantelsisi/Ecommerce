import { createContext, useState, useContext, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem('token'));

    return (
        <AuthContext.Provider value={{ token, setToken }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
export default AuthContextProvider
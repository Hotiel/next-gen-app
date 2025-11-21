import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] =useState(null);

    const login = async (usuario, password) => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/login`, {
            method : "POST",
            headers : {"Content-type": "application/json" },
            body: JSON.stringify({usuario, password}),
            credentials: "include",
        });
        const data = await res.json();
        if (res.ok) setUser(data);
        return data;
    };

    const logout = () => setUser(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch(`https://api.nextgenrol.com.ar/api/me`, {
                    credentials: "include",
                });
                if (res.ok) {
                    const data = await res.json();
                    setUser(data);
                }
            }catch(err) {
                console.error("Error al verificar sesión:", err);
            }
        };

        
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
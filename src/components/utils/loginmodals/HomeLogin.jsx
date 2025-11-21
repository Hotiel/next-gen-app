import React from "react";
import { useState } from "react";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";

const HomeLogin = () => {
    const navigate = useNavigate();
    const { login, user } = useAuth();
    const[usuario, setUsuario] = useState("");
    const [password, setPasword] = useState("");
    const [mensaje, setMensaje] = useState("");
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensaje("");

        try {
            const data = await login(usuario, password);
            if (data.usuario) {
                setMensaje(data.message || "inicio de sesión exitoso ✅")
            
            }else {
                setMensaje(data.message || "Error al iniciar sesión");
            }
        }catch (err) {
            setMensaje("Error de conexión con el server");
            console.error(err);
        }
    };
    
    const logout = async () => {
        await fetch(`${import.meta.env.VITE_API_URL}/api/logout`, {
            method: "POST",
            credentials: "include"
        });
        setUsuario(null);
        // navigate("/");
        window.location.reload();
    };

    return (
        <div className="login-box d-flex flex-column align-items-center">
            {user ? (
                <div><p> Bienvenido {user.usuario} </p> <button onClick={logout}>CERRAR SESIÓN</button></div>
            ) : (
                <form className="login-form-home" onSubmit={handleSubmit}>
                    <input 
                        type="text"
                        required
                        placeholder="User"
                        value={usuario}
                        onChange={(e) => setUsuario(e.target.value)}
                    />
                    <input 
                        type="password" 
                        required
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPasword(e.target.value)}
                        />
                    <button type="submit">Iniciar Sesion</button>
                    <p>{mensaje}</p>
                </form>
            )}
        </div>
    )
}

export default HomeLogin;
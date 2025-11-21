import { useState } from "react";
import { useAuth } from "../utils/AuthContext.jsx";

export function LoginModal({onClose}) {

    const { login, user } = useAuth();
    const[usuario, setUsuario] = useState("");
    const [message, setmessage] = useState("")
    const [password, setPasword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = await login(usuario, password);
            if (data.usuario) {
                onClose();
            
            }else {
                setmessage(data.message || "Error al iniciar sesión");
            }
        }catch (err) {
            setmessage("Error de conexión con el server");
            console.error(err);
        }
    };


    return (
        <div className="complete-window-modal-login">
            <div className="login-modal-container">
                <form onSubmit={handleSubmit}>
                    <p>Bienvenido de nuevo</p>
                    <label >
                        <input 
                    type="text"
                    placeholder="User"
                    value={usuario}
                    required
                    onChange={(e) => setUsuario(e.target.value)}
                    />
                    </label>
                    
                    <label >
                        <input 
                    type="password"
                    required
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPasword(e.target.value)}
                    />
                    </label>
                    <button type="submit">Iniciar Sesion</button>
                </form>
                <p className="login-message">{message}</p>
            </div>
            <div className="modal-closer" onClick={() => {onClose()}}></div>
        </div>
    )
}
import { useState, useEffect } from "react"
import { ModalPanel } from "../UI/ModalPanel.jsx";
import { useAuth } from "../utils/AuthContext.jsx"

export function Profile() {

    const [userInfo, setUserInfo] = useState(null);
    const [modalPanel, setModalPanel] = useState(false);
    const { user } = useAuth();
    const isGuest = user?.role == "guest";

    const fetchUserInfo = async () => {
            const res = await fetch("http://localhost:3001/api/getUserInfo", { credentials: "include" });
            const data = await res.json();
            setUserInfo(data);
    };

    useEffect(() => {
        fetchUserInfo();
    }, []);
    useEffect(() => {
            document.title = "Profile — Next Gen";
            console.log("isGuest:", isGuest, typeof isGuest);
        }, []);


    return ( 
        
        modalPanel ? <ModalPanel userInfo={userInfo} refreshUser={fetchUserInfo} onClose={() => setModalPanel(prevModalPanel => !prevModalPanel)}/> :
            userInfo ? (
            <div className="user-card">
                <h2 className="user-title">Hola, {userInfo.usuario}</h2>
                <div className="user-profilepicturecontainer">
                    <img src={userInfo.avatar} alt="foto de perfil" />
                    <div className="user--info">
                        <span>Rol: {userInfo.role}</span>
                        <span>Veces online: {userInfo.loginCount}</span>
                    </div>
                </div>
                
                <button className="user-editor" disabled={isGuest} onClick={() => setModalPanel(prevModalPanel => !prevModalPanel)}>Editar Información de usuario</button>
                {isGuest && <p className="guest-p">No disponible para invitados.</p>}
            </div>
            ) 
            :
            ( <p>cargando datos</p> )
    )
}
import { useEffect, useState } from "react"
import { handleUpdateUserName, handleUpdatePassword, handleUpdateProfilePicture } from "../utils/api/userHandlers.js";


export function ModalPanel({ userInfo, refreshUser, onClose }) {

    const [newName, setNewName] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordCheck, setNewPasswordCheck] = useState("");
    const [image, setImage] = useState(null);
    const [localProfileImage, setLocalProfileImage] = useState(userInfo.avatar);

    useEffect(() => {
        return () => {
            if (localProfileImage && localProfileImage.startsWith("blob:")) {
                URL.revokeObjectURL(localProfileImage);
            }
        };
    }, [localProfileImage]);

    const onNameChange = async (e) => {
        e.preventDefault();
        const updatedName = await handleUpdateUserName(newName);
        await refreshUser();
        onClose?.(); 
    };
    
    const onPasswordChange = async (e) => {
        e.preventDefault();
        const updatedPassword = await handleUpdatePassword({ oldPassword, newPassword, newPasswordCheck });
        if (updatedPassword?.success) {
        await refreshUser();
        onClose?.();
        }
};

    const onImageChange = async (e) => {
        e.preventDefault();
        if (!image) return;
        const updatedImage = await handleUpdateProfilePicture(image);
        await refreshUser();
        onClose?.(); 
    };

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (localProfileImage && localProfileImage.startsWith("blob:")) {
                URL.revokeObjectURL(localProfileImage);
            }
            setImage(file);
            const tempUrl = URL.createObjectURL(file);
            setLocalProfileImage(tempUrl);
        }
    };


    return (
        <div className="complete-window-modal modal-updater w-100 h-100">
            <button className="panel-closer" onClick={() => {onClose(); window.scrollTo({ top: 0, behavior: "smooth" });}}>X</button>
            <div className="user-card">

                <div className="user-updater-form-container">
                    <form className="user-updater-form" onSubmit={onImageChange}>
                        <label className="profile-change-label">
                            <img src={localProfileImage} alt="cambiar foto de perfil" className="profile-change-img" />
                            <div className="profile-image-overlay">
                                <i className="bi bi-camera-fill"></i>
                            </div>
                            <input 
                            className="seleccionar-foto"
                            type="file"
                            hidden
                            accept="image/*" 
                            onChange={handleFileSelect}/>
                        </label>
                
                        <button className="profile-change-button" type="submit">Actualizar foto de perfil</button>
                    </form>
                </div>

                <div className="user-updater-form-container">
                    <form className="user-updater-form" onSubmit={onNameChange}>
                        <fieldset className="user-updater-fieldset">
                            <legend><h5>Actualizar nombre de usuario</h5></legend>
                            <label> Nombre Nuevo: 
                            <input 
                            type="text" 
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}/>
                            </label>
                        </fieldset>
                        <button type="submit">Actualizar Usuario</button>
                    </form>
                </div>

                <div className="user-updater-form-container">
                    <form className="user-updater-form" onSubmit={onPasswordChange}>
                    <fieldset>
                        <legend><h5>Actualizar password</h5></legend>

                        <label> <span>Contraseña anterior: </span>
                            <input type="password"
                            value={oldPassword} 
                            onChange={(e) => setOldPassword(e.target.value)}/>
                        </label>

                        <label> <span>Contraseña nueva: </span>
                            <input type="password"
                            value={newPassword} 
                            onChange={(e) => setNewPassword(e.target.value)}/>
                        </label>

                        <label> <span>Repetir contraseña nueva: </span>
                            <input type="password"
                            value={newPasswordCheck} 
                            onChange={(e) => setNewPasswordCheck(e.target.value)}/>
                        </label>

                        <button type="submit">Actualizar contraseña</button>

                    </fieldset>
                    </form>
                </div>

            </div>
        </div>
    )
}
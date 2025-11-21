import Usser from "../../models/ussers.js";
import bcrypt from 'bcrypt';

export const updatePassword = async (req, res) => {
    try {
        const userId = req.user.id;
        const { oldPassword, newPassword, newPasswordCheck} = req.body;

        if(newPassword != newPasswordCheck) {
            return res.status(400).json({ message: "Las contraseñas nuevas no coinciden"});
        }
        if(!oldPassword || !newPassword) {
            return res.status(400).json({message: "Debe ingresar ambas contraseñas"});
        }
        if(newPassword === "") {
            return res.status(400).json({message: "No seas pelotudo que arreglar esto es un quilombo"});
        }

        const user = await Usser.findById(userId);
        if(!user){
            return res.status(404).json({ message: "Usuario no encontrado"});
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if(!isMatch){
            return res.status(401).json({ message: "Contraseña actual incorrecta"});
        }

        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        user.password = hashedPassword;
        await user.save();

        res.status(200).json({success: true, message: "Contraseña actualizada con éxito"});
    
    }catch(err){
        console.error("Error al actualizar la contraseña", err)
        return res.status(500).json({success: false, message: "Error interno del servidor"});
    }
}
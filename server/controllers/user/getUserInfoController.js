import Usser from "../../models/ussers.js";

export const getUserInfo = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await Usser.findById(userId).select("-password");

        if(!user){
            return res.status(404).json({ mesagge: "Usuario no encontrado" });
        }

        res.json(user);

    }catch (err) { 
        console.error("Error al obtener usuario:", err);
        res.status(500).json({ message: "Error interno del servidor"});
    }
};
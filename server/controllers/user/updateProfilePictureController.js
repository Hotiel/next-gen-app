import fs from "fs/promises";
import cloudinary from '../../config/cloudinary.js';
import Usser from '../../models/ussers.js';

export const updateProfilePicture = async (req, res) => {
    try {
        const file = req.file;
        if(!file) return res.status(400).json({ message: "Debe subir una foto"});

        const result = await cloudinary.uploader.upload(file.path, {
            folder: 'NextGenApp/profile_pictures',
            transformation: [{ width: 800, crop: "limit" }],
        });

        try {
            await fs.unlink(req.file.path);
        }catch(unlinkErr) {
            console.warn("No se pudo borrar el archivo temporal:", unlinkErr);
        }

        const updatedUser = await Usser.findByIdAndUpdate(
            req.user.id,
            { avatar: result.secure_url },
            { new: true, select: "-password" }
        );

        if (!updatedUser) {
        return res.status(404).json({ message: "Usuario no encontrado." });
        }
        
        return res.status(200).json({
            message: "Imagen actualizada con éxito.",
            user: updatedUser,
            imageUrl: result.secure_url,
        });
        
    }catch (err){
        console.error("error al subir la imagen:", err);
        res.status(500).json({ message: "error al subir la imagen" });
    }
};
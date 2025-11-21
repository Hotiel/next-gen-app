import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Usser from "../../models/ussers.js";

export const loginUser = async (req, res) => {
    try{
        const {usuario, password} = req.body;

        if (!usuario || !password) {
            return res.status(401).json({ message: "Credenciales Incorrectas"});
        }

        const user = await Usser.findOne({ usuario });
        if (!user) {
            return res.status(401).json({ message: "Usuario no encontrado"});
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Contraseña incorrecta"});
        }

        user.lastLogin = new Date();
        user.loginCount = (user.loginCount || 0) + 1;
        await user.save();

        const token = jwt.sign(
            {id: user._id, usuario: user.usuario, role: user.role, settings: user.settings},
            process.env.JWT_SECRET || "Cada_vez_que_pienso_y_me_doy_cuenta_donde_estoy_entiendo_menos",
            {expiresIn: "10h"}
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 10 * 60 * 60 * 1000,
        });

        res.status(200).json({
            message: "Login existoso",
            id: user.id,
            usuario: user.usuario,
            role: user.role,
        });
    }catch (error) {
        console.error("Error en login:", error);
        res.status(500).json({ message: "Error interno del servidor"});
    }
};
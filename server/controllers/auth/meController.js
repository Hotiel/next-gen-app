import jwt from 'jsonwebtoken';

export const verifyUser = (req, res) => {
    const token = req.cookies.token;
    if(!token) {
        return res.status(401).json({ message: "No autenticado" });
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET || "Cada_vez_que_pienso_y_me_doy_cuenta_donde_estoy_entiendo_menos"
        );

        res.status(200).json({
            message: "Usuario autenticado",
            id: decoded.id,
            usuario: decoded.usuario,
            role: decoded.role,
        });
    } catch(err) {
        res.status(403).json({ message: "token inválido o expirado" });
    }
}
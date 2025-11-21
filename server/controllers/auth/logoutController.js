export const logoutUser = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
        domain: ".nextgenrol.com.ar",
        
    });
    return res.json({message: "Logout exitoso"});
};
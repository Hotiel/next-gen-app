export const logoutUser = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        // secure: process.env.NODE_ENV === "production",
        secure: true,
        sameSite: "none",
        
    });
    return res.json({message: "Logout exitoso"});
};
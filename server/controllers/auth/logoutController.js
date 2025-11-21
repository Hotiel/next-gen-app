export const logoutUser = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        domain: ".nextgenrol.com.ar",

    });
    return res.json({message: "Logout exitoso"});
};
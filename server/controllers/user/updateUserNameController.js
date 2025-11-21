import Usser from '../../models/ussers.js'

export const updateUserName = async (req, res) => {
    try {
        const userId = req.user.id;
        const { newName } = req.body;

    if (!newName) {
        return res.status(400).json({ message: "Debe proporcionar un nuevo nombre"});
    }

    const existingUser = await Usser.findOne({ usuario: newName});
    if (existingUser) {
        return res.status(400).json({ message: `El usuario ${existingUser} no está disponible`});
    }

    const updatedUser = await Usser.findByIdAndUpdate(
        userId,
        {usuario: newName},
        {new: true}
    );

    if (!updatedUser){
        return res.status(400).json({ message: "Usuario no encontrado"});
    }

    res.status(200).json({ message: "Nombre de usuario actualizado correctamente", usuario: updatedUser.usuario,});

}catch(err){
    console.error("Error al actualizar nombre de usuario", err);
    res.status(500).json({message: "Error interno del servidor"});
    }
}

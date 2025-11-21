import Post from '../../models/post.js'

export const createPost = async (req, res) => {
    try {
        const { body } = req.body;
        if (!body || body > 300) 
            return res.status(400).json({ success: false, message: "El post debe tener entre 1 y 300 caracteres"});

        const newPost = await Post.create({
            user: req.user.id,
            username: req.user.usuario,
            body,
        });

        res.status(201).json({success: true, newPost});
    }catch (err) {
        console.error("Error creando el post", err);
        res.status(500).json({ success: false, message: "Error creando post"});
    };
}

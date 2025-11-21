import Post from '../../models/post.js'

export const addComment = async (req, res) => {
    try {
        const { postId } = req.params;
        const { body } = req.body;
        if(!body) return res.status(400).json({ message: "Comentario vacío" });

        const post = await Post.findById(postId);
        if(!post) return res.status(404).json({ message: "Post no encontrado" });

        post.comments.push({ user: req.user.id, body });
        await post.save();
        
        res.status(200).json(post);
    }catch (err) {
        res.status(500).json({ message: "Error al agregar comentario"});
    }
}
import Post from "../../models/post.js";

export const getPostById = async (req, res) => {
    try {
        const { postId } = req.params;

        const post = await Post.findById(postId)
        .populate("user", "usuario avatar")
        .populate("comments.user", "usuario avatar");

        if(!post){
            return res.status(404).json({message: "Post no encontrado"});
        }
        res.status(200).json(post);
    }catch (err) {
        res.status(500).json({message: "Error interno del servidor"})
    }
}
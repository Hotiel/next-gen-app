import Post from '../../models/post.js'

export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .populate("user", "usuario avatar")
            .populate("comments.user", "usuario avatar")
            .sort({ createdAt: -1 })
            .limit(20);
        
        res.status(200).json(posts);
    }catch (err) {
        res.status(500).json({message: "Error al obtener posts"});
    }
};
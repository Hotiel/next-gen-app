import Post from '../../models/post.js';

export const toggleUpvote = async (req, res) => {
    try {
        const{ postId } = req.params;
        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ message: "Post no encontrado" });

        const userId = req.user.id;
        const alreadyUpvoted = post.upvotes.includes(userId);

        if (alreadyUpvoted) {
            post.upvotes.pull(userId);
        }else {
            post.upvotes.push(userId);
        }
        
        await post.save();
        return res.status(200).json({ 
            upvotedBefore: alreadyUpvoted,
            upvotes: post.upvotes.length
        });
    }catch (err) {
        res.status(500).json({ message: "Error al procesar upvote" })
    }
}
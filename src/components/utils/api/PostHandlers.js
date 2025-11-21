     // ✅ Crear Post
export const handleCreatePost = async (postContent) => {
    try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/newPost`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
            body: postContent, 
        }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    return data;
    } catch (err) {
    console.error(err);
    }
};

  // 💬 Comentar Post
export const handleComment = async (postId, commentContent) => {
    if (!postId) return;
        try {
            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/api/${postId}/addComment`,
            {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
            body: commentContent, 
            }),
        }
    );

    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    const refresh = await fetch(`${import.meta.env.VITE_API_URL}/api/post/${postId}`, {
        credentials: "include",
    });
    const updatedPost = await refresh.json();
    return updatedPost;
    } catch (err) {
        console.error(err);
        console.error("❌ Error al comentar");
    }
};

// ⬆️ Upvote Post
export const handleUpvote = async (postId) => {
    if (!postId) return setMessage("Falta el ID del post");
        try {
            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/api/${postId}/upvote`,
            {
                method: "POST",
                credentials: "include",
            }
    );

    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    const upVoteState = data.upvotedBefore;
    
    const refresh = await fetch(`${import.meta.env.VITE_API_URL}/api/post/${postId}`, {
        credentials: "include",
    });
    const updatedPost = await refresh.json();
    return {
        post: updatedPost,
        wasUpvoted: upVoteState
    };
        } catch (err) {
        console.error(err);
    }
};

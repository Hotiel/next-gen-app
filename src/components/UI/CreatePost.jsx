import { useState } from "react"
import { handleCreatePost } from "../utils/api/PostHandlers.js"
import { useAuth } from "../utils/AuthContext.jsx";

export function CreatePost ({ refreshPosts }) {

    const [postContent, setPostContent] = useState("");
    const { user } = useAuth()
    const isGuest = user?.role == "guest";

    const onCreatePost = async (e) => {
    e.preventDefault();
        try {
            const response = await handleCreatePost(postContent);
            if (response?.success) {
                    setPostContent(""); // limpia el input después de postear
                    await refreshPosts();
            } else {
                console.error(response?.message || "Error al crear el post");
            }
        } catch (err) {
        console.error("Error inesperado al crear el post:", err);
        }
    };

    return (
        <div className="postcreator-container">
        <form onSubmit={onCreatePost} className="create-post-box">
            <label>
                <input
                type="text"
                placeholder={isGuest ? "Función no disponible Para invitados" : "A quién tenés ganas de putear hoy?"}
                minLength={4}
                maxLength={200}
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
            />
            </label>
            <button type="submit" disabled={isGuest}>Crear Post</button>
        </form>
        </div>
    )
}
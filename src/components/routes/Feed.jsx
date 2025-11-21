import { useEffect, useState } from "react";
import { PostCard } from "../UI/PostCard.jsx"
import { useAuth } from "../utils/AuthContext.jsx";
import { CreatePost } from "../UI/CreatePost.jsx";
import HomeLogin from "../utils/loginmodals/HomeLogin.jsx";

export function Feed () {

    const { user } = useAuth();
    const [posts, setPosts] = useState([]);
    
        const fetchPosts = async () => {
            try {
                const res = await fetch( `${import.meta.env.VITE_API_URL}/api/getAllPosts`, {
                    credentials: "include",
                });
                const data = await res.json();
                setPosts(data);
            }catch (err) {
                console.error("Error al obtenet posts:", err);
            }
        };

        useEffect(() => {
            if (user) fetchPosts();
        }, [user]);

        useEffect(() => {
            document.title = "Feed — Next Gen";
        }, []);

    return (
        <div className="feed-window">
            
            <h2>Next Gen Feed</h2>
            {user ? 
            <div className="feed-container">
                <CreatePost refreshPosts={fetchPosts}/>
                {posts.length > 0 ? 
                (posts.map((post) => <PostCard key={post._id} post={post}/>)) :
                (<p>No hay publicaciones aún</p>
                )}
            </div> : 
            <div className="feed-container">
                <div className="tapar tapar-feed">
                    <p>Inicia sesión para ver el feed</p>
                    <HomeLogin/>
                    </div>
                </div>}
        </div>

    )
}
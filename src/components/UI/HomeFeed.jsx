import { useState, useEffect } from "react";
import { useAuth } from "../utils/AuthContext";
import HomeLogin from "../utils/loginmodals/HomeLogin";
import { PostCard } from "./PostCard.jsx";

const HomeFeed = () => {
    const { user, token } = useAuth();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        if (user) fetchPost();
    }, [user]);

    const fetchPost = async () => {
        try {
            const res = await fetch('http://localhost:3001/api/getAllPosts', {
                credentials: "include",
            });
            const data = await res.json();
            setPosts(data);
        }catch (err) {
            console.error("Error al obtenet posts:", err);
        }
    };

    if (!user) {
        return (
            <div className="tapar border border-secondary-subtle flex-fill">
              <p>Inicia sesión para ver el feed</p>
                <HomeLogin />
            </div>
        );
    }

    return (
        <div className="post-section p-2 rounded-2 m-1 flex-fill">
      {posts.length === 0 ? (
        <p className="text-muted">No hay publicaciones aún...</p>
      ) : (
        posts.map((post) => (
          <PostCard key={post._id} post={post} className="post border-bottom py-2"/>
        ))
      )}
    </div>
  );
};

export default HomeFeed;

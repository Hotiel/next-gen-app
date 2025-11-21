import { useState, useEffect } from "react";
import { handleUpvote, handleComment } from '../utils/api/PostHandlers.js'
import { useAuth } from "../utils/AuthContext.jsx";

export function PostCard ({ post }) {

    const { user } = useAuth();
    const isGuest = user?.role == "guest";
    const [localPost, setLocalPost] = useState(post);
    const [commentContent, setCommentContent] = useState("");
    const [showAll, setShowAll] = useState(false);
    
    const [toast, setToast] = useState("🍺");

    useEffect(() => {
        const userId = user.id;
        if (!userId || !localPost) return;

        const alreadyUpvoted = localPost.upvotes.includes(userId);
        setToast(alreadyUpvoted ? "🍻" : "🍺");
    }, [localPost]);
    

    const visibleComments = showAll ? localPost.comments : localPost.comments.slice(0, 3);

    const onUpvote = async () => {
        const { post: updatedPost, wasUpvoted } = await handleUpvote(localPost._id);
        if (updatedPost) setLocalPost(updatedPost);
        setToast(!wasUpvoted ? "🍻" : "🍺");
    };

    const onComment = async () => {
    const updatedPost = await handleComment(localPost._id, commentContent);
    if (updatedPost) setLocalPost(updatedPost);
    setCommentContent("");
};

    return (
        <div className="post-card">
            <div className="post--user">
                <div className="post--userimagecontainer"><img src={localPost.user.avatar} alt="profile picture" className="post--userimage"/><div className="username--cont"><span className="post--username">{localPost.user.usuario}</span><span className="post--date"> {new Date(localPost.createdAt).toLocaleString()}</span></div></div>
                
            </div>

            <div className="post-body"><p>{localPost.body}</p></div>
            

            <div className="post--data">
                <div className="post--upvote--container"><button className="post-upvote" onClick={onUpvote} disabled={isGuest}>{toast}</button><span>{localPost.upvotes?.length}</span></div>
                <span className="post-comm-length">{localPost.comments?.length || "0"} {localPost.comments?.length == 1 ? "comentario" : "Comentarios"}</span>
            </div>

            
            <div className="post--comment"> {localPost.comments.length > 0 ? (
                visibleComments.map((comment) => (
                    <div key={comment._id} className="coment--card">

                        <div className="comment-usercont">
                            <div className="post--userimagecontainer"><img src={comment.user.avatar} alt="profile picture" className="post--userimage"/><span className="coment--cardUsername">{comment.user.usuario}</span></div>
                            
                        </div>

                        <p className="coment--cardBody">{comment.body}</p>
                        <p className="coment--cardDate">{new Date(comment.createdAt).toLocaleString()}</p>
                    </div>
                ) )) : <span className="coment--cardPlaceHolder"> "No hay comentarios aún" </span>}
                {localPost.comments.length > 3 && (
                <button className="coment--cardShow" onClick={() => setShowAll(!showAll)}>
                    {showAll ? "Ver menos" : "Ver más"}
                </button>
                )}
                <label className="comment--label">
                    <input 
                    placeholder={isGuest ? "Función no disponible Para invitados" : "A quién tenés ganas de putear hoy?"}
                    type="text" 
                    value={commentContent}
                    onChange={(e) => setCommentContent(e.target.value)}
                    />
                </label>
                <button className="comment--send" onClick={onComment} disabled={isGuest}>enviar comentario</button>
            </div>


        </div>
    )
}
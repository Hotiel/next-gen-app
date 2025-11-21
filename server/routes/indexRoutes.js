import express from 'express';
import loginRoutes from './auth/loginRoutes.js'
import meRoutes from './auth/meRoutes.js'
import logoutRoutes from './auth/logoutRoutes.js'
import updatePassword from './user/updatePasswordRoutes.js'
import updateUserName from './user/updateUserNameRoutes.js'
import updateProfilePictureRoutes from './user/updateProfilePictureRoutes.js'
import getUserInfoRoutes from './user/getUserInfoRoutes.js'
import getAllPostRoutes from './post/getAllPostsRoutes.js'
import createPostRoutes from './post/createPostRoutes.js'
import addComentRoutes from './post/addComentRoutes.js'
import upvoteRoutes from './post/upvoteRoutes.js'
import getPostByIdRoutes from './post/getPostByIdRoutes.js'

export default function registerRoutes(app) {
    //Rutas públicas
    app.use('/api/login', loginRoutes)
    app.use('/api/me', meRoutes)
    app.use('/api/logout', logoutRoutes)

    //Rutas privadas
        //Rutas de usuario

    app.use('/api/updateUserName', updateUserName);
    app.use('/api/updatePassword', updatePassword);
    app.use('/api/updateProfilePicture', updateProfilePictureRoutes)
    app.use('/api/getUserInfo', getUserInfoRoutes);

        //Rutas de Post

    app.use('/api/getAllPosts', getAllPostRoutes);
    app.use('/api/', getPostByIdRoutes)
    app.use('/api/newPost', createPostRoutes);
    app.use('/api/', addComentRoutes);
    app.use('/api/', upvoteRoutes);
};
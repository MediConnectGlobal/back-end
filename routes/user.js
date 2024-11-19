import { Router } from "express";
import { getProfile, getAllProfile, logInUser, logOutUser, registerUser, updateProfile } from "../controller/user.js";
import { userAvatarUpload } from "../middleware/upload.js";
import { hasPermission, isAuthenticated } from "../middleware/authenticator.js";

// import { googleAuth } from "../controller/auth.js";

const userRouter = Router();

userRouter.post('/users/register', registerUser);

// userRouter.post('/users/google', googleAuth);

userRouter.post('/users/login', logInUser);

userRouter.get('/users/me/:id', getProfile);

userRouter.get('/users/me', isAuthenticated, getAllProfile);

userRouter.post('/users/logout', isAuthenticated, logOutUser);

userRouter.patch('/users/me', isAuthenticated, userAvatarUpload.single('avatar'), updateProfile);

export default userRouter;
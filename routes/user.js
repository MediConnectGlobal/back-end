import { Router } from "express";
import { getProfile, logInUser, logOutUser, registerUser, updateProfile } from "../controller/user.js";
import { userAvatarUpload } from "../middleware/upload.js";
import { hasPermission, isAuthenticated } from "../middleware/authenticator.js";

const userRouter = Router();

userRouter.post('/users/register', registerUser);

userRouter.post('/users/login', logInUser);

userRouter.get('/users/me', isAuthenticated, hasPermission('get_profile'), getProfile);

userRouter.post('/users/logout', isAuthenticated, logOutUser);

userRouter.patch('/users/me', isAuthenticated, hasPermission('update_profile'), userAvatarUpload.single('avatar'), updateProfile);

export default userRouter;
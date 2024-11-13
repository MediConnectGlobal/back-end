import { Router } from "express";
import { getAdminProfile, getAllAdminProfile, logInAdmin, logOutAdmin, registerAdmin, updateAdminProfile } from "../controller/admin.js";
import { adminAvatarUpload } from "../middleware/upload.js";
import { isAuthenticated } from "../middleware/authenticator.js";

const adminRouter = Router();

adminRouter.post('/admins/register', registerAdmin);

adminRouter.post('/admins/login', logInAdmin);

adminRouter.get('/admins/me', isAuthenticated, getAdminProfile);

adminRouter.get('/admins/me/:id', isAuthenticated, getAllAdminProfile);

adminRouter.post('/admins/logout', isAuthenticated, logOutAdmin);

adminRouter.patch('/admins/me', isAuthenticated, adminAvatarUpload.single('avatar'), updateAdminProfile);

export default adminRouter;
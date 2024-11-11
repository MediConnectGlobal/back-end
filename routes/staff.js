import { Router } from "express";
import { getAllStaffProfile, getStaffProfile, logInStaff, logOutStaff, registerStaff, updateStaffProfile } from "../controller/staff.js";
import { staffAvatarUpload } from "../middleware/upload.js";
import { hasPermission, isAuthenticated } from "../middleware/authenticator.js";

const staffRouter = Router();

staffRouter.post('/staff/register', registerStaff);

staffRouter.post('/staff/login', logInStaff);

staffRouter.get('/staff/me', isAuthenticated, hasPermission('get_all_profile'), getAllStaffProfile)

staffRouter.get('/staff/me/:id', isAuthenticated, hasPermission('get_profile'), getStaffProfile);

staffRouter.post('/staff/logout', isAuthenticated, logOutStaff);

staffRouter.patch('/staff/me', isAuthenticated, hasPermission('update_profile'), staffAvatarUpload.single('avatar'), updateStaffProfile);

export default staffRouter;
import { Router } from "express";
import { getAllStaffProfile, getStaffProfile, logInStaff, logOutStaff, registerStaff, updateStaffProfile } from "../controller/staff.js";
import { staffAvatarUpload } from "../middleware/upload.js";
import {  isAuthenticated } from "../middleware/authenticator.js";

const staffRouter = Router();

staffRouter.post('/staff/register', registerStaff);

staffRouter.post('/staff/login', logInStaff);

staffRouter.get('/staff/me', getAllStaffProfile)

staffRouter.get('/staff/me/:id', getStaffProfile);

staffRouter.post('/staff/logout', isAuthenticated, logOutStaff);

staffRouter.patch('/staff/me', isAuthenticated, staffAvatarUpload.single('avatar'), updateStaffProfile);

export default staffRouter;
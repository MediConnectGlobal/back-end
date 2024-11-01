import { Router } from "express";
import { addStaff, deleteStaff, getAllStaff, getOneStaff, updateStaff } from "../controller/staff.js";
import { isAuthenticated } from "../middleware/authenticator.js";

const  staffRouter = Router();

staffRouter.post('/staff', isAuthenticated, addStaff);

staffRouter.get('/staff',isAuthenticated, getAllStaff);

staffRouter.get('/staff/:id',isAuthenticated, getOneStaff);

staffRouter.patch('/staff/:id', isAuthenticated,  updateStaff);

staffRouter.delete('/staff/:id', isAuthenticated, deleteStaff);



export default staffRouter;
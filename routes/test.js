import { Router } from "express";
import { addTest, deleteTest, getAllTest, getOneTest, updateTest } from "../controller/test.js";
import { isAuthenticated } from "../middleware/authenticator.js";

const testRouter = Router();

testRouter.post('/tests', isAuthenticated, addTest);

testRouter.get('/tests', isAuthenticated, getAllTest);

testRouter.get('/tests/:id', isAuthenticated, getOneTest);

testRouter.patch('/tests/:id', isAuthenticated, updateTest);

testRouter.delete('/tests/:id', isAuthenticated, deleteTest)

export default testRouter;
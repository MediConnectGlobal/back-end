import { Router } from "express";
import { addTest, deleteTest, getAllTest, getOneTest, updateTest } from "../controller/test";

const testRouter = Router();

testRouter.post('/tests', addTest);

testRouter.get('/tests', getAllTest);

testRouter.get('/tests/:id', getOneTest);

testRouter.patch('/tests/:id', updateTest);

testRouter.delete('/tests/:id', deleteTest)

export default testRouter;
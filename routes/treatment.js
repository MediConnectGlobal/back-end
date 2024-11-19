import { Router } from "express";
import { addTreatment, deleteTreatment, getAllTreatments, getOneTreatment, updateTreatment } from "../controller/treatment.js";
import { isAuthenticated, hasPermission } from "../middleware/authenticator.js";

const treatmentRouter = Router();

treatmentRouter.post('/treatments', addTreatment);

treatmentRouter.get('/treatments', isAuthenticated, getOneTreatment);

treatmentRouter.get('/treatments/:id', isAuthenticated, getAllTreatments);

treatmentRouter.patch('/treatments/:id',isAuthenticated, updateTreatment);

treatmentRouter.delete('/treatments/:id', isAuthenticated, deleteTreatment);

export default treatmentRouter;
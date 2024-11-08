import { Router } from "express";
import { addTreatment, deleteTreatment, getAllTreatments, getOneTreatment, updateTreatment } from "../controller/treatment.js";
import { isAuthenticated, hasPermission } from "../middleware/authenticator.js";

const treatmentRouter = Router();

treatmentRouter.post('/treatments', addTreatment);

treatmentRouter.get('/treatments', isAuthenticated, hasPermission('get_treatment'), getOneTreatment);

treatmentRouter.get('/treatments/:id', isAuthenticated, hasPermission('get_all_traetment'), getAllTreatments);

treatmentRouter.patch('/treatments/:id', updateTreatment);

treatmentRouter.delete('/treatments/:id', deleteTreatment);

export default treatmentRouter;
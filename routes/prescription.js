import { Router } from "express";
import { addPrescription, deletePrescription, getAllPrescriptions, getOnePrescription, updatePrescription } from "../controller/prescription.js";
import { isAuthenticated } from "../middleware/authenticator.js";

const prescriptionRouter = Router();

prescriptionRouter.post('/prescriptions', isAuthenticated, addPrescription);

prescriptionRouter.get('/prescriptions', isAuthenticated, getAllPrescriptions);

prescriptionRouter.get('/prescriptions/:id',isAuthenticated, getOnePrescription);

prescriptionRouter.patch('/prescriptions/:id', isAuthenticated,updatePrescription);

prescriptionRouter.delete('/prescriptions/:id', isAuthenticated, deletePrescription);

export default prescriptionRouter;
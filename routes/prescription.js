import { Router } from "express";
import { addPrescription, deletePrescription, getAllPrescriptions, getOnePrescription, updatePrescription } from "../controller/prescription";

const prescriptionRouter = Router();

prescriptionRouter.post('/prescriptions', addPrescription);

prescriptionRouter.get('/prescriptions', getAllPrescriptions);

prescriptionRouter.get('/prescriptions/:id', getOnePrescription);

prescriptionRouter.patch('/prescriptions/:id', updatePrescription);

prescriptionRouter.delete('/prescriptions/:id', deletePrescription);

export default prescriptionRouter;
import { PrescriptionModel } from "../model/prescription.js";
import { prescriptionValidationSchema, updatePrescriptionValidationSchema } from "../validator/prescription.js";

export const addPrescription = async (req, res, next) => {
    try {
      // validator
      const {error, value} = prescriptionValidationSchema.validate(req.body);
      if (error) {
          return res.status(422).json(error);
      }

     await PrescriptionModel.create(req.body);
      res.status(201).json ('Prescription added Successfully!');
    } catch (error) {
     next(error); 
    }
}

export const getAllPrescriptions = async(req, res, next) => {
    try {

    const prescription = await PrescriptionModel.find(req.body);
      res.json (prescription);
    } catch (error) {
     next (error);
     
    }
}

export const getOnePrescription = async(req, res, next) => {
 try {
     const prescription = await PrescriptionModel.findById(req.params.id);
     res.status(200).json (prescription);
 } catch (error) {
     next(error)
 }
}


export const updatePrescription = async (req, res, next) => {
 try {

      // validator
      const {error, value} = updatePrescriptionValidationSchema.validate(req.body);
      if (error) {
          return res.status(422).json(error);
      }
     await PrescriptionModel.findByIdAndUpdate(req.params.id)
     res.status(200).json('Prescription updated Successfully!');
 } catch (error) {
     next(error);

 }
}

export const deletePrescription = async (req, res, next) => {

 try {
     await PrescriptionModel.findByIdAndDelete(req.params.id)
     res.status(200).json('Prescription deleted Successfully!');

 } catch (error) {
     next(error)

 }

}

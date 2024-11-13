import { TreatmentModel } from "../model/treatment.js";
import { treatmentValidationSchema, updateTreatmentValidationSchema } from "../validator/treatment.js";

export const addTreatment = async (req, res, next) => {
       try {
         // validator
         const {error, value} = treatmentValidationSchema.validate(req.body);
         if (error) {
             return res.status(422).json(error);
         }

        await TreatmentModel.create(req.body);
         res.status(201).json ('Treatment added Successfully!');
       } catch (error) {
        next(error); 
       }
}

export const getAllTreatments = async(req, res, next) => {
       try {

       const treatment = await TreatmentModel.find(req.body);
         res.status(200).json (treatment);
       } catch (error) {
        next (error);
        
       }
}

export const getOneTreatment = async(req, res, next) => {
    try {
        const treatment = await TreatmentModel.findById(req.params.id);
        res.status(200).json (treatment);
    } catch (error) {
        next(error)
    }
}


export const updateTreatment = async (req, res, next) => {
    try {

         // validator
         const {error, value} = updateTreatmentValidationSchema.validate(req.body);
         if (error) {
             return res.status(422).json(error);
         }
        await TreatmentModel.findByIdAndUpdate(req.params.id)
        res.status(200).json('Treatment updated Successfully!');
    } catch (error) {
        next(error);

    }
}

export const deleteTreatment = async (req, res, next) => {

    try {
        await TreatmentModel.findByIdAndDelete(req.params.id)
        res.status(200).json('Treatment deleted Successfully!');

    } catch (error) {
        next(error)

    }

}

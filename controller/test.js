import { TestModel } from "../model/test.js";
import { testValidationSchema, updateTestValidationSchema } from "../validator/test.js";
export const addTest = async (req, res, next) => {
    try {
      // validator
      const {error, value} = testValidationSchema.validate(req.body);
      if (error) {
          return res.status(422).json(error);
      }

     await TestModel.create(req.body);
      res.status(201).json ('Test added Successfully!');
    } catch (error) {
     next(error); 
    }
}

export const getAllTest = async(req, res, next) => {
    try {

    const test = await TestModel.find(req.body);
      res.status(200).json (test);
    } catch (error) {
     next (error);
     
    }
}

export const getOneTest = async(req, res, next) => {
 try {
     const test = await TestModel.findById(req.params.id);
     res.status(200).json (test);
 } catch (error) {
     next(error)
 }
}


export const updateTest = async (req, res, next) => {
 try {

      // validator
      const {error, value} = updateTestValidationSchema.validate(req.body);
      if (error) {
          return res.status(422).json(error);
      }
     await TestModel.findByIdAndUpdate(req.params.id)
     res.status(200).json('Test updated Successfully!');
 } catch (error) {
     next(error);

 }
}

export const deleteTest = async (req, res, next) => {

 try {
     await TestModel.findByIdAndDelete(req.params.id)
     res.status(200).json('Test deleted Successfully!');

 } catch (error) {
     next(error)

 }

}

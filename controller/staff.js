import { StaffModel } from "../model/staff.js";
import { staffValidationSchema, updateStaffValidationSchema } from "../validator/staff.js";

export const addStaff = async (req, res, next) => {

    try {
        const { error, value } = staffValidationSchema.validate(req.body);
        if (error) {
            return res.status(422).json(error);
        }
        await StaffModel.create(value);
        res.status(201).json('Staff added successfully');
    } catch (error) {
        next(error);
    }
}

export const getAllStaff = async (req, res, next) => {
    try {
        const staff = await StaffModel.find();
        res.status(200).json(staff);
    } catch (error) {

        next(error);

    }
}

export const getOneStaff = async (req, res, next) => {
    try {
        const staff = await StaffModel.findById(req.params.id);
        res.status(200).json(staff);
    } catch (error) {
        next(error)
    }
}


export const updateStaff = async (req, res, next) => {
    try {
        const { error, value } = updateStaffValidationSchema.validate(req.body);
        if (error) {
            return res.status(422).json(error);
        }
        await StaffModel.findByIdAndUpdate(req.params.id)
        res.status(200).json('Staff updated Successfully!');
    } catch (error) {
        next(error)
    }
}



export const deleteStaff = async (req, res, next) => {

    try {
        await StaffModel.findByIdAndDelete(req.params.id)
        res.status(200).json('Staff deleted Successfully!');

    } catch (error) {
        next(error)

    }

}
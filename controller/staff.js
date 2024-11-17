import { StaffModel } from "../model/staff.js";
import { logInStaffValidator, registerStaffValidator, updateStaffValidator } from "../validator/staff.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {mailTransporter} from "../utils/mail.js";

export const registerStaff= async (req, res, next) => {
  try {
    // Validate user input
    const {error, value} = registerStaffValidator.validate(req.body);
    if (error) {
        return res.status(422).json(error);
    }
    // Check if user does not exist
    const staff = await StaffModel.findOne({email: value.email});
    if (staff) {
        return res.status(409).json('Staff already exist!');
    }

    // Hash their password
    const hashedPassword = bcrypt.hashSync(value.password, 10);
        // Save user into dataabase
        await StaffModel.create({
            ...value,
            password: hashedPassword
        });
        // Send user confirmational email
        await mailTransporter.sendMail({
            to: value.email,
            subject: 'Staff Registration',
            text: 'Account registered successfully'
        });

        // Respond to request 
      res.status(201).json('Staff registered')
  } catch (error) {
    next(error);
    
  }
}

export const logInStaff= async (req, res, next) => {
    try {
        // Validate user input
        const { error, value } = logInStaffValidator.validate(req.body)
        if (error) {
            return res.status(422).json(error);
        }
        // find one user with identifier
        const staff = await StaffModel.findOne({email: value.email });
        if (!staff) {
            return res.status(404).json('Staff does not exist!')
        }
        // Compare their passwords
        const correctPassword = bcrypt.compareSync(value.password, staff.password);
        if (!correctPassword) {
            return res.status(401).json('Invalid credentials!')
        }
        // Sign a token for user
        const token = jwt.sign(
            {id: staff.id},
            process.env.JWT_PRIVATE_KEY,
            {expiresIn: '24h'}
        );
        // Respond to request

        res.status(200).json({
            message: 'Staff checked-in',
            accessToken: token
    });
    } catch (error) {
        next (error);
    }
}

export const getStaffProfile= async(req, res, next) => {
   try {
    console.log(req.params.id);
    // find authenticated user from database
    const staff = await StaffModel
    .findById( req.params.id)
    .select({ password: false });
     res.status(200).json(staff);
   } catch (error) {
    next (error); 
   }
}

export const getAllStaffProfile= async(req, res, next) => {
    try {
     const staff = await StaffModel
     .find()
     .select({ password: false });
      res.status(200).json(staff);
    } catch (error) {
     next (error); 
    }
 }

export const logOutStaff= (req, res, next) => {
    res.status(200).json('Staff checked-out')
}

export const updateStaffProfile= (req, res, next) => {
    try {
        // Validate user input
        const {error, value} = updateStaffValidator.validate(req.body);
        res.status(200).json('Staff profile updated')
    } catch (error) {
        next (error);
        
    }
}
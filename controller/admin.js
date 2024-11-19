import { AdminModel } from "../model/admin.js";
import { logInAdminValidator, registerAdminValidator, updateAdminValidator } from "../validator/admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {mailTransporter} from "../utils/mail.js";
import { registerEmailTemplate } from "../utils/emailTemplate.js";

export const registerAdmin= async (req, res, next) => {
  try {
    // Validate user input
    const {error, value} = registerAdminValidator.validate(req.body);
    if (error) {
        return res.status(422).json(error);
    }
    // Check if user does not exist
    const admin = await AdminModel.findOne({email: value.email});
    if (admin) {
        return res.status(409).json('Admin already exist!');
    }

    // Hash their password
    const hashedPassword = bcrypt.hashSync(value.password, 10);
        // Save user into dataabase
        await AdminModel.create({
            ...value,
            password: hashedPassword
        });
        // Send user confirmational email
       
        const emailContent = `
        <p>Hi ${value.firstName}<p>
        <h1>Welcome to MediConnect!</h1>
                    <p>Account registered successfully. We are excited to have you on board.</p>
                    <p>LogIn to interract with us.</p>
                    <p>Best regards</p>`
        // Send professional a confirmation email
        await mailTransporter.sendMail({
          from: `MediConnect <mediconnectweb@gmail.com>`,
          to: value.email,
          subject: "Admin Registration",
          html: registerEmailTemplate(emailContent)
        });

        // Respond to request 
      res.status(201).json('Admin registered')
  } catch (error) {
    next(error);
    
  }
}

export const logInAdmin= async (req, res, next) => {
    try {
        // Validate user input
        const { error, value } = logInAdminValidator.validate(req.body)
        if (error) {
            return res.status(422).json(error);
        }
        // find one user with identifier
        const admin = await AdminModel.findOne({email: value.email });
        if (!admin) {
            return res.status(404).json('Admin does not exist!')
        }
        // Compare their passwords
        const correctPassword = bcrypt.compareSync(value.password, admin.password);
        if (!correctPassword) {
            return res.status(401).json('Invalid credentials!')
        }
        // Sign a token for user
        const token = jwt.sign(
            {id: admin.id},
            process.env.JWT_PRIVATE_KEY,
            {expiresIn: '24h'}
        );
        // Respond to request

        res.status(200).json({
            message: 'Admin checked-in',
            accessToken: token
    });
    } catch (error) {
        next (error);
    }
}

export const getAdminProfile= async(req, res, next) => {
   try {
    console.log(req.auth);
    // find authenticated user from database
    const admin = await AdminModel
    .findById(req.auth.id)
    .select({ password: false });
     res.status(200).json(admin);
   } catch (error) {
    next (error); 
   }
}

export const getAllAdminProfile= async(req, res, next) => {
    try {
     const admin = await AdminModel
     .find()
     .select({ password: false });
      res.status(200).json(admin);
    } catch (error) {
     next (error); 
    }
 }

export const logOutAdmin= (req, res, next) => {
    res.status(200).json('Admin checked-out')
}

export const updateAdminProfile= (req, res, next) => {
    try {
        // Validate user input
        const {error, value} = updateAdminValidator.validate(req.body);
        res.status(200).json('Admin profile updated')
    } catch (error) {
        next (error);
        
    }
}
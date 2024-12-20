import { UserModel } from "../model/user.js";
import { logInUserValidator, registerUserValidator, updateUserValidator } from "../validator/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {mailTransporter} from "../utils/mail.js";
import {registerEmailTemplate} from "../utils/emailTemplate.js";

export const registerUser= async (req, res, next) => {
  try {
    // Validate user input
    const {error, value} = registerUserValidator.validate(req.body);
    if (error) {
        return res.status(422).json(error);
    }
    // Check if user does not exist
    const user = await UserModel.findOne({email: value.email});
    if (user) {
        return res.status(409).json('user already exist!');
    }

    // Hash their password
    const hashedPassword = bcrypt.hashSync(value.password, 10);
        // Save user into dataabase
        await UserModel.create({
            ...value,
            password: hashedPassword
        });
        // // Send user confirmational email
        // await mailTransporter.sendMail({
        //     to: value.email,
        //     subject: 'User Registration',
        //     text: 'Account registered successfully'
        // });

        const emailContent = `
        <p>Hi ${value.firstName}<p>
    <h1>Welcome to MediConnect!</h1>
                <p>Account registered successfully. We are excited to have you on board.Your health is our priority.</p>
                <p>LogIn to interract with us.</p>
                <p>Best regards</p>`
    // Send professional a confirmation email
    await mailTransporter.sendMail({
      from: `MediConnect <mediconnectweb@gmail.com>`,
      to: value.email,
      subject: "User Registration",
      html: registerEmailTemplate(emailContent)
    });

        // Respond to request 
      res.status(201).json({message: 'User registered', user});
  } catch (error) {
    next(error);
    
  }
}

export const logInUser= async (req, res, next) => {
    try {
        // Validate user input
        const { error, value } = logInUserValidator.validate(req.body)
        if (error) {
            return res.status(422).json(error);
        }
        // find one user with identifier
        const user = await UserModel.findOne({email: value.email });
        if (!user) {
            return res.status(404).json('User does not exist!')
        }
        // Compare their passwords
        const correctPassword = bcrypt.compareSync(value.password, user.password);
        if (!correctPassword) {
            return res.status(401).json('Invalid credentials!')
        }
        // Sign a token for user
        const token = jwt.sign(
            {id: user.id},
            process.env.JWT_PRIVATE_KEY,
            {expiresIn: '24h'}
        );
        // Respond to request

        res.status(200).json({
            message: 'User checked-in',
            accessToken: token,
            user

    });
    } catch (error) {
        next (error);
    }
}

export const getProfile= async(req, res, next) => {
   try {
    console.log(req.params.id);
    // find authenticated user from database
    const user = await UserModel
    .findById(req.params.id)
    .select({ password: false });
     res.status(200).json(user);
   } catch (error) {
    next (error); 
   }
}

export const getAllProfile= async(req, res, next) => {
    try {
     const user = await UserModel
     .find()
     .select({ password: false });
      res.status(200).json(user);
    } catch (error) {
     next (error); 
    }
 }

export const logOutUser= (req, res, next) => {
    res.status(200).json('User checked-out')
}

export const updateProfile= async (req, res, next) => {
    try {
        const user = await UserModel.findById(req.auth.id);
        // Validate user input
        const {error, value} = updateUserValidator.validate(req.body);
        res.status(200).json({message:'User profile updated', user})
    } catch (error) {
        next (error);
        
    }
}
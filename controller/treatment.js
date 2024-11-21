import { TreatmentModel } from "../model/treatment.js";
import { UserModel } from "../model/user.js";
import { StaffModel } from "../model/staff.js";
import { treatmentValidationSchema, updateTreatmentValidationSchema } from "../validator/treatment.js";
import { mailTransporter } from "../utils/mail.js";
import { registerEmailTemplate } from "../utils/emailTemplate.js";

export const addTreatment = async (req, res, next) => {
       try {
         // validator
         const {error, value} = treatmentValidationSchema.validate(req.body);
         if (error) {
             return res.status(422).json(error);
         }

          // Extract IDs
        const staffId = req.auth.id; // Ensure req.auth is not undefined
        const userId = req.body.userId;


        // Fetch User
        const User = await UserModel.findById(userId);
        if (!User) {
            return res.status(404).json({ message: "User not found." });
        }

        // Fetch Staff
        const Staff = await StaffModel.findById(staffId);
        if (!Staff) {
            return res.status(404).json({ message: "Staff not found." });
        }

        const treatment = await TreatmentModel.create({
            ...value,
            staffId: req.auth.id,
            UserId: req.body.userId
        });

         // Generate Email Content
         const emailContent = `
         <p>Hi ${User.firstName},</p>
         <h1>Welcome to MediConnect!</h1>
         <p>View Treatment:</p>
         <ul>
             <li><strong>Treatment ID:</strong> ${treatment._id}</li>
             <li><strong>Doctor:</strong> Dr. ${Staff.firstName} ${Staff.lastName}</li>
             <li><strong>Diagnosis:</strong>${treatment.comment}</li>
              <li><strong>Next Visit:</strong>${treatment.nextVisit}</li>
         </ul>
         <p>Get well soon.</p>
         <p>Best regards,</p>
         <p>MediConnect Team</p>
     `;

     // Send Email
     await mailTransporter.sendMail({
         from: `MediConnect <mediconnectweb@gmail.com>`,
         to: User.email,
         subject: "Diagnosis Report",
         html: registerEmailTemplate(emailContent),
     });

         res.status(201).json ('Treatment added Successfully!');
       } catch (error) {
        next(error); 
       }
}

export const getAllTreatments = async(req, res, next) => {
       try {

       const treatment = await TreatmentModel.find(req.body)
       .populate({  path: 'staffId userId',
        select: 'firstName lastName contact email specialty location facility department' });
         res.status(200).json (treatment);
       } catch (error) {
        next (error);
        
       }
}

export const getOneTreatment = async(req, res, next) => {
    try {
        const treatment = await TreatmentModel.findOne({
            _id: req.params.id,
            staffId: req.auth.id  // Ensure the booking belongs to the authenticated user
        })
        // const treatment = await TreatmentModel.findById(req.params.id)
        .populate({  path: 'staffId userId',
            select: 'firstName lastName contact email specialty location facility department' });
        // Check if the booking was found
        if (!treatment) {
            return res.status(404).json({ message: 'Treatment not found' });
        }
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

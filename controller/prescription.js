import { PrescriptionModel } from "../model/prescription.js";
import { UserModel } from "../model/user.js";
import { StaffModel } from "../model/staff.js";
import { prescriptionValidationSchema, updatePrescriptionValidationSchema } from "../validator/prescription.js";
import { mailTransporter } from "../utils/mail.js";
import { registerEmailTemplate } from "../utils/emailTemplate.js";

export const addPrescription = async (req, res, next) => {
    try {
        // Validate the request body
        const { error, value } = prescriptionValidationSchema.validate(req.body);
        if (error) {
            return res.status(422).json({ error: error.details[0].message });
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

        // Create Prescription
        const prescription = await PrescriptionModel.create({
            ...value,
            staffId: req.auth.id,
            UserId: req.body.userId
        });

        // Generate Email Content
        const emailContent = `
            <p>Hi ${User.firstName},</p>
            <h1>Welcome to MediConnect!</h1>
            <p>View your prescription below:</p>
            <ul>
                <li><strong>Prescription ID:</strong> ${prescription._id}</li>
                <li><strong>Doctor:</strong> Dr. ${Staff.firstName} ${Staff.lastName}</li>
                <li><strong>Medication:</strong>
                    <ul>
                        ${prescription.medication
                            .map(
                                (med) => `
                            <li>
                                <strong>Drug:</strong> ${med.drug}, 
                                <strong>Dose:</strong> ${med.dose}, 
                                <strong>Days:</strong> ${med.days}
                            </li>`
                            )
                            .join("")}
                    </ul>
                </li>
            </ul>
            <p>Get well soon.</p>
            <p>Best regards,</p>
            <p>MediConnect Team</p>
        `;

        // Send Email
        await mailTransporter.sendMail({
            from: `MediConnect <mediconnectweb@gmail.com>`,
            to: User.email,
            subject: "Your Prescription",
            html: registerEmailTemplate(emailContent),
        });

        // Send Response
        res.status(201).json({
            message: "Prescription added successfully!",
            prescription,
        });
    } catch (error) {
        next(error);
    }
};

export const getAllPrescriptions = async(req, res, next) => {
    try {

    const prescription = await PrescriptionModel.find(req.body)
    .populate({  path: 'staffId userId',
        select: 'firstName lastName contact email specialty location facility department' });
      res.status(200).json (prescription);
    } catch (error) {
     next (error);
     
    }
}

export const getOnePrescription = async(req, res, next) => {
 try {
    const prescription = await PrescriptionModel.findOne({
        _id: req.params.id,
        staffId: req.auth.id  // Ensure the booking belongs to the authenticated user
    })
    // const prescription = await PrescriptionModel.findById(req.params.id)
    .populate({  path: 'staffId userId',
        select: 'firstName lastName contact email specialty location facility department' });
    // Check if the booking was found
    if (!prescription) {
        return res.status(404).json({ message: 'Prescription not found' });
    }
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

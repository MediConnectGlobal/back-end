import { TestModel } from "../model/test.js";
import { UserModel } from "../model/user.js";
import { StaffModel } from "../model/staff.js";
import { testValidationSchema, updateTestValidationSchema } from "../validator/test.js";
import { mailTransporter } from "../utils/mail.js";
import { registerEmailTemplate } from "../utils/emailTemplate.js";

export const addTest = async (req, res, next) => {
    try {
      // validator
      const {error, value} = testValidationSchema.validate(req.body);
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

     const test = await TestModel.create({
        ...value,
        staffId: req.auth.id,
        UserId: req.body.userId
    });

    // Generate Email Content
    const emailContent = `
        <p>Hi ${User.firstName},</p>
        <h1>Welcome to MediConnect!</h1>
        <p>View test required:</p>
        <ul>
            <li><strong>Test ID:</strong> ${test._id}</li>
            <li><strong>Doctor:</strong> Dr. ${Staff.firstName} ${Staff.lastName}</li>
            <li><strong>Test:</strong>
                <ul>
                    ${test.test
                        .map(
                            (test) => `
                        <li>
                            <strong>Drug:</strong> ${test.testType}, 
                            <strong>Dose:</strong> ${test.issued}, 
                            <strong>Days:</strong> ${test.comment}
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
        subject: "Test Request",
        html: registerEmailTemplate(emailContent),
    });

      res.status(201).json ({message: 'Test added Successfully!', test});
    } catch (error) {
     next(error); 
    }
}

export const getAllTest = async(req, res, next) => {
    try {

    const test = await TestModel.find(req.body)
    .populate({  path: 'staffId userId',
        select: 'firstName lastName contact email specialty location facility department' });
      res.status(200).json (test);
    } catch (error) {
     next (error);
     
    }
}

export const getOneTest = async(req, res, next) => {
 try {
    //  const test = await TestModel.findById(req.params.id);
    const test = await TestModel.findOne({
        _id: req.params.id,
        staffId: req.auth.id  // Ensure the booking belongs to the authenticated user
    })
    .populate({  path: 'staffId userId',
        select: 'firstName lastName contact email specialty location facility department' });
    // Check if the booking was found
    if (!test) {
        return res.status(404).json({ message: 'Test not found' });
    }
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
    const test = await TestModel.findByIdAndUpdate(req.params.id)
     res.status(200).json({message:'Test updated Successfully!', test});
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

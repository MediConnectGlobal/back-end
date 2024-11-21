import {Schema, model} from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const staffSchema = new Schema ({
firstName: {type: String, required: true},
lastName: { type: String, required: true},
email: {type: String, required: true, unique: true},
contact: {type: String, required: false},
password: { type: String, required: true},
avatar: { type: String},
role: {type: String, default: "Staff"},
specialty: {type: String, required: true, enum: ['Doctor', 'Nurse', 'Dentist','Dietician','Specialist', 'Pharmacist', 'Dermatologist', 'Cardiologist', 'Anesthesiologist','Gynecologist', 'Midwife', 'Speech-Language Therapist', 'Thereapist', 'Radiologist', 'Surgeon', 'Optometrist (eyes)', 'Psychologist', 'Psychiatrist', 'Audiologist (ear)', 'Others']},
lincenceNumber: {type: String, required: true},
facility: {type: String, required: true},
department: {type: String, required: true},

}, {

    timestamps: true
});

staffSchema.plugin(toJSON)

export const StaffModel = model('Staff', staffSchema)
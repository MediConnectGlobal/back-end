import {Schema, model} from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const staffSchema = new Schema ({
firstName: {type: String, required: true},
lastName: { type: String, required: true},
email: {type: String, required: true, unique: true},
contact: {type: String, required: false},
password: { type: String, required: true},
avatar: { type: String},
role: {type: String, enum: ['doctor','nurse','specialist']},
specialty: {type: String, required: true, enum: ['Physician Assistant', 'Dentist', 'Gy']},
lincenceNumber: {type: String, required: true},
facility: {type: String, required: true},
department: {type: String, required: true}
}, {
    timestamps: true
});

staffSchema.plugin(toJSON)

export const StaffModel = model('Staff', staffSchema)
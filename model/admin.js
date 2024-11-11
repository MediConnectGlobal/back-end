import { Schema, model } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const adminSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: { type: String, required: true},
    email: {type: String, required: true, unique: true},
    contact: {type: String, required: false},
    password: { type: String, required: true},
    facility: { type: String, required: true},
    avatar: { type: String},
    role: {type: String, enum: ['Admin', 'Super Admin']}
}, {
    timestamps: true
});

adminSchema.plugin(toJSON)

export const AdminModel = model('Admin', adminSchema)
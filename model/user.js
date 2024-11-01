import { Schema, Types, model } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const userSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: { type: String, required: true},
    email: {type: String, required: true, unique: true},
    contact: {type: String, required: false},
    password: { type: String, required: true},
    location: { type: String, required: true},
    avatar: { type: String},
    role: {type: String, enum: ['patient','staff','admin']},
    staffType: {type: Types.ObjectId, ref: 'Staff'}
}, {
    timestamps: true
});

userSchema.plugin(toJSON)

export const UserModel = model('User', userSchema)
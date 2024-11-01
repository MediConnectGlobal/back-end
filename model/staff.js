import {Schema, model} from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const staffSchema = new Schema ({
position: {type: String, required: true},
lincenceNumber: {type: String, required: true},
facility: {type: String, required: true},
department: {type: String, required: true}
}, {
    timestamps: true
});

staffSchema.plugin(toJSON)

export const StaffModel = model('Staff', staffSchema)
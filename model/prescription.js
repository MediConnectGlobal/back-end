import {Schema, model} from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const prescriptionSchema = new Schema({
    medication: {type: String, required: true},
    dose: {type: String, required: true},
    days:  {type: String, required: true}
},{
    timestamps: true
})
prescriptionSchema.plugin(toJSON)

export const PrescriptionModel = model('Prescription', prescriptionSchema)
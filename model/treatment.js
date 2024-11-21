import { Schema, model, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";


export const treatmentSchema = new Schema ({
    userId: {type: Types.ObjectId, ref: 'User'},
    staffId: {type: Types.ObjectId, ref: 'Staff'},
    vitals: [{
        temperature: {type: String, required: true}, 
        pulse: {type: String, required: true}, 
        BP: {type: String, required: true}
    }],
        medicalNote: [{ 
            PC: {type: String, required: true}, 
            PMH: {type: String, required: true}, 
            ODG: {type: String, required: true}, 
            IMP: {type: String, required: true}, 
            Plan: {type: String, required: true}
        }],
    comment: {type: String, required: true},
    nextVisit: {type: String, required: true}

}, {
    timestamps: true
})

treatmentSchema.plugin(toJSON)

export const TreatmentModel = model('Treatment', treatmentSchema)




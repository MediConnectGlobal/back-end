import { toJSON } from "@reis/mongoose-to-json";
import { Types, Schema, model } from "mongoose";

const testSchema = new Schema({
    userId: {type: Types.ObjectId, ref: 'User'},
    staffId: {type: Types.ObjectId, ref: 'Staff'},
    testType: {type: String, required: true},
    issued: {type: String, required: true},
    comment: {type: String, required: true},
    file: {type: String},
    image: { type: String}
}, {
    timestamps: true
})

testSchema.plugin(toJSON)

export const TestModel = model('Test', testSchema)
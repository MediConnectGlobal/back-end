import { toJSON } from "@reis/mongoose-to-json";
import { Schema, model } from "mongoose";

const testSchema = new Schema({
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
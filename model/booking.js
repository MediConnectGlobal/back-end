import {Types, Schema, model} from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const bookingSchema = new Schema ({
title: {type: String, required: true},
userId: {type: Types.ObjectId, ref: 'User'},
staffId: {type: Types.ObjectId, ref: 'Staff'},
location: {type: String, enum: ['Inperson','Online', 'Hybrid']},
facility: {type: String, required: true},
startDateTime: {type: String, required: true},
endDateTime: {type: String, required: true}

}, {
    timestamps: true
});

bookingSchema.plugin(toJSON)

export const BookingModel = model('Booking', bookingSchema)
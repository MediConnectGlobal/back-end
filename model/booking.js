import {Schema, model} from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const bookingSchema = new Schema ({
title: {type: String, required: true},
userId: {type: String, ref: 'User'},
location: {type: String, enum: ['Inperson','Online']},
facility: {type: String, required: true},
startDateTime: {type: String, required: true},
endDateTime: {type: String, required: true}

}, {
    timestamps: true
});

bookingSchema.plugin(toJSON)

export const BookingModel = model('Booking', bookingSchema)
import {Schema, model} from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const bookingSchema = new Schema ({
title: {type: String, required: true},
personalDetails: {type: String, ref: 'User'},
date: {type: String, required: true},
time: {type: String, required: true},

}, {
    timestamps: true
});

bookingSchema.plugin(toJSON)

export const BookingModel = model('Booking', bookingSchema)
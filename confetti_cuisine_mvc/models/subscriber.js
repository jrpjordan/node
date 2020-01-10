'use strict';

const mongoose = require("mongoose"),
 {Schema} = require("mongoose");


var subscriberSchema = mongoose.Schema({
     name: {
         type: String,
         required: true
     },
     email: {
         type: String,
         required: true,
         lowercase: true,
         unique: true
     },
     zipCode: {
         type: Number,
         min: [1000, "Zip code too short"],
         max: 9999
     },
     courses: [{type: Schema.Types.ObjectId, ref: "Course"}]
 }, {
     timestamps: true
});

subscriberSchema.methods.getInfo = function() {
    return `Name: ${this.name} Email: ${this.email} Zip Code: ${this.zipCode}`;
}

module.exports = mongoose.model("Subscriber", subscriberSchema);

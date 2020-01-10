'use-strict';

const mongoose = require("mongoose"),
    {Schema} = require("mongoose"),
    Subscriber = require("./subscriber.js");
    
const userSchema = new Schema({
    name: {
        first: {
            type: String,
            trim: true
        },
        last: {
            type: String,
            trim: true
        }
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
    password: {
        type: String,
        required: true
    },
    courses: [{type: Schema.Types.ObjectId, ref: "Course"}],
    subscribedAccount: {type: Schema.Typess.ObjectId, ref: "Subscriber"}
}, {
    timestamps: true  //Tells mongo to include createdAt and updatedAt values automatically
});

//Creates the virtual property fullName which won't be stored into ddbb
userSchema.virtual("fullName").get(function() {
    return `${this.name.first} ${this.name.last}`;
});

//Function executed just before the save command
userSchema.pre("save", function(next) {
    let user = this;
    if (user.subscribedAccount === undefined) {
        Subscriber.findOne({
            email: user.email
        })
        .then(subscriber => {
            user.subscribedAccount = subscriber;
            next();
        })
        .catch(error => {
            console.log(`Error in connecting subscriber: ${error.message}`);
        });
    } else {
        next();
    }
});
module.exports = mongoose.model("User", userSchema);
//FOR THE USER TO CONTAIN ALL OF USER'S DATA

import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    minLength: [3, "Username must contain at least 3 characters."],
    maxLength: [40, "Username cannot exceed 40 characters."],
  },
  password: {
    type: String,
    selected: false,
    minLength: [8, "Password must contain at least 8 characters."],
  },
  email: String,
  address: String,
  phone: {
    type: String,
    minLength: [10, "Phone Number must contain exact 10 digits."],
    maxLength: [10, "Phone Number must contain exact 10 digits."],
  },
  profileImage: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  paymentMethods: {
    bankTransfer: {
      bankAccountNumber: String,
      bankAccountName: String,
      bankName: String,
    },
  },
  auctionsWon: {
    type: Number,
    default: 0,
  },
  moneySpent: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
// middleware to hash the user password before saving it to the database
userSchema.pre("save", async function (next) {
  // check if the password is modified
  if (!this.isModified("password")) {
    // If the password is not modified, skip hashing and move to the next middleware or save
    next();
  }
  // Hash the password before saving
  this.password = await bcrypt.hash(this.password, 10); //10 is the salt rounds to provide more security
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
//generates a JWT that contains the user’s ID (_id). The token is signed using a secret key, and it will expire after the time defined in JWT_EXPIRE.

userSchema.methods.generateJsonWebToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

export const User = mongoose.model("User", userSchema);

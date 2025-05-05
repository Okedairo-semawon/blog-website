import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
const { sign } = jwt;
const { hash, compare } = bcrypt;
const userSchema = new mongoose.Schema({
 email: {
    type: String,
    required: true,
    unique: true
 },
 name: {
    type: String,
    required: true,
 },
 password: {
    type: String,
    required: true
 },
 avatar: {
   type: String,
   default: "",
 },
 lastlogin: {
    type: Date,
    default: Date.now
 },
 isverified: {
    type: Boolean,
    default: false
 },
 admin: {
   type: Boolean,
   default: false
 },
 verificationToken: {
   type: String,
 },
 isDeleted: {
      type: Boolean,
      default: false
 }

//  resetPasswordToken: String,
//  resetPasswordExpiresAt: Date,

//  verificationTokenExpiresAt: Date,

},{timestamps:true})

// Pre-save mongoose middleware that handles encrypting the user's password and removing the confirmPassword field
userSchema.pre('save', async function (next) {
   if (this.isModified('password')) {
      this.password = await hash(this.password, 10);
      return next()
   }
   return next();
}) 

userSchema.methods.generateJwt = async function () {
   return await sign({id: this._id}, process.env.JWT_SECRET, {
      expiresIn: '30d'})
};
userSchema.methods.comparepassword = async function (enteredPassword) {
   return await compare(enteredPassword, this.password)
};

export const User = mongoose.model('User', userSchema);

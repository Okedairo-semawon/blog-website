import mongoose from 'mongoose'
const userSchema = new mongoose.Schema({
 email: {
    type: String,
    required: true,
    unique: true
 },
 name: {
    type: String,
    required: true,
    unique: true
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
 }  
//  resetPasswordToken: String,
//  resetPasswordExpiresAt: Date,

//  verificationTokenExpiresAt: Date,

},{timestamps:true})

export const User = mongoose.model('User', userSchema);

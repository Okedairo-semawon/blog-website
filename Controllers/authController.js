// import express from 'express';
import{User} from '../models/userModel.js' 
import  {generateTokenAndSetCookie} from '../utils/generateAndSetCookie.js';
import bycryptjs from 'bcryptjs'

export const signup = async (req, res) => {
    const {email, name, password} = req.body;
    try {
        if (!email || !password || !name) {
            throw new Error ('All fields are required')
        }
        const userAlreadyExist = await User.findOne({email})
        // console.log('userAlreadyExist', userAlreadyExist)
        if (userAlreadyExist) {
            return res.status(400).json({success:false, message: 'User already exist' })
        }
        
        const hashedPassword = await bycryptjs.hash(password, 10)
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
        const user = new User({
            email,
            password: hashedPassword,
            name,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000 //24 hours
        })
        await user.save();

        // JWT
        generateTokenAndSetCookie (res, user._id);
        res.status(201).json({
            success: true,
            message: 'user created successsfully',
            user:{
                ...user._doc,
                password: undefined
            },
            
        })
    } catch (error){
        res.status(400).json({success:false, message: error.message})
    }
}

export const login = async (req, res) => {
    res.send('login route')
};
export const logout = async (req, res) => {
    res.send('logout route')
}
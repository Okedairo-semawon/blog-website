import express from 'express';
import{User} from '../models/userModel.js' 
// import {sendVerificationEmail} from '../utils/emailService.js'
// import  {generateTokenAndSetCookie} from '../utils/generateAndSetCookie.js';
// import bycryptjs from 'bcryptjs'
// import crypto from "crypto"
// export const signup = async (req, res) => {
//     const {email, name, password} = req.body;
//     try {
//         if (!email || !password || !name) {
//             throw new Error ('All fields are required')
//         }
//         const userAlreadyExist = await User.findOne({email})
//         // console.log('userAlreadyExist', userAlreadyExist)
//         if (userAlreadyExist) {
//             return res.status(400).json({success:false, message: 'User already exist' });
//         }
        
//         const hashedPassword = await bycryptjs.hash(password, 10)
//         const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
//         const user = new User({
//             email, 
//             password: hashedPassword,
//             name,
//             verificationToken,
//             verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000 //24 hours
//         })
//         await user.save();

//         // JWT
//         generateTokenAndSetCookie (res, user._id);
//         await sendVerificationEmail(user.email, verificationToken)

//         res.status(201).json({
//             success: true,
//             message: 'user created successsfully',
//             user:{
//                 ...user._doc,
//                 password: undefined
//             },
            
//         })
//     } catch (error){
//         res.status(400).json({success:false, message: error.message})
//     }
// }

export const signup = async (req, res, next) => {
    const {email, name, password} = req.body;
    try {
        if (!name || !email || !password) {
            // return res.status(400).json({message: "All fields are required"})
            throw new Error ("All fields are required")
        };
        // check whether the user exist 
        let user = await User.findOne({email})
        if (user) {
            // return res.status(400).json({message: "This user has already registered"})
            throw new Error ("This user has already registered")
        }

        //  Creating a new user
        user = await User.create({
            name,
            email,
            password
        })
        return res.status(201).json({
            _id: user._id,
            avatar: user.avatar,
            name: user.name,
            email: user.email,
            verified: user.verified,
            admin: user.admin,
            token: await user.generateJwt()
        })
    } catch(error) {
        // console.log("signup error:", error)
        // return res.status(500).json({message: 'something went wrong', error: error.message})
        next(error);
    }
}



export const login = async (req, res, next) => {
    try{
        const {email, password} = req.body;
        let user = await User.findOne({email})
        if(!user) {
            throw new Error ("Email not found")
        }
        if (await user.comparepassword(password)) {
            return res.status(200).json({
                _id: user._id,
                avatar: user.avatar,
                name: user.name,
                email: user.email,
                verified: user.verified,
                admin: user.admin,
                token: await user.generateJwt()
            })
        } else {
            throw new Error ("Invalid Email or Password")
        }

    } catch (error) {
        next(error);
    }
};
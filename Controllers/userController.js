import express from "express";
import { User } from "../models/userModel.js";
import uploadPic from "../middleware/uploadPic.js";
import fileRemover from "../utils/fileRemover.js";

export const userProfile = async (req, res, next) => {
    try {
        let user = await User.findById(req.user._id)
        if (user) {
            return res.status(201).json({
                _id: user._id,
                avatar: user.avatar,
                name: user.name,
                email: user.email,
                verified: user.verified,
                admin: user.admin,
            })
        } else {
            let error = new Error ("User not found")
            error.statusCode = 404;
            next(error)

        }
    } catch (error) {
        next(error);
    }
};

export const updateProfile = async (req, res, next ) => {
    try {
        let user = await User.findById(req.body._id);
       
        if(!user) {
            throw new Error ("User not found");
        }
        user.name = req.body.name
        user.email = req.body.email
        if (req.body.password && req.body.password.length < 6) {
            throw new Error ("Password must be greater than 6 characters");
        } else if (req.body.password) {
            user.password = req.body.password;
        } 
        let updatedUserProfile = await user.save();
        res.json({
            _id: updatedUserProfile._id,
            avatar: updatedUserProfile.avatar,
            name: updatedUserProfile.name,
            email: updatedUserProfile.email,
            verified: updatedUserProfile.verified,
            admin: updatedUserProfile.admin,
            token: await updatedUserProfile.generateJwt()
        })  
        console.log("User ID from token:",  req.user._id); 
    } catch (error) {
        next(error);
    }
    
};

export const updateProfilePic = (req, res, next) => {
    try {
        // implemented the uploadPic middleware to handle image upload  
        const upload  = uploadPic.single('profilePicture')
        upload (req, res, async function (err) {
            if (err ) {
                const error = new Error ("An error occurred while uploading the image");
                next(error);
            } else {
                //  if  everything went well
                if (req.file) {
                    const updatedUser = await User.findByIdAndUpdate(req.user._id,{
                        avatar: req.file.filename
                    }, {new: true});
                    res.json({
                        _id: updatedUser._id,
                        avatar: updatedUser.avatar,
                        name: updatedUser.name,
                        email: updatedUser.email,
                        verified: updatedUser.verified,
                        admin: updatedUser.admin,
                        token: await updatedUser.generateJwt()
                    })
                } else {
                    let filename;
                    let updatedUser = await User.findById(req.user._id);
                    filename = updatedUser.avatar;
                    updatedUser.avatar = " "; 
                    await updatedUser.save();
                    fileRemover(filename);
                    res.json({
                        _id: updatedUser._id,
                        avatar: updatedUser.avatar,
                        name: updatedUser.name,
                        email: updatedUser.email,
                        verified: updatedUser.verified,
                        admin: updatedUser.admin,
                        token: await updatedUser.generateJwt()
                    })
                }
            }
        })
    } catch (error) {
        next(error);
    }
    
}
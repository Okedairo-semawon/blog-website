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
    
};

export const getAllUsers = async (req, res, next) => {
    try {
      const filter = req.query.searchKeyword;
      let where = {};
      if (filter) {
        where.email = { $regex: filter, $options: "i" };
      }
      let query = User.find(where);
      const page = parseInt(req.query.page) || 1;
      const pageSize = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * pageSize;
      const total = await User.find(where).countDocuments();
      const pages = Math.ceil(total / pageSize);
  
      res.header({
        "x-filter": filter,
        "x-totalcount": JSON.stringify(total),
        "x-currentpage": JSON.stringify(page),
        "x-pagesize": JSON.stringify(pageSize),
        "x-totalpagecount": JSON.stringify(pages),
      });
  
      if (page > pages) {
        return res.json([]);
      }
  
      const result = await query
        .skip(skip)
        .limit(pageSize)
        .sort({ updatedAt: "desc" });
  
      return res.json(result);
    } catch (error) {
      next(error);
    }
  };

export const deleteUserProfile = async (req, res, next) => {
    // enable soft delete
    try {
        let user = await User.findById(req.params.user._id, {isDeleted: true}, {new: true});
        if (!user) {
            let error = new Error ('User not found')
        } 
        
    const postsToDelete = await Post.find({ user: user._id });
    const postIdsToDelete = postsToDelete.map((post) => post._id);

    await Comment.deleteMany({
      post: { $in: postIdsToDelete },
    });

    await Post.deleteMany({
      _id: { $in: postIdsToDelete },
    });

    postsToDelete.forEach((post) => {
      fileRemover(post.photo);
    });

    await user.remove();
    fileRemover(user.avatar);

    return res.status(204).json({ message: "User is deleted successfully" });
    } catch (error) {
        next (error);
    }
};
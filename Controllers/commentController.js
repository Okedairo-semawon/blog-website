import Comment from "../models/comments.js";
import Post from "../models/postModel.js";

const createComment = async (req, res, next) => {
    try {
        const {desc, slug, parent, replyOnUser} = req.body;
        const post = await Post.findOne({slug: slug})
        if (!post) {
            const error = new Error('Post does not exist')
            return next(error)
        }
        const comment = new Comment({
            user: req.user._id,
            desc,
            post: post._id,
            parent,
            replyOnUser,
        })
        const savedComment = await comment.save()
        return res.json(savedComment);
    } catch (error) {
        next(error)
    }
}

export {createComment}
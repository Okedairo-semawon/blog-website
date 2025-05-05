import mongoose from 'mongoose';

const PostSchema = new  mongoose.Schema({
    body: {
        type: Object,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    caption: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },  
    tags: {
        type: [String]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    photo: {
        type: String,
        required: false
    },
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "PostCategories" }],

}, {timeStamp: true, toJSON: {virtuals: true}, });

PostSchema.virtual('comments',{
    ref: 'Comment',
    localField: '_id',
    foreignField: 'post'
});

const Post = mongoose.model('Post', PostSchema);

export default Post;
 

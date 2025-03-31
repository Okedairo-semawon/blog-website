import mongoose from 'mongoose';

const postSchema = new mongooseSchema({
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
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    photo: {
        type: String,
        required: false
    },
    categories: [{ type: Schema.Types.ObjectId, ref: "PostCategories" }],

}, {timeStamp: true, toJSON: {virtuals: true}, });

postSchema.virtual({
    ref: 'comments',
    localField: '_id',
    foreignField: 'post'
});

const post = mongoose.model('post', postSchema);

export default post;
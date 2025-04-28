import mongoose from 'mongoose';

const PostCategoriesSchema = new mongoose.Schema ({
    title: {
        type: String,
        required: true
    }
}, {timestamp: true}); 

const PostCategories = mongoose.model('PostCategories', PostCategoriesSchema);

export default PostCategories;
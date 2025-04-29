import { v4 as uuidv4 } from 'uuid';
import Post from '../models/postModel.js';
import fileRemover from '../utils/fileRemover.js';
import Comment from '../models/comments.js';
import uploadPic from '../middleware/uploadPic.js';

// Create a new post
const createPost = async (req, res, next) => {
   try {
    const {title, body, caption} = req.body;
    if (!title || !caption ) {
        throw new Error ('Title and caption required')
    }
    const post = new Post({
        title,
        caption,
        slug: uuidv4(),
        user: req.user._id,
        body: body || {
            type: 'doc',
            content: [],
        },
        photo: req.file?.filename || '',
    })
    const createdPost = await post.save();
    return res.status(201).json(createdPost)


   } catch (error) {
    next(error)
   }
};

// Update post
const updatePost = async (req, res, next) => {
    try {
        const post = await Post.findOne({slug: req.params.slug});
        if (!post) {
          const error = new Error ('Post was not found')
          return next(error)
        }

        const upload = uploadPic.single('postPicture');

        const handleUpdatePostData = async (data) => {
            if (!data) {
                const error = new Error("No document data provided.");
                throw error;  
              }
            const {title, caption, slug, body, tags, categories} = JSON.parse(data);
            post.title = title || post.title;
            post.caption = caption || post.caption;
            post.slug = slug || post.slug;
            post.body = body || post.body;
            post.tags = tags || post.tags;
            post.categories = categories || post.categories;

            const updatedPost = await post.save();
            return res.json(updatedPost);

        };

        upload(req, res, async function (err){
            if (err) {
                const error = new Error( 'An unknown error occured when uploading' + err.message) 
                return next(error)
            }
            try {
                if (req.file) {
                    // if a new file is uploaded 
                    if (post.photo) {
                        fileRemover(post.photo)
                    }
                    post.photo = req.file.filename
                }
                await handleUpdatePostData(req.body.document);
            } catch (error) {
                next(error)
            }
        });
       
    } catch (error) {
        next(error)
    }
}

// delete post 
const deletePost = async(req, res, next) => {
    try {
        const post = await Post.findOneAndDelete({slug: req.params.slug})
        if (!post) {
            const error = new Error('Post does not exist')
            return next(error)
        }

        fileRemover(post.photo);
        await Comment.deleteMany({post: post._id})
        return res.json({message: 'post deleted successfully'})

    } catch (error) {
        next(error)
    }
}

// Get post 
const getPost = async (req, res, next) => {
    try {
        const post = await Post.findOne({ slug: req.params.slug }).populate([
            {
              path: 'user',
              select: ['name', 'avatar']
            },
            {
              path: 'comments',
              match: {
                check: true,
                parent: null
              },
              populate: [
                {
                  path: 'user',
                  select: ['name', 'avatar']
                },
                {
                  path: 'replies',
                  match: {
                    check: true
                  }
                }
              ]
            }
          ]);
          

        if (!post) {
            const error = new Error('Post does not exist')
            return next(error)
        }

 
    } catch (error) {
        next(error)
    }
}

export {createPost, updatePost, deletePost, getPost};




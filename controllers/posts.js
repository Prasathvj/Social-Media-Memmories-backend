import mongoose from "mongoose";
import PostMessage from "../models/postsMessage.js"

//get all posts
export const getPosts = async (req, res) => { 
    try {
        const postMessages = await PostMessage.find();
                
        res.status(200).json({newpost:postMessages});
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

//get specific post
export const getPost = async (req, res) => { 
    const { id } = req.params;

    try {
        const post = await PostMessage.findById(id);
        
        res.status(200).json({singlepost:post});
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
//create new post
export const createPost = async(req, res)=>{
    try {
        let images = [];

        if (req.files.length > 0){
            req.files.forEach(file =>{
                 let url = `http://127.0.0.1:9090/uploads/posts/${file.originalname}`
                 images.push({image:url})
            })
        }
       req.body.images = images
       const post = await PostMessage.create(req.body);
       return res.status(201).json({
           success: true,
           post
       })
        res.status(200).json({
            message:'post created successfully',
            post
        })
    } catch (error) {
        return res.status(400).json({message:'Internal Server error'})
    }
}

//update post
export const updatePost = async(req,res)=>{
    const {id} = req.params 
    const { title, message, creator, selectedFile, tags } = req.body;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
        const updatedPost = {
            title,
            message,
            creator,
            selectedFile,
            tags,
            _id:id
        }
        await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });
        res.json(updatedPost);
    } catch (error) {
        return res.status(400).json({message:'Internal Server error'})
    }
}
  
//delete post 

export const deletePost = async()=>{
    const {id} = req.params
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).send(`No post with id: ${id}`)
        };
        const deletePost = await PostMessage.findByIdAndDelete({
            _id:id,
        })
        res.json({ message: "Post deleted successfully." });
    } catch (error) {
        return res.status(400).json({message:'Internal Server error'})
    }
}

//like post
export const likePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    const post = await PostMessage.findById(id);

    const updatedPost = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });
    
    res.json(updatedPost);
}

//post comment

export const writeComment = async(req, res)=>{
    const  { postId,  comment } = req.body;

    const review = {
        comment
    };

    try {
        const post = await PostMessage.findById(postId);
    
        if (!post) {
          // Post not found with the given postId
          return res.status(404).json({ success: false, error: 'Post not found' });
        }
    
        // Creating the review
        post.reviews.push(review);
        post.numOfReviews = post.reviews.length;
    
        await post.save({ validateBeforeSave: false });
    
        res.status(200).json({
          success: true,
          post,
        });
      } catch (error) {
        console.error('Error writing comment:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
      }

}
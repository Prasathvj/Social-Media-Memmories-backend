
const mongoose = require('mongoose')

const postShema = mongoose.Schema({
    title:String,
    about:String,
    tags:[String],
    images: [
        {
            image: {
                type: String,
                required: true
            }
        }
    ],
    likeCount:{
        type:Number,
        default:0
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    createdAt:{
        type:Date,
        default: new Date()
    }
});

const PostMessage = mongoose.model("PostMessage", postShema);

module.exports = PostMessage;
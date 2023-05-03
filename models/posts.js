const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const postSchema = new Schema({
    postedBy: String,
    video: String,
    caption: String,
    likes: Number,
    time: Date,
    comments: [{
        user: String,
        message: String,
        time: Date,
    }]
})

const Posts = model('Posts', postSchema);

function addNewPost(userID, post) {
    let myPost = {
        postedBy: userID,
        video: post.videoSelect + "#loop;hide-title;",
        caption: post.message,
        likes: 0,
        time: Date.now(),
    }
    //create new collection data in mongo
    Posts.create(myPost)
        .catch(err => {
            console.log("Error: " + err)
        })
}


//return posts
async function getPosts(gtDate, ltDdate) {
    let data = []
    await Posts.find({
        time: {
            $gte: gtDate,
            $lt: ltDdate,
        }
    })
        .sort({ 'time': -1 })
        .exec()
        .then(mongoData => {
            data = mongoData;
        })
        .catch(err => {
            console.log('Error:' + err)
        });
    return data;
}

async function getPostsByUser(user) {
    let data = []
    await Posts.find({ username: user })
        .sort({ 'time': -1 })
        .then(mongoData => {
            data = mongoData;
        })
        .catch(err => {
            console.log('Error:' + err)
        });
    return data;
}

//for one post
async function getPost(postid) {
    let data = null;
    await Posts.findById(postid)
        .exec()
        .then(mongoData => {
            data = mongoData;
        })
        .catch(err => {
            console.log('Error:' + err)
        });
    return data;
}

async function likePost(likedPostID) {
    await Posts.findByIdAndUpdate(likedPostID, { $inc: { likes: 1 } })
}


async function commentOnPost(commentedPostID, commentByUser, comment) {
    // await Post.findByIdAndUpdate(likedPostID,{$inc: { likes: 1 }})
    let found
    let newComment = {
        user: commentByUser,
        message: comment,
        time: Date.now(),
    }
    await Posts.findByIdAndUpdate(commentedPostID, { $push: { comments: newComment } }).exec()
        .then(foundData => found = foundData)
    // console.log(found)
}

module.exports = { addNewPost, getPosts, getPost, likePost, commentOnPost, getPostsByUser };
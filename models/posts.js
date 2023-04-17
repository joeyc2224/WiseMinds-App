const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const postSchema = new Schema({
    postedBy: String,
    video: String,
    caption: String,
    likes: Number,
    time: Date,
    comments: [{
        commentBy: String,
        comment: String,
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
        comments: [{
            commentBy: "Bill",
            comment: "Nice vid mate, really good",
        }]
    }
    //create new collection data in mongo
    Posts.create(myPost)
        .catch(err => {
            console.log("Error: " + err)
        })
}


var startDate = new Date(); // this is the starting date that looks like ISODate("2014-10-03T04:00:00.188Z")

startDate.setSeconds(0);
startDate.setHours(0);
startDate.setMinutes(0);

var dateMidnight = new Date(startDate);
dateMidnight.setHours(23);
dateMidnight.setMinutes(59);
dateMidnight.setSeconds(59);


//return posts
async function getPosts(date) {
    let data = []
    await Posts.find({
        time: {
            $gte: '2023-04-14 00:00:00',
            $lt: '2023-04-17 00:00:00'
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
        likes: 0
    }
    await Posts.findByIdAndUpdate(commentedPostID, { $push: { comments: newComment } }).exec()
        .then(foundData => found = foundData)
    // console.log(found)
}

module.exports = { addNewPost, getPosts, getPost, likePost, commentOnPost };
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const postSchema = new Schema({
    postedBy: String,
    video: String,
    caption: String,
    likes: Number,
    time: Date,
    day: Number,
    comments: [{
        commentBy: String,
        comment: String,
        time: Date,
    }]
})

const Posts = model('Posts', postSchema);

function addNewPost(post) {
    let myPost = {
        postedBy: "Username",
        video: post.videoSelect + "#autoplay;loop;hide-title;",
        caption: post.message,
        likes: 5,
        time: Date.now(),
        day: 2,
        comments: [{
            commentBy: "Jimmy",
            comment: "Nice vid mate, really good",
        }]
    }
    //create new collection data in mongo
    Posts.create(myPost)
        .catch(err => {
            console.log("Error: " + err)
        })
}

let day = 2

function chooseDay(num) {
    day = num
}


//return posts
async function getPosts(n = 20) {
    let data = []
    await Posts.find({})
        .sort({ 'time': -1 })
        .limit(n)
        .exec()
        .then(mongoData => {
            data = mongoData;
        })
        .catch(err => {
            console.log('Error:' + err)
        });
    return data;
}

module.exports = { addNewPost, getPosts, chooseDay }
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const postSchema = new Schema({
    postedBy: String,
    message: String,
    likes: Number,
    time: Date,
    comments: [{
        commentBy: String,
        comment: String,
        time: Date,
    }]
})

const Posts = model('Posts', postSchema);

function addNewPost(post) {
    let myPost = {
        mood: post.mood,
        message: post.message,
        likes: 0,
        time: Date.now()
    }
    //create new collection data in mongo
    Posts.create(myPost)
        .catch(err => {
            console.log("Error: " + err)
        })
}

//return posts
async function getPosts(n=10) {
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

module.exports = { addNewPost, getPosts }
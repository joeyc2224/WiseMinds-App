const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const questionSchema = new Schema({
    question: String,
    time: Date,
})

const Questions = model('Questions', questionSchema);

function addNewQuestion(question) {
    let dailyQuestion = {
        question: question.text,
        time: Date.now(),

    }
    //create new collection data in mongo
    Questions.create(dailyQuestion)
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

module.exports = { addNewQuestion, };
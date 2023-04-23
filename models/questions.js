const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const questionSchema = new Schema({
    text: String,
    time: Date,
})

const Questions = model('Questions', questionSchema);

function addNewQuestion(question) {
    let dailyQuestion = {
        text: question.text,
        time: Date.now(),

    }
    //create new collection data in mongo
    Questions.create(dailyQuestion)
        .catch(err => {
            console.log("Error: " + err)
        })
}


//for one post
async function getQuestion(gtDate, ltDdate) {
    let data = [];
    await Questions.findOne({
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

module.exports = { addNewQuestion, getQuestion };
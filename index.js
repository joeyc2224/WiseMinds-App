//express server setup - do node.js in term to run
const express = require('express')
const app = express()
app.listen(3000, () => console.log('listening on port 3000'))

//server html pages from public folder
app.use(express.static('public'))

app.use(express.json())

app.use(express.urlencoded({ extended: false }));

const path = require('path');

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://WiseAdmin:WiseAdmin@wisemindsdb.cdbgzjh.mongodb.net/?retryWrites=true&w=majority')

//data models import
const postData = require('./models/posts.js')

app.post('/newpost', (request, response) => {
    console.log(request.body)
    postData.addNewPost(request.body)
    response.redirect('/index.html')
})

app.get('/getposts', async (request, response) => {
    response.json({
        posts: await postData.getPosts()
    })
})
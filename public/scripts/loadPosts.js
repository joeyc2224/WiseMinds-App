
let questions = ["What was it like in the 50s?", "Do you remember when..?"]

let currentQuestion = questions.length - 1

document.getElementById("question").innerHTML = questions[currentQuestion]

function changeQuestion(num) {
    if (num == 1) {
        console.log(currentQuestion)
    } else if (currentQuestion > 0) {
        currentQuestion--
        console.log(currentQuestion)
    }
    document.getElementById("question").innerHTML = questions[currentQuestion]
}


let dateSearch = "2023-04-15T11:56:36.389+00:00"

let postsContainer = document.getElementById("post-container")
let recentPostData = []

let postSearch = {
    method: 'POST',
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        date: dateSearch
    })
}

fetch("/getposts", postSearch)
    .then(response => response.json())
    .then(fetchedData => {
        recentPostData = fetchedData.posts
        updateRecentPosts()
    })

function updateRecentPosts() {
    postsContainer.innerHTML = ''
    recentPostData.forEach(function (post) {
        //console.log(post)

        let postDiv = document.createElement('div')
        postDiv.className = "video-content"

        //user + caption
        let info = document.createElement('div')
        info.className = "video-info"

        let user = document.createElement('h4')
        user.innerHTML = post.postedBy
        info.appendChild(user)

        let caption = document.createElement('p')
        caption.innerHTML = post.caption
        info.appendChild(caption)

        postDiv.appendChild(info)

        //video
        let videoDiv = document.createElement('div')
        videoDiv.className = "video-wrapper"

        let video = document.createElement("IFRAME");
        video.setAttribute("src", post.video)
        video.setAttribute("controls", "controls");
        videoDiv.appendChild(video)

        //buttons
        let buttonDiv = document.createElement('div')
        buttonDiv.className = "action-buttons"

        //like button
        let likeBtn = document.createElement('button')
        likeBtn.innerHTML = post.likes
        likeBtn.addEventListener('click', processLike)
        likeBtn.setAttribute('button-post-id', post._id.toString())
        buttonDiv.appendChild(likeBtn)

        videoDiv.appendChild(buttonDiv)

        postDiv.appendChild(videoDiv)

        //comments section
        let commentsDiv = document.createElement('div')
        commentsDiv.className = "comments"

        let commentsTitle = document.createElement('h2')
        commentsTitle.innerHTML = "Comments"
        commentsDiv.appendChild(commentsTitle)

        for (const comment of post.comments) {
            let user = document.createElement('p')
            user.innerHTML = "<strong>" + comment.commentBy
            commentsDiv.appendChild(user)

            let message = document.createElement('p')
            message.innerHTML = comment.comment
            commentsDiv.appendChild(message)
        }

        postDiv.appendChild(commentsDiv)

        postsContainer.appendChild(postDiv)
    })
}

function processLike(event) {
    let likedPostId = event.target.getAttribute("button-post-id");
    //let likeCount = document.getElementById("likeCount")
    console.log('you liked ' + likedPostId)
    let options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            likedPostID: likedPostId
        })
    }
    fetch('/like', options)
        .then(response => response.json())
        .then(fetchedData => {
            likeNum = fetchedData.post.likes
            document.querySelector('[button-post-id=' + CSS.escape(likedPostId) + ']').innerHTML = likeNum
        })
}

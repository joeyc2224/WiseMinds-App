let questions = ["1", "2", "3"]

let currentQuestion = questions.length - 1

document.getElementById("question").innerHTML = questions[currentQuestion]

function changeQuestion(num) {
    if (num == 1) {
        currentQuestion++
        console.log(currentQuestion)
    } else if (currentQuestion > 0) {
        currentQuestion--
        console.log(currentQuestion)
    }
    document.getElementById("question").innerHTML = questions[currentQuestion]
}


let postsContainer = document.getElementById("post-container")
let recentPostData = []

fetch("/getposts")
    .then(response => response.json())
    .then(fetchedData => {
        recentPostData = fetchedData.posts
        updateRecentPosts()
    })

function updateRecentPosts() {
    postsContainer.innerHTML = ''
    recentPostData.forEach(function (post) {
        console.log(post)

        let postDiv = document.createElement('div')
        postDiv.className = "video-content"

        //user + caption
        let info = document.createElement('div')
        info.className = "video-info"

        let user = document.createElement('h3')
        user.innerHTML = "By: " + post.postedBy
        info.appendChild(user)

        let caption = document.createElement('p')
        caption.innerHTML = post.caption
        info.appendChild(caption)

        postDiv.appendChild(info)

        //video
        let videoDiv = document.createElement('div')
        videoDiv.className = "video-wrapper"

        let video = document.createElement("VIDEO");
        video.setAttribute("src", post.video)
        videoDiv.appendChild(video)

        //buttons
        let buttonDiv = document.createElement('div')
        buttonDiv.className = "action-buttons"

        let likeBtn = document.createElement('button')
        likeBtn.innerHTML = "Likes: " + post.likes
        buttonDiv.appendChild(likeBtn)

        let commentBtn = document.createElement('button')
        commentBtn.innerHTML = post.comments
        buttonDiv.appendChild(commentBtn)

        videoDiv.appendChild(buttonDiv)

        postDiv.appendChild(videoDiv)

        postsContainer.appendChild(postDiv)
    })
}

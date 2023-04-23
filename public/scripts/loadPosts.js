
//work out dates to fetch posts form last 24 hours
convertDays = function (d) {
    //Convert days into MilliSeconds
    return d * 86400000;
}

let day = 0
let gtDate = new Date(Date.now() - convertDays(day + 1))
let ltDate = new Date(Date.now() - convertDays(day))

function getDates() {
    gtDate = new Date(Date.now() - convertDays(day + 1))
    ltDate = new Date(Date.now() - convertDays(day))
}


document.getElementById("question").innerHTML = ltDate

let dailyQuestion = ""

window.onload = getDailyQuestion()

function getDailyQuestion() {
    getDates()
    let postSearch = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            startDate: gtDate,
            endDate: ltDate
        })
    }
    fetch("/getquestion", postSearch)
        .then(response => response.json())
        .then(fetchedData => {
            dailyQuestion = fetchedData.question.text
            //console.log(dailyQuestion.question)
            document.getElementById("question").innerHTML = dailyQuestion
        })
}

function changeQuestion(num) {
    if (num == 1) {
        day--
        getDates()
        getDailyQuestion()
        getPosts()
    }
    else if (num == 0) {
        day++
        getDates()
        getDailyQuestion()
        getPosts()
    }
    document.getElementById("question").innerHTML = ltDate
}

//get recent posts
let recentPostData = []

window.onload = getPosts()

function getPosts() {
    getDates()
    let postSearch = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            startDate: gtDate,
            endDate: ltDate
        })
    }
    fetch("/getposts", postSearch)
        .then(response => response.json())
        .then(fetchedData => {
            recentPostData = fetchedData.posts
            updateRecentPosts()
        })
}

let postsContainer = document.getElementById("post-container")

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

        //button div
        let buttonDiv = document.createElement('div')
        buttonDiv.className = "action-buttons"

        //like button
        let likeBtn = document.createElement('button')
        likeBtn.innerHTML = post.likes
        likeBtn.addEventListener('click', processLike)
        likeBtn.setAttribute('button-post-id', post._id.toString())
        buttonDiv.appendChild(likeBtn)

        let commentBtn = document.createElement('button')
        commentBtn.innerHTML = "comment"
        commentBtn.addEventListener('click', processView)
        commentBtn.setAttribute('view-post-id', post._id.toString())
        buttonDiv.appendChild(commentBtn)

        videoDiv.appendChild(buttonDiv)

        postDiv.appendChild(videoDiv)

/*         //comments section
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

        postDiv.appendChild(commentsDiv) */

        postsContainer.appendChild(postDiv)
    })
}

function processLike(event) {
    let likedPostId = event.target.getAttribute("button-post-id");
    //console.log('you liked ' + likedPostId)
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

function processView(event) {
    let viewPostId = event.target.getAttribute("view-post-id");
    console.log(window.location.origin + '/viewpost.html?post=' + viewPostId)
    window.location = window.location.origin + '/viewpost.html?post=' + viewPostId
}
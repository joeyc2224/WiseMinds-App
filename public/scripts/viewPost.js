//get js pointers to the html elements
let videoDiv = document.querySelector('#video')
let postInfo = document.querySelector('#info')
let postComments = document.querySelector('#post-comments')

//get the postid from the url query string
const queryString = window.location.search
const urlParams = new URLSearchParams(queryString);
let selectedPost = urlParams.get("post")

let form = document.querySelector("#comment-form")
//add a hidden form field with the postid in it
let hiddenField = document.createElement("input");
hiddenField.setAttribute("type", "hidden");
hiddenField.setAttribute("name", "postid");
hiddenField.setAttribute("value", selectedPost);
console.log(selectedPost)
form.appendChild(hiddenField);


// Send comment form data as a post request with fetch
let options = {
    method: 'POST',
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({ post: selectedPost })
}
fetch('/getpost', options)
    .then(response => response.json())
    .then(serverResponse => loadPost(serverResponse))


//render the retrieved post data in html
function loadPost(postData) {

    let video = document.createElement("IFRAME");
    video.setAttribute("src", postData.post.video)
    video.setAttribute("controls", "controls");
    videoDiv.appendChild(video)


    let user = document.createElement('h2')
    user.innerHTML = postData.post.postedBy
    info.appendChild(user)

    let caption = document.createElement('h3')
    caption.innerHTML = postData.post.caption
    info.appendChild(caption)

    postMessage.innerText = postData.post.caption
    let comments = postData.post.comments
    if (comments.length > 0) {
        //add a list of comments
        comments.forEach(function (comment) {

            let commentDiv = document.createElement('div')
            commentDiv.className = "comment-div"


            let commentUser = document.createElement('div')
            commentUser.className = "comment-user"

            let commentText = document.createElement('div')
            commentText.className = "comment-text"
            
            let commentInfo = document.createElement('div')
            commentInfo.className = "comment-info"


            let userImg = document.createElement('IMG')
            userImg.setAttribute("src", "./images/user.png");
            commentUser.appendChild(userImg)

            let username = document.createElement('p')
            username.textContent = comment.user
            username.style.fontWeight = "bold"
            commentUser.appendChild(username)

            commentDiv.appendChild(commentUser)

            let text = document.createElement('p')
            text.textContent = comment.message
            commentText.appendChild(text)
            commentDiv.appendChild(commentText)

            
/*             let time = document.createElement('p')
            time.textContent = comment.time
            commentInfo.appendChild(time)
            commentDiv.appendChild(commentInfo) */

            
            postComments.appendChild(commentDiv)
        })
    }
}

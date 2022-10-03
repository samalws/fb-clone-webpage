import "./App.css"
import Comment from "./Comment"

function App() {
  const posterInfo = { name: "poster goes here" }
  const bodyInfo = { text: "body goes here" }
  const likeInfo = { num: 10, liked: false }
  const commentInfo0 = {
    id: 0,
    poster: posterInfo,
    body: bodyInfo,
    like: likeInfo,
    replies: [],
  }
  const commentInfo1 = {
    id: 1,
    poster: posterInfo,
    body: bodyInfo,
    like: likeInfo,
    replies: [ commentInfo0 ],
  }
  const callbacks = {
    like: (() => alert("like")),
    replyBoxType: (() => alert("typed")),
    postReply: (() => alert("replied")),
  }
  return (
    <div className="App">
      <Comment info={commentInfo1} callbacks={callbacks} replyBoxValue="abcd" />
    </div>
  )
}

export default App

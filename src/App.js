import * as apollo from "@apollo/client"

import "./App.css"
import Comment from "./Comment"

const query = apollo.gql`
  {
    myUser(tok: "633c968404a49a767f70bf80") {
      id
      username
    }
  }
`;

function App() {
  const { loading, error, data } = apollo.useQuery(query)
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

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
      <p>Id: {data.myUser.id}</p>
      <p>Username: {data.myUser.username}</p>
      <Comment info={commentInfo1} callbacks={callbacks} replyBoxValue="abcd" />
    </div>
  )
}

export default App

import * as apollo from "@apollo/client"

import "./App.css"
import Comment from "./Comment"

// tok: "633c968404a49a767f70bf80"
// id: "633df3e520c69a6ed03f1197"

const getPostQuery = apollo.gql`
query GetPost($tok: String!, $id: String!) {
  lookupPostId(tok: $tok, id: $id) {
    id
    poster {
      id
      name
    }
    message
    liked
    likes
    replies {
      id
      poster {
        id
        name
      }
      message
      liked
      likes
    }
  }
}
`

const likePostMutation = apollo.gql`
mutation LikePost($tok: String!, $id: String!, $like: Boolean!) {
  setLike(tok: $tok, id: $id, like: $like)
}
`

function App() {
  const tok = "633c968404a49a767f70bf80"

  const { loading, error, data } = apollo.useQuery(getPostQuery, { variables: { tok, id: "633df3e520c69a6ed03f1197" }})
  const [ likeMut ] = apollo.useMutation(likePostMutation)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>
  if (data == null || data.lookupPostId == null) return <p>Null response :(</p>

  const callbacks = {
    like: ((id, like) => likeMut({ variables: { tok, id, like }})), // TODO update the displayed value
    replyBoxType: (() => alert("typed")),
    postReply: (() => alert("replied")),
  }
  return (
    <div className="App">
      <Comment info={data.lookupPostId} callbacks={callbacks} replyBoxValue="abcd" />
    </div>
  )
}

export default App

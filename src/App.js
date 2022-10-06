import * as apollo from "@apollo/client"

import "./App.css"
import Comment from "./Comment"

const query = apollo.gql`
  {
    lookupPostId(tok: "633c968404a49a767f70bf80", id: "633df3e520c69a6ed03f1197") {
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
`;

function App() {
  const { loading, error, data } = apollo.useQuery(query)
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>
  if (data === null) return <p>Null response :(</p>

  const callbacks = {
    like: (() => alert("like")),
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

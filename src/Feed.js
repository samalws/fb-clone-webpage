import { gql, useQuery } from "@apollo/client"

import { feedDiv, text, textBig } from "./Style"
import Post from "./Post"

const feedQuery = gql`
query Feed($tok: String!) {
  feed(tok: $tok) {
    __typename
    ... on Post {
      id
    }
    ... on Repost {
      reposter { username }
      post { id }
    }
  }
}
`

function MyPage(props) {
  const tok = props.tok

  const { loading, error, data } = useQuery(feedQuery, { variables: { tok }})

  if (tok === "") return <p style={text}>Please sign in to view your page</p>
  if (loading) return <p style={text}>Loading...</p>
  if (error) return <p style={text}>Error :(</p>
  if (data == null || data.feed == null) return <p style={text}>Null response :(</p>
  const feed = data.feed

  const renderPost = (p) =>
    p.__typename === "Post"
    ? <Post key={p.id} id={p.id} tok={tok} />
    : <Post key={p.reposter.username + p.post.id} id={p.post.id} tok={tok} repostedBy={p.reposter.username} />

  return (<div style={feedDiv}>
    <p style={textBig}>My feed</p>
    { feed.map(renderPost) }
  </div>)
}

export default MyPage

import { gql, useQuery } from "@apollo/client"

import WritePost from "./WritePost"
import Post from "./Post"

const getPageQuery = gql`
query GetPage($tok: String!) {
  myUser(tok: $tok) { username, posts { id }, reposts { id } }
}
`

function MyPage(props) {
  const tok = props.tok

  const { loading, error, data, refetch } = useQuery(getPageQuery, { variables: { tok }})

  if (tok === "" || tok === "undefined") return <p>Please sign in to view your page</p>
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>
  if (data == null || data.myUser == null) return <p>Null response :(</p>
  const username = data.myUser.username
  const posts = data.myUser.posts
  const reposts = data.myUser.reposts

  async function posted(promise) {
    await promise
    refetch()
  }

  return (<div>
    <WritePost tok={props.tok} callback={posted} />
    <p>Posts:</p>
    { posts.map(({id}) => <Post key={id} id={id} tok={tok} />) }
    <p>Reposts:</p>
    { reposts.map(({id}) => <Post key={id} id={id} tok={tok} repostedBy={username} />) }
  </div>)
}

export default MyPage

import { gql, useQuery } from "@apollo/client"

import { text, textBig, myPageDiv } from "./Style"
import WritePost from "./WritePost"
import Post from "./Post"

const getPageQuery = gql`
query GetPage($tok: String!) {
  myUser(tok: $tok) { username, posts { id }, reposts { post { id } } }
}
`

function MyPage(props) {
  const tok = props.tok

  const { loading, error, data, refetch } = useQuery(getPageQuery, { variables: { tok }})

  if (tok === "" || tok === "undefined") return <p style={text}>Please sign in to view your page</p>
  if (loading) return <p style={text}>Loading...</p>
  if (error) return <p style={text}>Error :(</p>
  if (data == null || data.myUser == null) return <p style={text}>Null response :(</p>
  const username = data.myUser.username
  const posts = data.myUser.posts
  const reposts = data.myUser.reposts

  async function posted(promise) {
    await promise
    refetch()
  }

  return (<div style={myPageDiv}>
    <p style={textBig}>My page</p>
    <p style={text}>Write a post:</p>
    <WritePost tok={props.tok} callback={posted} />
    <p style={text}>My posts:</p>
    { posts.map(({id}) => <Post key={id} id={id} tok={tok} userClickCallback={props.userClickCallback} />) }
    <p style={text}>My reposts:</p>
    { reposts.map(({post:{id}}) => <Post key={id} id={id} tok={tok} repostedBy={username} userClickCallback={props.userClickCallback} />) }
  </div>)
}

export default MyPage

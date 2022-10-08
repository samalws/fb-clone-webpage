import { gql, useQuery } from "@apollo/client"

import WritePost from "./WritePost"
import Comment from "./Comment"

const getPostsQuery = gql`
query GetPosts($tok: String!) {
  myUser(tok: $tok) { posts { id } }
}
`

function MyPage(props) {
  const tok = props.tok

  const { loading, error, data, refetch } = useQuery(getPostsQuery, { variables: { tok }})

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>
  if (data == null || data.myUser == null) return <p>Null response :(</p>
  const posts = data.myUser.posts

  async function posted(promise) {
    await promise
    refetch()
  }

  return (<div>
    <WritePost tok={props.tok} callback={posted} />
    { posts.map(({id}) => <Comment key={id} id={id} tok={tok} />) }
  </div>)
}

export default MyPage

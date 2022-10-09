import { gql, useQuery, useMutation } from "@apollo/client"

import Comment from "./Comment"

const lookupUserIdQuery = gql`
query LookupUserIdQuery($tok: String!, $id: String!) {
  lookupUserId(tok: $tok, id: $id) { username, pfpLink, isFriendReqIn, isFriendReqOut, friends { username }, posts { id } }
}
`

const lookupUsernameQuery = gql`
query LookupUsernameQuery($tok: String!, $username: String!) {
  lookupUsername(tok: $tok, username: $username) { id, username, pfpLink, isFriendReqIn, isFriendReqOut, friends { username }, posts { id } }
}
`

const setFriendStatus = gql`
mutation SetFriendStatus($tok: String!, $id: String!, $val: Boolean!) {
  setFriendStatus(tok: $tok, id: $id, val: $val)
}
`

function UserPage(props) {
  const tok = props.tok
  const id = props.id
  const username = props.username

  const { loading, error, data, refetch } = useQuery(id === undefined ? lookupUsernameQuery : lookupUserIdQuery, { variables: { tok, id, username }})
  const [ setFriendStatusMut ] = useMutation(setFriendStatus)

  if (tok === "" || tok === "undefined") return <p>Please sign in to view your page</p>
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>
  if (data == null) return <p>Null response :(</p>
  const userData = id === undefined ? data.lookupUsername : data.lookupUserId
  if (userData == null) return <p>Null response :(</p>

  async function toggleFriendReq() {
    await setFriendStatusMut({ variables: { tok, id: userData.id, val: !userData.isFriendReqOut }})
    refetch() // TODO should be instant, do this like the like button
  }

  const friendStatus = userData.isFriendReqIn ? (userData.isFriendReqOut ? "friends" : "sent you a friend request") : (userData.isFriendReqOut ? "you sent a friend request" : "not friends")
  const friendReqBtnText = userData.isFriendReqOut ? (userData.isFriendReqIn ? "unfriend" : "revoke friend request") : (userData.isFriendReqIn ? "accept friend request" : "send friend request")

  return (<div>
    <img src={userData.pfpLink} alt="TODO alt" />
    <p>{userData.username}</p>
    <p>{friendStatus}</p>
    <button onClick={toggleFriendReq}>{friendReqBtnText}</button>
    <p>Friends: { userData.friends.map(({ username }) => username ).join(", ") }</p>
    { userData.posts.map(({id}) => <Comment key={id} id={id} tok={tok} />) }
  </div>)
}

export default UserPage

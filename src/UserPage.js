import { gql, useQuery, useMutation } from "@apollo/client"

import { text, textBig, pfpBig, userPageDiv } from "./Style"
import Post from "./Post"

const lookupUserIdQuery = gql`
query LookupUserIdQuery($tok: String!, $id: String!) {
  lookupUserId(tok: $tok, id: $id) { username, pfpLink, isFriendReqIn, isFriendReqOut, friends { username }, posts { id }, reposts { post { id } } }
}
`

const lookupUsernameQuery = gql`
query LookupUsernameQuery($tok: String!, $username: String!) {
  lookupUsername(tok: $tok, username: $username) { id, username, pfpLink, isFriendReqIn, isFriendReqOut, friends { username }, posts { id }, reposts { post { id } } }
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

  if (tok === "" || tok === "undefined") return <p style={text}>Please sign in to view your page</p>
  if (loading) return <p style={text}>Loading...</p>
  if (error) return <p style={text}>Error :(</p>
  if (data == null) return <p style={text}>Null response :(</p>
  const userData = id === undefined ? data.lookupUsername : data.lookupUserId
  if (userData == null) return <p style={text}>Null response :(</p>

  async function toggleFriendReq() {
    await setFriendStatusMut({ variables: { tok, id: userData.id, val: !userData.isFriendReqOut }})
    refetch() // TODO should be instant, do this like the like button
  }

  const friendStatus = userData.isFriendReqIn ? (userData.isFriendReqOut ? "You are friends" : "Sent you a friend request") : (userData.isFriendReqOut ? "You sent a friend request" : "You are not friends")
  const friendReqBtnText = userData.isFriendReqOut ? (userData.isFriendReqIn ? "unfriend" : "revoke friend request") : (userData.isFriendReqIn ? "accept friend request" : "send friend request")

  return (<div style={userPageDiv}>
    <img style={pfpBig} src={userData.pfpLink} alt="TODO alt" />
    <span style={textBig}>{userData.username}</span>
    <p style={text}>{friendStatus}</p>
    <button onClick={toggleFriendReq}>{friendReqBtnText}</button>
    <p style={text}>Friends: { userData.friends.map(({ username }) => username ).join(", ") }</p>
    <p style={text}>Posts:</p>
    { userData.posts.map(({id}) => <Post key={id} id={id} tok={tok} userClickCallback={props.userClickCallback} />) }
    <p style={text}>Reposts:</p>
    { userData.reposts.map(({post:{id}}) => <Post key={id} id={id} tok={tok} repostedBy={userData.username} userClickCallback={props.userClickCallback} />) }
  </div>)
}

export default UserPage

import { useState } from "react"
import { gql, useQuery, useMutation } from "@apollo/client"

import { text, post, reply } from "./Style"
import LikeButton from "./LikeButton"

const getPostQuery = gql`
query GetPost($tok: String!, $id: String!) {
  lookupPostId(tok: $tok, id: $id) {
    id
    poster {
      id
      name
      pfpLink
    }
    message
    imageLinks
    liked
    likes
    reposted
    canRepost
    replies {
      id
      poster {
        id
        name
        pfpLink
      }
      message
      liked
      likes
    }
  }
}
`

const repostMutation = gql`
mutation Repost($tok: String!, $postId: String!) {
  repost(tok: $tok, postId: $postId)
}
`

const replyMutation = gql`
mutation Reply($tok: String!, $replyTo: String!, $message: String!) {
  makeReply(tok: $tok, replyTo: $replyTo, message: $message) { id }
}
`

function CommentPoster(props) {
  return (<div>
    <img src={props.info.pfpLink} alt="" />
    <p style={text}>{props.info.name}</p>
  </div>)
}

function CommentBody(props) {
  return (<div>
    { (props.info.imageLinks ?? []).map((link) => <img key={link} src={link} alt="TODO alt" />) }
    <p style={text}>{props.info.message}</p>
  </div>)
}

function RepostButton(props) {
  // TODO instant refresh
  if (props.info.reposted) return <p>You reposted</p>
  if (!props.info.canRepost) return null
  return <button onClick={props.callback}>Repost</button>
}

function ReplyBox(props) {
  const [ text, changeText ] = useState("")

  function submit(event) {
    event.preventDefault()
    changeText("")
    props.callback(text)
  }

  return (<form action="#" onSubmit={submit}>
    <input type="text" value={text} onChange={ (event) => changeText(event.target.value) } />
    <input type="submit" value="Reply" />
  </form>)
}

function Reply(props) {
  const tok = props.tok
  const info = props.info
  return (<div style={reply}>
    <CommentPoster info={info.poster} />
    <CommentBody info={info} />
    <LikeButton tok={tok} info={info} />
  </div>)
}

function Replies(props) {
  return (<div className="Replies">
    { props.info.map((e) => <Reply key={e.id} info={e} tok={props.tok} />) }
    <ReplyBox callback={props.replyCallback} />
  </div>)
}

function Post(props) {
  const tok = props.tok
  const id = props.id

  const { loading, error, data, refetch } = useQuery(getPostQuery, { variables: { tok, id }})
  const [ repostMut ] = useMutation(repostMutation)
  const [ replyMut ] = useMutation(replyMutation)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>
  if (data == null || data.lookupPostId == null) return <p>Null response :(</p>
  const info = data.lookupPostId

  async function repostCallback(message) {
    await repostMut({ variables: { tok, postId: id }})
    refetch()
  }

  async function replyCallback(message) {
    await replyMut({ variables: { tok, replyTo: id, message }})
    refetch()
  }

  return (<div style={post}>
    { (props.repostedBy !== undefined) ? <p>Reposted by {props.repostedBy}</p> : null }
    <CommentPoster info={info.poster} />
    <CommentBody info={info} />
    <LikeButton tok={tok} info={info} />
    <RepostButton tok={tok} info={info} callback={repostCallback} />
    <Replies tok={tok} info={info.replies} replyCallback={replyCallback} />
  </div>)
}

export default Post

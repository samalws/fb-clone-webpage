import { useState } from "react"
import { gql, useQuery, useMutation } from "@apollo/client"

import { text, linkText, postDiv, replyDiv, pfp, commentPosterDiv, commentBodyDiv, repostBtn, replyBoxForm, inlineInputBox, replyBtn } from "./Style"
import LikeButton from "./LikeButton"

const getPostQuery = gql`
query GetPost($tok: String!, $id: String!) {
  lookupPostId(tok: $tok, id: $id) {
    id
    poster {
      id
      name
      username
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
        username
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
  // TODO should really be passing along id not username to callback
  return (<div style={commentPosterDiv}>
    <img style={pfp} src={props.info.pfpLink} alt="" />
    <span style={linkText} onClick={() => props.callback(props.info.username)}>{props.info.name}</span>
  </div>)
}

function CommentBody(props) {
  return (<div style={commentBodyDiv}>
    { (props.info.imageLinks ?? []).map((link) => <img key={link} src={link} alt="TODO alt" />) }
    <p style={text}>{props.info.message}</p>
  </div>)
}

function RepostButton(props) {
  // TODO instant refresh
  if (props.info.reposted) return <p style={text}>You reposted</p>
  if (!props.info.canRepost) return null
  return <button style={repostBtn} onClick={props.callback}>Repost</button>
}

function ReplyBox(props) {
  const [ text, changeText ] = useState("")

  function submit(event) {
    event.preventDefault()
    changeText("")
    props.callback(text)
  }

  return (<form style={replyBoxForm} action="#" onSubmit={submit}>
    <input style={inlineInputBox} type="text" placeholder="Write your reply..." value={text} onChange={ (event) => changeText(event.target.value) } />
    <input style={replyBtn} type="submit" value="Reply" />
  </form>)
}

function Reply(props) {
  const tok = props.tok
  const info = props.info
  return (<div style={replyDiv}>
    <CommentPoster info={info.poster} callback={props.userClickCallback} />
    <CommentBody info={info} />
    <LikeButton tok={tok} info={info} />
  </div>)
}

function Replies(props) {
  return (<div className="Replies">
    { props.info.map((e) => <Reply key={e.id} info={e} tok={props.tok} userClickCallback={props.userClickCallback} />) }
    <ReplyBox callback={props.replyCallback} />
  </div>)
}

function Post(props) {
  const tok = props.tok
  const id = props.id

  const { loading, error, data, refetch } = useQuery(getPostQuery, { variables: { tok, id }})
  const [ repostMut ] = useMutation(repostMutation)
  const [ replyMut ] = useMutation(replyMutation)

  if (loading) return <p style={text}>Loading...</p>
  if (error) return <p style={text}>Error :(</p>
  if (data == null || data.lookupPostId == null) return <p style={text}>Null response :(</p>
  const info = data.lookupPostId

  async function repostCallback(message) {
    await repostMut({ variables: { tok, postId: id }})
    refetch()
  }

  async function replyCallback(message) {
    await replyMut({ variables: { tok, replyTo: id, message }})
    refetch()
  }

  return (<div style={postDiv}>
    { (props.repostedBy !== undefined) ? <p style={text}>Reposted by {props.repostedBy}</p> : null }
    <CommentPoster info={info.poster} callback={props.userClickCallback} />
    <CommentBody info={info} />
    <LikeButton tok={tok} info={info} />
    <RepostButton tok={tok} info={info} callback={repostCallback} />
    <Replies tok={tok} info={info.replies} replyCallback={replyCallback} userClickCallback={props.userClickCallback} />
  </div>)
}

export default Post

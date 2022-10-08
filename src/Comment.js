import { useState } from "react"
import { gql, useQuery, useMutation } from "@apollo/client"

import { text, comment, reply } from "./Style"
import LikeButton from "./LikeButton"

const getPostQuery = gql`
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

const replyMutation = gql`
mutation Reply($tok: String!, $replyTo: String!, $message: String!) {
  makeReply(tok: $tok, replyTo: $replyTo, message: $message) { id }
}
`

function CommentPoster(props) {
  return ( <p style={text}>{props.info.name}</p> )
}

function CommentBody(props) {
  return ( <p style={text}>{props.info.message}</p> )
}

function ReplyBox(props) {
  const [ text, changeText ] = useState("")

  function submit() {
    changeText("")
    props.replyCallback(text)
  }

  return (<form action="#" onSubmit={submit}>
    <input type="text" value={text} onChange={ (event) => changeText(event.target.value) } />
    <input type="submit" value="Submit" />
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
    <ReplyBox replyCallback={props.replyCallback} />
  </div>)
}

function Comment(props) {
  const tok = props.tok
  const id = props.id

  const { loading, error, data, refetch } = useQuery(getPostQuery, { variables: { tok, id }})
  const [ replyMut ] = useMutation(replyMutation)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>
  if (data == null || data.lookupPostId == null) return <p>Null response :(</p>
  const info = data.lookupPostId

  async function replyCallback(message) {
    await replyMut({ variables: { tok, replyTo: id, message }})
    refetch()
  }

  return (<div style={comment}>
    <CommentPoster info={info.poster} />
    <CommentBody info={info} />
    <LikeButton tok={tok} info={info} />
    <Replies tok={tok} info={info.replies} replyCallback={replyCallback} />
  </div>)
}

export default Comment

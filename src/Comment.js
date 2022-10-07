import { useState } from "react"

import { text, comment, reply } from "./Style"
import LikeButton from "./LikeButton"

function CommentPoster(props) {
  return ( <p style={text}>{props.info.name}</p> )
}

function CommentBody(props) {
  return ( <p style={text}>{props.info.message}</p> )
}

function ReplyBox(props) {
  const [ text, changeText ] = useState("")

  function submit() {
    props.callback(props.replyTo, text)
    changeText("")
  }

  return (<form action="#" onSubmit={submit}>
    <input type="text" value={text} onChange={ (event) => changeText(event.target.value) } />
    <input type="submit" value="Submit" />
  </form>)
}

function Replies(props) {
  return (<div className="Replies">
    { props.info.map((e) => <Comment key={e.id} info={e} extraState={props.extraState} inReply={true} />) }
    <ReplyBox replyTo={props.replyTo} callback={props.extraState.callbacks.postReply} />
  </div>)
}

function Comment(props) {
  const commentInfo = props.info
  const extraState = props.extraState
  return (<div style={props.inReply ? reply : comment}>
    <CommentPoster info={commentInfo.poster} />
    <CommentBody info={commentInfo} />
    <LikeButton info={commentInfo} likeOverrides={extraState.likeOverrides} callback={extraState.callbacks.like} />
    { props.inReply || <Replies replyTo={commentInfo.id} info={commentInfo.replies} extraState={extraState} /> }
  </div>)
}

export default Comment

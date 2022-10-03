import LikeButton from "./LikeButton"

function CommentPoster(props) {
  return ( <p>{props.info.name}</p> )
}

function CommentBody(props) {
  return ( <p>{props.info.text}</p> )
}

function ReplyBox(props) {
  return (<form onSubmit={props.callbacks.postReply}>
    <input value={props.value} onChange={props.callbacks.replyBoxType} type="text" />
    <input type="submit" value="Submit" />
  </form>)
}

function Replies(props) {
  return (<div className="Replies">
    { props.info.map((e) => <Comment key={e.id} info={e} callbacks={props.callbacks} inReply={true} />) }
    <ReplyBox value={props.replyBoxValue} callbacks={props.callbacks} />
  </div>)
}

function Comment(props) {
  const commentInfo = props.info
  return (<div className="Comment">
    <CommentPoster info={commentInfo.poster} />
    <CommentBody info={commentInfo.body} />
    <LikeButton info={commentInfo.like} callback={props.callbacks.like} />
    { props.inReply || <Replies info={commentInfo.replies} replyBoxValue={props.replyBoxValue} callbacks={props.callbacks} /> }
  </div>)
}

export default Comment

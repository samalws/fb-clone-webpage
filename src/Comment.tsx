import LikeButton from "./LikeButton"

type PosterType = { name: string }
type PostType  = { id: string, poster: PosterType, message: string, liked: boolean, likes: number, replies: [ReplyType] }
type ReplyType = { id: string, poster: PosterType, message: string, liked: boolean, likes: number }
type CallbackType = { like: (id: string, like: boolean) => void, postReply: () => void, replyBoxType: () => void }

function CommentPoster(props: { info: PosterType }) {
  return ( <p>{props.info.name}</p> )
}

function CommentBody(props: { info: { message: string } }) {
  return ( <p>{props.info.message}</p> )
}

function ReplyBox(props: { value: string, callbacks: CallbackType }) {
  return (<form onSubmit={props.callbacks.postReply}>
    <input value={props.value} onChange={props.callbacks.replyBoxType} type="text" />
    <input type="submit" value="Submit" />
  </form>)
}

function Replies(props: { info: [ReplyType], callbacks: CallbackType, replyBoxValue: string }) {
  return (<div className="Replies">
    { props.info.map((e) => <Comment key={e.id} info={e} callbacks={props.callbacks} inReply={true} />) }
    <ReplyBox value={props.replyBoxValue} callbacks={props.callbacks} />
  </div>)
}

function Comment(props: { inReply: false, info: PostType, callbacks: CallbackType, replyBoxValue: string } | { inReply: true, info: ReplyType, callbacks: CallbackType }) {
  const commentInfo = props.info
  return (<div className="Comment">
    <CommentPoster info={commentInfo.poster} />
    <CommentBody info={commentInfo} />
    <LikeButton info={commentInfo} callback={props.callbacks.like} />
    { props.inReply ? null : <Replies info={props.info.replies} replyBoxValue={props.replyBoxValue} callbacks={props.callbacks} /> }
  </div>)
}

export default Comment

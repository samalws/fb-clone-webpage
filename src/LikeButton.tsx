function LikeButton(props: { info: { id: string, liked: boolean, likes: number }, callback: (id: string, like: boolean) => void }) {
  return (<div id="LikeButton">
    <p>{props.info.liked ? "liked" : "not liked"}</p>
    <p>{props.info.likes}</p>
    <button onClick={() => props.callback(props.info.id, !props.info.liked)}>Toggle like</button>
  </div>)
}

export default LikeButton

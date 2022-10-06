function LikeButton(props) {
  return (<div id="LikeButton">
    <p>{props.info.liked ? "liked" : "not liked"}</p>
    <p>{props.info.likes}</p>
    <button onClick={props.callback}>Toggle like</button>
  </div>)
}

export default LikeButton

import { text } from "./Style"

function LikeButton(props) {
  const likeOverride = props.likeOverrides[props.info.id]
  const liked = likeOverride ?? props.info.liked
  const likes = props.info.likes + (likeOverride === true ? 1 : likeOverride === false ? -1 : 0)
  // TODO likes
  return (<div id="LikeButton">
    <p style={text}>{liked ? "liked" : "not liked"}</p>
    <p style={text}>{likes}</p>
    <button onClick={() => props.callback(props.info.id, !liked)}>Toggle like</button>
  </div>)
}

export default LikeButton

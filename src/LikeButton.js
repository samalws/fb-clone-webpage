import { text } from "./Style"

function LikeButton(props) {
  return (<div id="LikeButton">
    <p style={text}>{props.info.liked ? "liked" : "not liked"}</p>
    <p style={text}>{props.info.likes}</p>
    <button onClick={() => props.callback(props.info.id, !props.info.liked)}>Toggle like</button>
  </div>)
}

export default LikeButton

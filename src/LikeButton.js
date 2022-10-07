import { useState } from "react"

import { text } from "./Style"

function LikeButton(props) {
  const [ likeOverride, overrideLike ] = useState(null)

  const liked = likeOverride ?? props.info.liked
  const likes = props.info.likes + (likeOverride === true ? 1 : likeOverride === false ? -1 : 0)

  function toggleLike() {
    overrideLike(likeOverride === null ? !liked : null)
    props.callback(props.info.id, !liked)
  }

  return (<div>
    <p style={text}>{liked ? "liked" : "not liked"}</p>
    <p style={text}>{likes}</p>
    <button onClick={toggleLike}>Toggle like</button>
  </div>)
}

export default LikeButton

import { useState } from "react"
import { gql, useMutation } from "@apollo/client"

import { likeDiv, likeBtn, likeText } from "./Style"

const likePostMutation = gql`
mutation LikePost($tok: String!, $id: String!, $like: Boolean!) {
  setLike(tok: $tok, id: $id, like: $like)
}
`

function infosEqual(a, b) {
  return a.id === b.id && a.liked === b.liked && a.likes === b.likes
}

function LikeButton(props) {
  const [ likeOverride_, overrideLike ] = useState(null)
  const [ origInfo, setOrigInfo ] = useState(props.info)
  const [ likePostMut ] = useMutation(likePostMutation)

  const likeOverride = infosEqual(origInfo, props.info) ? likeOverride_ : null

  const liked = likeOverride ?? props.info.liked
  const likes = props.info.likes + (likeOverride === true ? 1 : likeOverride === false ? -1 : 0)

  function toggleLike() {
    overrideLike(likeOverride === null ? !liked : null)
    setOrigInfo(props.info)
    likePostMut({ variables: { tok: props.tok, id: props.info.id, like: !liked }})
  }

  return (<div style={likeDiv}>
    <button style={likeBtn} onClick={toggleLike}>{liked ? "❤️" : "♡"}</button>
    <span style={likeText} onClick={toggleLike}>{likes}</span>
  </div>)
}

export default LikeButton

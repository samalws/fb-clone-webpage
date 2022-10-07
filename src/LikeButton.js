import { useState } from "react"
import { gql, useMutation } from "@apollo/client"

import { text } from "./Style"

const likePostMutation = gql`
mutation LikePost($tok: String!, $id: String!, $like: Boolean!) {
  setLike(tok: $tok, id: $id, like: $like)
}
`

function LikeButton(props) {
  const [ likeOverride, overrideLike ] = useState(null)
  const [ likePostMut ] = useMutation(likePostMutation)

  const liked = likeOverride ?? props.info.liked
  const likes = props.info.likes + (likeOverride === true ? 1 : likeOverride === false ? -1 : 0)

  function toggleLike() {
    overrideLike(likeOverride === null ? !liked : null)
    likePostMut({ variables: { tok: props.tok, id: props.info.id, like: !liked }})
  }

  return (<div>
    <p style={text}>{liked ? "liked" : "not liked"}</p>
    <p style={text}>{likes}</p>
    <button onClick={toggleLike}>Toggle like</button>
  </div>)
}

export default LikeButton

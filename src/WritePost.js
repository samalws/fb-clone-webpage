import { useState } from "react"
import { gql, useMutation } from "@apollo/client"

const makePostMutation = gql`
mutation MakePost($tok: String!, $message: String!) {
  makePost(tok: $tok, message: $message) { id }
}
`

function WritePost(props) {
  const [ text, changeText ] = useState("")
  const [ makePostMut ] = useMutation(makePostMutation)

  function submit() {
    changeText("")
    props.callback(makePostMut({ variables: { tok: props.tok, message: text }}))
  }

  return (<form action="#" onSubmit={submit}>
    <input type="text" value={text} onChange={ (event) => changeText(event.target.value) } />
    <input type="submit" value="Post" />
  </form>)
}

export default WritePost

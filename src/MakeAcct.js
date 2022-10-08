import { useState } from "react"
import { gql, useMutation } from "@apollo/client"

import { Buffer } from "buffer"
window.Buffer ??= Buffer
const keccak256 = require("keccak256")

const makeAcctMutation = gql`
mutation MakeAcct($username: String!, $name: String!, $pfpLink: String!, $pwHashPreSalt: String!) {
  makeAcct(username: $username, name: $name, pfpLink: $pfpLink, pwHashPreSalt: $pwHashPreSalt) {
    id
  }
}
`

function Login(props) {
  const [ usernameText, changeUsernameText ] = useState("")
  const [ nameText, changeNameText ] = useState("")
  const [ pfpLinkText, changePfpLinkText ] = useState("")
  const [ passwordText, changePasswordText ] = useState("")
  const [ makeAcctMut ] = useMutation(makeAcctMutation)

  async function makeAcct() {
    const username = usernameText
    const name = nameText
    const pfpLink = pfpLinkText
    const password = passwordText

    changeUsernameText("")
    changeNameText("")
    changePfpLinkText("")
    changePasswordText("")

    const resp = await makeAcctMut({ variables: { username, name, pfpLink, pwHashPreSalt: keccak256(password).toString("base64") }})
    if (resp.data.makeAcct === null) {
      alert("failed to create account") // TODO
      return
    }
    props.callback(resp.data.makeAcct.id)
  }

  return (<form action="#" onSubmit={makeAcct}>
    <input type="text" placeholder="username" value={usernameText} onChange={ (event) => changeUsernameText(event.target.value) } />
    <input type="text" placeholder="name" value={nameText} onChange={ (event) => changeNameText(event.target.value) } />
    <input type="text" placeholder="pfpLink" value={pfpLinkText} onChange={ (event) => changePfpLinkText(event.target.value) } />
    <input type="password" placeholder="password" value={passwordText} onChange={ (event) => changePasswordText(event.target.value) } />
    <input type="submit" value="Create account" />
  </form>)
}

export default Login

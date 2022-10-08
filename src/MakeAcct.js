import { useState } from "react"
import { gql, useMutation } from "@apollo/client"
import axios from "axios"

import ImgUpload from "./ImgUpload"

import { Buffer } from "buffer"
window.Buffer ??= Buffer
const keccak256 = require("keccak256") // TODO "import keccak256 from keccak256"?

const makeAcctMutation = gql`
mutation MakeAcct($username: String!, $name: String!, $pfp: Image!, $pwHashPreSalt: String!) {
  makeAcct(username: $username, name: $name, pfp: $pfp, pwHashPreSalt: $pwHashPreSalt) {
    id
  }
}
`

function Login(props) {
  const [ usernameText, changeUsernameText ] = useState("")
  const [ nameText, changeNameText ] = useState("")
  const [ passwordText, changePasswordText ] = useState("")
  const [ image, setImgData ] = useState(null)
  const [ makeAcctMut ] = useMutation(makeAcctMutation)

  async function makeAcct() {
    if (image == null) {
      alert("please upload a profile picture") // TODO
      return
    }

    const username = usernameText
    const name = nameText
    const password = passwordText

    changeUsernameText("")
    changeNameText("")
    changePasswordText("")

    const mime = "image/png" // TODO
    const ext = "png" // TODO

    const pfpResp = await axios.post("https://n5b1h89k3j.execute-api.us-east-1.amazonaws.com/dev/", { image, mime, ext })
    if (pfpResp.status !== 200) {
      alert("failed to upload profile picture") // TODO
      return
    }
    const pfp = { ext, ...pfpResp.data }

    const resp = await makeAcctMut({ variables: { username, name, pfp, pwHashPreSalt: keccak256(password).toString("base64") }})
    if (resp.data.makeAcct === null) {
      alert("failed to create account") // TODO
      return
    }
    props.callback(resp.data.makeAcct.id)
  }

  return (<form action="#" onSubmit={makeAcct}>
    <ImgUpload callback={setImgData} />
    <input type="text" placeholder="username" value={usernameText} onChange={ (event) => changeUsernameText(event.target.value) } />
    <input type="text" placeholder="name" value={nameText} onChange={ (event) => changeNameText(event.target.value) } />
    <input type="password" placeholder="password" value={passwordText} onChange={ (event) => changePasswordText(event.target.value) } />
    <input type="submit" value="Create account" />
  </form>)
}

export default Login

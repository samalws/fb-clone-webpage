import { useState } from "react"
import { gql, useMutation } from "@apollo/client"
import axios from "axios"

import { text, textBig, linkText, makeAccountForm, blockInputBox, makeAccountBtn } from "./Style"
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
  const [ image, setImage ] = useState(null)
  const [ makeAcctMut ] = useMutation(makeAcctMutation)

  async function makeAcct(event) {
    event.preventDefault()

    if (image == null) {
      alert("please upload a profile picture") // TODO
      return
    }

    const username = usernameText
    const name = nameText
    const password = passwordText

    if (username === "" || name === "" || password === "") {
      alert("please fill in all the input fields") // TODO
      return
    }

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

  return (<form style={makeAccountForm} action="#" onSubmit={makeAcct}>
    <p style={textBig}>Create account</p>
    <span style={text}>Choose profile picture:</span>
    <ImgUpload inline callback={setImage} />
    <br />
    <input style={blockInputBox} type="text" placeholder="username" value={usernameText} onChange={ (event) => changeUsernameText(event.target.value) } />
    <input style={blockInputBox} type="text" placeholder="name" value={nameText} onChange={ (event) => changeNameText(event.target.value) } />
    <input style={blockInputBox} type="password" placeholder="password" value={passwordText} onChange={ (event) => changePasswordText(event.target.value) } />
    <input style={makeAccountBtn} type="submit" value="Create account" />
    <p style={linkText} onClick={props.toLogin}>Login instead?</p>
  </form>)
}

export default Login

import { useState } from "react"
import { gql, useMutation } from "@apollo/client"
import axios from "axios"

import { textBig, text, inlineInputBox, settingsDiv, settingsBtn, settingsForm } from "./Style"
import ImgUpload from "./ImgUpload"

import { Buffer } from "buffer"
window.Buffer ??= Buffer
const keccak256 = require("keccak256") // TODO "import keccak256 from keccak256"?

const changeSettingsMutation = gql`
mutation ChangeSettings($tok: String!, $name: String, $pfp: Image, $pwHashPreSalt: String) {
  changeAcctSettings(tok: $tok, name: $name, pfp: $pfp, pwHashPreSalt: $pwHashPreSalt)
}
`

function Settings(props) {
  const tok = props.tok

  const [ name, setName ] = useState("")
  const [ pw, setPw ] = useState("")
  const [ image, setImage ] = useState(null)
  const [ changeSettingsMut ] = useMutation(changeSettingsMutation)

  async function changePfp() {
    if (image == null) {
      alert("please upload a profile picture") // TODO
      return
    }

    const mime = "image/png" // TODO
    const ext = "png" // TODO

    const pfpResp = await axios.post("https://n5b1h89k3j.execute-api.us-east-1.amazonaws.com/dev/", { image, mime, ext })
    if (pfpResp.status !== 200) {
      alert("failed to upload profile picture") // TODO
      return
    }
    const pfp = { ext, ...pfpResp.data }

    const resp = await changeSettingsMut({ variables: { tok, pfp }})
    if (resp.data.changeAcctSettings === false) {
      alert("failed to change setting") // TODO
      return
    }
    alert("Changed setting successfully") // TODO
  }

  async function changeName(event) {
    event.preventDefault()

    if (name === "") return

    const resp = await changeSettingsMut({ variables: { tok, name }})
    setName("")
    if (resp.data.changeAcctSettings === false) {
      alert("failed to change setting") // TODO
      return
    }
    alert("Changed setting successfully") // TODO
  }

  async function changePassword(event) {
    event.preventDefault()

    if (pw === "") return

    const resp = await changeSettingsMut({ variables: { tok, pwHashPreSalt: keccak256(pw).toString("base64") }})
    setPw("")
    if (resp.data.changeAcctSettings === false) {
      alert("failed to change setting") // TODO
      return
    }
    alert("Changed setting successfully") // TODO
  }

  return (<div style={settingsDiv}>
    <p style={textBig}>Settings</p>
    <p style={text}>Change profile picture:</p>
    <ImgUpload callback={setImage} />
    <button style={settingsBtn} onClick={changePfp}>Change profile picture</button>
    <p style={text}>Change name:</p>
    <form style={settingsForm} action="#" onSubmit={changeName}>
      <input style={inlineInputBox} type="text" placeholder="New name" value={name} onChange={(event) => setName(event.target.value)} />
      <input style={settingsBtn} type="submit" value="Change name" />
    </form>
    <p style={text}>Change password:</p>
    <form style={settingsForm} action="#" onSubmit={changePassword}>
      <input style={inlineInputBox} type="password" placeholder="New password" value={pw} onChange={(event) => setPw(event.target.value)} />
      <input style={settingsBtn} type="submit" value="Change password" />
    </form>
  </div>)
}

export default Settings

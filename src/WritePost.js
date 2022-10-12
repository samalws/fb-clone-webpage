import { useState } from "react"
import { gql, useMutation } from "@apollo/client"
import axios from "axios"

import { text, writePostForm, blockInputBox, postBtn } from "./Style"
import ImgUpload from "./ImgUpload"

const makePostMutation = gql`
mutation MakePost($tok: String!, $message: String!, $images: [Image!]!) {
  makePost(tok: $tok, message: $message, images: $images) { id }
}
`

function WritePost(props) {
  const [ textVal, changeText ] = useState("")
  const [ imgData, setImgData ] = useState(null)
  const [ makePostMut ] = useMutation(makePostMutation)

  async function submit(event) {
    event.preventDefault()

    if (textVal === "") {
      alert("please enter the text for your post")
      return
    }

    var imgList = []
    if (imgData !== null) imgList = [imgData]

    var imgListUploaded = []
    for (const i in imgList) {
      const image = imgList[i]

      const mime = "image/png" // TODO
      const ext = "png" // TODO

      const imgResp = await axios.post("https://n5b1h89k3j.execute-api.us-east-1.amazonaws.com/dev/", { image, mime, ext })
      if (imgResp.status !== 200) {
        alert("failed to upload image") // TODO
        return
      }
      imgListUploaded.push({ ext, ...imgResp.data })
    }

    changeText("")
    props.callback(makePostMut({ variables: { tok: props.tok, message: textVal, images: imgListUploaded }}))
  }

  return (<form style={writePostForm} action="#" onSubmit={submit}>
    <span style={text}>Image (optional):</span>
    <ImgUpload inline callback={setImgData} />
    <input style={blockInputBox} type="text" placeholder="Write your post..." value={textVal} onChange={ (event) => changeText(event.target.value) } />
    <input style={postBtn} type="submit" value="Post" />
  </form>)
}

export default WritePost

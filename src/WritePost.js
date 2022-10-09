import { useState } from "react"
import { gql, useMutation } from "@apollo/client"
import axios from "axios"

import ImgUpload from "./ImgUpload"

const makePostMutation = gql`
mutation MakePost($tok: String!, $message: String!, $images: [Image!]!) {
  makePost(tok: $tok, message: $message, images: $images) { id }
}
`

function WritePost(props) {
  const [ text, changeText ] = useState("")
  const [ imgData, setImgData ] = useState(null)
  const [ makePostMut ] = useMutation(makePostMutation)

  async function submit(event) {
    event.preventDefault()

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
    props.callback(makePostMut({ variables: { tok: props.tok, message: text, images: imgListUploaded }}))
  }

  return (<form action="#" onSubmit={submit}>
    <ImgUpload callback={setImgData} />
    <input type="text" value={text} onChange={ (event) => changeText(event.target.value) } />
    <input type="submit" value="Post" />
  </form>)
}

export default WritePost

import { imgUploadInline, imgUploadBlock } from "./Style"

function ImgUpload(props) {
  function upload(event) {
    if (event.target.files.length === 0) return
    const reader = new FileReader()
    reader.addEventListener("loadend", () => props.callback(btoa(reader.result)))
    reader.readAsBinaryString(event.target.files[0])
  }

  return <input style={props.inline ? imgUploadInline : imgUploadBlock} type="file" onChange={upload} />
}

export default ImgUpload

import { useState } from "react"

import { userSearchForm, userSearchBox, userSearchBtn } from "./Style"

function UserSearch(props) {
  const [ text, setText ] = useState("")

  return <form style={userSearchForm} action="#" onSubmit={(event) => { event.preventDefault(); props.callback(text) }}>
    <input style={userSearchBox} type="text" placeholder="Username" value={text} onChange={(event) => setText(event.target.value)} />
    <input style={userSearchBtn} type="submit" value="Search" />
  </form>
}

export default UserSearch

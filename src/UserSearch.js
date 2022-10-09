import { useState } from "react"

import UserPage from "./UserPage"

function UserSearch(props) {
  const [ text, setText ] = useState("")
  const [ username, setUsername ] = useState("")

  return (<div>
    <form action="#" onSubmit={(event) => { event.preventDefault(); setUsername(text) }}>
      <input type="text" placeholder="Username" value={text} onChange={(event) => setText(event.target.value)} />
      <input type="submit" value="Search" />
    </form>
    <UserPage tok={props.tok} username={username} />
  </div>)
}

export default UserSearch

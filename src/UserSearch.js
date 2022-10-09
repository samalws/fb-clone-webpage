import { useState } from "react"

import UserPage from "./UserPage"

function UserSearch(props) {
  const [ text, setText ] = useState("")
  const [ username, setUsername ] = useState("")

  return (<div>
    <form>
      <input type="text" placeholder="Username" value={text} onChange={(event) => setText(event.target.value)} />
      <button onClick={() => setUsername(text)}>Search</button>
    </form>
    <UserPage tok={props.tok} username={username} />
  </div>)
}

export default UserSearch

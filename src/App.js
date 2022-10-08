import { useCookies } from "react-cookie"

import { text } from "./Style"
import MakeAcct from "./MakeAcct"
import Login from "./Login"
import Logout from "./Logout"
import Comment from "./Comment"

function App() {
  const [ cookies ] = useCookies(["tok"])

  const id = "633df3e520c69a6ed03f1197" 

  return (
    <div>
      <p style={text}>Make account:</p>
      <MakeAcct callback={() => alert("made account")} />
      <p style={text}>Log in:</p>
      <Login callback={() => alert("logged in")} />
      <p style={text}>Log out:</p>
      <Logout callback={() => alert("logged out")} />
      <p style={text}>Example post:</p>
      <Comment tok={cookies.tok} id={id} />
    </div>
  )
}

export default App

import { useCookies } from "react-cookie"

import { text } from "./Style"
import MakeAcct from "./MakeAcct"
import Login from "./Login"
import Logout from "./Logout"
import MyPage from "./MyPage"

function App() {
  const [ cookies ] = useCookies(["tok"])

  return (
    <div>
      <p style={text}>Make account:</p>
      <MakeAcct callback={() => alert("made account")} />
      <p style={text}>Log in:</p>
      <Login callback={() => alert("logged in")} />
      <p style={text}>Log out:</p>
      <Logout callback={() => alert("logged out")} />
      <p style={text}>My page:</p>
      <MyPage tok={cookies.tok} />
    </div>
  )
}

export default App

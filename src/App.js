import { useCookies } from "react-cookie"

import Login from "./Login"
import Logout from "./Logout"
import Comment from "./Comment"

function App() {
  const [ cookies ] = useCookies(["tok"])

  const id = "633df3e520c69a6ed03f1197" 

  return (
    <div>
      <Login callback={() => alert("logged in")} />
      <Logout callback={() => alert("logged out")} />
      <Comment tok={cookies.tok} id={id} />
    </div>
  )
}

export default App

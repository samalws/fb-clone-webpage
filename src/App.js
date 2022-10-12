import { useState } from "react"
import { useCookies } from "react-cookie"

import { headerDiv, logo, headerBtn, headerBtnRight, appContentDiv } from "./Style"
import MakeAcct from "./MakeAcct"
import Login from "./Login"
import Logout from "./Logout"
import UserSearch from "./UserSearch"
import Feed from "./Feed"
import UserPage from "./UserPage"
import MyPage from "./MyPage"
import Settings from "./Settings"
// TODO full post w comments vs just post?

function Logo(props) {
  return <button onClick={props.callback} style={logo}>FBClone</button>
}

function Header(props) {
  const setCurrentPage = props.setCurrentPage
  const tok = props.tok

  if (tok === "")
    return <div style={headerDiv}><Logo callback={() => setCurrentPage({page:"login"})} /></div>
  else
    return <div style={headerDiv}>
      <Logo callback={() => setCurrentPage({page:"feed"})} />
      <button style={headerBtn} onClick={() => setCurrentPage({page:"feed"})}>Feed</button>
      <button style={headerBtn} onClick={() => setCurrentPage({page:"myPage"})}>My Page</button>

      <button style={headerBtnRight} onClick={() => setCurrentPage({page:"settings"})}>Settings</button>
      <Logout callback={() => setCurrentPage({page:"login"})} />
      <UserSearch callback={(username) => { if (username !== "") setCurrentPage({page:"userPage",username})}} />
    </div>
}

function AppContent(props) {
  const setCurrentPage = props.setCurrentPage
  const currentPage = props.currentPage
  var page = currentPage.page
  const tok = currentPage.tok

  if (tok === "" && page !== "login" && page !== "makeAcct")
    page = "login"

  if (page === "login")
    return <Login callback={() => setCurrentPage({page: "feed"})} toNewAcct={() => setCurrentPage({page:"makeAcct"})} />
  else if (page === "makeAcct")
    return <MakeAcct callback={() => setCurrentPage({page: "login"})} toLogin={() => setCurrentPage({page:"login"})} />

  if (page === "feed")
    return <Feed tok={tok} />
  else if (page === "myPage")
    return <MyPage tok={currentPage.tok} />
  else if (page === "userPage")
    return <UserPage tok={tok} username={currentPage.username} />
  else if (page === "settings")
    return <Settings tok={tok} />
}

function App() {
  const [ cookies ] = useCookies(["tok"])
  const tok = (cookies.tok === undefined || cookies.tok === "undefined") ? "" : cookies.tok
  const [ currentPage, setCurrentPage ] = useState({ page: "feed" })

  return (
    <div>
      <Header tok={tok} setCurrentPage={setCurrentPage} />
      <div style={appContentDiv}>
        <AppContent setCurrentPage={setCurrentPage} currentPage={Object.assign({ tok }, currentPage)} />
      </div>
    </div>
  )
}

export default App

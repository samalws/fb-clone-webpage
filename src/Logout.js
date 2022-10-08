import { gql, useMutation } from "@apollo/client"
import { useCookies } from "react-cookie"

const logoutMutation = gql`
mutation Logout($tok: String!) {
  clearTok(tok: $tok)
}
`

function Logout(props) {
  const [ logoutMut ] = useMutation(logoutMutation)
  const [ cookies, deleteCookie ] = useCookies(["tok"])

  function logout() {
    logoutMut({ variables: { tok: cookies.tok  }})
    deleteCookie("tok")
    props.callback()
  }

  return (<button onClick={logout}>Log out</button>)
}

export default Logout

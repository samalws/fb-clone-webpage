import { useState } from "react"
import { gql, useApolloClient, useMutation } from "@apollo/client"
import { useCookies } from "react-cookie"

import { Buffer } from "buffer"
window.Buffer ??= Buffer
const keccak256 = require("keccak256")

const lookupQuery = gql`
query LookupQuery($username: String!) {
  lookupUsername(username: $username) {
    id
  }
}
`

const loginMutation = gql`
mutation Login($id: String!, $pwHashPreSalt: String!) {
  login(id: $id, pwHashPreSalt: $pwHashPreSalt)
}
`

function Login(props) {
  const [ text, changeText ] = useState({ username: "", password: "" })
  const client = useApolloClient()
  const [ loginMut ] = useMutation(loginMutation)
  const setCookie = useCookies(["tok"])[1]

  async function login() {
    const { username, password } = text
    changeText({ username: "", password: "" })
    const idResp = await client.query({ query: lookupQuery, variables: { username }})
    if (idResp.data.lookupUsername === null) {
      alert("nonexistent username") // TODO show error message
      return
    }
    const id = idResp.data.lookupUsername.id
    const tokResp = await loginMut({ variables: { id, pwHashPreSalt: keccak256(password).toString("base64") }})
    const tok = tokResp.data.login
    if (tok === null) {
      alert("incorrect username or password") // TODO show error message
      return
    }
    setCookie("tok", tok)
    props.callback()
  }

  // TODO in onChange, why do we need to set both username and password? shouldnt that be assumed that we ignore the other one?
  // TODO when the webpage doesnt have a # in front of it, it reloads
  return (<form action="#" onSubmit={login}>
    <input type="text" value={text.username} onChange={ (event) => changeText({ username: event.target.value, password: text.password }) } />
    <input type="password" value={text.password} onChange={ (event) => changeText({ username: text.username, password: event.target.value }) } />
    <input type="submit" value="Log in" />
  </form>)
}

export default Login

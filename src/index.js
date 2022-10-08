import React from "react"
import ReactDOM from "react-dom/client"
import * as apollo from "@apollo/client"

import { lightGray } from "./Style"
import App from "./App"

const client = new apollo.ApolloClient({
  uri: "https://v8rr6wgff2.execute-api.us-east-1.amazonaws.com/dev/",
  cache: new apollo.InMemoryCache(),
})

document.body.style.backgroundColor = lightGray

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <apollo.ApolloProvider client={client}>
      <App />
    </apollo.ApolloProvider>
  </React.StrictMode>
)

const black = "#000000"
const darkGray = "#888888"
const gray = "#AAAAAA"
const lightGray = "#CCCCCC"
const red = "#FF0000"

const fontFamily = ["sans-serif"]

const emptyBtn = {
  backgroundColor: "transparent",
  borderColor: "transparent",
}

const clickable = { cursor: "pointer" }

const displayBlock = { display: "block" }

export const blockInputBox = Object.assign({}, displayBlock, {
  marginTop: 10,
  marginBottom: 10,
})

export const inlineInputBox = {
  marginRight: 10,
}

export const body = {
  backgroundColor: lightGray,
  margin: 0,
  fontFamily: fontFamily,
}

export const text = {
  color: black,
}

export const textBig = Object.assign({}, text, { fontSize: 24 })

export const linkText = Object.assign({}, text, clickable)

export const headerDiv = {
  backgroundColor: gray,
  padding: 10,
}

export const headerBtn = Object.assign({}, emptyBtn, clickable)

export const logo = Object.assign({
  color: black,
  fontWeight: "bold",
  marginLeft: 10,
  marginRight: 10,
  fontSize: 16,
}, headerBtn)

export const headerBtnRight = Object.assign({ float: "right" }, headerBtn)

export const appContentDiv = {
  padding: 10,
}

export const userSearchForm = {
  display: "inline",
  float: "right",
}

export const userSearchBox = {}

export const userSearchBtn = headerBtn

export const postDiv = {
  backgroundColor: gray,
  padding: 10,
  marginTop: 10,
  marginBottom: 10,
}

export const replyDiv = {
  backgroundColor: darkGray,
  padding: 10,
  margin: 10,
}

export const feedDiv = {}

export const imgUploadInline = { marginLeft: 10, marginRight: 10 }

export const imgUploadBlock = Object.assign({}, displayBlock, { marginTop: 10, marginBottom: 10 })

export const likeDiv = {}

export const likeBtn = Object.assign({}, emptyBtn, clickable, { color: red })

export const likeText = Object.assign({}, linkText, {color: red})

export const loginForm = {}

export const loginBtn = {}

export const makeAccountForm = {}

export const makeAccountBtn = {}

export const myPageDiv = {}

export const pfp = {
  width: 30,
  height: 30,
  marginRight: 10,
}

export const pfpBig = {
  width: 100,
  height: 100,
  marginRight: 10,
}

export const commentPosterDiv = {}

export const commentBodyDiv = {}

export const repostBtn = {}

export const replyBoxForm = {}

export const replyBtn = {}

export const settingsDiv = {}

export const settingsBtn = {}

export const settingsForm = {}

export const userPageDiv = {}

export const writePostForm = {}

export const postBtn = {}

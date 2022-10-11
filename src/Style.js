const black = "#000000"
const darkGray = "#888888"
const gray = "#AAAAAA"
const lightGray = "#CCCCCC"

const fontFamily = ["sans-serif"]

export const body = {
  backgroundColor: lightGray,
  margin: 0,
  fontFamily: fontFamily,
}

export const text = {
  color: black,
}

export const linkText = {
  color: black,
  cursor: "pointer",
}

export const headerDiv = {
  backgroundColor: gray,
  padding: 10,
}

export const headerBtn = {
  backgroundColor: "transparent",
  borderColor: "transparent",
  cursor: "pointer",
}

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

export const post = {
  backgroundColor: gray,
  padding: 10,
}

export const reply = {
  backgroundColor: darkGray,
  padding: 10,
  margin: 10,
}

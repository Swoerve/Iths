import { saveToLoSto } from "./session-storage.js"
import * as utils from "./utils.js"

const loginForm = document.querySelector("#login-form")

loginForm.addEventListener("submit", (e) => {
  e.preventDefault()
  let data = new FormData(loginForm)
  let username = data.get("username")
  if(validName(username)){
    saveToLoSto("user", username)
    utils.movePage("app.html")
  }
  console.log(username)
})

// checks if the name is valid depending on specific criteria
function validName(name){
  if(name.length > 6){
    return true
  }
  return false
}
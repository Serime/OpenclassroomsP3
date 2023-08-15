const API_URL = "http://localhost:5678/api/"
//import { API_URL } from "./index.js";
//http://localhost:5678/api/users/login
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loginInput = document.getElementById('login');
const txtErrorLogin = document.getElementById('forgot-password-text');

let user = {
  email: "",
  password: ""
};

var myInit = {
  method: "POST",
  headers: {'Content-Type': 'application/json;charset=utf-8'},
  body: JSON.stringify(user),
};

function login () {
  user.email = emailInput.value;
  user.password = passwordInput.value;
  myInit.body = JSON.stringify(user);
  fetchLogin("users/login");
}

function loginOk (responseJson) {
  localStorage.setItem("token", responseJson.token);
  document.location.href="index.html"; 
}

function loginKo () {
  txtErrorLogin.setAttribute("class", "display");
}

function listenLoginInput() {
  loginInput.addEventListener("click", login);
}

async function fetchLogin(path) {
  const response = await fetch(API_URL + path, myInit);
  const responseJson = await response.json();
  if (response.ok)
  {
    loginOk(responseJson);
  }
  else
  {
    loginKo();
  }
  
}

listenLoginInput();


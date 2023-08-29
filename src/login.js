const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loginInput = document.getElementById('login');
const txtErrorEmailMissing = document.getElementById('txt-error-email-missing');
const txtErrorPasswordMissing = document.getElementById('txt-error-password-missing');
const txtErrorLogin = document.getElementById('txt-error-login');

let user = {
  email: "",
  password: ""
};

var initJson = {
  method: "POST",
  headers: {'Content-Type': 'application/json;charset=utf-8'},
  body: JSON.stringify(user),
};

function login() {
  user.email = emailInput.value;
  user.password = passwordInput.value;
  user.email ? txtErrorEmailMissing.setAttribute("class", "display-none") : txtErrorEmailMissing.setAttribute("class", "display");
  user.password ? txtErrorPasswordMissing.setAttribute("class", "display-none") : txtErrorPasswordMissing.setAttribute("class", "display");
  if (user.email && user.password)
  {
    initJson.body = JSON.stringify(user);
    fetchAPI("users/login", initJson, loginOK, loginKO);
  }
  else
  {
    txtErrorLogin.setAttribute("class", "display-none");
  }
}

function loginOK(responseJson) {
  localStorage.setItem("token", responseJson.token);
  document.location.href="index.html"; 
}

function loginKO() {
  txtErrorLogin.setAttribute("class", "display");
}

function listenLoginInput() {
  loginInput.addEventListener("click", login);
}

listenLoginInput();


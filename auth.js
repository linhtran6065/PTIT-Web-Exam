import { apiPost } from "./apiService.js";

const token = localStorage.getItem("token");

isTokenExpired();

export function isTokenExpired() {
  var data = { token: token };
  apiPost("/api/checkTokenExpired", data)
    .then((response) => {
      if (response.isTokenExpired) {
        refreshToken();
      } else {
        const currentUrl = window.location.href;
        if (currentUrl == "http://127.0.0.1:5500/index.html") {
          window.location.href =
            "http://127.0.0.1:5500/admin/ManageStudent.html";
        }
      }
    })
    .catch((error) => {
      console.log("Error", error);
    });
}

function validateLogin() {
  var loginUsername = document.getElementById("loginUsername").value;
  var loginPassword = document.getElementById("loginPassword").value;

  if (loginUsername != "" && loginPassword != "") {
    handleLogin(loginUsername, loginPassword);
  }
}
function handleLogin(loginUsername, loginPassword) {
  var data = {
    email: loginUsername,
    password: loginPassword,
  };

  apiPost("/api/login", data)
    .then((response) => {
      console.log("Fetched students:", response);
      localStorage.setItem("token", response.accessToken);
      localStorage.setItem("refreshToken", response.refreshToken);
      alert("Đăng nhập thành công");
      window.location.href = "http://127.0.0.1:5500/admin/index.html";
    })
    .catch((error) => {
      alert("Đăng nhập thất bại");
    });
}

function refreshToken() {
  const refreshToken = localStorage.getItem("refreshToken");

  apiPost("/api/refreshToken", {}, refreshToken)
    .then((response) => {
      console.log(response);
      localStorage.setItem("token", response.accessToken);
    })
    .catch((error) => {
      console.log(error);
      logout();
    });
}

export function logout() {
  isTokenExpired();
  apiPost("/api/logout", {}, token)
    .then((response) => {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      alert("Đăng xuất thành công");
      window.location.href = "http://127.0.0.1:5500/index.html";
    })
    .catch((error) => {
      console.log(error);
    });
}

window.validateLogin = validateLogin;

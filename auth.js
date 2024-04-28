import { apiPost } from "./apiService.js";

const token = localStorage.getItem("token");
isTokenExpired();

function isTokenExpired() {
  var data = { token: token };
  apiPost("/api/checkTokenExpired", data)
    .then((response) => {
      if (response.isTokenExpired) {
        refreshToken();
      } else {
        window.location.href = "http://127.0.0.1:5500/admin/index.html";
      }
    })
    .catch((error) => {
      console.log("Error", error);
    });
  // fetch("http://localhost:8080/api/checkTokenExpired", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     token: token,
  //   }),
  // })
  //   .then((res) => {
  //     if (!res.ok) {
  //       throw new Error("Network response was not ok ${response.status}");
  //     }
  //     return res.json();
  //   })

  //   .catch((error) => console.log(error));
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

  apiPost("/api/loginUser", data)
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
  apiPost("/api/refreshToken", null, null, refreshToken)
    .then((response) => {
      if (!response.ok) localStorage.setItem("token", response.accessToken);
    })
    .catch((error) => {
      console.log(error);
    });
}

window.validateLogin = validateLogin;

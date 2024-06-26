import { apiPost } from "./apiService.js";

isTokenExpired();

export function isTokenExpired() {
  const token = localStorage.getItem("token");
  let userId = localStorage.getItem("userId");
  let isAdmin = JSON.parse(localStorage.getItem("isAdmin"));

  const data = { token: token };
  apiPost("/api/checkTokenExpired", data)
    .then((response) => {
      if (response.isTokenExpired) {
        refreshToken();
      } else {
        if (userId == null) {
          localStorage.setItem("userId", response.decoded.id);
          localStorage.setItem(
            "isAdmin",
            JSON.stringify(response.decoded.isAdmin)
          );
          userId = localStorage.getItem("userId");
          isAdmin = JSON.parse(localStorage.getItem("isAdmin"));

          navigate(isAdmin);
        } else {
          const currentUrl = window.location.href;
          if (currentUrl == "https://linhtran6065.github.io/PTIT-Web-Exam/index.html") {
            navigate(isAdmin);
          }
        }
      }
    })
    .catch((error) => {
      console.log("Error", error);
    });
}

function navigate(isAdmin) {
  if (isAdmin) {
    window.location.href = "https://linhtran6065.github.io/PTIT-Web-Exam/admin/index.html";
  } else {
    window.location.href = "https://linhtran6065.github.io/PTIT-Web-Exam/user/index.html";
  }
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
      localStorage.setItem("token", response.accessToken);
      localStorage.setItem("refreshToken", response.refreshToken);
      alert("Đăng nhập thành công");
      isTokenExpired();
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

      isTokenExpired();
    })
    .catch((error) => {
      console.log(error);
      logout();
    });
}

export function logout() {
  isTokenExpired();
  apiPost("/api/logout", {}, localStorage.getItem("token"))
    .then((response) => {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("userId");
      localStorage.removeItem("isAdmin");
      alert("Đăng xuất thành công");
      window.location.href = "https://linhtran6065.github.io/PTIT-Web-Exam/index.html";
    })
    .catch((error) => {
      console.log(error);
    });
}

window.validateLogin = validateLogin;

import { apiDelete, apiGet, apiPost, apiPut } from "../../apiService.js";
import { isTokenExpired, logout } from "../../auth.js";

var userId = localStorage.getItem("userId");
var token = localStorage.getItem("token");

isTokenExpired();

getUserData();

console.log(userId);
function getUserData() {
  // Assume API endpoint for fetching user data is '/api/getUser'
  apiGet(`/api/users/${userId}`, token)
    .then((data) => {
      document.getElementById("firstName").textContent = data.user.firstName;
      document.getElementById("lastName").textContent = data.user.lastName;
      document.getElementById("email").textContent = data.user.email;
    })
    .catch((error) => {
      console.error("Error fetching user data:", error);
    });
}

function onFormSubmit() {
  isTokenExpired();
  const oldPassword = document.getElementById("oldPassword").value;
  const newPassword = document.getElementById("newPassword").value;
  var data = { oldPassword, newPassword };
  console.log(userId);
  apiPut(
    `/api/users/resetPassword/${userId}`,
    data,
    localStorage.getItem("token")
  )
    .then((response) => {
      if (response.message === "Password does not match!") {
        alert("Password does not match!");
      } else {
        alert("Update password successful");
      }
      document.getElementById("oldPassword").value = "";
      document.getElementById("newPassword").value = "";
    })
    .catch((error) => {
      alert(error.message);
    });
}
function handleLogOut() {
  logout();
}
window.onFormSubmit = onFormSubmit;
window.handleLogOut = handleLogOut;

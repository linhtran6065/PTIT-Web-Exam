import { apiDelete, apiGet, apiPost, apiPut } from "../../apiService.js";
import { isTokenExpired, logout } from "../../auth.js";

var userId = localStorage.getItem('userId');
var token = localStorage.getItem("token")

isTokenExpired();

getUserData();

console.log(userId);
function getUserData() {
    // Assume API endpoint for fetching user data is '/api/getUser'
    apiGet(`/api/users/${userId}`, token)
    .then(data => {
        document.getElementById('firstName').textContent = data.user.firstName;
        document.getElementById('lastName').textContent = data.user.lastName;
        document.getElementById('email').textContent = data.user.email;
    })
    .catch(error => {
        console.error('Error fetching user data:', error);
    })

}


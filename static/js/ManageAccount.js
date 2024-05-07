import { apiDelete, apiGet, apiPost, apiPut } from "../../apiService.js";
import { isTokenExpired, logout } from "../../auth.js";

var selectedRow = null;
var msv = null;
var createForm = document.getElementById("createForm");
var passwordForm = document.getElementById("passwordForm");

var passwordCreateForm = document.getElementById("passwordDiv");


var userList = [];
createForm.style.display = "none";
passwordForm.style.display = "none";

var isValid = (document.getElementById("validation").style.display = "none");

const token = localStorage.getItem("token");
isTokenExpired();
initTable();



function initTable() {
  apiGet("/api/users", localStorage.getItem("token"))
    .then((data) => {
      userList = data.data;
      console.log("Fetched users:", userList);
      renderStudents(userList);
    })
    .catch((error) => {
      console.error("Error fetching students:", error);
    });
}

function renderStudents(userList) {
  var table = document.getElementById("studentList").getElementsByTagName("tbody")[0];
    table.innerHTML = "";
    userList.forEach((user) => {
    var newRow = table.insertRow(table.length);
    const cell1 = newRow.insertCell(0);
    cell1.innerHTML = user.id;
    const cell2 = newRow.insertCell(1);
    cell2.innerHTML = user.firstName + " " + user.lastName;
    const cell3 = newRow.insertCell(2);
    cell3.innerHTML = user.email;
 

    const cell4 = newRow.insertCell(3);
    cell4.innerHTML = `<div class="detailBtn"> <button onclick="onEdit(this)">Sửa</button>
                       <button onClick="onDelete(this)">Xóa</button>
                       <button onClick="onForget(this)">Thay đổi mật khẩu</button>
                       `;
  });
}

function onFormSubmit() {
  if (validate()) {
    var formData = readFormData();
    if (selectedRow == null) insertNewRecord(formData);
    else updateRecord(formData);
    resetForm();
    document.getElementById("validation").style.display = "none";
  } else {
    document.getElementById("validation").style.display = "inline";
  }
}

function readFormData() {
  var formData = {};
  formData["firstName"] = document.getElementById("firstname").value;
  formData["lastName"] = document.getElementById("lastname").value;
  formData["email"] = document.getElementById("email").value;
  formData["password"] = document.getElementById("password").value;
  //studentList.push(formData);

  return formData;
}
function onCreate() {
  resetForm();
  createForm.style.display = createForm.style.display === "none" ? "block" : "none";
}

function insertNewRecord(data) {
  isTokenExpired();
  apiPost("/api/users", data, localStorage.getItem("token"))
    .then((response) => {
      if (response.message === "User already exists!") {
        alert("User already exists!");
      } 
      else {
        alert("Create user successful");
        initTable();
      }
    })
    .catch((error) => {
      alert(error.message);
      // alert("Create user error");
    });
}

function resetForm() {
  document.getElementById("firstname").value = "";
  document.getElementById("lastname").value = "";
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";

  selectedRow = null;
}

function onEdit(td) {
  createForm.style.display = createForm.style.display === "none" ? "block" : "none";
  passwordCreateForm.style.display = passwordCreateForm.style.display === "block" ? "none" : "block" ;

  selectedRow = td.parentElement.parentElement.parentElement;
  const cellContent = selectedRow.cells[1].innerHTML.trim();
  const parts = cellContent.split(" ");
  document.getElementById("firstname").value = parts[0];
  if (parts.length > 1) {
    document.getElementById("lastname").value = parts.slice(1).join(" ");
  } else {
    document.getElementById("lastname").value = "";
  }
  document.getElementById("email").value = selectedRow.cells[2].innerHTML;
}
function updateRecord(formData) {
  var userID = selectedRow.firstElementChild.innerHTML;
  isTokenExpired();
  apiPut(`/api/users/${userID}`, formData, localStorage.getItem("token"))
    .then((response) => {
      console.log("Fetched users:", response);
      initTable();
      alert("Update users successful");
    })
    .catch((error) => {
      alert(error.message);
      alert("Update student error");
    });
}

function onDelete(td) {
  selectedRow = td.parentElement.parentElement.parentElement;
  var userID = selectedRow.firstElementChild.innerHTML;
  if (confirm("Are you sure to delete this record ?")) {
    isTokenExpired();
    apiDelete(`/api/users/${userID}`, token)
      .then((response) => {
        alert("Delete successful");
        initTable();
      })
      .catch((error) => {
        alert("Delete error");
      });

    resetForm();
  }
}
function validate() {
  isValid = true;
  if( passwordCreateForm.style.display === 'block') {

    if (
      document.getElementById("firstname").value == "" ||
      document.getElementById("lastname").value == "" ||
      document.getElementById("email").value == "" || 
      document.getElementById("password").value == "" 
    ) 
    
    {
      isValid = false;
    } 
    
    else {
      isValid = true;
    }
  }
  else if ( passwordCreateForm.style.display === 'none') {
    if (
      document.getElementById("firstname").value == "" ||
      document.getElementById("lastname").value == "" ||
      document.getElementById("email").value == "" 
    ) 

    {
      isValid = false;
    } 
    
    else {
      isValid = true;
    }
  }

  return isValid;
}

function onForget() {
  passwordForm.style.display = passwordForm.style.display === "none" ? "block" : "none";
}

const searchInput = document.getElementById("searchInput");
function filterStudents() {
  const searchText = searchInput.value.toLowerCase();
  const filteredUser = userList.filter((user) => {
    var name = user.firstName + " " + user.lastName;
    const userMatch = name.toLowerCase().includes(searchText);
    return userMatch;
  });

  renderStudents(filteredUser);
}

searchInput.addEventListener("input", filterStudents);

function handleLogOut() {
  logout();
}

window.handleLogOut = handleLogOut;

window.onCreate = onCreate;
window.onEdit = onEdit;
window.onForget = onForget;

window.onDelete = onDelete;
window.onFormSubmit = onFormSubmit;
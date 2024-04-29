import { apiDelete, apiGet, apiPost, apiPut } from "../../apiService.js";
import { isTokenExpired, logout } from "../../auth.js";

var selectedRow = null;
var msv = null;
var createForm = document.getElementById("createForm");

var studentList = [];
createForm.style.display = "none";
var isValid = (document.getElementById("validation").style.display = "none");

const token = localStorage.getItem("token");

initTable();

// document.addEventListener("DOMContentLoaded", function () {
//   // fetch("http://localhost:8080/api/students", {
//   //   method: "GET",
//   //   headers: {
//   //     "Content-Type": "application/json",
//   //     Authorization: `Bearer ${token}`,
//   //   },
//   // })
//   //   .then((res) => {
//   //     if (!res.ok) {
//   //       throw new Error("Network response was not ok ${response.status}");
//   //     }
//   //     return res.json();
//   //   })
//   //   .then((data) => {
//   //     studentList = data.data;
//   //     renderStudents(studentList);
//   //   })gv
//   //   .catch((error) => console.log(error));
//   isTokenExpired();
//   apiGet("/api/students", token)
//     .then((data) => {
//       studentList = data.data;
//       console.log("Fetched students:", studentList);
//       renderStudents(studentList);
//     })
//     .catch((error) => {
//       console.error("Error fetching students:", error);
//     });
// });

function initTable() {
  isTokenExpired();
  apiGet("/api/students", token)
    .then((data) => {
      studentList = data.data;
      console.log("Fetched students:", studentList);
      renderStudents(studentList);
    })
    .catch((error) => {
      console.error("Error fetching students:", error);
    });
}

function renderStudents(studentList) {
  var table = document
    .getElementById("studentList")
    .getElementsByTagName("tbody")[0];
  table.innerHTML = "";
  studentList.forEach((student) => {
    var newRow = table.insertRow(table.length);
    const cell1 = newRow.insertCell(0);
    cell1.innerHTML = student.msv;
    const cell2 = newRow.insertCell(1);
    cell2.innerHTML = student.firstName + " " + student.lastName;
    const cell3 = newRow.insertCell(2);
    cell3.innerHTML = student.email;
    const cell4 = newRow.insertCell(3);
    cell4.innerHTML = student.class;

    const cell5 = newRow.insertCell(4);
    cell5.innerHTML = `<div class="detailBtn"> <button onclick="onEdit(this)">Sửa</button>
                       <button onClick="onDelete(this)">Xóa</button>
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
  formData["msv"] = document.getElementById("msv").value;
  formData["firstName"] = document.getElementById("firstname").value;
  formData["lastName"] = document.getElementById("lastname").value;
  formData["email"] = document.getElementById("email").value;
  formData["class"] = document.getElementById("class").value;
  //studentList.push(formData);

  return formData;
}
function onCreate() {
  createForm.style.display =
    createForm.style.display === "none" ? "block" : "none";
}

function insertNewRecord(data) {
  isTokenExpired();
  apiPost("/api/students", data, token)
    .then((response) => {
      console.log("Fetched students:", response);
      alert("Create student successful");
      studentList.push(data);
      renderStudents(studentList);
    })
    .catch((error) => {
      alert("Create student error");
    });
}

function resetForm() {
  document.getElementById("msv").value = "";
  document.getElementById("firstname").value = "";
  document.getElementById("lastname").value = "";
  document.getElementById("email").value = "";
  document.getElementById("class").value = "";

  selectedRow = null;
}

function onEdit(td) {
  createForm.style.display = "block";
  selectedRow = td.parentElement.parentElement.parentElement;
  msv = selectedRow.cells[0].innerHTML;
  document.getElementById("msv").value = selectedRow.cells[0].innerHTML;
  const cellContent = selectedRow.cells[1].innerHTML.trim();
  const parts = cellContent.split(" ");
  document.getElementById("firstname").value = parts[0];
  if (parts.length > 1) {
    document.getElementById("lastname").value = parts.slice(1).join(" ");
  } else {
    document.getElementById("lastname").value = "";
  }

  document.getElementById("email").value = selectedRow.cells[2].innerHTML;
  document.getElementById("class").value = selectedRow.cells[3].innerHTML;
}
function updateRecord(formData) {
  console.log(selectedRow);
  isTokenExpired();
  apiPut(`/api/students/${msv}`, formData, token)
    .then((response) => {
      console.log("Fetched students:", response);
      initTable();
      // console.log(selectedRow);
      // if (selectedRow) {
      //   selectedRow.cells[0].innerHTML = formData.msv;
      //   selectedRow.cells[1].innerHTML =
      //     formData.firstName + " " + formData.lastName;
      //   selectedRow.cells[2].innerHTML = formData.email;
      //   selectedRow.cells[3].innerHTML = formData.class;
      // }
      alert("Update student successful");
    })
    .catch((error) => {
      alert("Update student error");
    });
}

function onDelete(td) {
  if (confirm("Are you sure to delete this record ?")) {
    var row = td.parentElement.parentElement.parentElement;
    msv = row.cells[0].innerHTML;
    isTokenExpired();
    apiDelete(`/api/students/${msv}`, token)
      .then((response) => {
        alert("Delete successful");
        document.getElementById("studentList").deleteRow(row.rowIndex);
      })
      .catch((error) => {
        alert("Delete error");
      });

    resetForm();
  }
}
function validate() {
  isValid = true;
  if (
    document.getElementById("msv").value == "" ||
    document.getElementById("firstname").value == "" ||
    document.getElementById("lastname").value == "" ||
    document.getElementById("email").value == "" ||
    document.getElementById("class").value == ""
  ) {
    isValid = false;
  } else {
    isValid = true;
  }

  return isValid;
}

const searchInput = document.getElementById("searchInput");
function filterStudents() {
  const searchText = searchInput.value.toLowerCase();
  const filteredStudent = studentList.filter((student) => {
    var name = student.firstName + " " + student.lastName;
    const nameMatch = name.toLowerCase().includes(searchText);
    const msvMatch = student.msv.toLowerCase().includes(searchText);
    return nameMatch || msvMatch;
  });

  renderStudents(filteredStudent);
}

searchInput.addEventListener("input", filterStudents);

function handleLogOut() {
  logout();
}

window.handleLogOut = handleLogOut;

window.onCreate = onCreate;
window.onEdit = onEdit;
window.onDelete = onDelete;
window.onFormSubmit = onFormSubmit;

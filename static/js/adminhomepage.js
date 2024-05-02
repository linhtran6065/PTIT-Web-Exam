import { apiDelete, apiGet, apiPost, apiPut } from "../../apiService.js";
import { isTokenExpired, logout } from "../../auth.js";

// var createForm = document.getElementById("createForm");

var examList = [];
// createForm.style.display = "none";
var isValid = (document.getElementById("validation").style.display = "none");

const token = localStorage.getItem("token");
isTokenExpired();
initTable();
var id = null;

var selectedRow = null;
const createExamBtn = document.getElementById("createExamBtn");
var createForm = document.getElementById("createForm");
createExamBtn.addEventListener("click", onCreate);

// 1. Tạo bảng và render bảng
function initTable() {
  isTokenExpired();
  apiGet("/api/exams", localStorage.getItem("token"))
    .then((exam) => {
      examList = exam.data;
      console.log("Fetched exams:", examList);
      renderExams(examList);
    })
    .catch((error) => {
      console.error("Error fetching exams:", error);
    });
}

function renderExams(exams) {
  examTable.innerHTML = "";
  exams.forEach((exam) => {
    const row = document.createElement("tr");
    let statusClass = "",
      statusText = "";
    if (exam.type === "Tự do") {
      statusClass = "accessible";
      statusText = "Truy cập tự do";
    } else if (exam.type === "Yêu cầu thời gian cụ thể") {
      statusClass = "scheduled";
      statusText = "Yêu cầu thời gian cụ thể";
    }
    row.innerHTML = `
              <tr>
              <td>
                  <p>${exam.name}</p>
              </td>
              <td>${exam.description}</td>
              <td><span class="status ${statusClass}">${statusText}</span></td>
              <td class="actionAdminButton"><div class="detailBtn"> <button onClick="onEdit(this)">Sửa</button>
              <button onClick="onDelete(this)">Xóa</button>
              <button onClick="onViewDetail(this)">Xem</button></div></td>
          </tr>
        `;
    examTable.appendChild(row);
  });
}

// 2. Thêm mới bài thi + form thêm mới
function onCreate() {
  if (createForm.classList.contains("inactive")) {
    createForm.classList.remove("inactive");
  } else {
    createForm.classList.add("inactive");
  }
}

// bắt sự kiện thêm mới bài thi
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
  console.log("formData");
}

// đọc dữ liệu nhập
function readFormData() {
  var formData = {};
  formData["userId"] = document.getElementById("userId").value;
  formData["name"] = document.getElementById("name").value;
  formData["description"] = document.getElementById("description").value;

  if (document.getElementById("statusFilterForm").value == "accessible") {
    formData["type"] = "Tự do";
  } else {
    formData["type"] = "Yêu cầu thời gian cụ thể";
  }
  return formData;
}

function insertNewRecord(data) {
  isTokenExpired();
  apiPost("/api/exams", data, localStorage.getItem("token"))
    .then((response) => {
      console.log("Fetched exams:", response);
      alert("Create exams successful");
      examList.push(data);
      renderExams(examList);
    })
    .catch((error) => {
      alert("Create exam error");
    });
}

// reset form sau khi thêm mới
function resetForm() {
  document.getElementById("userId").value = "";
  document.getElementById("name").value = "";
  document.getElementById("description").value = "";
  document.getElementById("statusFilter").value = "";
  selectedRow = null;
}

// function updateRecord(formData) {
//   console.log(formData, "object");
//   selectedRow.cells[0].innerHTML = formData.name;
//   selectedRow.cells[1].innerHTML = formData.description;
//   if ((document.getElementById("statusFilterForm").value = "accessible")) {
//     selectedRow.cells[2].querySelector("span").innerHTML == "Truy cập tự do";
//   } else {
//     selectedRow.cells[2].querySelector("span").innerHTML ==
//       "Yêu cầu thời gian cụ thể";
//   }
//   //selectedRow.cells[2].innerHTML = formData.type;
// }

function validate() {
  isValid = true;
  if (
    document.getElementById("name").value == "" ||
    document.getElementById("description").value == "" ||
    document.getElementById("statusFilterForm").value == "" ||
    document.getElementById("userId").value == ""
  ) {
    isValid = false;
  } else {
    isValid = true;
  }

  return isValid;
}

// 3. Sửa bài thi
function onEdit(td) {
  if (createForm.classList.contains("inactive")) {
    createForm.classList.remove("inactive");
    selectedRow = td.parentElement.parentElement.parentElement;
    document.getElementById("name").value =
      selectedRow.cells[0].querySelector("p").innerHTML;
    //document.getElementById("name").value = selectedRow.cells[0].innerHTML;
    document.getElementById("description").value =
      selectedRow.cells[1].innerHTML;
    if (
      selectedRow.cells[2].querySelector("span").innerHTML == "Truy cập tự do"
    ) {
      document.getElementById("statusFilterForm").value = "accessible";
    } else {
      document.getElementById("statusFilterForm").value = "scheduled";
    }
  } else {
    createForm.classList.add("inactive");
    resetForm();
    selectedRow = null;
  }
}

function updateRecord(formData) {
  isTokenExpired();
  apiPut(`/api/exams/${id}`, formData, localStorage.getItem("token"))
    .then((response) => {
      console.log("Fetched exams:", response);
      initTable();
      alert("Update exam successful");
    })
    .catch((error) => {
      alert("Update exam error");
    });
}

function onDelete(td) {
  isTokenExpired();
  if (confirm("Bạn có chắc chắn muốn xóa bài thi này?")) {
    var row = td.parentElement.parentElement.parentElement;
    var name = examList.find(
      (exam) => exam.name === row.cells[0].querySelector("p").innerHTML
    );

    apiDelete(`/api/exams/${row.rowIndex}`, localStorage.getItem("token"))
      .then((response) => {
        alert("Delete successful");
        document.getElementById("examList").deleteRow(row.rowIndex);
        examList.splice(examList.indexOf(name), 1);
        renderExams(examList);
      })
      .catch((error) => {
        alert("Delete error");
      });

    resetForm();
  }
}

function onViewDetail(data) {
  window.location.href = "./create.html";
}

function handleLogOut() {
  logout();
}

window.onEdit = onEdit;
window.onDelete = onDelete;
window.onFormSubmit = onFormSubmit;
window.onCreate = onCreate;
window.onViewDetail = onViewDetail;
window.handleLogOut = handleLogOut;

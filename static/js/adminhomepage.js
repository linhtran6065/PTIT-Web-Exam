import { apiDelete, apiGet, apiPost, apiPut } from "../../apiService.js";
import { isTokenExpired, logout } from "../../auth.js";

// import flatpickr from "flatpickr";
// var createForm = document.getElementById("createForm");

var examList = [];
// createForm.style.display = "none";
var isValid = (document.getElementById("validation").style.display = "none");

const token = localStorage.getItem("token");
var userID = localStorage.getItem("userId");

isTokenExpired();
initTable();
var examID = null;

var selectedRow = null;
const createExamBtn = document.getElementById("createExamBtn");
var createForm = document.getElementById("createForm");
createExamBtn.addEventListener("click", onCreate);


// 1. Tạo bảng và render bảng
function initTable() {
  isTokenExpired();
  apiGet("/api/exams", token)
    .then((exam) => {
      examList = exam.data;
      console.log("Fetched exams:", examList);
      renderExams(examList);
    })
    .catch((error) => {
      console.error("Error fetching exams:", error);
    });
}

const searchInput = document.getElementById('searchInput');
const statusFilter = document.getElementById('statusFilter');

statusFilter.addEventListener('change', renderFilteredExams);
searchInput.addEventListener('input', renderFilteredExams);

function renderFilteredExams() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  var selectedCategory = statusFilter.value;
  console.log(selectedCategory);
  const filteredExams = examList.filter(exam => {
      const nameMatch = exam.name.toLowerCase().includes(searchTerm);
      if(selectedCategory === 'accessible') selectedCategory = 'Tự do';
      if(selectedCategory === 'scheduled') selectedCategory = 'Yêu cầu thời gian cụ thể';
      if (selectedCategory === 'all') {
          return nameMatch;
      } else {
          return (nameMatch) && exam.type === selectedCategory;
      }
  });
  
  renderExams(filteredExams);
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
    var startTimeString = exam.startTime;
    var endTimeString = exam.endTime;
    if(startTimeString || endTimeString) {
      var [startDate, startTime] = startTimeString.split("T");
      var [endDate, endTime] = endTimeString.split("T");
      
      // Extract hours and minutes
      var [endHours, endMinutes] = endTime.split(":").slice(0, 2);
      var [startHours, startMinutes] = startTime.split(":").slice(0, 2);

      // Convert startHours to an integer and add 7
var newStartHours = (parseInt(startHours) + 7) % 24;
var newEndHours = (parseInt(endHours) + 7) % 24;

// Convert newStartHours back to a string
var formattedNewStartHours = String(newStartHours);
var formattedNewEndHours = String(newEndHours);


// If newStartHours is less than 10, prepend a '0' to maintain two-digit format
if (newStartHours < 10) {
    formattedNewStartHours = "0" + formattedNewStartHours;
}

if (newEndHours < 10) {
  formattedNewEndHours = "0" + formattedNewEndHours;
}

      // Format the time
      var formattedEndTime = `${formattedNewEndHours}:${endMinutes}`;
      var formattedStartTime = `${formattedNewStartHours}:${startMinutes}`;
    
  

    }

    if(exam.type === "Tự do") {
      startDate = "Không giới hạn";
      formattedStartTime = "Không giới hạn";
      formattedEndTime = "Không giới hạn"

    }


    row.innerHTML = `
              <tr>
              <td>${exam.id}</td>
              <td>
                  <p>${exam.name}</p>
              </td>
              <td>${startDate} </td>
              <td>${formattedStartTime} - ${formattedEndTime} </td>

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

  if (createForm.classList.contains("inactive")) {
    createForm.classList.remove("inactive");
  }
  else {
    createForm.classList.add("inactive");

  }

  console.log("formData");
}

console.log(userID);  
// đọc dữ liệu nhập
function readFormData() {
  var formData = {};
  formData["userId"] = userID;
  formData["name"] = document.getElementById("name").value;
  formData["description"] = document.getElementById("description").value;
  formData["startTime"] = document.getElementById("timeStart").value;
  formData["endTime"] =document.getElementById("timeEnd").value; ;
  if (document.getElementById("statusFilterForm").value == "accessible") {
    formData["type"] = "Tự do";
  } else {
    formData["type"] = "Yêu cầu thời gian cụ thể";
  }

  console.log( formData["startTime"] );
  console.log( formData["endTime"] );

  return formData;
}

function insertNewRecord(data) {
  isTokenExpired();
  apiPost("/api/exams", data, token)
    .then((response) => {
      console.log("Fetched exams:", response);
      initTable();
      alert("Create exams successful");
    })
    .catch((error) => {
      console.log(error.message);
      alert("Create exam error");
    });
}

// reset form sau khi thêm mới
function resetForm() {
  document.getElementById("name").value = "";
  document.getElementById("description").value = "";
  document.getElementById("statusFilter").value = "";
  selectedRow = null;
}



function validate() {
  isValid = true;
  if (
    document.getElementById("name").value == "" ||
    document.getElementById("description").value == "" ||
    document.getElementById("statusFilterForm").value == ""
  
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
    examID = selectedRow.cells[0].innerHTML;
    console.log(selectedRow);
    document.getElementById("name").value =
      selectedRow.cells[1].querySelector("p").innerHTML;
    document.getElementById("description").value =
      selectedRow.cells[2].innerHTML;
    if (
      selectedRow.cells[3].querySelector("span").innerHTML == "Truy cập tự do"
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
  apiPut(`/api/exams/${examID}`, formData, token)
    .then((response) => {
      console.log("Fetched exams:", response);
      initTable();
      alert("Update exam successful");
    })
    .catch((error) => {
      alert(error.message);
      alert("Update exam error");
    });
}


function onDelete(td) {
  if (confirm("Bạn có chắc chắn muốn xóa bài thi này?")) {
    var row = td.parentElement.parentElement.parentElement;
    examID = row.cells[0].innerHTML;
    isTokenExpired();
    apiDelete(`/api/exams/${examID}`, token)
      .then((response) => {
        alert("Delete successful");      
        document.getElementById("examList").deleteRow(row.rowIndex);
      })
      .catch((error) => {
        alert("Delete error");
      });
      resetForm();
  }
}





function onViewDetail(td) {
  var row = td.parentElement.parentElement.parentElement;
  examID = row.cells[0].innerHTML;
 
  window.location.href = "./create.html?id=" + examID;
}


function handleLogOut() {
  logout();
}

window.onEdit = onEdit
window.onDelete = onDelete
window.onFormSubmit= onFormSubmit;
window.onCreate = onCreate;
window.onViewDetail = onViewDetail;
window.handleLogOut = handleLogOut;
// window.searchExam = searchExam;
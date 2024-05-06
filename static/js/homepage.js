import { apiDelete, apiGet, apiPost, apiPut } from "../../apiService.js";
import { isTokenExpired, logout } from "../../auth.js";

 

var examList = [];

const token = localStorage.getItem("token");
isTokenExpired();
initTable();
var id = null;

var selectedRow = null;


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
    row.innerHTML = `
              <tr>
              <td>${exam.id}</td>
              <td>
                  <p>${exam.name}</p>
              </td>
              <td>${exam.startTime} - ${exam.endTime}</td>
              <td>${exam.description}</td>
              <td><span class="status ${statusClass}">${statusText}</span></td>
              <td class="join-exam" exam-name="${exam.name}"><button class="status join" onClick="onViewDetail(this)" >Tham gia thi</button></td>
          </tr>
        `;
    examTable.appendChild(row);
  });
}

function onViewDetail(data) {
  var row = data.parentNode.parentNode; // Get the parent row of the button
  var examID = row.firstElementChild.innerHTML
  window.location.href = "./test.html?id=" + examID;
}


function handleLogOut() {
  logout();
}

window.onViewDetail = onViewDetail;
window.handleLogOut = handleLogOut;

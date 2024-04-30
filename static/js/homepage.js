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
              <td class="join-exam" exam-name="${exam.name}"><button class="status join" onClick="onViewDetail(this)" >Tham gia thi</button></td>
          </tr>
        `;
    examTable.appendChild(row);
  });
}

function onViewDetail(data) {
  var row = data.parentNode.parentNode; // Get the parent row of the button
  var examId = row.rowIndex;  
  window.location.href = "./test.html?id=" + examId;
}


function handleLogOut() {
  logout();
}

window.onViewDetail = onViewDetail;
window.handleLogOut = handleLogOut;

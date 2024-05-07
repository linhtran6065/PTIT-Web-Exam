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
statusFilter.addEventListener("change", renderFilteredExams);
searchInput.addEventListener("input", renderFilteredExams);

function renderFilteredExams() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  var selectedCategory = statusFilter.value;
  console.log(selectedCategory);
  const filteredExams = examList.filter((exam) => {
    const nameMatch = exam.name.toLowerCase().includes(searchTerm);
    if (selectedCategory === "accessible") selectedCategory = "Tự do";
    if (selectedCategory === "scheduled")
      selectedCategory = "Yêu cầu thời gian cụ thể";
    if (selectedCategory === "all") {
      return nameMatch;
    } else {
      return nameMatch && exam.type === selectedCategory;
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
    if (startTimeString || endTimeString) {
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

      // kiểm tra truy cập
    }

    if (exam.type === "Tự do") {
      startDate = "Không giới hạn";
      formattedStartTime = "Không giới hạn";
      formattedEndTime = "Không giới hạn";
    }

    row.innerHTML = `
              <tr>
              <td>${exam.id}</td>
              <td>
                  <p>${exam.name}</p>
              </td>
              <td>${startDate}</td>
              <td>${formattedStartTime} - ${formattedEndTime}</td>
              <td>${exam.description}</td>
              <td><span class="status ${statusClass}">${statusText}</span></td>
              <td class="join-exam" exam-name="${exam.name}"><button class="status join" onClick="onViewDetail(this)" >Tham gia thi</button></td>
          </tr>
        `;
    examTable.appendChild(row);
  });
}
var examID = null;
function onViewDetail(data) {
  var row = data.parentNode.parentNode; // Get the parent row of the button
  examID = row.firstElementChild.innerHTML;
  isTokenExpired();
  // console.log(examID);
  apiGet(`/api/exams/${examID}`, token)
    .then((response) => {
      console.log(response.exam);
      var startTest = new Date(response.exam.startTime);
      var endTest = new Date(response.exam.endTime);
      var currentTime = new Date();

      console.log(startTest);
      console.log(endTest);
      console.log(currentTime);

      if (response.exam.type != "Tự do" && currentTime < startTest)
        alert("Chưa đến giờ làm bài thi");
      else if (response.exam.type != "Tự do" && currentTime > endTest)
        alert("Quá giờ làm bài thi");
      else {
        alert("Bài thi sẽ bắt đầu");
        window.location.href = "./test.html?id=" + examID;
      }
    })
    .catch((error) => {
      console.error("Error fetching exams:", error);
    });

  // Lấy thời gian hiện tại
}

function handleLogOut() {
  logout();
}

window.onViewDetail = onViewDetail;
window.handleLogOut = handleLogOut;

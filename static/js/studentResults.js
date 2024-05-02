import { apiDelete, apiGet, apiPost, apiPut } from "../../apiService.js";
import { isTokenExpired, logout } from "../../auth.js";

isTokenExpired();
const token = localStorage.getItem("token");
const totalQuestions = localStorage.getItem("count");

function searchStudent() {
  isTokenExpired();
  const searchInput = document
    .getElementById("searchInput")
    .value.trim()
    .toLowerCase();
  const resultsContainer = document.getElementById("resultsContainer");
  resultsContainer.innerHTML = ""; // Clear previous results

  apiGet(`/api/forms/student/${searchInput}`, localStorage.getItem("token"))
    .then((students) => {
      if (students) {
        renderForm(students);
      } else {
        resultsContainer.innerHTML = "<p>Không tìm thấy kết quả.</p>";
      }
    })
    .catch((error) => {
      console.error("Error", error);
    });
  // const filteredStudents = studentsData.filter(student =>
  //     student.name.toLowerCase().includes(searchInput) || student.studentId.toLowerCase().includes(searchInput)
  // );
}
// hiển thị ngày theo dạng dd-mm-yyy
function convertDateFormat(dateStr) {
  return new Date(dateStr).toLocaleString();
}
function renderForm(filteredStudent) {
  const table = document.createElement("table");
  table.innerHTML = `
            <thead>
                <tr>
                    <th>Tên Sinh Viên</th>
                    <th>MSV</th>
                    <th>Kỳ Thi</th>
                    <th>Thời gian bắt đầu</th>
                    <th>Thời gian kết thúc</th>
                    <th>Điểm</th>
                    <th>Hoàn thành</th>
                    <th>Chi Tiết</th>
                </tr>
            </thead>
            <tbody>
                ${filteredStudent.data
                  .map(
                    (data) =>
                      `
                        <tr>
                            <td>${
                              filteredStudent.student.firstName +
                              " " +
                              filteredStudent.student.lastName
                            }</td>
                            <td>${filteredStudent.student.msv}</td>
                            <td>${data.exam.name}</td>
                            <td>${convertDateFormat(data.startTime)}</td>
                            <td>${convertDateFormat(data.endTime)}</td>
                            <td>${(data.score / totalQuestions) * 10}</td>
                            <td>${data.isFinish}</td>
                            <td><button class="view-details-btn" data-formid="${
                              data.id
                            }" data-examname="${
                        data.exam.name
                      }" >Xem</button></td>
                        </tr>
                    `
                  )
                  .join("")}
            </tbody>
        `;
  resultsContainer.appendChild(table);
}

function showExamDetails(formId, examName) {
  //   const students = studentsData.filter(
  //     (student) => student.studentId === studentId
  //   );
  //   allMatchingExamsAnswers = [];
  //   // Lặp qua tất cả sinh viên tìm được
  //   students.forEach((student) => {
  //     // Tìm và thêm các kỳ thi phù hợp vào mảng kết quả
  //     student.exams.forEach((ex) => {
  //       if (ex.exam === examName) {
  //         allMatchingExamsAnswers.push(ex);
  //       }
  //     });
  //   });
  //   const exam = allMatchingExamsAnswers[0];
  isTokenExpired();
  apiGet(`/api/results/form/${formId}`, localStorage.getItem("token"))
    .then((data) => {
      renderAnswerDetails(data.data, examName);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// Hàm hiển thị chi tiết câu trả lời
function renderAnswerDetails(data, examName) {
  let detailsHtml = `<h2>Chi Tiết Bài Thi: ${examName}</h2>`;
  //   data.answers.forEach((answer) => {
  //     detailsHtml += `
  //         <p>Câu hỏi: ${answer.question}</p>
  //         <p>Đáp án của bạn: ${answer.studentAnswer}</p>
  //         <p>Đáp án đúng: <span class="correct-answer">${answer.correctAnswer}</span></p>
  //         <p>Giải thích: ${answer.explanation}</p>
  //         <hr>`;
  //   });
  document.getElementById("examDetails").innerHTML = "";
  data.forEach((ques, index) => {
    const div = document.createElement("div");
    const p = document.createElement("p");
    const hr = document.createElement("hr");
    p.innerHTML = `Đáp án đúng: <span id="answerSpan" class="correct-answer">${ques.correctAnswer.name}</span>`;

    div.innerHTML = `
            <p>Câu hỏi: ${ques.question.name}</p>
            <p>Đáp án của bạn: ${ques.answer.name}</p>
            `;

    div.appendChild(p);
    div.appendChild(hr);

    document.getElementById("examDetails").appendChild(div);
    if (ques.answer.isCorrect == false) {
      document.getElementById("answerSpan").style.color = "#db504a";
    }
  });

  document.getElementById("examDetailPopup").style.display = "block";
}

// Hàm để đóng popup
function closePopup() {
  document.getElementById("examDetailPopup").style.display = "none";
}

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("resultsContainer")
    .addEventListener("click", function (event) {
      const target = event.target;
      if (target.classList.contains("view-details-btn")) {
        const formId = target.getAttribute("data-formid");
        const examName = target.getAttribute("data-examname");
        showExamDetails(formId, examName);
      }
    });
});

function exportToExcel() {
  const searchInput = document
    .getElementById("searchInput")
    .value.trim()
    .toLowerCase();
  const filteredStudents = studentsData.filter(
    (student) =>
      student.name.toLowerCase().includes(searchInput) ||
      student.studentId.toLowerCase().includes(searchInput)
  );
  // Kiểm tra xem có kết quả nào không
  if (filteredStudents.length > 0) {
    // Tạo worksheet
    const ws = XLSX.utils.json_to_sheet(filteredStudents);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Kết Quả");
    XLSX.writeFile(wb, "KetQuaTimKiem.xlsx");
  } else {
    alert("Không có dữ liệu để xuất!");
  }
}

window.searchStudent = searchStudent;
window.closePopup = closePopup;

//  if (filteredStudent.length > 0) {
//    const table = document.createElement("table");
//    table.innerHTML = `
//             <thead>
//                 <tr>
//                     <th>Tên Sinh Viên</th>
//                     <th>MSV</th>
//                     <th>Kỳ Thi</th>
//                     <th>Ngày Thi</th>
//                     <th>Điểm</th>
//                     <th>Hoàn thành</th>
//                     <th>Chi Tiết</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 ${filteredStudent
//                   .map((data) =>
//                     student.data
//                       .map(
//                         (exam) => `
//                         <tr>
//                             <td>${student.name}</td>
//                             <td>${student.studentId}</td>
//                             <td>${exam.exam}</td>
//                             <td>${exam.date}</td>
//                             <td>${exam.score}</td>
//                             <td>${exam.completed}</td>
//                             <td><button class="view-details-btn" data-studentid="${student.studentId}" data-examname="${exam.exam}">Xem</button></td>
//                         </tr>
//                     `
//                       )
//                       .join("")
//                   )
//                   .join("")}
//             </tbody>
//         `;
//    resultsContainer.appendChild(table);
//  } else {
//    resultsContainer.innerHTML = "<p>Không tìm thấy kết quả.</p>";
//  }

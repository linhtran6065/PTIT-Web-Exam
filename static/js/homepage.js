// // homepage render dữ liệu

// function startExam(examName, status) {
//   if (status === 'accessible') {
//     alert(`Bạn sẽ bắt đầu làm bài ${examName}`);
//     window.location.href = "https://linhtran6065.github.io/PTIT-Web-Exam/user/test.html";
//   } else {
//     alert(`Bài thi ${examName} yêu cầu thời gian cụ thể, bạn sẽ được chuyển đến trang chờ`);
//   }
//   //save examName to localStorage
//   localStorage.setItem("examName", examName);
// }

// const Exam = class {
//   constructor(name, status, time, description) {
//     this.name = name;
//     this.status = status;
//     this.time = time;
//     this.description = description;
//   }
// };

// const examTable = document.getElementById("examTable");
// const searchInput = document.getElementById("searchInput");
// const statusFilter = document.getElementById("statusFilter");
// const totalUser = document.getElementById("totalUser");
// var examList = [
//   new Exam("Lập trình C++", "accessible", "5 - 3 - 2024", "Mô tả"),
//   new Exam("Giữa kỳ Kiến trúc máy tính", "scheduled", "20 - 3 - 2024", "Mô tả"),
//   new Exam("Cuối kỳ Mạng Máy tính", "accessible", "10 - 4 - 2024", "Mô tả"),
//   new Exam("Thực hành Mạng máy tính", "accessible", "30 - 4 - 2024", "Mô tả"),
//   // Thêm các kỳ thi khác vào đây
// ];





// document.addEventListener("DOMContentLoaded", function () {
//   renderExams(examList);
//   searchInput.addEventListener("input", filterExams);
//   statusFilter.addEventListener("change", filterExams);

// });


// function filterExams() {
//   const searchText = searchInput.value.toLowerCase();
//   const statusValue = statusFilter.value;
//   const filteredExams = examList.filter(exam => {
//     const nameMatch = exam.name.toLowerCase().includes(searchText);
//     const statusMatch = statusValue === "all" || exam.status === statusValue;
//     return nameMatch && statusMatch;
//   });
//   renderExams(filteredExams);
// }

// function renderExams(exams) {
//   examTable.innerHTML = "";
//   exams.forEach(exam => {
//     const row = document.createElement("tr");
//     let statusClass = "", statusText = "";
//     if (exam.status === "accessible") {
//       statusClass = "accessible";
//       statusText = "Truy cập tự do";
//     } else if (exam.status === "scheduled") {
//       statusClass = "scheduled";
//       statusText = "Yêu cầu thời gian cụ thể";
//     }
//     row.innerHTML = `
//             <tr>
//             <td>
//                 <p>${exam.name}</p>
//             </td>
//             <td>${exam.time}</td>
//             <td><span class="status ${statusClass}">${statusText}</span></td>
//             <td class="join-exam" exam-name="${exam.name}"><span class="status join">Tham gia thi</span></td>
//         </tr>
//       `;
//     examTable.appendChild(row);

//   });
//   let joinExamButton = document.querySelectorAll(".join-exam");
//   joinExamButton.forEach((button, index) => {
//     button.addEventListener("click", function () {
//       let examName = button.getAttribute("exam-name");
//       let status = examList.find(exam => exam.name === examName).status;
//       startExam(button.getAttribute("exam-name"), status);
//       searchInput.value = "";
//       statusFilter.value = "all";
//     });
//   });
// }

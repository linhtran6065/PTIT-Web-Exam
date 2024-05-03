import { apiDelete, apiGet, apiPost, apiPut } from "../../apiService.js";
import { isTokenExpired, logout } from "../../auth.js";

function getUrlParameter(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  var results = regex.exec(location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}



// Get the value of the 'id' parameter from the URL
var examId = getUrlParameter('id');

const token = localStorage.getItem("token");
var examList = [];

isTokenExpired();
initExam();

function initExam() {
  isTokenExpired();
  apiGet("/api/exams/" + examId, token)
    .then((exam) => {
      examList = exam.data;
      console.log("Fetched exams:", examList);
      renderExams(examList);
    })
    .catch((error) => {
      console.error("Error fetching exams:", error);
    });
}


// document.addEventListener("DOMContentLoaded", function () {

  const submitButton = document.getElementById("submitButton");
  const message = document.getElementById("message");
  const inputs = quizForm.getElementsByTagName("input");

  let isSumbit = false;
  let timeLeft = 300; // 300 giây = 5 phút
  const timerDisplay = document.getElementById("timer");

//   let totalPoints = 0;
//   let totalQuestions = inputs.length / 4;

//   let userAnswer = [];
//   function checkAnswer() {
//     for (let i = 0; i < 5; i++) {
//       for (let j = 0; j < 4; j++) {
//         let pos = i * 4 + j;
//         let ans = i * 4 + questions[i].answer - 1;
//         if (inputs[pos].checked && inputs[pos].id == ans) {
//           totalPoints++;
//         }
//         if (inputs[pos].checked) {
//           let posAns = inputs[pos].id;
//           if (posAns % 4 === 0) userAnswer.push("A");
//           if (posAns % 4 === 1) userAnswer.push("B");

//           if (posAns % 4 === 2) userAnswer.push("C");
//           if (posAns % 4 === 3) userAnswer.push("D");
//         }
//       }
//     }

//     // Convert the array to a JSON string
//     const answerString = JSON.stringify(userAnswer);
//     // Store the JSON string in localStorage
//     localStorage.setItem("answerString", answerString);
//     localStorage.setItem("totalQuestions", totalQuestions);
//     localStorage.setItem("totalPoints", totalPoints);
//   }

//   // Xử lý sự kiện khi nút "Nộp bài" được nhấn
//   submitButton.addEventListener("click", function (event) {
//     event.preventDefault(); // Ngăn chặn hành vi mặc định của nút submit
//     clearInterval(timer);
//     timerDisplay.textContent = "Bài đã được nộp";
//     alert("Bài đã được nộp. Chúc mừng!");
//     checkAnswer();

//     window.location.href = "https://linhtran6065.github.io/PTIT-Web-Exam/user/result.html";
//   });

function renderExams(data) {
    quizForm.innerHTML = "";
    
    data.forEach((questions) => {
      var quizQuestion = document.createElement("div");
      quizQuestion.innerHTML = `<div>${questions.questions.name}</div>`
      var quizOption = document.createElement("ul");      
      
      questions.choices.forEach((choice) => {
        var quizChoiceLi = document.createElement("li");
        quizChoiceLi.innerHTML = `
        <input type ="radio" name ="answer" >${choice.name}</input>
        `
        quizOption.appendChild(quizChoiceLi);
      })
      quizForm.appendChild(quizQuestion);
      quizForm.appendChild(quizOption);


      
    })
}
    // quizForm.innerHTML = "";
    // data.forEach((questions) => {
    //   const quizQuestion = document.createElement("div");
    //   console.log(questions.questions.name);
    //   quizQuestion.innerHTML = `<div>${questions.questions.name}</div>`


    // })
    // quizForm.appendChild(quizQuestion);

  // function renderExams(data) {
  //   let x = 0;

  //   return `
  //   <form id="quizForm">
  //   ${data.map(
      
  //       (questions, index) =>
  //         `
  //           <div id = "quiz-question" >${questions.questions.name}</div>
  //           <ul class="quiz-options">

  //               ${questions.choices
  //                 .map(
  //                   (chocie, id) =>
  //                     `
  //                   <li class="quiz-option">
  //                   <input name="option-${index}" id = ${x++} type ="radio">${chocie}</input>
  //                   </li>
  //               `
  //                 )
  //                 .join("")}
  //           </ul>
  //   `
  //     )
  //     .join("")}
  // </form>
            
   
  //   `;
  // }


// }


  

  // Bắt đầu bộ đếm thời gian
  const timer = setInterval(function () {
    if (timeLeft <= 0) {
      clearInterval(timer);
      timerDisplay.textContent = "Hết giờ!";
      showMessage("Hết giờ! Bạn đã không kịp nộp bài.");
      disableForm();
    } else {
      const minutes = Math.floor(timeLeft / 60);
      let seconds = timeLeft % 60;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      timerDisplay.textContent = `Thời gian còn lại: ${minutes}:${seconds}`;
      timeLeft--;
    }
  }, 1000);

  

//   // Hàm vô hiệu hóa form sau khi nộp bài
//   function disableForm() {
//     const inputs = quizForm.getElementsByTagName("input");
//     for (let i = 0; i < inputs.length; i++) {
//       inputs[i].disabled = true;
//     }
//     submitButton.disabled = true;
//   }
//   // Hàm hiển thị thông báo
//   function showMessage(msg) {
//     message.textContent = msg;
//   }
// });





// export { questions };

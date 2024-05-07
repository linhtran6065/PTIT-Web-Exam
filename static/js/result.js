import { apiDelete, apiGet, apiPost, apiPut } from "../../apiService.js";
import { isTokenExpired, logout } from "../../auth.js";

const token = localStorage.getItem("token");
isTokenExpired();
function getUrlParameter(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  var results = regex.exec(location.search);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}

// Get the value of the 'id' parameter from the URL
var formId = getUrlParameter("id");

document.addEventListener("DOMContentLoaded", function () {
  const correctAnswersSpan = document.getElementById("correctAnswers");
  const totalQuestionsSpan = document.getElementById("totalQuestions");
  const scoreSpan = document.getElementById("score");
  const answerDetailsDiv = document.getElementById("answerDetails");
  const reviewButton = document.getElementById("reviewButton");

  // const retrievedAnswerString = localStorage.getItem("answerString");

  let correctAnswers = 0;
  let totalQuestions = localStorage.getItem("count");
  let totalScore = 0;
  apiGet(`/api/forms/${formId}`, localStorage.getItem("token"))
    .then((data) => {
      correctAnswers = data.score;
      totalScore = (correctAnswers / totalQuestions) * 10;
      const result = {
        correctAnswers: correctAnswers,
        totalQuestions: totalQuestions,
        score: totalScore,
      };
      // Hiển thị thông tin kết quả
      correctAnswersSpan.textContent = result.correctAnswers;
      totalQuestionsSpan.textContent = result.totalQuestions;
      scoreSpan.textContent = result.score;
    })
    .catch((error) => {
      console.error("Error", error);
    });

  // Parse the JSON string back into an array
  // const userAnswer = JSON.parse(retrievedAnswerString);
  // Hiển thị chi tiết câu trả lời khi người dùng nhấn nút "Xem lại câu trả lời và đáp án đúng"
  reviewButton.addEventListener("click", function () {
    isTokenExpired();
    apiGet(`/api/results/form/${formId}`, localStorage.getItem("token"))
      .then((data) => {
        renderAnswerDetails(data.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });

  // Hàm hiển thị chi tiết câu trả lời
  function renderAnswerDetails(data) {
    answerDetailsDiv.innerHTML = "";

    data.forEach((ques, index) => {
      const div = document.createElement("div");
      div.innerHTML = `
          <p><strong>${ques.question.name}</strong></p>
          <p>Câu trả lời của bạn: ${
            ques.answer.name ? ques.answer.name : ""
          }</p>
          <p>Đáp án đúng: ${ques.correctAnswer.name}</p>
        `;
      if (ques.answer.isCorrect == false) {
        div.style.backgroundColor = "#db504a";
      }
      answerDetailsDiv.appendChild(div);
    });
    answerDetailsDiv.style.display = "flex";
  }
});

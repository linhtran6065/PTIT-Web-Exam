import { questions } from "../js/test.js";

document.addEventListener("DOMContentLoaded", function() {
    const correctAnswersSpan = document.getElementById("correctAnswers");
    const totalQuestionsSpan = document.getElementById("totalQuestions");
    const scoreSpan = document.getElementById("score");
    const answerDetailsDiv = document.getElementById("answerDetails");
    const reviewButton = document.getElementById("reviewButton");
  
    let correctAnswers = localStorage.getItem('totalPoints');
    let totalQuestions = localStorage.getItem('totalQuestions');
    let totalScore = correctAnswers/totalQuestions*10; 
    

    console.log(questions);

    const retrievedAnswerString= localStorage.getItem('answerString');

// Parse the JSON string back into an array
const userAnswer = JSON.parse(retrievedAnswerString);




    // Mock data
    const result = {
      correctAnswers: correctAnswers,
      totalQuestions: totalQuestions,
      score: totalScore,
    };
  
    // Hiển thị thông tin kết quả
    correctAnswersSpan.textContent = result.correctAnswers;
    totalQuestionsSpan.textContent = result.totalQuestions;
    scoreSpan.textContent = result.score;
  
    console.log('Total points stored in local storage:', localStorage.getItem('totalPoints'));

    // Hiển thị chi tiết câu trả lời khi người dùng nhấn nút "Xem lại câu trả lời và đáp án đúng"
    reviewButton.addEventListener("click", function() {
      renderAnswerDetails(questions);
    });
  
    // Hàm hiển thị chi tiết câu trả lời
    function renderAnswerDetails(questions) {
      answerDetailsDiv.innerHTML = "";
      questions.forEach((ques,index) => {
        const div = document.createElement("div");
        div.innerHTML = `
          <p><strong>${ques.question}</strong></p>
          <p>Câu trả lời của bạn: ${userAnswer[index] ? userAnswer[index] : "" }</p>
          <p>Đáp án đúng: ${ques.answerText}</p>
        `;
        answerDetailsDiv.appendChild(div);
      });
      answerDetailsDiv.style.display = "flex";
    }

  });
  
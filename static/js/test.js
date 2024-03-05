const questions = [
  {
    question: "Câu hỏi 1: Ai là người sáng lập của Microsoft?",
    options: [
      "A. Bill Gates",
      "B. Steve Jobs",
      "C. Mark Zuckerberg",
      "D. Jeff Bezos",
    ],
    answer: 1,
    answerText: "A",
  },
  {
    question:
      "Câu hỏi 2: Trong hệ mặt trời, hành tinh nào là hành tinh thứ tư từ Mặt Trời?",
    options: ["A. Mars", "B. Venus", "C. Earth", "D. Jupiter"],
    answer: 1,
    answerText: "A",
  },
  {
    question: "Câu hỏi 3: Thủ đô của Pháp là gì?",
    options: ["A. Madrid", "B. Rome", "C. Paris", "D. Berlin"],
    answer: 1,
    answerText: "A",
  },
  {
    question: "Câu hỏi 4: Ai là CEO của Amazon?",
    options: [
      "A. Bill Gates",
      "B. Steve Jobs",
      "C. Mark Zuckerberg",
      "D. Jeff Bezos",
    ],
    answer: 4,
    answerText: "D",
  },
  {
    question: "Câu hỏi 5: Ai là CEO của Facebook?",
    options: [
      "A. Bill Gates",
      "B. Steve Jobs",
      "C. Mark Zuckerberg",
      "D. Jeff Bezos",
    ],
    answer: 3,
    answerText: "C",
  },
];

document.addEventListener("DOMContentLoaded", function () {
  const quizForm = document.getElementById("quizForm");
  const quizQuestion = document.getElementById("quiz-question");

  const submitButton = document.getElementById("submitButton");
  const message = document.getElementById("message");
  const inputs = quizForm.getElementsByTagName("input");

  let isSumbit = false;
  let timeLeft = 300; // 300 giây = 5 phút
  const timerDisplay = document.getElementById("timer");

  let totalPoints = 0;
  let totalQuestions = inputs.length / 4;

  let userAnswer = [];
  function checkAnswer() {
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 4; j++) {
        let pos = i * 4 + j;
        let ans = i * 4 + questions[i].answer - 1;
        if (inputs[pos].checked && inputs[pos].id == ans) {
          totalPoints++;
        }
        if (inputs[pos].checked) {
          let posAns = inputs[pos].id;
          if (posAns % 4 === 0) userAnswer.push("A");
          if (posAns % 4 === 1) userAnswer.push("B");

          if (posAns % 4 === 2) userAnswer.push("C");
          if (posAns % 4 === 3) userAnswer.push("D");
        }
      }
    }

    // Convert the array to a JSON string
    const answerString = JSON.stringify(userAnswer);
    // Store the JSON string in localStorage
    localStorage.setItem("answerString", answerString);
    localStorage.setItem("totalQuestions", totalQuestions);
    localStorage.setItem("totalPoints", totalPoints);
  }

  // Xử lý sự kiện khi nút "Nộp bài" được nhấn
  submitButton.addEventListener("click", function (event) {
    event.preventDefault(); // Ngăn chặn hành vi mặc định của nút submit
    clearInterval(timer);
    timerDisplay.textContent = "Bài đã được nộp";
    alert("Bài đã được nộp. Chúc mừng!");
    checkAnswer();

    window.location.href = "https://linhtran6065.github.io/PTIT-Web-Exam/user/result.html";
  });

  function renderData(questions) {
    let x = 0;
    return `
    <form id="quizForm">
    ${questions
      .map(
        (ques, index) =>
          `
            <div id = "quiz-question" >${ques.question}</div>
            <ul class="quiz-options">

                ${ques.options
                  .map(
                    (ans, id) =>
                      `
                    <li class="quiz-option">
                    <input name="option-${index}" id = ${x++} type ="radio">${ans}</input>
                    </li>
                `
                  )
                  .join("")}
            </ul>
    `
      )
      .join("")}
  </form>
            
   
    `;
  }

  quizForm.innerHTML = renderData(questions);
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

  // Hàm vô hiệu hóa form sau khi nộp bài
  function disableForm() {
    const inputs = quizForm.getElementsByTagName("input");
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].disabled = true;
    }
    submitButton.disabled = true;
  }
  // Hàm hiển thị thông báo
  function showMessage(msg) {
    message.textContent = msg;
  }
});

export { questions };

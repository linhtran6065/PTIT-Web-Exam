import { apiDelete, apiGet, apiPost, apiPut } from "../../apiService.js";
import { isTokenExpired, logout } from "../../auth.js";

function getIdFromUrl() {
  var urlParams = new URLSearchParams(window.location.search);
  var exam_ID = urlParams.get("id");
  return exam_ID;
}

var exam_ID = getIdFromUrl();
var selectedRow = null;
var selectedRowAns = null;
var answerID = null;

var formButton = document.getElementById("formButton");

formButton.addEventListener("click", function () {
  onFormSubmit();
});

var formButton_ans = document.getElementById("formButton_ans");

formButton_ans.addEventListener("click", function () {
  onFormSubmitAns();
});

const token = localStorage.getItem("token");

initExam();
isTokenExpired();

var isValid = null;
var isValidAns = null;

var questionID = null;

var createForm = document.getElementById("createForm");
var createForm_ans = document.getElementById("createForm_ans");

var examList = [];

function validate() {
  isValid = true;
  if (document.getElementById("name").value == "") {
    isValid = false;
  } else {
    isValid = true;
  }
  return isValid;
}

function validate_ans() {
  isValidAns = true;
  if (document.getElementById("name_ans").value == "") {
    isValidAns = false;
  } else {
    isValidAns = true;
  }
  return isValidAns;
}

function initExam() {
  isTokenExpired();
  apiGet(`/api/exams/${exam_ID}`, token)
    .then((exam) => {
      examList = exam.data;
      console.log("Fetched exams:", examList);
      renderExams(examList);
    })
    .catch((error) => {
      console.error("Error fetching exams:", error);
    });
}

function saveAll() {
  isTokenExpired();
  var questions = document.getElementsByName(`question`);
  var questionForm = [];
  questions.forEach((question) => {
    var listChoices = [];
    var radioButtons = document.getElementsByName(`answer-${question.id}`);
    for (var i = 0; i < radioButtons.length; i++) {
      var labelText = document.querySelector(
        `label[for="${radioButtons[i].id}"]`
      ).textContent;
      if (radioButtons[i].checked) {
        listChoices.push({
          id: radioButtons[i].id,
          name: labelText,
          isCorrect: true,
        });
      } else {
        listChoices.push({
          id: radioButtons[i].id,
          name: labelText,
          isCorrect: false,
        });
      }
    }
    var questionInfo = { id: question.id, name: question.innerHTML };
    questionForm.push({ question: questionInfo, choices: listChoices });
  });
  console.log(questionForm);

  var processedList = { examId: exam_ID, data: questionForm };

  apiPost("/api/questions/listQuestions", processedList, token)
    .then((response) => {
      // examList.push(data);
      initExam();
      alert("Processing successful");
    })
    .catch((error) => {
      alert("Processing error");
    });

  // examList.forEach((questions) => {
  // questions.choices.forEach((choice) => {
  //   var ans = document.getElementById(`${choice.id}`);
  //   if(ans.checked) {
  //     choice.isCorrect = true;
  //   }
  //   else choice.isCorrect = false;
  // })
  // })

  // initExam();
  // console.log(examList);
  // formDataAns = readFormDataAns;
  // updateRecordAns(formDataAns);
}

function renderExams(data) {
  quizForm.innerHTML = "";
  data.forEach((questions) => {
    var quizQuestion = document.createElement("div");

    quizQuestion.innerHTML = `
    <i onclick = "onDelete(this)" class="quizIcon bi bi-trash" > </i> 
    <i onclick = "onEdit(this)" class="quizIcon bi bi-pencil" > </i>
    <i onclick = "onPlus(this)" class="quizIcon bi bi-plus" > </i> 
    <div name ="question" id= "${questions.questions.id}">${questions.questions.name}</div>`;

    var quizOption = document.createElement("ul");
    quizOption.id = `questionID-${questions.questions.id}`;
    questions.choices.forEach((choice) => {
      var quizChoiceLi = document.createElement("li");
      quizChoiceLi.innerHTML = `
      <input id = ${choice.id} type ="radio" name ="answer-${choice.questionId}">
      <label for="${choice.id}">${choice.name}
      </label>

      </input>
      <i onclick = "onDeleteAns(this)" class="ansIcon bi bi-trash" > </i> 
      <i onclick = "onEditAns(this)" class="ansIcon bi bi-pencil" > </i>
      `;

      if (choice.isCorrect) {
        quizChoiceLi.childNodes[1].checked = true;
      }
      quizOption.appendChild(quizChoiceLi);
    });

    quizForm.appendChild(quizQuestion);
    // quizForm.appendChild(addForm);
    quizForm.appendChild(quizOption);
  });
}

// đọc dữ liệu nhập
function readFormData() {
  var formData = {};
  formData["examId"] = exam_ID;
  formData["name"] = document.getElementById("name").value;
  return formData;
}

console.log(exam_ID);

// đọc dữ liệu nhập
function readFormDataAns() {
  var formDataAns = {};
  formDataAns["questionId"] = questionID;
  formDataAns["name"] = document.getElementById("name_ans").value;
  // formData["isCorrect"] = document.getElementById("ans_true").checked ? true : false;
  formDataAns["isCorrect"] = false;
  console.log(formDataAns);
  return formDataAns;
}

// // đọc dữ liệu nhập
// function readFormDataOption() {
//   var formDataAns = {};
//   formDataAns["questionId"] = questionID;
//   formDataAns["name"] = document.getElementById("name_ans").value;
//   // formData["isCorrect"] = document.getElementById("ans_true").checked ? true : false;
//   formDataAns["isCorrect"] = false;
//   console.log(formDataAns);
//   return formDataAns;
// }

// console.log(questionID);

// 2. Thêm mới bài thi + form thêm mới
function onCreate() {
  if (createForm.classList.contains("inactive")) {
    createForm.classList.remove("inactive");
  } else {
    createForm.classList.add("inactive");
  }
}

// reset form sau khi thêm mới
function resetForm() {
  document.getElementById("name").value = "";
  selectedRow = null;
}

// reset form sau khi thêm mới
function resetFormAns() {
  document.getElementById("name_ans").value = "";
  // document.getElementById("ans_true").checked = false;
  // document.getElementById("ans_false").checked = false;
  selectedRowAns = null;
}

// chọn time

// thêm bài thi mới
function insertNewRecord(data) {
  isTokenExpired();
  apiPost("/api/questions", data, token)
    .then((response) => {
      console.log("Fetched questions:", response);
      examList.push(data);
      initExam();
      alert("Create questions successful");
    })
    .catch((error) => {
      alert("Create questions error");
    });
}

// thêm câu trả lời
// thêm bài thi mới
function insertNewRecordAns(data) {
  isTokenExpired();

  apiPost("/api/answers", data, token)
    .then((response) => {
      console.log("Fetched answers:", response);
      // examList.push(data);
      initExam();
      alert("Create answer successful");
    })
    .catch((error) => {
      alert(error.messsage);
      alert("Create answer error");
    });
}

// 3. câu hỏi
function onEdit(data) {
  if (createForm.classList.contains("inactive")) {
    createForm.classList.remove("inactive");
    var quesName = data.parentElement.lastElementChild;
    selectedRow = data.parentElement;
    questionID = data.parentElement.lastElementChild.id;
    console.log(data.parentElement.lastElementChild.id);
    document.getElementById("name").value = quesName.innerHTML;
  } else {
    createForm.classList.add("inactive");
    resetForm();
  }
}

function onEditAns(data) {
  if (createForm_ans.classList.contains("inactive")) {
    createForm_ans.classList.remove("inactive");
    answerID = data.parentElement.firstElementChild.id;
    selectedRowAns = data.parentElement;
    var ulID = data.parentElement.parentElement.id;
    var parts = ulID.split("-");
    questionID = parts[1];

    var labelText = document.querySelector(
      `label[for="${answerID}"]`
    ).textContent;
    console.log(answerID);
    console.log(labelText);
    document.getElementById("name_ans").value = labelText;
  } else {
    createForm_ans.classList.add("inactive");
    resetForm();
  }
}

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
}

function onFormSubmitAns() {
  if (validate_ans()) {
    var formDataAns = readFormDataAns();
    if (selectedRowAns == null) insertNewRecordAns(formDataAns);
    else updateRecordAns(formDataAns);

    resetFormAns();
    document.getElementById("validation_ans").style.display = "none";
  } else {
    document.getElementById("validation_ans").style.display = "inline";
  }
}

console.log(document.getElementById("validation_ans"));

// 4. Xóa bài thi

function onDelete(data) {
  if (confirm("Bạn có chắc chắn muốn xóa bài thi này?")) {
    questionID = data.parentElement.lastElementChild.id;
    console.log(questionID);
    isTokenExpired();
    apiDelete(`/api/questions/${questionID}`, token)
      .then((response) => {
        initExam();
        alert("Delete successful");
      })
      .catch((error) => {
        alert("Delete error");
      });
  }
}

function onDeleteAns(data) {
  if (confirm("Bạn có chắc chắn muốn xóa câu trả lời này này?")) {
    answerID = data.parentElement.firstElementChild.id;
    console.log(answerID);
    isTokenExpired();
    apiDelete(`/api/answers/${answerID}`, token)
      .then((response) => {
        alert("Delete successful");
        initExam();
      })
      .catch((error) => {
        alert("Delete error");
      });
  }
}

function updateRecord(formData) {
  isTokenExpired();
  console.log(questionID);
  apiPut(`/api/questions/${questionID}`, formData, token)
    .then((response) => {
      initExam();
      console.log("Fetched questions:", response);
      alert("Update question successful");
    })
    .catch((error) => {
      alert("Update question error");
    });
}

function updateRecordAns(formDataAns) {
  isTokenExpired();
  console.log(answerID);
  apiPut(`/api/answers/${answerID}`, formDataAns, token)
    .then((response) => {
      initExam();
      console.log("Fetched answers:", response);
      alert("Update answers successful");
    })
    .catch((error) => {
      alert(error.messsage);
      alert("Update answer error");
    });
}

// 5. thêm mới câu hỏi
function onPlus(data) {
  questionID = data.parentElement.lastElementChild.id;
  // setCurrentQuestionID(questionID);
  if (createForm_ans.classList.contains("inactive")) {
    createForm_ans.classList.remove("inactive");
  } else {
    createForm_ans.classList.add("inactive");
  }
}

function handleLogOut() {
  logout();
}

window.onEdit = onEdit;
window.onDelete = onDelete;
window.onDeleteAns = onDeleteAns;
window.onFormSubmit = onFormSubmit;
window.onFormSubmitAns = onFormSubmitAns;

window.onCreate = onCreate;
window.onEditAns = onEditAns;

window.handleLogOut = handleLogOut;
window.onPlus = onPlus;
window.saveAll = saveAll;
// window.deleteAll = deleteAll
// window.importFile = importFile

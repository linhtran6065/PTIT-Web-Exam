import { apiDelete, apiGet, apiPost, apiPut } from "../../apiService.js";
import { isTokenExpired, logout } from "../../auth.js";

function getIdFromUrl() {
  var urlParams = new URLSearchParams(window.location.search);
  var exam_ID = urlParams.get('id');
  return exam_ID;
}

var exam_ID = getIdFromUrl();
var selectedRow = null;
var formButton = document.getElementById("formButton");
formButton.addEventListener('click', function() {
    onFormSubmit();
});
console.log(formButton);
var isValid = (document.getElementById("validation").style.display = "none");
var questionID = null;

const token = localStorage.getItem("token");
// const inputs = quizForm.getElementsByTagName("input");
var createForm = document.getElementById("createForm");


var examList = [];

isTokenExpired();
initExam();

function validate() {
   isValid = true;
  if (document.getElementById("name").value == "") {
    isValid = false;
  } else {
    isValid = true;
  }
  return isValid;
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

{/* <button onclick= "onDelete()" class = "questionButton" >Xóa<i class="quizIcon bi bi-trash" ></i> </button>
<button onclick = onEdit() class = "questionButton">
<i class="quizIcon bi bi-pencil" >
Sửa
</i> </button> */}
function renderExams(data) {
  quizForm.innerHTML = "";
  data.forEach((questions) => {
    var quizQuestion = document.createElement("div");
  
    quizQuestion.innerHTML = 
    `
    <i onclick = "onDelete(this)" class="quizIcon bi bi-trash" > </i> 
    <i onclick = "onEdit(this)" class="quizIcon bi bi-pencil" > </i>
    <i onclick = "onPlus(this)" class="quizIcon bi bi-plus" > </i> 
    <div id= "${questions.questions.id}">${questions.questions.name}</div>`
    var quizOption = document.createElement("ul");      
    questions.choices.forEach((choice) => {
      var quizChoiceLi = document.createElement("li");
      quizChoiceLi.innerHTML = `
      <input type ="radio" name ="answer-${choice.questionId}">${choice.name}</input>`
      
      if(choice.isCorrect) {
        quizChoiceLi.childNodes[1].checked = true;
      }  
      quizOption.appendChild(quizChoiceLi);
    })
    quizForm.appendChild(quizQuestion);
    quizForm.appendChild(quizOption);
  })
}

// đọc dữ liệu nhập
function readFormData() {
  var formData = {};
  formData["examId"] = exam_ID;
  formData["name"] = document.getElementById("name").value;
  return formData;
}

console.log(exam_ID);
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


// bắt sự kiện thêm mới bài thi hoặc chỉnh sửa



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

// 3. câu hỏi
function onEdit(data) {
  if (createForm.classList.contains("inactive")) {
    createForm.classList.remove("inactive");  
    var quesName = data.parentElement.lastElementChild;
    selectedRow =  data.parentElement;
    questionID = data.parentElement.lastElementChild.id;
    console.log(data.parentElement.lastElementChild.id);
    document.getElementById("name").value = quesName.innerHTML;
  } else {
    createForm.classList.add("inactive");
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

//create question form
// function renderQuestion() {
//   var item = document.createElement("li");
//   var form = document.createElement("form");
//   form.setAttribute("id", "quizForm");

//   var containerForm = document.createElement("div");
//   containerForm.setAttribute("class", "containerForm");

//   var question = document.createElement("input");
//   question.setAttribute("type", "text");
//   question.setAttribute("class", "question");

//   var optionBtn = document.createElement("icon");
//   optionBtn.innerHTML = '<i class="bi bi-plus-square"></i>';
//   optionBtn.onclick = () => optionForm(form);

//   var saveBtn = document.createElement("icon");
//   saveBtn.innerHTML = '<i class="bi bi-floppy"></i>';
//   saveBtn.onclick = () => saveFunction(form);

//   var editBtn = document.createElement("icon");
//   editBtn.innerHTML = '<i class="bi bi-pencil"></i>';
//   editBtn.setAttribute("class", "Edit");
//   editBtn.onclick = () => editFunction(form);
//   editBtn.style.display = "none";

//   var deleteBtn = document.createElement("icon");
//   deleteBtn.innerHTML = '<i class="bi bi-trash"></i>';
//   deleteBtn.setAttribute("class", "Delete");
//   deleteBtn.onclick = () => deleteFunction(item);

//   containerForm.appendChild(question);
//   containerForm.appendChild(editBtn);
//   containerForm.appendChild(optionBtn);
//   containerForm.appendChild(saveBtn);
//   containerForm.appendChild(deleteBtn);

//   form.appendChild(containerForm);

//   item.appendChild(form);
//   formContainer.appendChild(item);
// }

//add option to question form
// function createForm(form) {

//   var container = document.createElement("div");
//   // var optionInput = document.createElement("input");
//   // optionInput.setAttribute("type", "radio");
//   // optionInput.setAttribute("name", "answer");
//   // optionInput.setAttribute("class", "option-radio");

//   // var textField = document.createElement("input");
//   // textField.setAttribute("type", "text");
//   // textField.setAttribute("placeholder", "Enter text here");

//   // var deleteOption = document.createElement("icon");
//   // deleteOption.innerHTML = '<i class="bi bi-trash"></i>';
//   // deleteOption.setAttribute("class", "DeleteOption");
//   // deleteOption.onclick = () => deleteOptionFunction(container);

//   // container.appendChild(optionInput);
//   // container.appendChild(textField);
//   // container.appendChild(deleteOption);
  
//   // form.appendChild(container);
// }

// function deleteOptionFunction(container) {
//   container.remove();
// }

// function saveFunction(form) {
//   var formData = [];
//   var questionInput = form.querySelector(".question");
//   questionInput.style.border = "none";
//   questionInput.disabled = true;
//   var optionsData = [];
//   var answerText = "";
//   var containers = form.querySelectorAll(".newContainer");

//   for (var i = 0; i < containers.length; i++) {
//     var radio = containers[i].querySelector('input[type="radio"]');
//     var value = getSelectedValue(containers[i]);
//     var textField = containers[i].querySelector('input[type="text"]');
//     var text = textField ? textField.value : "";
//     textField.style.border = "none";
//     textField.disabled = true;
//     radio.disabled = true;

//     optionsData.push({
//       value: value,
//       text: text,
//     });
//     if (value == "on") answerText = text;
//   }

//   formData.push({
//     question: questionInput.value,
//     options: optionsData,
//     answerText: answerText,
//   });
//   data.push(formData);

//   const buttons = form.querySelectorAll("icon");
//   buttons.forEach((button) => {
//     if (button.className != "Edit" && button.className != "Delete") {
//       button.style.display = "none";
//     } else button.style.display = "inline";
//   });
//   console.log(formData);
// }

// function editFunction(form) {
//   var questionInput = form.querySelector(".question");
//   questionInput.style.border = "inline";
//   questionInput.disabled = false;

//   var containers = form.querySelectorAll(".newContainer");

//   for (var i = 0; i < containers.length; i++) {
//     var radio = containers[i].querySelector('input[type="radio"]');
//     var textField = containers[i].querySelector('input[type="text"]');
//     textField.style.border = "inline";
//     textField.disabled = false;
//     radio.disabled = false;
//   }
//   const buttons = form.querySelectorAll("icon");
//   buttons.forEach((button) => {
//     if (button.className == "Edit") {
//       button.style.display = "none";
//     } else button.style.display = "inline";
//   });
// }
// function deleteFunction(item) {
//   item.remove();
// }
// function deleteAll() {
//   let text = "Delete all questions?";
//   if (confirm(text) == true) {
//     var formContainer = document.getElementById("form-container");
//     items = formContainer.querySelectorAll("li");
//     items.forEach((item) => {
//       item.remove();
//     });
//   } else {
//     text = "You canceled!";
//   }
// }
// function saveAll() {
//   window.history.back();
// }

//render data
// function renderQuestion(questions) {
//   formContainer.innerHTML = "";
//   data = questions;
//   data.forEach((fixedQuestion) => {
//     var item = document.createElement("li");
//     var form = document.createElement("form");
//     form.setAttribute("id", "quizForm");

//     var containerForm = document.createElement("div");
//     containerForm.setAttribute("class", "containerForm");

//     var question = document.createElement("input");
//     question.setAttribute("type", "text");
//     question.setAttribute("class", "question");
//     question.value = fixedQuestion.question;
//     question.style.border = "none";
//     question.disabled = true;

//     var optionBtn = document.createElement("icon");
//     optionBtn.innerHTML = '<i class="bi bi-plus-square"></i>';
//     optionBtn.onclick = () => optionForm(form);
//     optionBtn.style.display = "none";

//     var saveBtn = document.createElement("icon");
//     saveBtn.innerHTML = '<i class="bi bi-floppy"></i>';
//     saveBtn.onclick = () => saveFunction(form);
//     saveBtn.style.display = "none";

//     var editBtn = document.createElement("icon");
//     editBtn.innerHTML = '<i class="bi bi-pencil"></i>';
//     editBtn.setAttribute("class", "Edit");
//     editBtn.onclick = () => editFunction(form);

//     var deleteBtn = document.createElement("icon");
//     deleteBtn.innerHTML = '<i class="bi bi-trash"></i>';
//     deleteBtn.setAttribute("class", "Delete");
//     deleteBtn.onclick = () => deleteFunction(item);

//     containerForm.appendChild(question);
//     containerForm.appendChild(editBtn);
//     containerForm.appendChild(optionBtn);
//     containerForm.appendChild(saveBtn);
//     containerForm.appendChild(deleteBtn);

//     form.appendChild(containerForm);

//     var answer = fixedQuestion.answerText;
//     fixedQuestion.options.forEach((option) => {
//       var container = document.createElement("div");
//       container.setAttribute("class", "newContainer");

//       var optionInput = document.createElement("input");
//       optionInput.setAttribute("type", "radio");
//       optionInput.setAttribute("name", "answer");
//       optionInput.setAttribute("class", "option-radio");

//       var textField = document.createElement("input");
//       textField.setAttribute("type", "text");
//       textField.setAttribute("placeholder", "Enter text here");
//       textField.value = option;
//       textField.style.border = "none";
//       textField.disabled = true;

//       optionInput.checked = textField.value == answer ? true : false;
//       optionInput.disabled = true;

//       var deleteOption = document.createElement("icon");
//       deleteOption.innerHTML = '<i class="bi bi-trash"></i>';
//       deleteOption.setAttribute("class", "DeleteOption");
//       deleteOption.onclick = () => deleteOptionFunction(container);
//       deleteOption.style.display = "none";

//       container.appendChild(optionInput);
//       container.appendChild(textField);
//       container.appendChild(deleteOption);

//       form.appendChild(container);

//       item.appendChild(form);
//       formContainer.appendChild(item);
//     });
//   });
// }

//read form excel
// const fileInput = document.getElementById("file-input");
// const importBtn = document.getElementById("import-btn");

// importBtn.addEventListener("click", () => {
//   const file = fileInput.files[0];
//   if (!file) return;

//   const reader = new FileReader();
//   reader.onload = (e) => {
//     const data = e.target.result;
//     const workbook = XLSX.read(data, { type: "array" });

//     const worksheet = workbook.Sheets[workbook.SheetNames[0]];
//     const questions = [];
//     const rows = XLSX.utils.sheet_to_json(worksheet);
//     for (const row of rows) {
//       var options = [row.option1, row.option2, row.option3, row.option4];

//       const question = {
//         question: row.question,
//         options: options,
//         answerText: row.answer,
//       };
//       questions.push(question);
//     }
//     console.log(questions);
//     renderQuestion(questions);
//   };

//   reader.readAsArrayBuffer(file);
// });

// function importFile() {
//   importContainer.style.display =
//     importContainer.style.display === "flex" ? "none" : "flex";
// }

{/* <button onclick="myForm()"> Tạo câu hỏi</button>
<button onclick="saveAll()"> Lưu</button>
<button onclick="deleteAll()"> Xóa hết</button>
<button onclick="importFile()"> Nhập đề thi</button> */}

function handleLogOut() {
  logout();
}

window.onEdit = onEdit
window.onDelete = onDelete
window.onFormSubmit= onFormSubmit;
window.onCreate = onCreate;
window.handleLogOut = handleLogOut;
window.onPlus = onPlus
// window.saveAll = saveAll
// window.deleteAll = deleteAll
// window.importFile = importFile







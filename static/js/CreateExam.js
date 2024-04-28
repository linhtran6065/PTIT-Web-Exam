var data = [];
const questionFixed = [
  {
    question: "Ai là người sáng lập của Microsoft?",
    options: ["Bill Gates", "Steve Jobs", "Mark Zuckerberg", "Jeff Bezos"],
    answerText: "Bill Gates",
  },
  {
    question:
      "Trong hệ mặt trời, hành tinh nào là hành tinh thứ tư từ Mặt Trời?",
    options: ["Mars", "Venus", "Earth", "Jupiter"],
    answerText: "Mars",
  },
  {
    question: "Thủ đô của Pháp là gì?",
    options: ["Madrid", "Rome", "Paris", "Berlin"],
    answerText: "Madrid",
  },
];
var questionFromExcel = [];

var formContainer = document.getElementById("form-container");

window.onload = renderQuestion(questionFixed);

//create question form
function renderQuestion() {
  var item = document.createElement("li");
  var form = document.createElement("form");
  form.setAttribute("id", "quizForm");

  var containerForm = document.createElement("div");
  containerForm.setAttribute("class", "containerForm");

  var question = document.createElement("input");
  question.setAttribute("type", "text");
  question.setAttribute("class", "question");

  var optionBtn = document.createElement("icon");
  optionBtn.innerHTML = '<i class="bi bi-plus-square"></i>';
  optionBtn.onclick = () => optionForm(form);

  var saveBtn = document.createElement("icon");
  saveBtn.innerHTML = '<i class="bi bi-floppy"></i>';
  saveBtn.onclick = () => saveFunction(form);

  var editBtn = document.createElement("icon");
  editBtn.innerHTML = '<i class="bi bi-pencil"></i>';
  editBtn.setAttribute("class", "Edit");
  editBtn.onclick = () => editFunction(form);
  editBtn.style.display = "none";

  var deleteBtn = document.createElement("icon");
  deleteBtn.innerHTML = '<i class="bi bi-trash"></i>';
  deleteBtn.setAttribute("class", "Delete");
  deleteBtn.onclick = () => deleteFunction(item);

  containerForm.appendChild(question);
  containerForm.appendChild(editBtn);
  containerForm.appendChild(optionBtn);
  containerForm.appendChild(saveBtn);
  containerForm.appendChild(deleteBtn);

  form.appendChild(containerForm);

  item.appendChild(form);
  formContainer.appendChild(item);
}

//add option to question form
function optionForm(form) {
  var container = document.createElement("div");
  container.setAttribute("class", "newContainer");

  var optionInput = document.createElement("input");
  optionInput.setAttribute("type", "radio");
  optionInput.setAttribute("name", "answer");
  optionInput.setAttribute("class", "option-radio");

  var textField = document.createElement("input");
  textField.setAttribute("type", "text");
  textField.setAttribute("placeholder", "Enter text here");

  var deleteOption = document.createElement("icon");
  deleteOption.innerHTML = '<i class="bi bi-trash"></i>';
  deleteOption.setAttribute("class", "DeleteOption");
  deleteOption.onclick = () => deleteOptionFunction(container);

  container.appendChild(optionInput);
  container.appendChild(textField);
  container.appendChild(deleteOption);

  form.appendChild(container);
}

function deleteOptionFunction(container) {
  container.remove();
}

//get radio value
function getSelectedValue(container) {
  var selectedRadio = container.querySelector('input[name="answer"]:checked');
  if (selectedRadio) {
    return selectedRadio.value;
  } else {
    return null;
  }
}

function saveFunction(form) {
  var formData = [];
  var questionInput = form.querySelector(".question");
  questionInput.style.border = "none";
  questionInput.disabled = true;
  var optionsData = [];
  var answerText = "";
  var containers = form.querySelectorAll(".newContainer");

  for (var i = 0; i < containers.length; i++) {
    var radio = containers[i].querySelector('input[type="radio"]');
    var value = getSelectedValue(containers[i]);
    var textField = containers[i].querySelector('input[type="text"]');
    var text = textField ? textField.value : "";
    textField.style.border = "none";
    textField.disabled = true;
    radio.disabled = true;

    optionsData.push({
      value: value,
      text: text,
    });
    if (value == "on") answerText = text;
  }

  formData.push({
    question: questionInput.value,
    options: optionsData,
    answerText: answerText,
  });
  data.push(formData);

  const buttons = form.querySelectorAll("icon");
  buttons.forEach((button) => {
    if (button.className != "Edit" && button.className != "Delete") {
      button.style.display = "none";
    } else button.style.display = "inline";
  });
  console.log(formData);
}

function editFunction(form) {
  var questionInput = form.querySelector(".question");
  questionInput.style.border = "inline";
  questionInput.disabled = false;

  var containers = form.querySelectorAll(".newContainer");

  for (var i = 0; i < containers.length; i++) {
    var radio = containers[i].querySelector('input[type="radio"]');
    var textField = containers[i].querySelector('input[type="text"]');
    textField.style.border = "inline";
    textField.disabled = false;
    radio.disabled = false;
  }
  const buttons = form.querySelectorAll("icon");
  buttons.forEach((button) => {
    if (button.className == "Edit") {
      button.style.display = "none";
    } else button.style.display = "inline";
  });
}
function deleteFunction(item) {
  item.remove();
}
function deleteAll() {
  let text = "Delete all questions?";
  if (confirm(text) == true) {
    var formContainer = document.getElementById("form-container");
    items = formContainer.querySelectorAll("li");
    items.forEach((item) => {
      item.remove();
    });
  } else {
    text = "You canceled!";
  }
}
function saveAll() {
  window.history.back();
}

//render data
function renderQuestion(questions) {
  formContainer.innerHTML = "";
  data = questions;
  data.forEach((fixedQuestion) => {
    var item = document.createElement("li");
    var form = document.createElement("form");
    form.setAttribute("id", "quizForm");

    var containerForm = document.createElement("div");
    containerForm.setAttribute("class", "containerForm");

    var question = document.createElement("input");
    question.setAttribute("type", "text");
    question.setAttribute("class", "question");
    question.value = fixedQuestion.question;
    question.style.border = "none";
    question.disabled = true;

    var optionBtn = document.createElement("icon");
    optionBtn.innerHTML = '<i class="bi bi-plus-square"></i>';
    optionBtn.onclick = () => optionForm(form);
    optionBtn.style.display = "none";

    var saveBtn = document.createElement("icon");
    saveBtn.innerHTML = '<i class="bi bi-floppy"></i>';
    saveBtn.onclick = () => saveFunction(form);
    saveBtn.style.display = "none";

    var editBtn = document.createElement("icon");
    editBtn.innerHTML = '<i class="bi bi-pencil"></i>';
    editBtn.setAttribute("class", "Edit");
    editBtn.onclick = () => editFunction(form);

    var deleteBtn = document.createElement("icon");
    deleteBtn.innerHTML = '<i class="bi bi-trash"></i>';
    deleteBtn.setAttribute("class", "Delete");
    deleteBtn.onclick = () => deleteFunction(item);

    containerForm.appendChild(question);
    containerForm.appendChild(editBtn);
    containerForm.appendChild(optionBtn);
    containerForm.appendChild(saveBtn);
    containerForm.appendChild(deleteBtn);

    form.appendChild(containerForm);

    var answer = fixedQuestion.answerText;
    fixedQuestion.options.forEach((option) => {
      var container = document.createElement("div");
      container.setAttribute("class", "newContainer");

      var optionInput = document.createElement("input");
      optionInput.setAttribute("type", "radio");
      optionInput.setAttribute("name", "answer");
      optionInput.setAttribute("class", "option-radio");

      var textField = document.createElement("input");
      textField.setAttribute("type", "text");
      textField.setAttribute("placeholder", "Enter text here");
      textField.value = option;
      textField.style.border = "none";
      textField.disabled = true;

      optionInput.checked = textField.value == answer ? true : false;
      optionInput.disabled = true;

      var deleteOption = document.createElement("icon");
      deleteOption.innerHTML = '<i class="bi bi-trash"></i>';
      deleteOption.setAttribute("class", "DeleteOption");
      deleteOption.onclick = () => deleteOptionFunction(container);
      deleteOption.style.display = "none";

      container.appendChild(optionInput);
      container.appendChild(textField);
      container.appendChild(deleteOption);

      form.appendChild(container);

      item.appendChild(form);
      formContainer.appendChild(item);
    });
  });
}

//read form excel
const fileInput = document.getElementById("file-input");
const importBtn = document.getElementById("import-btn");
const importContainer = document.getElementById("import-container");
importContainer.style.display = "none";

importBtn.addEventListener("click", () => {
  const file = fileInput.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    const data = e.target.result;
    const workbook = XLSX.read(data, { type: "array" });

    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const questions = [];
    const rows = XLSX.utils.sheet_to_json(worksheet);
    for (const row of rows) {
      var options = [row.option1, row.option2, row.option3, row.option4];

      const question = {
        question: row.question,
        options: options,
        answerText: row.answer,
      };
      questions.push(question);
    }
    console.log(questions);
    renderQuestion(questions);
  };

  reader.readAsArrayBuffer(file);
});
function importFile() {
  importContainer.style.display =
    importContainer.style.display === "flex" ? "none" : "flex";
}

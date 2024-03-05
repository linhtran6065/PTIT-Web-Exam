var selectedRow = null;
var createForm = document.getElementById("createForm");

var studentList = [];
createForm.style.display = "none";
var isValid = (document.getElementById("validation").style.display = "none");

document.addEventListener("DOMContentLoaded", function () {
  studentList = [
    {
      msv: "B21DCCN101",
      name: "Nguyễn Văn A",
      email: "123@gmail.com",
      class: "E21CQCN02",
    },
    {
      msv: "B21DCCN102",
      name: "Nguyễn Văn B",
      email: "123@gmail.com",
      class: "E21CQCN02",
    },
  ];
  renderStudents(studentList);
});

function renderStudents(studentList) {
  var table = document
    .getElementById("studentList")
    .getElementsByTagName("tbody")[0];
  table.innerHTML = "";
  studentList.forEach((exam) => {
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = exam.msv;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = exam.name;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = exam.email;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = exam.class;

    cell5 = newRow.insertCell(4);
    cell5.innerHTML = `<div class="detailBtn"> <button onclick="onEdit(this)">Sửa</button>
                       <button onClick="onDelete(this)">Xóa</button>
                       `;
  });
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

function readFormData() {
  var formData = {};
  formData["msv"] = document.getElementById("msv").value;
  formData["name"] = document.getElementById("name").value;
  formData["email"] = document.getElementById("email").value;
  formData["class"] = document.getElementById("class").value;
  studentList.push(formData);

  return formData;
}
function onCreate() {
  createForm.style.display =
    createForm.style.display === "none" ? "block" : "none";
}

function insertNewRecord(data) {
  var table = document
    .getElementById("studentList")
    .getElementsByTagName("tbody")[0];
  var newRow = table.insertRow(table.length);
  cell1 = newRow.insertCell(0);
  cell1.innerHTML = data.msv;
  cell2 = newRow.insertCell(1);
  cell2.innerHTML = data.name;
  cell3 = newRow.insertCell(2);
  cell3.innerHTML = data.email;
  cell4 = newRow.insertCell(3);
  cell4.innerHTML = data.class;

  cell5 = newRow.insertCell(4);
  cell5.innerHTML = `<div class="detailBtn"> <button onclick="onEdit(this)">Sửa</button>
                       <button onClick="onDelete(this)">Xóa</button>
                       `;
}

function resetForm() {
  document.getElementById("msv").value = "";
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("class").value = "";

  selectedRow = null;
}

function onEdit(td) {
  createForm.style.display = "block";
  selectedRow = td.parentElement.parentElement.parentElement;
  document.getElementById("msv").value = selectedRow.cells[0].innerHTML;
  document.getElementById("name").value = selectedRow.cells[1].innerHTML;
  document.getElementById("email").value = selectedRow.cells[2].innerHTML;
  document.getElementById("class").value = selectedRow.cells[3].innerHTML;
}
function updateRecord(formData) {
  selectedRow.cells[0].innerHTML = formData.msv;
  selectedRow.cells[1].innerHTML = formData.name;
  selectedRow.cells[2].innerHTML = formData.email;
  selectedRow.cells[3].innerHTML = formData.class;
}

function onDelete(td) {
  if (confirm("Are you sure to delete this record ?")) {
    row = td.parentElement.parentElement.parentElement;
    document.getElementById("studentList").deleteRow(row.rowIndex);
    resetForm();
  }
}
function validate() {
  isValid = true;
  if (
    document.getElementById("msv").value == "" ||
    document.getElementById("name").value == "" ||
    document.getElementById("email").value == "" ||
    document.getElementById("class").value == ""
  ) {
    isValid = false;
  } else {
    isValid = true;
  }

  return isValid;
}

const searchInput = document.getElementById("searchInput");
function filterStudents() {
  const searchText = searchInput.value.toLowerCase();
  const filteredStudent = studentList.filter((student) => {
    const nameMatch = student.name.toLowerCase().includes(searchText);
    const msvMatch = student.msv.toLowerCase().includes(searchText);
    return nameMatch || msvMatch;
  });

  renderStudents(filteredStudent);
}

searchInput.addEventListener("input", filterStudents);

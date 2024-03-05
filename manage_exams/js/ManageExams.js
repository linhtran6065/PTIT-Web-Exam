var selectedRow = null;
var createForm = document.getElementById("createForm");
var examList = [];
createForm.style.display = "none";
var isValid = (document.getElementById("validation").style.display = "none");

document.addEventListener("DOMContentLoaded", function () {
  examList = [
    {
      name: "Kỳ thi luyện tập",
      description: "Kỳ thi luyện tập cho sinh viên",
      type: "Truy cập tự do",
    },
    {
      name: "Kỳ thi giữa kỳ",
      description: "Kỳ thi được sẽ thực hiện trên phòng máy",
      type: "Yêu cầu thời gian cụ thể",
    },
    {
      name: "Kỳ thi cuối kỳ",
      description: "Kỳ thi quan trọng nhất",
      type: "Yêu cầu thời gian cụ thể",
    },
    // Thêm các kỳ thi khác vào đây
  ];

  renderExams(examList);
});
function renderExams(examList) {
  var table = document
    .getElementById("examList")
    .getElementsByTagName("tbody")[0];
  table.innerHTML = "";
  examList.forEach((exam) => {
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = exam.name;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = exam.description;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = exam.type;

    cell4 = newRow.insertCell(3);
    cell4.innerHTML = `<div class="detailBtn"> <button onclick="onEdit(this)">Sửa</button>
                       <button onClick="onDelete(this)">Xóa</button>
                       <button onClick="onViewDetail(this)">Xem</button></div>`;
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
  formData["name"] = document.getElementById("name").value;
  formData["description"] = document.getElementById("description").value;

  if (document.getElementById("statusFilter").value == "accessible") {
    formData["type"] = "Truy cập tự do";
  } else {
    formData["type"] = "Yêu cầu thời gian cụ thể";
  }

  examList.push(formData);
  return formData;
}
function onCreate() {
  createForm.style.display =
    createForm.style.display === "none" ? "block" : "none";
}
function onViewDetail(data) {
  window.location.href = "./Create.html";
}
function insertNewRecord(data) {
  var table = document
    .getElementById("examList")
    .getElementsByTagName("tbody")[0];
  var newRow = table.insertRow(table.length);
  cell1 = newRow.insertCell(0);
  cell1.innerHTML = data.name;
  cell2 = newRow.insertCell(1);
  cell2.innerHTML = data.description;
  cell3 = newRow.insertCell(2);
  cell3.innerHTML = data.type;

  cell4 = newRow.insertCell(3);
  cell4.innerHTML = `<div class="detailBtn"> <button onclick="onEdit(this)">Sửa</button>
                       <button onClick="onDelete(this)">Xóa</button>
                       <button onClick="onViewDetail(this)">Xem</button></div>`;
}

function resetForm() {
  document.getElementById("name").value = "";
  document.getElementById("description").value = "";
  document.getElementById("statusFilter").value = "";
  selectedRow = null;
}

function onEdit(td) {
  createForm.style.display = "block";
  selectedRow = td.parentElement.parentElement.parentElement;
  document.getElementById("name").value = selectedRow.cells[0].innerHTML;
  document.getElementById("description").value = selectedRow.cells[1].innerHTML;
  if (selectedRow.cells[2].innerHTML == "Truy cập tự do") {
    document.getElementById("statusFilter").value = "accessible";
  } else {
    document.getElementById("statusFilter").value = "scheduled";
  }
}
function updateRecord(formData) {
  selectedRow.cells[0].innerHTML = formData.name;
  selectedRow.cells[1].innerHTML = formData.description;
  selectedRow.cells[2].innerHTML = formData.type;
}

function onDelete(td) {
  if (confirm("Are you sure to delete this record ?")) {
    row = td.parentElement.parentElement.parentElement;
    document.getElementById("examList").deleteRow(row.rowIndex);
    resetForm();
  }
}
function validate() {
  isValid = true;
  if (
    document.getElementById("name").value == "" ||
    document.getElementById("description").value == "" ||
    document.getElementById("statusFilter").value == ""
  ) {
    isValid = false;
  } else {
    isValid = true;
  }

  return isValid;
}

const searchInput = document.getElementById("searchInput");
function filterExams() {
  const searchText = searchInput.value.toLowerCase();
  const filteredExam = examList.filter((exam) => {
    const nameMatch = exam.name.toLowerCase().includes(searchText);
    return nameMatch;
  });

  renderExams(filteredExam);
}

searchInput.addEventListener("input", filterExams);

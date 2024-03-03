var selectedRow = null;
var createForm = document.getElementById("createForm");
console.log(createForm);
createForm.style.display = "none";
var isValid = (document.getElementById("validation").style.display = "none");

document.addEventListener("DOMContentLoaded", function () {
  const examList = [
    {
      name: "Kỳ thi luyện tập",
      description: "Kỳ thi luyện tập cho sinh viên",
      status: "accessible",
    },
    {
      name: "Kỳ thi giữa kỳ",
      description: "Kỳ thi được sẽ thực hiện trên phòng máy",
      status: "scheduled",
    },
    {
      name: "Kỳ thi cuối kỳ",
      description: "Kỳ thi quan trọng nhất",
      status: "scheduled",
    },
    // Thêm các kỳ thi khác vào đây
  ];

  const examTable = document.getElementById("examList");

  examTable.innerHTML = "";
  examList.forEach((exam) => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${exam.name}</td>
        <td>${exam.description}</td>
        <td>${
          exam.status === "accessible"
            ? "Truy cập tự do"
            : "Yêu cầu thời gian cụ thể"
        }</td>
        <td>
        <div class="detailBtn"> <button onclick="onEdit(this)">Sửa</button>
                       <button onClick="onDelete(this)">Xóa</button>
                       <button onClick="onViewDetail(this)">Xem</button></div>
      </td>`;
    examTable.appendChild(row);
  });
});

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
  formData["type"] = document.getElementById("statusFilter").value;
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
  document.getElementById("statusFilter").value =
    selectedRow.cells[2].innerHTML;
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

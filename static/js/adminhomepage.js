var selectedRow = null;
const createExamBtn = document.getElementById("createExamBtn");
var createForm = document.getElementById("createForm");
createExamBtn.addEventListener("click", onCreate);

function onCreate() {
  if (createForm.classList.contains("inactive")) {
    createForm.classList.remove("inactive");
  } else {
    createForm.classList.add("inactive");
  }
}

function resetForm() {
  document.getElementById("name").value = "";
  document.getElementById("description").value = "";
  document.getElementById("statusFilter").value = "";
  selectedRow = null;
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
  console.log("formData");
}

function readFormData() {
  var formData = {};
  formData["name"] = document.getElementById("name").value;
  formData["description"] = document.getElementById("description").value;

  if (document.getElementById("statusFilterForm").value == "accessible") {
    formData["status"] = "accessible";
  } else {
    formData["status"] = "scheduled";
  }
  return formData;
}

function insertNewRecord(data) {
  examList.push(data);
  renderExams(examList);
}

function updateRecord(formData) {
  console.log(formData, "object");
  selectedRow.cells[0].innerHTML = formData.name;
  selectedRow.cells[1].innerHTML = formData.description;
  if ((document.getElementById("statusFilterForm").value = "accessible")) {
    selectedRow.cells[2].querySelector("span").innerHTML == "Truy cập tự do";
  } else {
    selectedRow.cells[2].querySelector("span").innerHTML ==
      "Yêu cầu thời gian cụ thể";
  }
  //selectedRow.cells[2].innerHTML = formData.type;
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

function onEdit(td) {
  if (createForm.classList.contains("inactive")) {
    createForm.classList.remove("inactive");
    selectedRow = td.parentElement.parentElement.parentElement;
    document.getElementById("name").value =
      selectedRow.cells[0].querySelector("p").innerHTML;

    //document.getElementById("name").value = selectedRow.cells[0].innerHTML;
    document.getElementById("description").value =
      selectedRow.cells[1].innerHTML;
    if (
      selectedRow.cells[2].querySelector("span").innerHTML == "Truy cập tự do"
    ) {
      document.getElementById("statusFilterForm").value = "accessible";
    } else {
      document.getElementById("statusFilterForm").value = "scheduled";
    }
  } else {
    createForm.classList.add("inactive");
    resetForm();
    selectedRow = null;
  }
}

function onDelete(td) {
  if (confirm("Bạn có chắc chắn muốn xóa bài thi này?")) {
    row = td.parentElement.parentElement.parentElement;
    name = examList.find(
      (exam) => exam.name === row.cells[0].querySelector("p").innerHTML
    );
    examList.splice(examList.indexOf(name), 1);
    renderExams(examList);
    resetForm();
  }
}

function onViewDetail(data) {
  window.location.href = "./create.html";
}

function renderExams(exams) {
  examTable.innerHTML = "";
  exams.forEach((exam) => {
    const row = document.createElement("tr");
    let statusClass = "",
      statusText = "";
    if (exam.status === "accessible") {
      statusClass = "accessible";
      statusText = "Truy cập tự do";
    } else if (exam.status === "scheduled") {
      statusClass = "scheduled";
      statusText = "Yêu cầu thời gian cụ thể";
    }
    row.innerHTML = `
              <tr>
              <td>
                  <p>${exam.name}</p>
              </td>
              <td>${exam.description}</td>
              <td><span class="status ${statusClass}">${statusText}</span></td>
              <td class="actionAdminButton"><div class="detailBtn"> <button onclick="onEdit(this)">Sửa</button>
              <button onClick="onDelete(this)">Xóa</button>
              <button onClick="onViewDetail(this)">Xem</button></div></td>
          </tr>
        `;
    examTable.appendChild(row);
  });
}

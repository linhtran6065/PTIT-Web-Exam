function startExam(examName, status) {
  console.log(status);
  localStorage.setItem('examName', examName);
  if(status === 'accessible') {
    alert(`Bạn sẽ bắt đầu làm bài ${examName}`);
    window.location.href = "../test/test.html";  
  }
  else {
    
    var now = new Date();
    var currentHour = now.getHours();

    // Check if login is allowed only between 9 AM and 5 PM
    if (currentHour < 11 || currentHour >= 12) {
        alert("Login is only allowed between 10 AM and 11 AM.");
        return;
    }
    alert(`Bạn sẽ bắt đầu làm bài ${examName}`);
  }
  // alert(`Bạn đã chọn bắt đầu làm bài thi: ${examName}`);
  // Thực hiện các hành động khi bắt đầu làm bài thi ở đây
}


document.addEventListener("DOMContentLoaded", function() {
  const examList = [
    { name: "Kỳ thi luyện tập", status: "accessible" },
    { name: "Kỳ thi giữa kỳ", status: "scheduled" },
    { name: "Kỳ thi cuối kỳ", status: "accessible" },
    { name: "Kỳ thi thực hành", status: "accessible" },
    // Thêm các kỳ thi khác vào đây
  ];



  const examTable = document.getElementById("examList");
  const searchInput = document.getElementById("searchInput");
  const statusFilter = document.getElementById("statusFilter");

  function renderExams(exams) {
    examTable.innerHTML = "";
    exams.forEach(exam => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${exam.name}</td>
        <td>${exam.status === "accessible" ? "Truy cập tự do" : "Yêu cầu thời gian cụ thể"}</td>
        <td><button onclick="startExam('${exam.name}', '${exam.status}')">Bắt đầu</button></td>

      `;
      examTable.appendChild(row);
    });
  }

  function filterExams() {
    const searchText = searchInput.value.toLowerCase();
    const statusValue = statusFilter.value;
    const filteredExams = examList.filter(exam => {
      const nameMatch = exam.name.toLowerCase().includes(searchText);
      const statusMatch = statusValue === "all" || exam.status === statusValue;
      return nameMatch && statusMatch;
    });
    renderExams(filteredExams);
  }

 
  searchInput.addEventListener("input", filterExams);
  statusFilter.addEventListener("change", filterExams);

  // Hiển thị danh sách kỳ thi khi trang được tải
  renderExams(examList);
});
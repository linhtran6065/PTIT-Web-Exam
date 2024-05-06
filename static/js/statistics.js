import { apiDelete, apiGet, apiPost, apiPut } from "../../apiService.js";
import { isTokenExpired, logout } from "../../auth.js";

const token = localStorage.getItem("token");
isTokenExpired();

// Mẫu dữ liệu sinh viên đầy đủ
const studentData = [
  {
    name: "Nguyễn Văn A",
    studentId: "CN000",
    exam: "Lập Trình C",
    examDate: "2023-01-09",
    score: 5,
    completed: "Có",
  },
  {
    name: "Trần Thị B",
    studentId: "VT001",
    exam: "Giải Tích",
    examDate: "2023-02-07",
    score: 9,
    completed: "Không",
  },
  {
    name: "Lê Văn C",
    studentId: "CN002",
    exam: "Mạng Máy Tính",
    examDate: "2023-04-05",
    score: 6,
    completed: "Không",
  },
  {
    name: "Phạm Thị D",
    studentId: "VT003",
    exam: "Giải Tích",
    examDate: "2023-01-04",
    score: 4,
    completed: "Có",
  },
  {
    name: "Hoàng Văn E",
    studentId: "CN004",
    exam: "Lập Trình C",
    examDate: "2023-04-05",
    score: 9,
    completed: "Có",
  },
  {
    name: "Nguyễn Thị F",
    studentId: "MK005",
    exam: "Lập Trình C",
    examDate: "2023-02-01",
    score: 5,
    completed: "Không",
  },
  {
    name: "Vũ Văn G",
    studentId: "MK006",
    exam: "Mạng Máy Tính",
    examDate: "2023-02-02",
    score: 8,
    completed: "Không",
  },
  {
    name: "Đặng Thị H",
    studentId: "AT007",
    exam: "Triết Học",
    examDate: "2023-03-09",
    score: 8,
    completed: "Có",
  },
  {
    name: "Bùi Văn I",
    studentId: "AT008",
    exam: "Giải Tích",
    examDate: "2023-03-09",
    score: 6,
    completed: "Không",
  },
  {
    name: "Lê Thị J",
    studentId: "AT009",
    exam: "Lập Trình C",
    examDate: "2023-01-02",
    score: 10,
    completed: "Không",
  },
  {
    name: "Nguyễn Văn K",
    studentId: "AT010",
    exam: "Giải Tích",
    examDate: "2023-03-04",
    score: 2,
    completed: "Không",
  },
  {
    name: "Trần Thị L",
    studentId: "AT011",
    exam: "Mạng Máy Tính",
    examDate: "2023-04-01",
    score: 9,
    completed: "Không",
  },
  {
    name: "Lê Văn M",
    studentId: "CN012",
    exam: "Lập Trình C",
    examDate: "2023-03-07",
    score: 7,
    completed: "Không",
  },
  {
    name: "Phạm Thị N",
    studentId: "CN013",
    exam: "Mạng Máy Tính",
    examDate: "2023-03-05",
    score: 3,
    completed: "Không",
  },
  {
    name: "Hoàng Văn O",
    studentId: "CN014",
    exam: "Lập Trình C",
    examDate: "2023-01-03",
    score: 4,
    completed: "Không",
  },
  {
    name: "Nguyễn Thị P",
    studentId: "CN015",
    exam: "Mạng Máy Tính",
    examDate: "2023-04-04",
    score: 9,
    completed: "Không",
  },
  {
    name: "Vũ Văn Q",
    studentId: "AT016",
    exam: "Mạng Máy Tính",
    examDate: "2023-01-08",
    score: 5,
    completed: "Có",
  },
  {
    name: "Đặng Thị R",
    studentId: "MK017",
    exam: "Lập Trình C",
    examDate: "2023-04-07",
    score: 4,
    completed: "Có",
  },
  {
    name: "Bùi Văn S",
    studentId: "MK018",
    exam: "Giải Tích",
    examDate: "2023-03-01",
    score: 3,
    completed: "Không",
  },
  {
    name: "Lê Thị T",
    studentId: "CN019",
    exam: "Lập Trình C",
    examDate: "2023-02-07",
    score: 9,
    completed: "Có",
  },
  {
    name: "Mai Văn Q",
    studentId: "AT020",
    exam: "Mạng Máy Tính",
    examDate: "2023-02-09",
    score: 1,
    completed: "Không",
  },
  {
    name: "Vũ Văn Q",
    studentId: "CN026",
    exam: "Giải Tích",
    examDate: "2023-01-01",
    score: 2,
    completed: "Không",
  },
  {
    name: "Nguyễn Đức X",
    studentId: "MK027",
    exam: "Mạng Máy Tính",
    examDate: "2023-04-03",
    score: 3,
    completed: "Có",
  },
  {
    name: "Mai Văn Q",
    studentId: "KH028",
    exam: "Mạng Máy Tính",
    examDate: "2023-02-06",
    score: 5,
    completed: "Không",
  },
  {
    name: "Hoàng Minh R",
    studentId: "KH029",
    exam: "Giải Tích",
    examDate: "2023-01-02",
    score: 6,
    completed: "Không",
  },
  {
    name: "Phạm Thị N",
    studentId: "KH030",
    exam: "Triết Học",
    examDate: "2023-01-04",
    score: 7,
    completed: "Có",
  },
  {
    name: "Nguyễn Văn A",
    studentId: "KH031",
    exam: "Lập Trình C",
    examDate: "2023-02-04",
    score: 1,
    completed: "Không",
  },
  {
    name: "Bùi Văn S",
    studentId: "KH032",
    exam: "Mạng Máy Tính",
    examDate: "2023-04-07",
    score: 4,
    completed: "Không",
  },
  {
    name: "Hoàng Văn E",
    studentId: "SV033",
    exam: "Triết Học",
    examDate: "2023-01-09",
    score: 10,
    completed: "Không",
  },
  {
    name: "Trần Thị L",
    studentId: "SV034",
    exam: "Giải Tích",
    examDate: "2023-03-09",
    score: 5,
    completed: "Không",
  },
  {
    name: "Vũ Văn G",
    studentId: "SV035",
    exam: "Lập Trình C",
    examDate: "2023-03-01",
    score: 10,
    completed: "Không",
  },
  {
    name: "Đặng Thị R",
    studentId: "SV036",
    exam: "Giải Tích",
    examDate: "2023-01-08",
    score: 1,
    completed: "Không",
  },
  {
    name: "Phạm Thị D",
    studentId: "SV037",
    exam: "Mạng Máy Tính",
    examDate: "2023-03-01",
    score: 2,
    completed: "Có",
  },
  {
    name: "Bạch Kim X",
    studentId: "SV038",
    exam: "Mạng Máy Tính",
    examDate: "2023-04-06",
    score: 2,
    completed: "Có",
  },
  {
    name: "Dương Bảo S",
    studentId: "SV039",
    exam: "Giải Tích",
    examDate: "2023-01-03",
    score: 4,
    completed: "Có",
  },
];

const totalQuestions = localStorage.getItem("count");
// Dữ liệu hiện tại đang được hiển thị
//let currentDisplayedData = studentData;
let currentDisplayedData = null;

// Biểu đồ đang được hiển thị
let currentChart = null;

// load các loại kì thi cho filter
function loadExamOptions() {
  isTokenExpired();
  apiGet("/api/exams", localStorage.getItem("token"))
    .then((response) => {
      const examSet = response.data;
      const examFilter = document.getElementById("examFilter");
      examSet.forEach((exam) => {
        let option = new Option(exam.name, exam.name);
        examFilter.appendChild(option);
      });
    })
    .catch((error) => {
      console.error("Error fetching exams:", error);
    });
}

// hiển thị ngày theo dạng dd-mm-yyy
function convertDateFormat(dateStr) {
  return new Date(dateStr).toLocaleDateString();
  // return dateStr.split("-").reverse().join("-");
}

// Hàm hiển thị dữ liệu
function displayData(data, queryParams) {
  isTokenExpired();
  apiGet("/api/forms", localStorage.getItem("token"), queryParams)
    .then((data) => {
      currentDisplayedData = data.data;
      renderData(currentDisplayedData);
      drawScoreDistributionChart(currentDisplayedData);
      calculateStatistics(data.data);
    })
    .catch((error) => {
      console.error("Error", error);
    });
}
function renderData(data) {
  const tableBody = document
    .getElementById("resultsTable")
    .getElementsByTagName("tbody")[0];
  tableBody.innerHTML = ""; // Xóa dữ liệu hiện có trước khi đổ dữ liệu mới
  data.forEach((student) => {
    let row = `<tr>
                    <td>${
                      student.student.firstName + " " + student.student.lastName
                    }</td>
                    <td>${student.student.msv}</td>
                    <td>${student.exam.name}</td>
                    <td>${convertDateFormat(student.startTime)}</td>
                    <td>${convertDateFormat(student.endTime)}</td>
                    <td>${(student.score / totalQuestions) * 10}</td>
                    <td>${student.isFinish}</td>
                   </tr>`;
    tableBody.innerHTML += row;
  });
}

// lọc dữ liệu và cập nhật lại thống kê và biểu đồ
function filterResults() {
  const examFilterValue = document.getElementById("examFilter").value;
  const startDateFilterValue = document.getElementById("startDateFilter").value;
  const endDateFilterValue = document.getElementById("endDateFilter").value;

  let filteredData = currentDisplayedData.filter((student) => {
    const examStartDate = new Date(student.startTime);
    const examEndDate = new Date(student.endTime);
    const startDate = startDateFilterValue
      ? new Date(startDateFilterValue)
      : new Date("1900-01-01");
    const endDate = endDateFilterValue
      ? new Date(endDateFilterValue)
      : new Date("2100-01-01");

    return (
      (!examFilterValue || student.exam === examFilterValue) &&
      (!startDateFilterValue || examStartDate >= startDate) &&
      (!endDateFilterValue || examEndDate <= endDate)
    );
  });
  console.log(examFilterValue);
  // Cập nhật dữ liệu hiện tại và hiển thị
  currentDisplayedData = filteredData;
  var queryParams = {
    examName: encodeURIComponent(examFilterValue),
    startTime: startDateFilterValue,
    endTime: endDateFilterValue,
  };
  displayData(filteredData, queryParams);
  //calculateStatistics(filteredData);
  // drawScoreDistributionChart(filteredData);
}

// Hàm sắp xếp dữ liệu
function sortData() {
  let sortBy = document.getElementById("sortSelect").value;
  let sortedData = [...currentDisplayedData]; // Sắp xếp trên dữ liệu hiện tại đang được hiển thị

  if (
    sortBy === "name" ||
    sortBy === "studentId" ||
    sortBy === "exam"
    //sortBy === "startTime" ||
  ) {
    sortedData.sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
  } else if (sortBy === "score") {
    sortedData.sort((b, a) => a[sortBy] - b[sortBy]);
  }
  renderData(sortedData);
}

function calculateStatistics(data) {
  const totalParticipations = data.length;
  const completed = data.filter((student) => student.isFinish === "Có").length;
  const completionRate = ((completed / totalParticipations) * 100).toFixed(2);
  const averageScore = (
    data.reduce((acc, curr) => acc + curr.score, 0) / totalParticipations
  ).toFixed(2);

  document.getElementById("totalParticipations").textContent =
    totalParticipations;
  document.getElementById("completionRate").textContent = completionRate;
  document.getElementById("averageScore").textContent = averageScore;
}

// Hàm vẽ biểu đồ phân phối điểm số
function drawScoreDistributionChart(data) {
  // Định nghĩa các khoảng điểm số
  const scoreRanges = [
    "<1",
    "1-2",
    "2-3",
    "3-4",
    "4-5",
    "5-6",
    "6-7",
    "7-8",
    "8-9",
    "9-10",
  ];
  const scoreCounts = new Array(scoreRanges.length).fill(0);

  // Xóa biểu đồ hiện tại trước khi vẽ mới
  if (currentChart) {
    currentChart.destroy();
  }

  // Phân loại và đếm điểm số
  data.forEach((student) => {
    const score = (student.score / totalQuestions) * 10;
    if (score < 1) scoreCounts[0]++;
    else if (score < 2) scoreCounts[1]++;
    else if (score < 3) scoreCounts[2]++;
    else if (score < 4) scoreCounts[3]++;
    else if (score < 5) scoreCounts[4]++;
    else if (score < 6) scoreCounts[5]++;
    else if (score < 7) scoreCounts[6]++;
    else if (score < 8) scoreCounts[7]++;
    else if (score < 9) scoreCounts[8]++;
    else scoreCounts[9]++;
  });

  // Vẽ biểu đồ
  const ctx = document
    .getElementById("scoreDistributionChart")
    .getContext("2d");
  currentChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: scoreRanges,
      datasets: [
        {
          label: "Phân phối điểm số",
          data: scoreCounts,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 1,
          },
        },
      },
    },
  });
}

function exportToExcel() {
  const worksheet = XLSX.utils.json_to_sheet(currentDisplayedData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "StudentData");
  XLSX.writeFile(workbook, "student_data.xlsx");
}

window.onload = () => {
  loadExamOptions();
  displayData(null);
  calculateStatistics(currentDisplayedData);
  drawScoreDistributionChart(currentDisplayedData);
};

window.filterResults = filterResults;
window.exportToExcel = exportToExcel;
window.sortData = sortData;

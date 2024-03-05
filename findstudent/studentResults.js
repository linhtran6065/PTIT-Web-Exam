function searchStudent() {
    const searchInput = document.getElementById('searchInput').value.trim().toLowerCase();
    const resultsContainer = document.getElementById('resultsContainer');
    resultsContainer.innerHTML = ''; // Clear previous results

    const filteredStudents = studentsData.filter(student =>
        student.name.toLowerCase().includes(searchInput) || student.studentId.toLowerCase().includes(searchInput)
    );

    if (filteredStudents.length > 0) {
        const table = document.createElement('table');
        table.innerHTML = `
            <thead>
                <tr>
                    <th>Tên Sinh Viên</th>
                    <th>MSV</th>
                    <th>Kỳ Thi</th>
                    <th>Ngày Thi</th>
                    <th>Điểm</th>
                    <th>Trạng Thái</th>
                    <th>Chi Tiết</th>
                </tr>
            </thead>
            <tbody>
                ${filteredStudents.map(student => 
                    student.exams.map(exam => `
                        <tr>
                            <td>${student.name}</td>
                            <td>${student.studentId}</td>
                            <td>${exam.exam}</td>
                            <td>${exam.date}</td>
                            <td>${exam.score}</td>
                            <td>${exam.completed}</td>
                            <td><button class="view-details-btn" data-studentid="${student.studentId}" data-examname="${exam.exam}">Xem</button></td>
                        </tr>
                    `).join('')
                ).join('')}
            </tbody>
        `;
        resultsContainer.appendChild(table);
    } else {
        resultsContainer.innerHTML = "<p>Không tìm thấy kết quả.</p>";
    }
}

function showExamDetails(studentId, examName) {
    const students = studentsData.filter(student => student.studentId === studentId);
    allMatchingExamsAnswers = [];
    // Lặp qua tất cả sinh viên tìm được
    students.forEach(student => {
        // Tìm và thêm các kỳ thi phù hợp vào mảng kết quả
        student.exams.forEach(ex => {
            if (ex.exam === examName) {
                allMatchingExamsAnswers.push(ex);
            }
        });
    });
    const exam = allMatchingExamsAnswers[0];
    let detailsHtml = `<h2>Chi Tiết Bài Thi: ${examName}</h2>`;
    exam.answers.forEach(answer => {
        detailsHtml += `
            <p>Câu hỏi: ${answer.question}</p>
            <p>Đáp án của bạn: ${answer.studentAnswer}</p>
            <p>Đáp án đúng: <span class="correct-answer">${answer.correctAnswer}</span></p>
            <p>Giải thích: ${answer.explanation}</p>
            <hr>`;
    });

    document.getElementById('examDetails').innerHTML = detailsHtml;
    document.getElementById('examDetailPopup').style.display = 'block';
}

// Hàm để đóng popup
function closePopup() {
    document.getElementById('examDetailPopup').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('resultsContainer').addEventListener('click', function(event) {
        const target = event.target;
        if (target.classList.contains('view-details-btn')) {
            const studentId = target.getAttribute('data-studentid');
            const examName = target.getAttribute('data-examname');
            showExamDetails(studentId, examName);
        }
    });
});

function exportToExcel() {
    const filteredStudents = studentsData.filter(student =>
        student.name.toLowerCase().includes(searchInput) || student.studentId.toLowerCase().includes(searchInput)
    );

    // Kiểm tra xem có kết quả nào không
    if (filteredStudents.length > 0) {
        // Tạo worksheet
        const ws = XLSX.utils.json_to_sheet(filteredStudents);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Kết Quả");
        XLSX.writeFile(wb, "KetQuaTimKiem.xlsx");
    } else {
        alert("Không có dữ liệu để xuất!");
    }
}
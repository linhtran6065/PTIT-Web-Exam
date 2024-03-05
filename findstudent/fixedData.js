const studentsData = [
    {
        name: "Nguyễn Văn A",
        studentId: "SV001",
        exams: [
            {
                exam: "Lập Trình C",
                date: "2023-01-09",
                score: 5,
                completed: "Có",
                answers: [
                    { question: "Câu 1", studentAnswer: "A", correctAnswer: "A", explanation: "Giải thích đáp án A là đúng vì..." },
                    { question: "Câu 2", studentAnswer: "B", correctAnswer: "C", explanation: "Giải thích đáp án C là đúng vì..." },
                ],
            },
        ],
    },
    {
        name: "Nguyễn Văn A",
        studentId: "SV001",
        exams: [
            {
                exam: "Giải Tích",
                date: "2023-02-15",
                score: 8,
                completed: "Có",
                answers: [
                    { question: "Câu 1", studentAnswer: "D", correctAnswer: "D", explanation: "Giải thích đáp án D là đúng vì..." },
                    { question: "Câu 2", studentAnswer: "A", correctAnswer: "A", explanation: "Giải thích đáp án A là đúng vì..." },
                ],
            },
        ],
    },
    {
        name: "Nguyễn Văn A",
        studentId: "SV001",
        exams: [
            {
                exam: "Mạng Máy Tính",
                date: "2023-03-21",
                score: 7,
                completed: "Không",
                answers: [
                    { question: "Câu 1", studentAnswer: "C", correctAnswer: "B", explanation: "Giải thích đáp án B là đúng vì..." },
                    { question: "Câu 2", studentAnswer: "D", correctAnswer: "D", explanation: "Giải thích đáp án D là đúng vì..." },
                ],
            },
        ],
    },
    {
        name: "Nguyễn Văn A",
        studentId: "SV001",
        exams: [
            {
                exam: "Triết Học",
                date: "2023-03-30",
                score: 9,
                completed: "Có",
                answers: [
                    { question: "Câu 1", studentAnswer: "C", correctAnswer: "C", explanation: "Giải thích: Đáp án C là đúng vì nó phản ánh..." },
                    { question: "Câu 2", studentAnswer: "A", correctAnswer: "B", explanation: "Giải thích: Mặc dù A có vẻ hợp lý, nhưng B mới chính xác..." },
                ],
            },
        ],
    },
    {
        name: "Hoàng Văn E",
        studentId: "SV005",
        exams: [
            {
                exam: "Vật Lý",
                date: "2023-04-12",
                score: 7,
                completed: "Không",
                answers: [
                    { question: "Câu 1", studentAnswer: "B", correctAnswer: "B", explanation: "Giải thích: Đáp án B chính xác vì nó tuân theo..." },
                    { question: "Câu 2", studentAnswer: "D", correctAnswer: "C", explanation: "Giải thích: Dù D có vẻ đúng, nhưng C là câu trả lời chính xác vì..." },
                ],
            },
        ],
    },
    {
        name: "Nguyễn Thị F",
        studentId: "SV006",
        exams: [
            {
                exam: "Hóa Học",
                date: "2023-02-25",
                score: 8,
                completed: "Có",
                answers: [
                    { question: "Câu 1", studentAnswer: "A", correctAnswer: "A", explanation: "Giải thích: A là đáp án chính xác vì nó tuân thủ các quy tắc..." },
                    { question: "Câu 2", studentAnswer: "C", correctAnswer: "B", explanation: "Giải thích: C không đúng vì không phản ánh đúng..." },
                ],
            },
        ],
    },
    {
        name: "Vũ Văn G",
        studentId: "SV007",
        exams: [
            {
                exam: "Toán Học",
                date: "2023-01-18",
                score: 6,
                completed: "Không",
                answers: [
                    { question: "Câu 1", studentAnswer: "D", correctAnswer: "D", explanation: "Giải thích: D là đáp án chính xác do nó..." },
                    { question: "Câu 2", studentAnswer: "B", correctAnswer: "A", explanation: "Giải thích: B là một lựa chọn hợp lý nhưng không chính xác như A..." },
                ],
            },
        ],
    },
    {
        name: "Đặng Thị H",
        studentId: "SV008",
        exams: [
            {
                exam: "Ngữ Văn",
                date: "2023-03-15",
                score: 10,
                completed: "Có",
                answers: [
                    { question: "Câu 1", studentAnswer: "A", correctAnswer: "A", explanation: "Giải thích: A chính xác vì nó thể hiện đúng ý nghĩa của tác phẩm..." },
                    { question: "Câu 2", studentAnswer: "C", correctAnswer: "C", explanation: "Giải thích: C là câu trả lời chính xác nhất, phản ánh đúng quan điểm của tác giả về..." },
                ],
            },
        ],
    }
];
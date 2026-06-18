# BÀI LÀM KIỂM TRA GIỮA KỲ
## HỌC PHẦN: THIẾT KẾ WEB NÂNG CAO

- **Họ và tên:** [Điền họ tên của bạn vào đây]
- **MSSV:** [Điền MSSV của bạn vào đây]
- **Lớp:** [Điền lớp của bạn vào đây]

---

## PHẦN 1. PHÂN TÍCH PROJECT

### **Câu 1: Lập bảng xác định file xử lý cho chức năng hiển thị danh sách sinh viên**

Bảng dưới đây xác định các file chịu trách nhiệm xử lý trong mô hình MVC cho chức năng hiển thị danh sách sinh viên:

| Thành phần MVC | Tên file xử lý | Đường dẫn chi tiết | Mô tả vai trò cụ thể |
| :--- | :--- | :--- | :--- |
| **Route** | studentRoutes.js | `student-management/routes/studentRoutes.js` | Tiếp nhận request GET gửi tới `/students`. |
| **Controller** | studentController.js | `student-management/controllers/studentController.js` | Hàm `index(req, res)` tiếp nhận yêu cầu từ route, điều phối gọi Model để lấy dữ liệu và render ra View. |
| **Model** | studentModel.js | `student-management/models/studentModel.js` | Hàm `getAllStudents()` và `searchStudents(keyword)` thực hiện truy vấn SQL lấy dữ liệu từ database SQLite. |
| **View** | index.ejs | `student-management/views/students/index.ejs` | Nhận danh sách sinh viên từ controller và hiển thị thành bảng trên trình duyệt Client. |

---

### **Câu 2: Mô tả luồng xử lý khi truy cập GET `/students`**

Luồng xử lý khi người dùng truy cập `GET /students` diễn ra theo thứ tự các file như sau:

1. **`student-management/app.js`**:
   - Nhận request từ trình duyệt Client gửi tới đường dẫn `/students`.
   - Sử dụng middleware `app.use("/students", studentRoutes)` để chuyển tiếp yêu cầu đến Router.

2. **`student-management/routes/studentRoutes.js`**:
   - Router so khớp đường dẫn gốc `/` của `/students` qua định nghĩa:
     ```javascript
     router.get("/", studentController.index)
     ```
   - Chuyển quyền xử lý cho hàm `index` thuộc `studentController`.

3. **`student-management/controllers/studentController.js`**:
   - Hàm `index` đọc query parameter `keyword` từ Client gửi lên.
   - Nếu `keyword` trống (truy cập danh sách bình thường), Controller gọi hàm `studentModel.getAllStudents()`.
   - Nếu `keyword` có dữ liệu (thực hiện tìm kiếm), Controller gọi hàm `studentModel.searchStudents(keyword)`.

4. **`student-management/models/studentModel.js`**:
   - Hàm `getAllStudents` hoặc `searchStudents` tương tác với file kết nối database `config/db.js` để thực thi câu lệnh SQL SELECT lấy dữ liệu.
   - Trả dữ liệu mảng kết quả về cho Controller dưới dạng một `Promise`.

5. **`student-management/controllers/studentController.js`**:
   - Sau khi nhận được dữ liệu từ Model, Controller gọi:
     ```javascript
     res.render("students/index", { students: students, keyword: keyword, ... })
     ```
   - Truyền dữ liệu sang View engine EJS để chuẩn bị kết xuất giao diện.

6. **`student-management/views/students/index.ejs`**:
   - View engine EJS thực hiện biên dịch mã HTML tĩnh kết hợp chèn dữ liệu động (sử dụng vòng lặp `students.forEach` để hiển thị dữ liệu ra bảng).
   - Render thành tài liệu HTML hoàn chỉnh và gửi trả về phía trình duyệt Client.

---

### **Câu 3: Giải thích ngắn gọn vai trò của Routes, Controllers, Models, Views trong project**

- **Routes (Định tuyến)**: Làm nhiệm vụ định hướng đường đi cho các request. Nó liên kết các đường dẫn URL và phương thức HTTP (GET, POST...) với các hàm xử lý hành động cụ thể ở Controller.
- **Controllers (Bộ điều khiển)**: Đóng vai trò là trung tâm xử lý logic nghiệp vụ. Nó tiếp nhận các tham số đầu vào từ Route, giao tiếp với Model để xử lý dữ liệu và chỉ định View tương ứng để hiển thị kết quả về cho Client.
- **Models (Mô hình dữ liệu)**: Chịu trách nhiệm giao tiếp trực tiếp với cơ sở dữ liệu (SQLite), thực thi các câu lệnh SQL để truy vấn hoặc cập nhật dữ liệu, sau đó trả kết quả về cho Controller.
- **Views (Giao diện hiển thị)**: Chứa giao diện HTML và các thẻ template EJS nhằm hiển thị dữ liệu trực quan cho người dùng cuối tương tác.

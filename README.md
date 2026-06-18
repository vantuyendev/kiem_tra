**ĐỀ KIỂM TRA GIỮA KỲ**

**HỌC PHẦN THIẾT KẾ WEB NÂNG CAO**

# I. Source code được cung cấp {#i.-source-code-được-cung-cấp}

Sinh viên được cung cấp project starter có cấu trúc như sau:

> student-management/\
> ├── app.js\
> ├── package.json\
> ├── config/\
> │ └── db.js\
> ├── routes/\
> │ └── studentRoutes.js\
> ├── controllers/\
> │ └── studentController.js\
> ├── models/\
> │ └── studentModel.js\
> ├── views/\
> │ └── students/\
> │ ├── index.ejs\
> │ ├── create.ejs\
> │ └── edit.ejs\
> ├── public/\
> │ └── style.css\
> └── data/\
> └── database.sqlite

Cách chạy project:

> **npm install\
> npm start\
> http://localhost:3000/students**

Project hiện tại đã có một số phần chạy được và một số lỗi cần sinh viên sửa trong bài kiểm tra.

# II. Nội dung bài làm và thang điểm {#ii.-nội-dung-bài-làm-và-thang-điểm}

## Phần 1. Phân tích project - 15 điểm {#phần-1.-phân-tích-project---15-điểm}

Mở project được cung cấp và trả lời trong báo cáo.

**Câu 1 - 5 điểm:** Lập bảng xác định file xử lý cho **chức năng hiển thị danh sách sinh viên**: route, controller, model, view.

**Câu 2 - 5 điểm:** Mô tả **luồng xử lý khi truy cập GET /students** theo đúng thứ tự các file được gọi.

**Câu 3 - 5 điểm:** Giải thích ngắn gọn vai trò của routes, controllers, models, views trong project này.

## Phần 2. Sửa lỗi project - 20 điểm {#phần-2.-sửa-lỗi-project---20-điểm}

1.  **Lỗi 1 - 5 điểm:** Khi bấm nút "Thêm sinh viên" tại trang danh sách, trình duyệt báo Cannot GET /students/create. Tìm nguyên nhân, giải thích và sửa lỗi.

    [Chụp ảnh phần code sửa và kết quả thực hiện sau khi sửa vào đây]{.mark}

2.  **Lỗi 2 - 5 điểm:** Sau khi submit form thêm sinh viên, chương trình báo lỗi Cannot find view. Tìm nguyên nhân, giải thích và sửa để thêm xong quay về danh sách.

    [Chụp ảnh phần code sửa và kết quả thực hiện sau khi sửa vào đây]{.mark}

3.  **Lỗi 3 - 5 điểm:** Chức năng tìm kiếm có ô nhập nhưng chưa lọc dữ liệu theo từ khóa. Xác định nguyên nhân, giải thích trong model/controller.

    [Chụp ảnh vị trí phần code cần sửa vào đây]{.mark}

4.  **Lỗi 4 - 5 điểm:** Chức năng sửa và xóa có route/controller nhưng chưa làm thay đổi dữ liệu trong CSDL. Tìm nguyên nhân, giải thích và xác định vị trí cần sửa trong model.

    [Chụp ảnh vị trí phần code cần sửa vào đây]{.mark}

## Phần 3. Bổ sung chức năng tìm kiếm - 15 điểm {#phần-3.-bổ-sung-chức-năng-tìm-kiếm---15-điểm}

Hoàn thiện tìm kiếm tại trang /students.

- Tìm theo student_code, fullname, major.

- Ví dụ: /students?keyword=CNTT

- Nếu có kết quả thì hiển thị danh sách phù hợp.

- Nếu không có kết quả thì hiển thị thông báo: Không tìm thấy sinh viên phù hợp.

- Sau khi tìm kiếm, ô tìm kiếm vẫn giữ lại từ khóa đã nhập.

  [Chụp ảnh phần code sửa để thực hiện nhiệm vụ này, thông tin sinh viên trước và sau khi sửa]{.mark}

## Phần 4. Hoàn thiện chức năng sửa sinh viên - 20 điểm {#phần-4.-hoàn-thiện-chức-năng-sửa-sinh-viên---20-điểm}

- Route yêu cầu: GET /students/edit/:id và POST /students/edit/:id.

- Form sửa phải hiển thị dữ liệu cũ.

- Sau khi sửa thành công phải redirect về /students.

- Dữ liệu trong CSDL phải thay đổi thật.

  [Chụp ảnh phần code sửa để thực hiện nhiệm vụ này, thông tin sinh viên trước và sau khi sửa]{.mark}

## Phần 5. Hoàn thiện chức năng xóa sinh viên - 15 điểm {#phần-5.-hoàn-thiện-chức-năng-xóa-sinh-viên---15-điểm}

- Route yêu cầu: POST /students/delete/:id.

- Không dùng GET để xóa.

- Sau khi xóa thành công phải redirect về /students.

- Dữ liệu trong CSDL phải bị xóa thật.

  [Chụp ảnh phần code sửa để thực hiện nhiệm vụ này, danh sách sinh viên trước và sau khi sửa]{.mark}

## Phần 6. Đọc hiểu code và giải thích - 15 điểm {#phần-6.-đọc-hiểu-code-và-giải-thích---15-điểm}

> **router.post(\'/delete/:id\', studentController.destroy);**
>
> **//StudentController\
> async function destroy(req, res) {**
>
> **await studentModel.deleteStudent(req.params.id) res.redirect(\'/students\');\
> };**

**Câu 1 - 3 điểm:** Giải thích **:id** trong route có ý nghĩa gì.

**Câu 2 - 3 điểm:** Giá trị **req.params.id** được lấy từ đâu.

**Câu 3 - 3 điểm:** Nếu đổi **req.params.id** thành **req.body.id** thì có thể xảy ra vấn đề gì.

**Câu 4 - 3 điểm:** Tại sao chức năng xóa nên dùng **POST** thay vì **GET**.

**Câu 5 - 3 điểm:** Nếu bỏ **res.redirect(\"/students\")** sau khi xóa thì trình duyệt sẽ hiển thị gì hoặc có thể gặp vấn đề gì.

# III. Yêu cầu nộp bài {#iii.-yêu-cầu-nộp-bài}

- Nộp 01 file nén **MSSV_HoTen_Midterm.zip.**

- Bên trong có thư mục source code đã hoàn thiện.

- Có file bài làm gồm ảnh minh chứng và phần trả lời câu hỏi.

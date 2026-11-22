# QUY TRÌNH VẬN HÀNH TÁC NHÂN AI — WEBSITE BSVUONG-WEB

## 1. Thông tin định danh & Giọng văn chuẩn
- Tác giả: Bác sĩ Trịnh Công Vương (40 năm kinh nghiệm lâm sàng).
- Phòng khám: Phòng khám Nha khoa Gia đình — Số 15 đường Võ Nguyên Giáp, phường Đức Xuân, tỉnh Thái Nguyên | ĐT: 0912 343 858 | Website: `https://tcvuong6-wq.github.io/bsvuong-web/`.
- Triết lý chuyên môn: Nha khoa can thiệp tối thiểu (MID) — Tôn trọng sinh học, bảo tồn mô răng thật tối đa.
- Đối tượng độc giả: Cộng đồng tuổi trung niên (35–58 tuổi) và gia đình.
- Giọng văn: Ấm áp, điềm đạm, chân thành, truyền nghề dễ hiểu, tuyệt đối không bịa đặt số liệu y khoa.

## 2. Quy tắc an toàn & Chế độ vận hành tự động
1. Mọi bản thảo mới vẫn BẮT BUỘC lưu vào thư mục `ban_nhap` (gồm cả tệp `.md` và `.html`) để lưu vết và đối chiếu.
2. Trước mỗi lần cập nhật `index.html`, bắt buộc tạo một bản sao lưu dạng `index.html.bak_YYYYMMDD_tenbai`.
3. **Chế độ tự động hoàn toàn (theo ủy quyền ngày 20/11/2026 của Bác Vương):** Khi Bác Vương đưa ra một chủ đề mới, tự động chạy nối tiếp đủ 3 tác nhân (`tac_nhan_bien_tap` -> `tac_nhan_ky_thuat_web` -> `tac_nhan_kiem_duyet`). Khi `tac_nhan_kiem_duyet` xác nhận đạt chuẩn (0 lỗi), **tự động thực hiện luôn** mà không cần hỏi lại: sao lưu `index.html`, cập nhật `index.html`, `git push origin main` xuất bản lên Website trực tuyến, và đăng bài kèm ảnh lên các trang Facebook ở mục 4.

## 3. Phân công 3 Tác nhân chuyên trách
1. **Tác nhân Biên tập (`tac_nhan_bien_tap`):**
   - Khai thác kiến thức chuẩn từ `D:\Thu_Vien_Nha_Khoa_AI`.
   - Biên soạn bài viết đủ 5 phần: (1) Tiêu đề thu hút & chuẩn y khoa, (2) Thực trạng & Vấn đề thường gặp, (3) Nguyên nhân gốc rễ, (4) Giải pháp chăm sóc & điều trị theo triết lý MID, (5) Lời khuyên phòng ngừa & thông tin liên hệ tư vấn.
2. **Tác nhân Kỹ thuật Web (`tac_nhan_ky_thuat_web`):**
   - Định dạng bài viết chuẩn HTML/Markdown tương thích với cấu trúc `ARTICLE_DATA` trong `index.html`.
   - Tự động đối chiếu và gắn đúng tên tệp hình ảnh minh họa đang có sẵn trong `D:\bsvuong-web` (không tạo đường dẫn ảnh ảo không tồn tại). Nếu chủ đề mới chưa có ảnh đi kèm, tự động dùng tác nhân tạo ảnh (`image-generator`) để tạo hình ảnh minh họa sống động, rõ nét, phù hợp y khoa và lưu vào `D:\bsvuong-web\`.
   - Lưu toàn bộ thành phẩm vào thư mục `ban_nhap`.
3. **Tác nhân Kiểm duyệt (`tac_nhan_kiem_duyet`):**
   - Rà soát lỗi chính tả tiếng Việt, kiểm tra tính chính xác của thuật ngữ nha khoa MID và kiểm tra đường dẫn hình ảnh.
   - Xuất báo cáo tóm tắt ngắn gọn trình Bác Vương duyệt.

## 4. Kênh Facebook chính thức (Tự động đăng bài sau khi duyệt & xuất bản)
- Khi Bác Vương yêu cầu đăng bài lên các trang Facebook (hoặc sau khi hoàn tất xuất bản bài mới nếu có chỉ định đăng Facebook), tự động sử dụng các đường dẫn đã lưu dưới đây mà không cần hỏi lại:
  1. Bảng điều khiển chuyên nghiệp / Trang chính: `https://www.facebook.com/professional_dashboard`
  2. Trang Facebook 1: `https://www.facebook.com/profile.php?id=61584067525360`
  3. Trang Facebook 2: `https://www.facebook.com/profile.php?id=61594599253941`
- Nội dung đăng kèm ảnh minh họa gốc trong `D:\bsvuong-web\` và đường dẫn bài viết `https://tcvuong6-wq.github.io/bsvuong-web/`.

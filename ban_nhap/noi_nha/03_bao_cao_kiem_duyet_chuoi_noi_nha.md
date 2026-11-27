# BÁO CÁO KIỂM DUYỆT — CHUỖI 15 BÀI VIẾT NỘI NHA (NT-01 ĐẾN NT-15)

**Ngày kiểm duyệt:** 22/11/2026
**Người thực hiện:** Tác nhân Kiểm duyệt (`tac_nhan_kiem_duyet`) theo quy trình [huong_dan_agent.md](file:///d:/bsvuong-web/huong_dan_agent.md)
**Đối tượng kiểm duyệt:** 15 bài viết chuyên sâu (`.md` & `.html`), 15 bài đăng Facebook/Zalo, và 15 hình ảnh minh họa tại `d:\bsvuong-web\ban_nhap\noi_nha\` và `d:\bsvuong-web\images\`.

---

## 1. Kết quả kiểm tra 3 tiêu chuẩn bắt buộc

1. **Chính tả tiếng Việt & Giọng văn:** Đạt chuẩn 15/15 bài. Giọng văn ấm áp, điềm đạm, chuẩn mực theo phong cách Bác sĩ Trịnh Công Vương (40 năm kinh nghiệm lâm sàng), phù hợp độc giả trung niên và gia đình.
2. **Thuật ngữ y khoa & Triết lý MID:** Đạt chuẩn 15/15 bài. Tuân thủ đúng định hướng Nha khoa can thiệp tối thiểu (MID), các khuyến cáo AAE/ESE, không bịa đặt số liệu, ghi chú rõ giới hạn và chỉ định bảo tồn tủy sống (VPT) vs. điều trị nội nha.
3. **Kiểm tra tệp & Đường dẫn hình ảnh:** Đạt 15/15 tệp tồn tại thực tế trên ổ đĩa:
   - `NT-01` đến `NT-09`: 9 ảnh 3D y khoa `.jpg` trong `d:\bsvuong-web\images\nt-01-*.jpg` .. `nt-09-*.jpg`.
   - `NT-10` đến `NT-15`: 6 sơ đồ vector y khoa `.svg` trong `d:\bsvuong-web\images\nt-10-*.svg` .. `nt-15-*.svg` (sẵn sàng nâng cấp lên `.jpg` 3D khi hạn mức tạo ảnh AI được mở lại).

---

## 2. Quy trình xuất bản hằng ngày (08:00 – 09:00 sáng, từ 23/11/2026 đến 07/12/2026)

Mỗi ngày khi lịch tự động (`task-94`) kích hoạt cho mã bài `nt-XX` kế tiếp:
1. **Sao lưu an toàn:** Tạo bản sao lưu `index.html.bak_YYYYMMDD_ntXX` (và sao lưu `articles-data.js`) trước khi chỉnh sửa.
2. **Cập nhật dữ liệu website:** Thêm đồng bộ cả `ARTICLE_DATA['nt-XX-...']` và `ARTICLE_CARD_META['nt-XX-...']` vào `d:\bsvuong-web\assets\js\articles-data.js`.
3. **Kiểm tra & Xuất bản GitHub Pages:** Kiểm tra cú pháp JS hợp lệ, chạy `git add`, `git commit`, `git push origin main` lên `https://tcvuong6-wq.github.io/bsvuong-web/`.
4. **Đăng Facebook tự động:** Đăng bài tóm tắt (~200 từ) kèm ảnh minh họa gốc trong `d:\bsvuong-web\images\` và link website lên 3 đường dẫn Facebook chính thức trong `huong_dan_agent.md`.

**Kết luận kiểm duyệt:** **ĐẠT CHUẨN (0 LỖI)** — Sẵn sàng vận hành tự động theo lịch 08:00 sáng hằng ngày.

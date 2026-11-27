# BÁO CÁO KIỂM DUYỆT BẢN THẢO BÀI VIẾT MỚI

**Bài viết:** *Khám răng khi có bệnh tim mạch cần chuẩn bị gì để điều trị nhẹ nhàng và an toàn?*
**ID bài viết:** `kham-rang-benh-tim-mach` · **Chuyên mục:** `du-phong`
**Kết luận kiểm duyệt:** **ĐẠT CHUẨN — SẴN SÀNG TRÌNH BÁC VƯƠNG DUYỆT XUẤT BẢN**

---

## 1. Kết quả kiểm tra tệp & mã hóa UTF-8
Tất cả 3 tệp trong `D:\bsvuong-web\ban_nhap\` đều đọc được bình thường, mã hóa **UTF-8 (không BOM)**, không lỗi font:
- `01_ban_thao_bien_tap_kham_rang_benh_tim_mach.md` (13.286 bytes) — Đạt.
- `kham_rang_khi_co_benh_tim_mach.html` (16.549 bytes) — Đạt.
- `02_snippet_index_kham_rang_benh_tim_mach.txt` (9.939 bytes) — Đạt.

## 2. Kết quả kiểm tra hình ảnh minh họa
- Tệp `D:\bsvuong-web\kham-rang-benh-tim-mach.jpg`: **Tồn tại thực tế**, dung lượng **238.388 bytes** (> 0).
- Đường dẫn tương đối:
  - Trong `kham_rang_khi_co_benh_tim_mach.html`: `src="../kham-rang-benh-tim-mach.jpg"` — Chính xác khi xem từ thư mục `ban_nhap`.
  - Trong `02_snippet_index_kham_rang_benh_tim_mach.txt`: `src="kham-rang-benh-tim-mach.jpg"` và `image:'kham-rang-benh-tim-mach.jpg'` — Chính xác khi tích hợp vào `D:\bsvuong-web\index.html`.

## 3. Nội dung y khoa, đối chiếu ảnh & thông tin định danh
- **Đối chiếu 5 điều trên ảnh `kham-rang-benh-tim-mach.jpg`:** Cả 3 tệp truyền tải đầy đủ, chính xác cả 5 điều (1. Thông báo rõ tình trạng tim mạch; 2. Mang theo danh sách thuốc; 3. Đánh giá và hỏi ý kiến bác sĩ tim mạch trong trường hợp đặc biệt; 4. Nguyên tắc điều trị an toàn theo MID; 5. Báo ngay nếu có dấu hiệu bất thường / gọi 115).
- **Thuật ngữ & số liệu:** Thuật ngữ y khoa – nha khoa can thiệp tối thiểu (MID) chuẩn xác (*viêm nội tâm mạc nhiễm khuẩn, thuốc chống đông / kháng kết tập tiểu cầu, Aspirin, Clopidogrel, Warfarin, Rivaroxaban, adrenaline, tái khoáng hóa, trám bảo tồn*); không bịa đặt số liệu lâm sàng.
- **Chính tả & dấu câu:** Không phát hiện lỗi chính tả tiếng Việt hoặc lỗi dấu câu.
- **Thông tin định danh:** Nhất quán và chính xác trên cả 3 tệp (*Phòng khám Nha khoa Gia đình — Bác sĩ Trịnh Công Vương | Số 15 đường Võ Nguyên Giáp, phường Đức Xuân, tỉnh Thái Nguyên | ĐT & Zalo: 0912 343 858 | Website: https://tcvuong6-wq.github.io/bsvuong-web/*).

## 4. Cú pháp HTML & tính tương thích với `index.html`
- **HTML (`kham_rang_khi_co_benh_tim_mach.html`):** Kiểm tra bằng `html.parser` của Python — **0 lỗi thẻ đóng/mở**, không có thẻ chưa đóng.
- **Snippet (`02_snippet_index_kham_rang_benh_tim_mach.txt`):**
  - Thẻ `<article class="card article" data-category="du-phong" ...>` khớp hoàn toàn cấu trúc `<div class="grid" id="articles">` và bộ lọc `du-phong` trong `D:\bsvuong-web\index.html`.
  - Mục dữ liệu `'kham-rang-benh-tim-mach':{...},` trong `ARTICLE_DATA` hợp lệ cú pháp JS (không có dấu nháy đơn chưa escape, không xuống dòng thô trong chuỗi, cân bằng ngoặc `{}`/`[]`).
  - ID `kham-rang-benh-tim-mach` chưa tồn tại trong `index.html` (không trùng lặp).

---

*Ghi chú: Đã tuân thủ quy trình kiểm duyệt — không chỉnh sửa `D:\bsvuong-web\index.html` và không thực hiện `git push`.*

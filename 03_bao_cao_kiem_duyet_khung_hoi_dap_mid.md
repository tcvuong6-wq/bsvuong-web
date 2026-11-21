# BIÊN BẢN KIỂM DUYỆT — TÍCH HỢP KHUNG HỎI ĐÁP GIÁO DỤC SỨC KHỎE RĂNG MIỆNG CHUẨN MID

- **Ngày thực hiện:** 21/11/2026
- **Tệp cập nhật:** `D:\bsvuong-web\index.html`
- **Bản sao lưu an toàn:** `D:\bsvuong-web\index.html.bak_20261121_khung_hoi_dap_mid` (chỉ lưu cục bộ, không đẩy lên GitHub)
- **Quy trình thực hiện:** 3 Tác nhân (`tac_nhan_bien_tap` -> `tac_nhan_ky_thuat_web` -> `tac_nhan_kiem_duyet`)

## 1. Kết quả kiểm tra các chốt an toàn & bảo mật
- [x] Không sao chép bất kỳ tệp `.py`, `.env` hoặc khóa API bí mật nào vào thư mục `D:\bsvuong-web\`.
- [x] Khai báo hằng số cấu hình `const DENTAL_AI7_API_URL = "";` ở đầu đoạn script: mặc định chạy chế độ Thí điểm tri thức chuẩn MID tích hợp sẵn; sẵn sàng gọi `POST /api/v1/dental-consult` với header `X-User-Role: PATIENT_PUBLIC` khi điền URL Cloud Run.
- [x] Lớp lọc ẩn danh PII ngay trên trình duyệt: tự động chuyển số điện thoại 10 số thành `[SDT_DA_AN_DANH]` và số CCCD 9–12 số thành `[CCCD_DA_AN_DANH]`.
- [x] Lớp cảnh báo dấu hiệu nguy hiểm (Red Flags): kiểm tra đủ 8 cụm từ khóa (`sưng to mặt`, `sưng lan tỏa`, `khó thở`, `khó nuốt`, `khít hàm`, `sốt cao`, `chảy máu không cầm`, `chấn thương hàm`), hiển thị khung cảnh báo đỏ nổi bật khuyến cáo đi cấp cứu Răng Hàm Mặt ngay hoặc gọi BS Vương (`0912 343 858`).
- [x] Từ chối kê đơn kháng sinh, thuốc giảm đau hoặc ép chẩn đoán khẳng định; cung cấp kiến thức giáo dục sức khỏe chuẩn MID theo 3 chuyên đề đã phê duyệt.
- [x] Thoát ký tự (`escapeHtml`) cho toàn bộ dữ liệu hiển thị chống XSS; bọc logic trong IIFE độc lập, không ảnh hưởng `ARTICLE_DATA` và danh sách bài viết trong `#articles`.

## 2. Kết quả kiểm tra giao diện & cấu trúc 5 phần (`#tro-ly-mid`)
- [x] Đặt ngay phía trên danh sách Thư viện kiến thức (`#articles`), đồng bộ tông màu xanh navy (`#0B2E5E`) – trắng – teal (`#0D9488`), bo góc mềm mại, cỡ chữ tối thiểu 16px–18px dễ đọc cho người trung niên và cao tuổi.
- [x] Đủ 5 phần: (a) Lưu ý bảo mật & y khoa, (b) 4 nút gợi ý câu hỏi nhanh, (c) Ô nhập tối đa 1000 ký tự kèm nút gửi và nút xóa, (d) Vùng hiển thị câu trả lời có cấu trúc, (e) Chân khung cố định thông tin liên hệ BS Trịnh Công Vương – Số 15 đường Võ Nguyên Giáp, phường Đức Xuân, Thái Nguyên – ĐT `0912 343 858`.

## 3. Kết luận kiểm duyệt
- **Trạng thái:** Đạt chuẩn (0 lỗi). Sẵn sàng xuất bản lên nhánh `main` của kho GitHub `tcvuong6-wq/bsvuong-web`.

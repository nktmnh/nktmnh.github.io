# Portfolio Cá Nhân - Võ Nhật Minh

Trang web portfolio cá nhân mang phong cách **Cyber Defense / Blue Team / SOC Monitoring**, được lấy cảm hứng và phát triển theo mẫu thiết kế của `trung-chigusa.github.io`.

## 🌐 Thông tin cá nhân
- **Họ và tên:** Võ Nhật Minh
- **Định hướng:** Sinh viên mới vào nghề An ninh mạng (Blue Team / SOC Triage)
- **Email:** [vonhatminh0209@gmail.com](mailto:vonhatminh0209@gmail.com)
- **GitHub:** [https://github.com/nktmnh](https://github.com/nktmnh)
- **LinkedIn:** [https://www.linkedin.com/in/minh-v%C3%B5-230518383/](https://www.linkedin.com/in/minh-v%C3%B5-230518383/)
- **Khu vực:** Thành phố Hồ Chí Minh, Việt Nam

---

## 📁 Cấu trúc thư mục dự án

```text
portfolio/
├── index.html              # Trang chủ chính với đầy đủ các mục (Hero, 01 Giới thiệu, 02 Điểm nổi bật, 03 Dự án, 04 Phòng thí nghiệm, 05 Bài viết, 06 Liên hệ)
├── css/
│   └── style.css           # Toàn bộ CSS hệ thống: giao diện Cyber Grid, HUD Viewfinder, Dark/Light theme, Responsive mobile
├── js/
│   └── main.js             # Logic tương tác: Dark/Light toggle, Active Scroll Spy, Lọc dự án, Modal chi tiết, Copy Email, Form liên hệ
├── assets/
│   └── images/
│       └── avatar.jpg      # Ảnh chân dung của bạn được lồng vào khung ngắm camera HUD
└── README.md               # Hướng dẫn sử dụng và triển khai lên GitHub Pages
```

---

## 🚀 Hướng dẫn mở và xem trang web

### Cách 1: Mở trực tiếp bằng trình duyệt
Bạn chỉ cần nhấp đúp vào tệp `index.html` hoặc chuột phải chọn **Open with** > **Google Chrome** (hoặc Edge / Firefox).

### Cách 2: Chạy máy chủ cục bộ (Local Server)
Nếu bạn đã cài đặt Node.js hoặc Python, có thể chạy lệnh sau trong thư mục `portfolio`:
```bash
# Sử dụng Python:
python -m http.server 8080

# Hoặc sử dụng npx:
npx serve .
```
Sau đó truy cập: `http://localhost:8080`

---

## 🌐 Hướng dẫn đưa lên GitHub Pages miễn phí (`nktmnh.github.io`)

1. Đăng nhập vào tài khoản GitHub [github.com/nktmnh](https://github.com/nktmnh).
2. Tạo một Repository mới với tên chính xác là:
   `nktmnh.github.io` (để chế độ **Public**).
3. Đẩy toàn bộ mã nguồn trong thư mục này lên repository vừa tạo:
   ```bash
   git init
   git add .
   git commit -m "Khởi tạo website portfolio Võ Nhật Minh"
   git branch -M main
   git remote add origin https://github.com/nktmnh/nktmnh.github.io.git
   git push -u origin main
   ```
4. Vào mục **Settings** > **Pages** trên repository, tại mục **Branch** chọn `main` và thư mục `/(root)`, sau đó nhấn **Save**.
5. Đợi khoảng 1-2 phút, trang web của bạn sẽ hoạt động trực tiếp tại địa chỉ:
   `https://nktmnh.github.io/`

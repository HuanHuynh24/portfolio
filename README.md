# Huỳnh Ngọc Huân Portfolio — Next.js

Portfolio một trang sử dụng Next.js App Router, TypeScript, Tailwind CSS và Lucide React.

## Chạy local

```bash
npm install
npm run dev
```

Mở `http://localhost:3000`.

## Build production

```bash
npm run build
```

Project dùng `output: 'export'`, kết quả static nằm trong thư mục `out/` và có thể triển khai lên Vercel, Netlify, Cloudflare Pages hoặc VPS/Nginx.

Khi triển khai, đặt `NEXT_PUBLIC_SITE_URL` thành URL production đầy đủ (không có dấu `/` cuối) để canonical, schema và sitemap dùng đúng domain. Nếu không khai báo, project dùng `https://huanhuynh24.github.io/portfolio`.

## Chỉnh sửa nội dung

- Nội dung VI/EN và dữ liệu kinh nghiệm: `app/page.tsx`
- Giao diện, responsive, animation và Dark/Light: `app/globals.css`
- Metadata và font: `app/layout.tsx`

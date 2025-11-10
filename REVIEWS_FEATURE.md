# Tính năng Chia sẻ với Hình ảnh

## Tổng quan

Người dùng có thể chia sẻ trải nghiệm của họ về các địa điểm du lịch kèm theo hình ảnh.

## Tính năng chính

### 1. Xem chia sẻ của người khác

- Hiển thị danh sách các chia sẻ từ cộng đồng
- Mỗi chia sẻ bao gồm:
  - Tên người chia sẻ
  - Đánh giá (1-5 sao)
  - Nội dung chia sẻ
  - Hình ảnh kèm theo (nếu có)
- Click vào ảnh để xem phóng to

### 2. Thêm chia sẻ mới

Người dùng có thể:

- Nhập tên
- Chọn mức đánh giá (1-5 sao)
- Viết nội dung chia sẻ
- **Upload tối đa 5 hình ảnh**

### 3. Upload & Quản lý hình ảnh

#### Upload ảnh:

- Click vào khu vực "Click để chọn ảnh" hoặc kéo thả file vào
- Hỗ trợ định dạng: PNG, JPG, JPEG
- Giới hạn: Tối đa 5 ảnh

#### Preview ảnh:

- Hiển thị thumbnail của các ảnh đã chọn
- Layout: Grid 2-3 cột responsive
- Hiển thị số thứ tự ảnh (1/5, 2/5...)

#### Xóa ảnh:

- Hover vào ảnh để hiện nút xóa (×)
- Click nút × để xóa ảnh khỏi danh sách

#### Xem ảnh phóng to:

- Click vào thumbnail để xem ảnh full size
- Lightbox với:
  - Nút đóng (×)
  - Nút Previous/Next để chuyển ảnh
  - Hiển thị số thứ tự ảnh hiện tại
  - Click vào background để đóng

### 4. Hiển thị ảnh trong reviews

Khi có người chia sẻ với ảnh:

- Ảnh hiển thị dưới nội dung text
- Layout: Grid 2-4 cột (responsive)
- Hover effect: Zoom nhẹ + icon search
- Click để xem ảnh full size trong tab mới

## Cấu trúc dữ liệu

```javascript
{
  id: 1,
  author: "Tên người dùng",
  text: "Nội dung chia sẻ...",
  rating: 5,
  images: [
    "url-to-image-1.jpg",
    "url-to-image-2.jpg",
    // ... tối đa 5 ảnh
  ]
}
```

## UI/UX

### Form thêm chia sẻ:

- Design: Card màu trắng với border primary
- Button "Chia sẻ của bạn" màu primary
- Form thu gọn/mở rộng khi click button

### Upload zone:

- Border dashed khi chưa có ảnh
- Icon cloud upload
- Text hướng dẫn rõ ràng
- Hover state: Background primary-50

### Preview grid:

- Responsive: 2 cột mobile, 3 cột desktop
- Aspect ratio: Square (1:1)
- Nút xóa: Hiện khi hover, background đỏ

### Lightbox:

- Background: Black/90
- Image: Center, max 85vh
- Controls: Nút tròn màu trắng
- Close button: Top-right
- Navigation: Left/Right arrows

## Trải nghiệm người dùng

### Thành công:

1. User click "Chia sẻ của bạn"
2. Form hiện ra
3. User nhập thông tin
4. User click vào upload zone
5. Chọn 1-5 ảnh
6. Preview ảnh hiện ra ngay
7. User có thể xóa/thêm ảnh
8. Click "Gửi chia sẻ"
9. Hiển thị thông báo thành công

### Giới hạn:

- Alert nếu user cố upload > 5 ảnh
- Disabled submit nếu thiếu thông tin bắt buộc
- Validation cho tên và nội dung

## Responsive Design

### Mobile (< 768px):

- Upload zone: Full width
- Preview grid: 2 cột
- Review images: 2 cột
- Lightbox: Padding 4

### Tablet (768px - 1024px):

- Preview grid: 3 cột
- Review images: 3 cột

### Desktop (> 1024px):

- Preview grid: 3 cột
- Review images: 4 cột
- Lightbox: Max width 95vw

## Tương lai

### Cần phát triển:

- [ ] Backend API để lưu trữ reviews
- [ ] Upload ảnh lên cloud storage (Firebase, Cloudinary, AWS S3)
- [ ] Compression ảnh trước khi upload
- [ ] Lazy loading cho ảnh
- [ ] Pagination cho danh sách reviews
- [ ] Like/Report reviews
- [ ] Sort reviews (mới nhất, rating cao nhất)
- [ ] Filter reviews theo rating

### Tối ưu:

- [ ] Progressive image loading
- [ ] WebP format support
- [ ] Image optimization
- [ ] Caching
- [ ] Infinite scroll cho reviews

## Lưu ý kỹ thuật

### State Management:

- `showForm`: Boolean - Hiển thị/ẩn form
- `newReview`: Object - Dữ liệu review mới
- `selectedImages`: Array - File objects được chọn
- `previewImages`: Array - URLs để preview
- `selectedImageIndex`: Number/null - Index ảnh đang xem trong lightbox

### Memory Management:

- Sử dụng `URL.createObjectURL()` để tạo preview URLs
- Cần revoke URLs khi component unmount hoặc xóa ảnh
- Cleanup trong useEffect return

### File Handling:

- Accept: `image/*`
- Multiple: true
- Max files: 5
- Validation: File type checking

## Testing

### Test cases:

1. Upload 1 ảnh ✓
2. Upload 5 ảnh ✓
3. Upload > 5 ảnh → Alert ✓
4. Xóa ảnh từ preview ✓
5. Click ảnh preview → Lightbox ✓
6. Navigation trong lightbox ✓
7. Close lightbox (ESC, Click outside, Button) ✓
8. Submit form với/không ảnh ✓
9. Responsive trên các màn hình ✓
10. Click ảnh trong review → Open new tab ✓

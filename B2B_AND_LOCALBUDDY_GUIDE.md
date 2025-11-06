# Hệ thống quản lý B2B và Local Buddy

## 📋 Tổng quan

Hệ thống quản lý toàn diện cho:

- **B2B Dashboard**: Quản lý dịch vụ du lịch, booking, tin tức
- **Local Buddy Dashboard**: Quản lý tours, lịch trình, đánh giá

## 🎯 Các trang đã tạo

### B2B Management System

#### 1. B2B Dashboard (`/b2b`)

**Mục đích**: Trang tổng quan dành cho đối tác doanh nghiệp

**Tính năng**:

- 📊 **Thống kê tổng quan**:

  - Tổng doanh thu & doanh thu tháng
  - Số lượng booking (tổng, chờ xác nhận)
  - Số dịch vụ đang hoạt động
  - Đánh giá trung bình & số lượng khách hàng

- 📈 **Biểu đồ doanh thu**: Hiển thị doanh thu 6 tháng gần nhất
- ⚡ **Thao tác nhanh**: Links đến các trang quản lý
- 📅 **Booking gần đây**: Danh sách booking mới nhất với thông tin chi tiết

**Responsive**:

- Mobile: Stats grid 1 cột, compact cards
- Tablet: Stats grid 2 cột
- Desktop: Stats grid 4 cột, full layout

---

#### 2. B2B Service Management (`/b2b/services`)

**Mục đích**: Quản lý các dịch vụ (tours, hotels, restaurants, local buddy)

**Tính năng**:

- 🏷️ **Thống kê theo loại**: Tours, Hotels, Nhà hàng, Local Buddies
- 🔍 **Filters**: Lọc theo loại dịch vụ
- 🔎 **Search**: Tìm kiếm dịch vụ
- 📋 **Service Cards**: Hiển thị thông tin:
  - Hình ảnh dịch vụ
  - Tên, giá, rating
  - Số lượng bookings
  - Trạng thái (Hoạt động/Tạm dừng)
- ✏️ **Actions**: Chỉnh sửa, xem thống kê, menu tùy chọn

**Responsive**:

- Mobile: Grid 1 cột, compact filters
- Tablet: Grid 2 cột
- Desktop: Grid 3 cột

---

#### 3. B2B Booking Management (`/b2b/bookings`)

**Mục đích**: Quản lý đặt chỗ từ khách hàng

**Tính năng**:

- 📊 **Stats Dashboard**:

  - Số booking chờ xác nhận
  - Đã xác nhận
  - Hoàn thành
  - Đã hủy

- 🏷️ **Filters by Status**: Lọc theo trạng thái
- 🔍 **Search**: Tìm mã booking
- 📋 **Booking Cards**: Hiển thị:
  - Thông tin khách hàng (avatar, tên, email, phone)
  - Thông tin dịch vụ (hình ảnh, tên, loại)
  - Chi tiết booking (ngày, số khách, số tiền)
  - Đánh giá (nếu đã hoàn thành)
- ✅ **Actions**:
  - Xác nhận/Từ chối (cho booking pending)
  - Xem chi tiết
  - Liên hệ khách hàng

**Responsive**:

- Mobile: Stacked layout, full-width buttons
- Tablet: 2 column stats
- Desktop: 4 column stats, optimized layout

---

#### 4. B2B News Management (`/b2b/news`)

**Mục đích**: Quản lý tin tức và bài viết

**Tính năng**:

- 📊 **Stats**:

  - Tổng bài viết
  - Đã đăng
  - Tổng lượt xem & lượt thích

- 🏷️ **Filters**: Tất cả, Đã đăng, Nháp
- 🔍 **Search**: Tìm kiếm bài viết
- 📰 **News Cards**: Hiển thị:
  - Hình ảnh bài viết
  - Tiêu đề & excerpt
  - Category badge (Điểm đến, Ẩm thực, Hướng dẫn)
  - Status badge (Đã đăng, Nháp)
  - Meta info (tác giả, ngày, views, likes)
- ✏️ **Actions**:
  - Chỉnh sửa bài viết
  - Đăng bài (cho nháp)
  - Gỡ bài (cho đã đăng)
  - Xem trước
  - Xóa

**Responsive**:

- Mobile: Stacked cards, compact buttons
- Tablet: 2 column stats
- Desktop: 4 column stats, horizontal cards

---

### Local Buddy System

#### 5. Local Buddy Dashboard (`/buddy/dashboard`)

**Mục đích**: Dashboard cho Local Buddy quản lý tours của mình

**Tính năng**:

- 👤 **Profile Card**:

  - Avatar với verified badge
  - Tên, rating, số đánh giá
  - Số tours đã dẫn
  - Ngày tham gia
  - Ngôn ngữ (Tiếng Việt, English, 中文, 한국어)
  - Chuyên môn (Văn hóa, Ẩm thực, Nhiếp ảnh)

- 📊 **Stats Cards**:

  - Tổng thu nhập & thu nhập tháng
  - Tours sắp tới & số booking chờ
  - Đánh giá trung bình với stars

- 📅 **Upcoming Tours**: Danh sách tour sắp tới với:

  - Thông tin khách hàng (avatar, tên, quốc tịch)
  - Status badge (Pending/Confirmed)
  - Địa điểm, ngày giờ, thời lượng
  - Số khách & số tiền
  - Ghi chú đặc biệt
  - Actions: Xác nhận/Từ chối/Nhắn tin

- ⭐ **Recent Reviews**: Đánh giá gần đây từ khách hàng
  - Avatar & tên khách
  - Rating stars
  - Comment
  - Ngày tour

**Responsive**:

- Mobile: Stacked layout, full-width cards
- Tablet: 2 column stats, responsive tour cards
- Desktop: 3 column stats, 2/3-1/3 main content layout

---

## 🎨 Design Features

### Color Scheme

- **Primary**: Blue gradient (primary-600 to primary-700)
- **Success**: Green (cho confirmed, completed)
- **Warning**: Yellow (cho pending, draft)
- **Danger**: Red (cho cancelled, delete)
- **Info**: Blue (cho confirmed bookings)

### Card Styles

- White background với subtle shadow
- Rounded corners (xl/2xl)
- Border mỏng (gray-100)
- Hover effects (shadow transition)

### Responsive Breakpoints

- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (sm - lg)
- **Desktop**: > 1024px (lg+)

### Icons

- Font Awesome 6 icons
- Consistent sizing (text-sm to text-2xl)
- Color coding theo context

---

## 🔗 Navigation

### Header Integration

Đã thêm dropdown menu "Quản lý" trong Header với 2 options:

1. **B2B Dashboard** - Quản lý dịch vụ & booking
2. **Local Buddy** - Quản lý tours & lịch trình

### Routes

```jsx
/b2b                    → B2B Dashboard
/b2b/services          → Service Management
/b2b/bookings          → Booking Management
/b2b/news              → News Management
/buddy/dashboard       → Local Buddy Dashboard
```

---

## 📱 Mobile Optimization

### Mobile Header

- Hamburger menu với sections:
  - Main navigation
  - Dịch vụ (Hotels, Restaurants, Local Buddy)
  - **Quản lý** (B2B Dashboard, Local Buddy)
  - Language selector
  - CTA button

### Mobile Features

- Touch-friendly buttons (min 44px height)
- Stacked layouts cho small screens
- Compact spacing & typography
- Full-width buttons
- Horizontal scroll cho tabs
- Conditional text (shorter labels on mobile)

---

## 🚀 Next Steps (Có thể mở rộng)

### B2B System

- [ ] Analytics & Reports page
- [ ] Customer management
- [ ] Revenue tracking với charts
- [ ] Settings & preferences
- [ ] Team management
- [ ] Notifications system

### Local Buddy

- [ ] Schedule management với calendar
- [ ] Availability settings
- [ ] Reviews management
- [ ] Earnings history
- [ ] Profile editing
- [ ] Message center
- [ ] Tour templates

### Common Features

- [ ] Real-time notifications
- [ ] Advanced search & filters
- [ ] Export to CSV/PDF
- [ ] Bulk actions
- [ ] Advanced analytics
- [ ] Multi-language support
- [ ] Dark mode

---

## 💡 Usage Tips

### Truy cập trang quản lý:

1. Click vào icon ⚙️ "Quản lý" ở Header (Desktop)
2. Hoặc mở menu hamburger → Section "Quản lý" (Mobile)
3. Chọn "B2B Dashboard" hoặc "Local Buddy"

### Điều hướng giữa các trang:

- Sử dụng "Back" arrow ở top-left mỗi trang
- Hoặc sử dụng Quick Actions cards
- Hoặc navigation menu

### Demo Data:

- Tất cả dữ liệu hiện tại là mock data
- Có thể dễ dàng thay thế bằng API calls
- State management sẵn sàng cho integration

---

## 🎯 Key Improvements

✅ **Fully Responsive**: Mobile-first design
✅ **Modern UI**: Gradient backgrounds, shadows, smooth transitions
✅ **Intuitive Navigation**: Clear hierarchy, breadcrumbs
✅ **Status Indicators**: Color-coded badges
✅ **Quick Actions**: Fast access to common tasks
✅ **Stats Dashboard**: Real-time overview
✅ **Search & Filters**: Easy to find information
✅ **Touch Optimized**: Large tap targets, swipe gestures

---

## 📝 Notes

- ESLint warnings về BEM naming có thể ignore (Tailwind CSS không follow BEM)
- Tất cả components đã được optimized cho performance
- Images sử dụng Unsplash placeholders - có thể thay thế
- Mock data có thể dễ dàng connect với backend API

---

Made with ❤️ for TravelTech Vietnam

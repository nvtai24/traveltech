import React from "react";
import { Link } from "react-router-dom";
import NewsletterModal from "../components/NewsletterModal";
import PricingButton from "../components/PricingButton";

const Home = () => {
  const features = [
    {
      icon: "fas fa-robot",
      title: "AI Trip Planner",
      description: "Tạo kế hoạch du lịch cá nhân hóa với trí tuệ nhân tạo",
      color: "from-blue-500 to-purple-600",
    },
    {
      icon: "fas fa-shield-alt",
      title: "An toàn tuyệt đối",
      description:
        "Đảm bảo an toàn cho khách hàng với các biện pháp bảo vệ chuyên nghiệp",
      color: "from-green-500 to-teal-600",
    },
    {
      icon: "fas fa-star",
      title: "Chất lượng cao",
      description:
        "Tours được thiết kế kỹ lưỡng với các hoạt động thú vị và địa điểm đẹp nhất",
      color: "from-yellow-500 to-orange-600",
    },
    {
      icon: "fas fa-headset",
      title: "Hỗ trợ 24/7",
      description:
        "Đội ngũ chăm sóc khách hàng luôn sẵn sàng hỗ trợ mọi lúc, mọi nơi",
      color: "from-pink-500 to-rose-600",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage:
              'url("https://th.bing.com/th/id/R.3dcb0b83e85d4efe552bc6d399d5ed51?rik=t7XSPpogdRI5gA&pid=ImgRaw&r=0")',
          }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60" />

        {/* Hero Pattern */}
        <div className="absolute inset-0 hero-pattern opacity-20" />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-white mb-6 leading-tight">
              Discover Vietnam,{" "}
              <span className="gradient-text bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Smarter
              </span>{" "}
              with TravelTech
            </h1>
            <p className="text-xl sm:text-2xl text-gray-200 mb-8 leading-relaxed max-w-3xl mx-auto">
              Nền tảng du lịch thông minh tích hợp AI cá nhân hóa lộ trình du
              lịch Việt Nam
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {/* <Link
                to="/ai-planner"
                className="btn btn-primary text-lg px-8 py-4 group"
              >
                <i className="fas fa-robot mr-3 group-hover:animate-bounce"></i>
                AI Trip Planner
              </Link> */}
              {/* <Link
                to="/destinations"
                className="btn btn-outline text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-primary-600 group"
              >
                <i className="fas fa-map-marker-alt mr-3 group-hover:scale-110 transition-transform"></i>
                Khám phá điểm đến
              </Link> */}
              <button
                className="btn btn-outline text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-primary-600 group"
                onClick={() => {
                  document.getElementById("ai-showcase")?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
              >
                Tìm hiểu ngay
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <i className="fas fa-chevron-down text-white text-2xl"></i>
        </div>
      </section>

      {/* Stats Section */}
      {/* <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <i className={`${stat.icon} text-white text-2xl`}></i>
                </div>
                <div className="text-3xl lg:text-4xl font-display font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* AI Planner Showcase Section */}
      <section
        className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden"
        id="ai-showcase"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-10 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white font-semibold mb-6">
                <i className="fas fa-robot mr-2"></i>
                AI-Powered Planning
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Lên kế hoạch du lịch thông minh với{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  AI Trip Planner
                </span>
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Trí tuệ nhân tạo tiên tiến giúp bạn tạo ra lộ trình du lịch cá
                nhân hóa hoàn hảo. Chỉ cần nhập sở thích, ngân sách và thời gian
                - AI sẽ làm phần còn lại!
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-4">
                    <i className="fas fa-check text-white text-sm"></i>
                  </div>
                  <span className="text-gray-700">
                    Phân tích sở thích cá nhân và đề xuất địa điểm phù hợp
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-4">
                    <i className="fas fa-check text-white text-sm"></i>
                  </div>
                  <span className="text-gray-700">
                    Tối ưu hóa lộ trình và ngân sách một cách thông minh
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-4">
                    <i className="fas fa-check text-white text-sm"></i>
                  </div>
                  <span className="text-gray-700">
                    Cập nhật thời tiết và thông tin thời gian thực
                  </span>
                </div>
              </div>

              <Link
                to="/ai-planner"
                className="btn btn-primary text-lg px-8 py-4 group inline-flex items-center"
              >
                <i className="fas fa-magic mr-3 group-hover:animate-bounce"></i>
                Thử AI Planner miễn phí
              </Link>
            </div>

            {/* Visual */}
            <div className="relative">
              <div className="bg-white rounded-3xl shadow-2xl p-8 transform rotate-2 group-hover:rotate-0 transition-transform duration-500">
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-6 text-white mb-6">
                  <div className="flex items-center mb-4">
                    <i className="fas fa-robot text-2xl mr-3"></i>
                    <span className="font-bold text-lg">
                      AI Travel Assistant
                    </span>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-white/20 rounded-lg p-3">
                      <p className="text-sm">
                        📍 Tôi muốn du lịch 3 ngày ở Hà Nội với ngân sách 5
                        triệu
                      </p>
                    </div>
                    <div className="bg-white/20 rounded-lg p-3">
                      <p className="text-sm">
                        🤖 Tuyệt vời! Tôi đã tạo lộ trình hoàn hảo cho bạn:
                      </p>
                      <ul className="text-xs mt-2 space-y-1">
                        <li>• Ngày 1: Phố cổ Hà Nội, Hồ Hoàn Kiếm</li>
                        <li>• Ngày 2: Văn Miếu, Chùa Một Cột</li>
                        <li>• Ngày 3: Bảo tàng Dân tộc học</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                    <i className="fas fa-sparkles mr-2"></i>
                    Kế hoạch được tạo trong 30 giây!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-6">
              Dịch vụ của chúng tôi
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Khám phá các dịch vụ du lịch toàn diện từ lưu trú, ẩm thực đến
              hướng dẫn viên địa phương
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Hotel Service */}
            <Link
              to="/booking/hotels"
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="aspect-w-16 aspect-h-12 relative overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800"
                  alt="Hotels & Resorts"
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="inline-flex items-center px-4 py-2 bg-blue-500 rounded-full text-white font-semibold mb-3">
                    <i className="fas fa-hotel mr-2"></i>
                    Khách sạn & Resort
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  Dịch vụ Lưu trú
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Đặt phòng khách sạn, resort cao cấp với giá tốt nhất. Từ khách
                  sạn bình dân đến resort 5 sao sang trọng.
                </p>
                <div className="flex items-center text-blue-600 font-semibold group-hover:translate-x-2 transition-transform">
                  Khám phá ngay
                  <i className="fas fa-arrow-right ml-2"></i>
                </div>
              </div>
            </Link>

            {/* Restaurant Service */}
            <Link
              to="/booking/restaurants"
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="aspect-w-16 aspect-h-12 relative overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800"
                  alt="Restaurants"
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="inline-flex items-center px-4 py-2 bg-orange-500 rounded-full text-white font-semibold mb-3">
                    <i className="fas fa-utensils mr-2"></i>
                    Nhà hàng
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">
                  Dịch vụ Nhà hàng
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Đặt bàn tại các nhà hàng nổi tiếng, thưởng thức ẩm thực đặc
                  sắc từ truyền thống đến hiện đại.
                </p>
                <div className="flex items-center text-orange-600 font-semibold group-hover:translate-x-2 transition-transform">
                  Khám phá ngay
                  <i className="fas fa-arrow-right ml-2"></i>
                </div>
              </div>
            </Link>

            {/* Local Buddy Service */}
            <Link
              to="/local-buddy"
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="aspect-w-16 aspect-h-12 relative overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800"
                  alt="Local Buddy"
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="inline-flex items-center px-4 py-2 bg-green-500 rounded-full text-white font-semibold mb-3">
                    <i className="fas fa-users mr-2"></i>
                    Local Buddy
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                  Hướng dẫn viên địa phương
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Kết nối với người dân địa phương, khám phá những trải nghiệm
                  độc đáo và văn hóa bản địa.
                </p>
                <div className="flex items-center text-green-600 font-semibold group-hover:translate-x-2 transition-transform">
                  Khám phá ngay
                  <i className="fas fa-arrow-right ml-2"></i>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-6">
              Tại sao chọn TravelTech?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nền tảng du lịch thông minh hàng đầu Việt Nam với những tính năng
              vượt trội
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="relative group">
                <div className="card card-hover p-8 text-center h-full">
                  <div
                    className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                  >
                    <i className={`${feature.icon} text-white text-3xl`}></i>
                  </div>
                  <h3 className="text-xl font-display font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-accent-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-6">
              Khách hàng nói gì về chúng tôi
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hàng ngàn khách hàng đã tin tưởng và có trải nghiệm tuyệt vời cùng
              TravelTech
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Nguyễn Thị Mai",
                role: "Du khách từ TP.HCM",
                rating: 5,
                comment:
                  "AI Planner thật sự tuyệt vời! Đã giúp tôi có chuyến du lịch Sapa hoàn hảo với ngân sách hợp lý.",
                image: "https://i.pravatar.cc/150?img=1",
              },
              {
                name: "Trần Văn Nam",
                role: "Gia đình 4 người",
                rating: 5,
                comment:
                  "Dịch vụ chuyên nghiệp, hỗ trợ 24/7 rất tận tình. Cả gia đình đều hài lòng với chuyến đi Phú Quốc.",
                image: "https://i.pravatar.cc/150?img=3",
              },
              {
                name: "Lê Thị Hoa",
                role: "Nhóm bạn thân",
                rating: 5,
                comment:
                  "Lần đầu sử dụng AI để lập kế hoạch du lịch và kết quả vượt ngoài mong đợi. Sẽ tiếp tục ủng hộ!",
                image: "https://i.pravatar.cc/150?img=5",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="card p-8 text-center group hover:shadow-xl transition-all duration-300"
              >
                <div className="w-20 h-20 rounded-full mx-auto mb-6 overflow-hidden border-4 border-primary-200 group-hover:border-primary-400 transition-colors">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <i
                      key={i}
                      className="fas fa-star text-yellow-400 text-lg"
                    ></i>
                  ))}
                </div>

                <p className="text-gray-600 mb-6 italic leading-relaxed">
                  "{testimonial.comment}"
                </p>

                <div>
                  <h4 className="font-bold text-gray-900 text-lg">
                    {testimonial.name}
                  </h4>
                  <p className="text-primary-600 font-medium">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Offer Section */}
      {/* <section className="py-20 bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-white/10 rounded-full animate-bounce"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full animate-ping"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-white font-bold mb-6">
            <i className="fas fa-fire mr-2 animate-bounce"></i>
            ƯU ĐÃI ĐẶC BIỆT
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Giảm 30% cho 100 khách hàng đầu tiên!
          </h2>

          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Trải nghiệm AI Trip Planner miễn phí và nhận ưu đãi độc quyền cho
            chuyến du lịch đầu tiên của bạn
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Link
              to="/ai-planner"
              className="btn bg-white text-red-600 hover:bg-gray-100 text-lg px-8 py-4 font-bold group shadow-2xl"
            >
              <i className="fas fa-magic mr-3 group-hover:animate-bounce"></i>
              Nhận ưu đãi ngay
            </Link>
            <Link
              to="/tours"
              className="btn border-2 border-white text-white hover:bg-white hover:text-red-600 text-lg px-8 py-4 group"
            >
              <i className="fas fa-map-marked-alt mr-3 group-hover:scale-110 transition-transform"></i>
              Xem tours hot
            </Link>
          </div>

          <div className="flex justify-center items-center text-white/80">
            <i className="fas fa-clock mr-2"></i>
            <span className="text-sm">Chỉ còn lại 67 suất ưu đãi</span>
          </div>
        </div>
      </section> */}

      {/* Final CTA Section */}
      {/* <section className="py-20 bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-white mb-6">
              Bắt đầu cuộc phiêu lưu của bạn ngay hôm nay
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Hàng ngàn địa điểm tuyệt đẹp đang chờ bạn khám phá. AI của chúng
              tôi sẽ giúp bạn tạo ra những kỷ niệm không thể nào quên.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-user-plus text-white text-2xl"></i>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  1. Đăng ký miễn phí
                </h3>
                <p className="text-blue-100 text-sm">
                  Tạo tài khoản chỉ trong 30 giây
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-robot text-white text-2xl"></i>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  2. Sử dụng AI Planner
                </h3>
                <p className="text-blue-100 text-sm">
                  Để AI tạo kế hoạch hoàn hảo cho bạn
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-plane-departure text-white text-2xl"></i>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  3. Bắt đầu phiêu lưu
                </h3>
                <p className="text-blue-100 text-sm">
                  Tận hưởng chuyến đi tuyệt vời
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/ai-planner"
                className="btn bg-white text-primary-600 hover:bg-gray-100 text-lg px-8 py-4 font-bold group shadow-2xl"
              >
                <i className="fas fa-rocket mr-3 group-hover:animate-bounce"></i>
                Bắt đầu ngay - Miễn phí
              </Link>
              <Link
                to="/contact"
                className="btn border-2 border-white text-white hover:bg-white hover:text-primary-600 text-lg px-8 py-4 group"
              >
                <i className="fas fa-headset mr-3 group-hover:scale-110 transition-transform"></i>
                Tư vấn 1-1
              </Link>
            </div>
          </div>
        </div>
      </section> */}

      {/* Newsletter Modal */}
      <NewsletterModal />

      {/* Pricing Button */}
      <PricingButton />
    </div>
  );
};

export default Home;

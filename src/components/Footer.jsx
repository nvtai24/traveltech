import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showNewsletter, setShowNewsletter] = useState(true);

  // Check localStorage khi component mount - dùng chung key với NewsletterModal
  useEffect(() => {
    const subscribed = localStorage.getItem("newsletterSubscribed");
    if (subscribed === "true") {
      setShowNewsletter(false);
      setIsSubscribed(true);
    }
  }, []);

  // Xử lý submit email - dùng chung key với NewsletterModal
  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email && email.includes("@")) {
      // Lưu vào localStorage với key giống NewsletterModal
      localStorage.setItem("newsletterSubscribed", "true");
      localStorage.setItem("newsletter_email", email);

      // Cập nhật state
      setIsSubscribed(true);
      setShowNewsletter(false);
      setEmail("");

      // Có thể thêm toast notification ở đây
      console.log("Đã đăng ký nhận tin thành công!");
    }
  };

  const footerSections = [
    {
      title: "Tính năng",
      links: [
        { name: "AI Trip Planner", path: "/ai-planner", icon: "fas fa-robot" },
        {
          name: "Điểm đến",
          path: "/destinations",
          icon: "fas fa-map-marker-alt",
        },
        { name: "Cộng đồng", path: "/community", icon: "fas fa-users" },
        { name: "Tours", path: "/tours", icon: "fas fa-route" },
      ],
    },
    {
      title: "Dịch vụ",
      links: [
        {
          name: "Tour trong nước",
          path: "/tours?category=domestic",
          icon: "fas fa-home",
        },
        {
          name: "Tour quốc tế",
          path: "/tours?category=international",
          icon: "fas fa-globe",
        },
        { name: "Tư vấn tour", path: "/contact", icon: "fas fa-headset" },
        { name: "Hỗ trợ 24/7", path: "/contact", icon: "fas fa-clock" },
      ],
    },
    {
      title: "Công ty",
      links: [
        { name: "Giới thiệu", path: "/about", icon: "fas fa-info-circle" },
        { name: "Tin tức", path: "/news", icon: "fas fa-newspaper" },
        { name: "Tuyển dụng", path: "/careers", icon: "fas fa-briefcase" },
        { name: "Liên hệ", path: "/contact", icon: "fas fa-envelope" },
      ],
    },
  ];

  const socialLinks = [
    {
      name: "Facebook",
      icon: "fab fa-facebook-f",
      color: "hover:text-blue-600",
      href: "#",
    },
    {
      name: "Instagram",
      icon: "fab fa-instagram",
      color: "hover:text-pink-600",
      href: "#",
    },
    {
      name: "YouTube",
      icon: "fab fa-youtube",
      color: "hover:text-red-600",
      href: "#",
    },
    {
      name: "TikTok",
      icon: "fab fa-tiktok",
      color: "hover:text-gray-900",
      href: "#",
    },
    {
      name: "Twitter",
      icon: "fab fa-twitter",
      color: "hover:text-blue-400",
      href: "#",
    },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              {/* <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-accent-600 rounded-xl flex items-center justify-center">
                <i className="fas fa-rocket text-white text-xl"></i>
              </div>
              <div>
                <h3 className="text-2xl font-display font-bold text-white">
                  TravelTech
                </h3>
                <p className="text-sm text-gray-400">
                  Discover Vietnam, Smarter
                </p>
              </div> */}
              <img
                src="/logo_tagline.png"
                alt="TravelTech Logo"
                className="h-16 w-auto"
              />
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Nền tảng du lịch thông minh tích hợp AI cá nhân hóa lộ trình du
              lịch Việt Nam. Trải nghiệm du lịch tối ưu với công nghệ tiên tiến.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className={`w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 transition-all duration-200 ${social.color} hover:bg-gray-700 hover:scale-110`}
                  aria-label={social.name}
                >
                  <i className={social.icon}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="text-lg font-semibold mb-6 text-white">
                {section.title}
              </h4>
              <ul className="space-y-4">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      to={link.path}
                      className="flex items-center space-x-3 text-gray-300 hover:text-primary-400 transition-colors duration-200 group"
                    >
                      <i
                        className={`${link.icon} text-sm w-4 group-hover:scale-110 transition-transform`}
                      ></i>
                      <span>{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Section - Chỉ hiển thị nếu chưa subscribe */}
        {showNewsletter && (
          <div className="mt-16 pt-8 border-t border-gray-700">
            <div className="max-w-2xl mx-auto text-center">
              <h4 className="text-xl font-semibold mb-4 text-gray-300">
                Đăng ký nhận tin tức du lịch
              </h4>
              <p className="text-gray-300 mb-6">
                Nhận thông tin về các tour mới, ưu đãi đặc biệt và mẹo du lịch
                hữu ích
              </p>
              <form
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
              >
                <input
                  type="email"
                  placeholder="Nhập email của bạn"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="input flex-1 bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:ring-primary-500 focus:border-primary-500"
                />
                <button
                  type="submit"
                  className="btn btn-primary whitespace-nowrap"
                >
                  <i className="fas fa-paper-plane mr-2"></i>
                  Đăng ký
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {currentYear} TravelTech. Tất cả quyền được bảo lưu.
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <Link
                to="/privacy"
                className="hover:text-primary-400 transition-colors"
              >
                Chính sách bảo mật
              </Link>
              <Link
                to="/terms"
                className="hover:text-primary-400 transition-colors"
              >
                Điều khoản sử dụng
              </Link>
              <Link
                to="/cookies"
                className="hover:text-primary-400 transition-colors"
              >
                Cookie Policy
              </Link>
            </div>
            <div className="text-gray-400 text-sm flex items-center">
              <div className="w-5 h-5 mr-2">
                <img
                  src="https://img.icons8.com/?size=100&id=Wjhd8tSYkD8r&format=png&color=000000"
                  alt=""
                />
              </div>
              Được phát triển với ❤️ tại Việt Nam
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

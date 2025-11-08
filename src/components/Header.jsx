import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isBookingMenuOpen, setIsBookingMenuOpen] = useState(false);
  const [isManagementMenuOpen, setIsManagementMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("vi");
  const location = useLocation();

  // Scroll effect removed - keeping solid header for better UX

  // Close language menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isLangMenuOpen && !event.target.closest(".language-selector")) {
        setIsLangMenuOpen(false);
      }
      if (isBookingMenuOpen && !event.target.closest(".booking-selector")) {
        setIsBookingMenuOpen(false);
      }
      if (
        isManagementMenuOpen &&
        !event.target.closest(".management-selector")
      ) {
        setIsManagementMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isLangMenuOpen, isBookingMenuOpen, isManagementMenuOpen]);

  const languages = [
    {
      code: "vi",
      name: "Tiếng Việt",
      shortName: "VI",
      flag: "/flag-langs/vietnam.png",
    },
    {
      code: "en",
      name: "English",
      shortName: "EN",
      flag: "/flag-langs/uk.png",
    },
  ];

  const handleLanguageChange = (langCode) => {
    setCurrentLang(langCode);
    setIsLangMenuOpen(false);
    // TODO: Implement language change logic here
    // - Update i18n/translation context
    // - Save to localStorage
    // - Update all page content
    console.log("Language changed to:", langCode);
  };

  const bookingOptions = [
    {
      name: "Lưu trú",
      path: "/booking/hotels",
      icon: "fas fa-bed",
    },
    {
      name: "Nhà hàng",
      path: "/booking/restaurants",
      icon: "fas fa-utensils",
    },
    {
      name: "Local Buddy",
      path: "/local-buddy",
      icon: "fas fa-user-friends",
    },
  ];

  const navItems = [
    { name: "Trang chủ", path: "/", icon: "fas fa-home" },
    { name: "AI Planner", path: "/ai-planner", icon: "fas fa-robot" },
    { name: "Điểm đến", path: "/destinations", icon: "fas fa-map-marker-alt" },
    {
      name: "Dịch Vụ",
      path: "/services",
      icon: "fas fa-concierge-bell",
      isDropdown: true,
      dropdownType: "services",
    },
    // { name: "Tours", path: "/tours", icon: "fas fa-route" },
    { name: "Cộng đồng", path: "/community", icon: "fas fa-users" },
    {
      name: "Quản lý",
      path: "/management",
      icon: "fas fa-cog",
      isDropdown: true,
      dropdownType: "management",
    },
    { name: "Giới thiệu", path: "/about", icon: "fas fa-info-circle" },
  ];

  const managementOptions = [
    {
      name: "B2B Dashboard",
      path: "/b2b",
      icon: "fas fa-chart-line",
      description: "Quản lý dịch vụ & booking",
    },
    {
      name: "Local Buddy",
      path: "/buddy/dashboard",
      icon: "fas fa-user-friends",
      description: "Quản lý tours & lịch trình",
    },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200"`}
    >
      <div className="max-w-[90rem] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/">
            <img
              src="/logo_name.png"
              alt="TravelTech Logo"
              className="h-10 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) =>
              item.isDropdown ? (
                // Dropdown items (Dịch Vụ & Quản lý)
                <div
                  key={item.path}
                  className={`relative ${
                    item.dropdownType === "services"
                      ? "booking-selector"
                      : "management-selector"
                  }`}
                >
                  <button
                    onClick={() => {
                      if (item.dropdownType === "services") {
                        setIsBookingMenuOpen(!isBookingMenuOpen);
                      } else if (item.dropdownType === "management") {
                        setIsManagementMenuOpen(!isManagementMenuOpen);
                      }
                    }}
                    className={`flex items-center whitespace-nowrap px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      (item.dropdownType === "services" &&
                        (location.pathname.startsWith("/booking") ||
                          location.pathname.startsWith("/local-buddy"))) ||
                      (item.dropdownType === "management" &&
                        (location.pathname.startsWith("/b2b") ||
                          location.pathname.startsWith("/buddy/dashboard")))
                        ? "bg-primary-100 text-primary-700 shadow-sm"
                        : "text-gray-500 hover:text-primary-600 hover:bg-primary-50"
                    }`}
                  >
                    <i
                      className={`${item.icon} text-sm w-4 flex-shrink-0 mr-2`}
                    ></i>
                    <span>{item.name}</span>
                    <i
                      className={`fas fa-chevron-down text-xs ml-1.5 transition-transform ${
                        (item.dropdownType === "services" &&
                          isBookingMenuOpen) ||
                        (item.dropdownType === "management" &&
                          isManagementMenuOpen)
                          ? "rotate-180"
                          : ""
                      }`}
                    ></i>
                  </button>

                  {/* Dropdown Menu for Services */}
                  {item.dropdownType === "services" && isBookingMenuOpen && (
                    <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                      {bookingOptions.map((option) => (
                        <Link
                          key={option.path}
                          to={option.path}
                          onClick={() => setIsBookingMenuOpen(false)}
                          className={`flex items-center whitespace-nowrap px-4 py-2.5 transition-colors ${
                            location.pathname === option.path
                              ? "bg-primary-50 text-primary-700"
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          <i
                            className={`${option.icon} text-base w-5 flex-shrink-0 mr-3`}
                          ></i>
                          <span className="text-sm font-medium flex-1">
                            {option.name}
                          </span>
                          {location.pathname === option.path && (
                            <i className="fas fa-check text-primary-600 text-sm ml-2"></i>
                          )}
                        </Link>
                      ))}
                    </div>
                  )}

                  {/* Dropdown Menu for Management */}
                  {item.dropdownType === "management" &&
                    isManagementMenuOpen && (
                      <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                        {managementOptions.map((option) => (
                          <Link
                            key={option.path}
                            to={option.path}
                            onClick={() => setIsManagementMenuOpen(false)}
                            className={`flex items-start px-4 py-3 transition-colors ${
                              location.pathname === option.path ||
                              location.pathname.startsWith(option.path + "/")
                                ? "bg-primary-50 text-primary-700"
                                : "text-gray-700 hover:bg-gray-50"
                            }`}
                          >
                            <i
                              className={`${option.icon} text-base w-5 flex-shrink-0 mr-3 mt-0.5`}
                            ></i>
                            <div className="flex-1">
                              <div className="text-sm font-medium">
                                {option.name}
                              </div>
                              <div className="text-xs text-gray-500 mt-0.5">
                                {option.description}
                              </div>
                            </div>
                            {(location.pathname === option.path ||
                              location.pathname.startsWith(
                                option.path + "/"
                              )) && (
                              <i className="fas fa-check text-primary-600 text-sm ml-2 mt-1"></i>
                            )}
                          </Link>
                        ))}
                      </div>
                    )}
                </div>
              ) : (
                // Regular nav item
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center whitespace-nowrap px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(item.path)
                      ? "bg-primary-100 text-primary-700 shadow-sm"
                      : "text-gray-500 hover:text-primary-600 hover:bg-primary-50"
                  }`}
                >
                  <i
                    className={`${item.icon} text-sm w-4 flex-shrink-0 mr-2`}
                  ></i>
                  <span>{item.name}</span>
                </Link>
              )
            )}
          </nav>

          {/* CTA Button & Language Selector */}
          <div className="hidden lg:flex items-center space-x-3">
            <Link to="/contact" className="btn btn-primary group">
              <i className="fas fa-envelope mr-2 group-hover:scale-110 transition-transform"></i>
              Liên hệ
            </Link>

            {/* Language Dropdown */}
            <div className="relative language-selector">
              <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center justify-center gap-2 px-3 h-10 rounded-lg hover:bg-gray-100 transition-all duration-200 border border-gray-200 hover:border-primary-300"
                title="Đổi ngôn ngữ"
              >
                <img
                  src={
                    languages.find((lang) => lang.code === currentLang)?.flag
                  }
                  alt={
                    languages.find((lang) => lang.code === currentLang)?.name
                  }
                  className="w-5 h-5 object-cover rounded"
                />
                <span className="text-sm font-semibold text-gray-700">
                  {
                    languages.find((lang) => lang.code === currentLang)
                      ?.shortName
                  }
                </span>
              </button>

              {/* Dropdown Menu */}
              {isLangMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className={`w-full flex items-center space-x-3 px-4 py-2.5 text-left transition-colors ${
                        currentLang === lang.code
                          ? "bg-primary-50 text-primary-700"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <img
                        src={lang.flag}
                        alt={lang.name}
                        className="w-6 h-6 object-cover rounded"
                      />
                      <span className="text-sm font-medium">{lang.name}</span>
                      {currentLang === lang.code && (
                        <i className="fas fa-check text-primary-600 ml-auto text-sm"></i>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-600 hover:text-primary-600 hover:bg-primary-50 transition-colors"
          >
            <i
              className={`fas ${isMenuOpen ? "fa-times" : "fa-bars"} text-xl`}
            ></i>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white/95 backdrop-blur-md rounded-lg mt-2 shadow-lg border border-gray-200">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center whitespace-nowrap px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                    isActive(item.path)
                      ? "bg-primary-100 text-primary-700"
                      : "text-gray-600 hover:text-primary-600 hover:bg-primary-50"
                  }`}
                >
                  <i
                    className={`${item.icon} text-lg w-6 flex-shrink-0 mr-3`}
                  ></i>
                  <span>{item.name}</span>
                </Link>
              ))}

              {/* Mobile Dịch Vụ Section */}
              <div className="pt-3 border-t border-gray-200">
                <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Dịch Vụ
                </div>
                <div className="space-y-1">
                  {bookingOptions.map((option) => (
                    <Link
                      key={option.path}
                      to={option.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center whitespace-nowrap px-4 py-3 rounded-lg transition-all duration-200 ${
                        location.pathname === option.path
                          ? "bg-primary-100 text-primary-700"
                          : "text-gray-600 hover:text-primary-600 hover:bg-primary-50"
                      }`}
                    >
                      <i
                        className={`${option.icon} text-lg w-6 flex-shrink-0 mr-3`}
                      ></i>
                      <span className="text-base font-medium flex-1">
                        {option.name}
                      </span>
                      {location.pathname === option.path && (
                        <i className="fas fa-check text-primary-600 text-sm ml-2"></i>
                      )}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Mobile Management Section */}
              <div className="pt-3 border-t border-gray-200">
                <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Quản lý
                </div>
                <div className="space-y-1">
                  {managementOptions.map((option) => (
                    <Link
                      key={option.path}
                      to={option.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-start px-4 py-3 rounded-lg transition-all duration-200 ${
                        location.pathname === option.path ||
                        location.pathname.startsWith(option.path + "/")
                          ? "bg-primary-100 text-primary-700"
                          : "text-gray-600 hover:text-primary-600 hover:bg-primary-50"
                      }`}
                    >
                      <i
                        className={`${option.icon} text-lg w-6 flex-shrink-0 mr-3 mt-0.5`}
                      ></i>
                      <div className="flex-1">
                        <div className="text-base font-medium">
                          {option.name}
                        </div>
                        <div className="text-xs text-gray-500 mt-0.5">
                          {option.description}
                        </div>
                      </div>
                      {(location.pathname === option.path ||
                        location.pathname.startsWith(option.path + "/")) && (
                        <i className="fas fa-check text-primary-600 text-sm ml-2 mt-1"></i>
                      )}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Mobile Language Selector */}
              <div className="pt-3 border-t border-gray-200">
                <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Ngôn ngữ / Language
                </div>
                <div className="space-y-1">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className={`w-full flex items-center whitespace-nowrap px-4 py-2.5 rounded-lg text-base font-medium transition-all duration-200 ${
                        currentLang === lang.code
                          ? "bg-primary-100 text-primary-700"
                          : "text-gray-600 hover:text-primary-600 hover:bg-primary-50"
                      }`}
                    >
                      <img
                        src={lang.flag}
                        alt={lang.name}
                        className="w-7 h-7 object-cover rounded flex-shrink-0 mr-3"
                      />
                      <span>{lang.name}</span>
                      {currentLang === lang.code && (
                        <i className="fas fa-check text-primary-600 ml-auto text-sm"></i>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-gray-200">
                <Link
                  to="/contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="btn btn-primary w-full justify-center"
                >
                  <i className="fas fa-calendar-check mr-2"></i>
                  Đặt tour ngay
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

import React from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";

const PricingModal = ({ isOpen, onClose }) => {
  const [billingCycle, setBillingCycle] = React.useState("monthly"); // 'monthly' or 'yearly'
  const [showScrollIndicator, setShowScrollIndicator] = React.useState(true);

  if (!isOpen) return null;

  // Định nghĩa các tính năng theo cấu trúc bảng
  const features = [
    {
      name: "Thư viện địa điểm",
      icon: "fa-map-marked-alt",
      free: { status: "yes", details: [] },
      premium: { status: "yes", details: [] },
    },
    {
      name: "AI Trip Planner",
      icon: "fa-route",
      free: {
        status: "limited",
        details: [
          "3 lượt dùng/năm",
          "1 lựa chọn kế hoạch",
          "Đề xuất 1 lựa chọn nhà hàng/khách sạn",
        ],
      },
      premium: {
        status: "yes",
        details: [
          "Không giới hạn lượt dùng",
          "Truy cập đầy đủ các lựa chọn kế hoạch",
          "Chia sẻ,lưu và tải về kế hoạch",
          "Đề xuất nhiều lựa chọn nhà hàng/khách sạn",
        ],
      },
    },
    {
      name: "Tích hợp Google Maps",
      icon: "fa-map",
      free: { status: "yes", details: [] },
      premium: { status: "yes", details: [] },
    },
    {
      name: "Dự báo thời tiết tại điểm đến",
      icon: "fa-cloud-sun",
      free: { status: "no", details: [] },
      premium: {
        status: "yes",
        details: ["Cập nhật dự báo thời tiết liên tục"],
      },
    },
    {
      name: "AI Chat Bot (trợ lý ảo thông minh)",
      icon: "fa-robot",
      free: { status: "no", details: [] },
      premium: {
        status: "yes",
        details: [
          "AI Chat Bot hỗ trợ 24/7, nhanh chóng",
          "Cá nhân hóa từng kế hoạch",
        ],
      },
    },
    {
      name: "AI Voice Assistant",
      icon: "fa-headphones",
      free: { status: "no", details: [] },
      premium: {
        status: "yes",
        details: ["Đa ngôn ngữ, tùy chỉnh cài đặt giọng nói"],
      },
    },
    {
      name: "Dịch vụ Booking",
      icon: "fa-calendar-check",
      free: { status: "yes", details: [] },
      premium: { status: "yes", details: [] },
    },
    {
      name: "Dịch vụ Local Buddy",
      icon: "fa-user-friends",
      free: { status: "yes", details: [] },
      premium: { status: "yes", details: [] },
    },
    {
      name: "Voucher và ưu đãi",
      icon: "fa-ticket-alt",
      free: {
        status: "limited",
        details: ["Số lượng và giá trị của voucher giới hạn"],
      },
      premium: {
        status: "yes",
        details: ["Nhận nhiều voucher với giá trị cao"],
      },
    },
    {
      name: "Cộng đồng và bảng xếp hạng",
      icon: "fa-trophy",
      free: {
        status: "yes",
        details: [],
      },
      premium: {
        status: "yes",
        details: ["Top Bảng xếp hạng sẽ được nhận quà và vinh danh cuối năm"],
      },
    },
  ];

  // Component để render trạng thái tính năng
  const FeatureStatus = ({ status, details }) => {
    if (status === "yes") {
      return (
        <div className="flex justify-center">
          {details.length === 0 ? (
            <i className="fas fa-check-circle text-2xl text-green-500"></i>
          ) : (
            <div className="flex flex-col items-start">
              <i className="fas fa-check-circle text-2xl text-green-500 mb-2 self-center"></i>
              <ul className="text-xs text-gray-700 space-y-1 text-left">
                {details.map((detail, idx) => (
                  <li key={idx}>
                    <span className="leading-relaxed">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      );
    } else if (status === "limited") {
      return (
        <div className="flex justify-center">
          <div className="flex flex-col items-start">
            <i className="fas fa-exclamation-circle text-2xl text-amber-500 mb-2 self-center"></i>
            <ul className="text-xs text-gray-600 space-y-1 text-left">
              {details.map((detail, idx) => (
                <li key={idx}>
                  <span className="leading-relaxed">{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    } else {
      return (
        <div className="flex items-center justify-center">
          <i className="fas fa-times-circle text-2xl text-gray-300"></i>
        </div>
      );
    }
  };

  // Handle scroll to hide indicator
  const handleScroll = (e) => {
    if (e.target.scrollTop > 50) {
      setShowScrollIndicator(false);
    } else {
      setShowScrollIndicator(true);
    }
  };

  return (
    <AnimatePresence>
      <Motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <Motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[85vh] overflow-y-auto flex flex-col [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] relative"
          onClick={(e) => e.stopPropagation()}
          onScroll={handleScroll}
        >
          {/* Compact Header with Background Image */}
          <div className="sticky top-0 z-50 relative px-6 py-5 rounded-t-2xl bg-white shadow-md">
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center rounded-t-2xl overflow-hidden -z-10"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=2070')",
              }}
            ></div>
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/60 rounded-t-2xl -z-10"></div>

            {/* Content */}
            <div className="relative">
              <button
                onClick={onClose}
                className="absolute top-0 right-0 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
              >
                <i className="fas fa-times text-sm"></i>
              </button>

              <div className="max-w-2xl">
                <h2 className="text-white text-2xl font-bold mb-1 drop-shadow-lg">
                  Chọn gói phù hợp
                </h2>
                <p className="text-white/90 text-sm drop-shadow-md">
                  Trải nghiệm đầy đủ tính năng với Premium
                </p>
              </div>

              {/* Compact Billing Toggle */}
              <div className="mt-4 flex items-center gap-3">
                <span
                  className={`text-xs font-medium drop-shadow-md ${
                    billingCycle === "monthly" ? "text-white" : "text-white/60"
                  }`}
                >
                  Tháng
                </span>
                <button
                  onClick={() =>
                    setBillingCycle(
                      billingCycle === "monthly" ? "yearly" : "monthly"
                    )
                  }
                  className="relative w-12 h-6 bg-white/20 rounded-full transition-colors hover:bg-white/30"
                >
                  <Motion.div
                    animate={{ x: billingCycle === "monthly" ? 2 : 26 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-md"
                  />
                </button>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-medium drop-shadow-md ${
                      billingCycle === "yearly" ? "text-white" : "text-white/60"
                    }`}
                  >
                    Năm
                  </span>
                  <span className="bg-green-400 text-green-900 text-[10px] px-2 py-0.5 rounded-full font-bold shadow-sm">
                    -23%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Table View */}
          <div className="px-6 py-6 pt-8">
            <div className="max-w-6xl mx-auto">
              <table className="w-full border-collapse">
                {/* Table Header */}
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-4 px-4 font-bold text-gray-800 text-base w-1/3">
                      Tính năng
                    </th>
                    <th className="text-center py-4 px-4 w-1/3">
                      <div className="flex flex-col items-center">
                        <span className="text-2xl font-bold text-gray-800 mb-1">
                          Free
                        </span>
                        <span className="text-sm text-gray-500">
                          0 VNĐ/tháng
                        </span>
                      </div>
                    </th>
                    <th className="text-center py-4 px-4 w-1/3 bg-gradient-to-br from-primary-50 to-primary-100 rounded-t-xl relative pt-10">
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-30">
                        <span className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg whitespace-nowrap">
                          🔥 Phổ biến nhất
                        </span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-2xl font-bold text-primary-700 mb-1">
                          Premium
                        </span>
                        <div className="text-sm">
                          {billingCycle === "monthly" ? (
                            <span className="text-primary-600 font-semibold">
                              49.000 VNĐ/tháng
                            </span>
                          ) : (
                            <div>
                              <span className="text-primary-600 font-semibold">
                                450.000 VNĐ/năm
                              </span>
                              <p className="text-xs text-green-600 mt-1">
                                Chỉ 37.500 VNĐ/tháng
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody>
                  {features.map((feature, index) => (
                    <Motion.tr
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.03 }}
                      className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                      }`}
                    >
                      <td className="py-4 px-4 align-top">
                        <div className="flex items-center gap-3">
                          <i
                            className={`fas ${feature.icon} text-primary-500 text-lg`}
                          ></i>
                          <span className="font-medium text-gray-800 text-sm">
                            {feature.name}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4 align-top">
                        <FeatureStatus
                          status={feature.free.status}
                          details={feature.free.details}
                        />
                      </td>
                      <td className="py-4 px-4 bg-primary-50/30 align-top">
                        <FeatureStatus
                          status={feature.premium.status}
                          details={feature.premium.details}
                        />
                      </td>
                    </Motion.tr>
                  ))}
                </tbody>

                {/* Table Footer - CTA Buttons */}
                <tfoot>
                  <tr>
                    <td className="py-5 px-4"></td>
                    <td className="py-5 px-4">
                      <button
                        disabled
                        className="w-full py-3 px-5 rounded-lg text-sm font-semibold bg-gray-100 text-gray-400 cursor-not-allowed"
                      >
                        Gói hiện tại
                      </button>
                    </td>
                    <td className="py-5 px-4 bg-primary-50/30">
                      <button className="w-full py-3 px-5 rounded-lg text-sm font-semibold bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5">
                        Nâng cấp ngay
                      </button>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Footer Info */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                <i className="fas fa-shield-alt text-primary-500 mr-2"></i>
                Thanh toán an toàn & bảo mật
              </p>
            </div>
          </div>

          {/* Scroll Indicator */}
          {showScrollIndicator && (
            <Motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-40 pointer-events-none"
            >
              <div className="flex flex-col items-center gap-2">
                <span className="text-xs text-gray-500 font-medium bg-white/90 px-3 py-1 rounded-full shadow-md">
                  Cuộn xuống để xem thêm
                </span>
                <Motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-primary-500"
                >
                  <i className="fas fa-chevron-down text-xl"></i>
                </Motion.div>
              </div>
            </Motion.div>
          )}
        </Motion.div>
      </Motion.div>
    </AnimatePresence>
  );
};

export default PricingModal;

import React from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";

const PricingModal = ({ isOpen, onClose }) => {
  const [billingCycle, setBillingCycle] = React.useState("monthly"); // 'monthly' or 'yearly'

  if (!isOpen) return null;

  const plans = [
    {
      name: "Free",
      price: "0",
      period: "Miễn phí",
      color: "gray",
      features: [
        {
          icon: "✓",
          text: "3 lượt sử dụng AI Trip Planner / năm",
          included: true,
        },
        {
          icon: "✓",
          text: "1 lựa chọn kế hoạch được đề xuất",
          included: true,
        },
        {
          icon: "✗",
          text: "Không giới hạn lượt sử dụng",
          included: false,
        },
        {
          icon: "✗",
          text: "3 lựa chọn kế hoạch",
          included: false,
        },
        {
          icon: "✗",
          text: "Chia sẻ, tải về, lưu kế hoạch",
          included: false,
        },
        {
          icon: "✗",
          text: "Cập nhật thời tiết liên tục",
          included: false,
        },
        {
          icon: "✗",
          text: "AI Chatbot 24/7",
          included: false,
        },
        {
          icon: "✗",
          text: "Đa ngôn ngữ Story Voice",
          included: false,
        },
        {
          icon: "✗",
          text: "Voucher giá trị cao",
          included: false,
        },
        {
          icon: "✗",
          text: "Bảng xếp hạng & phần thưởng",
          included: false,
        },
      ],
      buttonText: "Gói hiện tại",
      buttonDisabled: true,
    },
    {
      name: "Premium",
      price: "49.000",
      priceYearly: "450.000",
      period: "/ tháng",
      periodYearly: "/ năm",
      color: "primary",
      popular: true,
      features: [
        {
          icon: "✓",
          text: "Không giới hạn lượt sử dụng AI Trip Planner",
          included: true,
          highlight: true,
        },
        {
          icon: "✓",
          text: "3 lựa chọn kế hoạch được đề xuất",
          included: true,
          highlight: true,
        },
        {
          icon: "✓",
          text: "Chia sẻ, tải về, lưu kế hoạch",
          included: true,
          highlight: true,
        },
        {
          icon: "✓",
          text: "Cập nhật dự báo thời tiết liên tục",
          included: true,
        },
        {
          icon: "✓",
          text: "AI Chatbot đồng hành 24/7",
          included: true,
        },
        {
          icon: "✓",
          text: "Đa ngôn ngữ với Story Voice",
          included: true,
        },
        {
          icon: "✓",
          text: "Nhận voucher với giá trị cao",
          included: true,
        },
        {
          icon: "✓",
          text: "Tham gia bảng xếp hạng & nhận phần thưởng",
          included: true,
        },
      ],
      buttonText: "Nâng cấp ngay",
      buttonDisabled: false,
    },
  ];

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
          className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Compact Header with Background Image */}
          <div className="relative px-6 py-5 overflow-hidden">
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=2070')",
              }}
            ></div>
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/60"></div>

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

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
            <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
              {plans.map((plan, index) => (
                <Motion.div
                  key={plan.name}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative rounded-xl border-2 p-5 flex flex-col transition-all ${
                    plan.popular
                      ? "border-primary-500 shadow-lg bg-gradient-to-br from-primary-50/50 to-blue-50/30"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md">
                        🔥 Hot
                      </span>
                    </div>
                  )}

                  {/* Compact Plan Header */}
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {plan.name}
                    </h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-gray-900">
                        {plan.name === "Premium" && billingCycle === "yearly"
                          ? plan.priceYearly
                          : plan.price}
                      </span>
                      <span className="text-sm text-gray-500">đ</span>
                      <span className="text-sm text-gray-500">
                        {plan.name === "Premium" && billingCycle === "yearly"
                          ? plan.periodYearly
                          : plan.period}
                      </span>
                    </div>
                    {plan.name === "Premium" && billingCycle === "yearly" && (
                      <p className="text-xs text-green-600 mt-1 font-medium">
                        ≈ 37.500đ/tháng
                      </p>
                    )}
                  </div>

                  {/* Compact Features */}
                  <ul className="space-y-2 mb-5 flex-grow">
                    {plan.features.map((feature, i) => (
                      <li
                        key={i}
                        className={`flex items-start gap-2 text-xs ${
                          feature.included ? "text-gray-700" : "text-gray-400"
                        }`}
                      >
                        <span
                          className={`flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold mt-0.5 ${
                            feature.included
                              ? feature.highlight
                                ? "bg-primary-500 text-white"
                                : "bg-green-100 text-green-600"
                              : "bg-gray-100 text-gray-400"
                          }`}
                        >
                          {feature.icon}
                        </span>
                        <span
                          className={`flex-1 leading-relaxed ${
                            !feature.included ? "line-through" : ""
                          }`}
                        >
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Compact CTA Button */}
                  <button
                    disabled={plan.buttonDisabled}
                    className={`w-full py-2.5 px-4 rounded-lg text-sm font-semibold transition-all ${
                      plan.buttonDisabled
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : plan.popular
                        ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                        : "bg-gray-800 text-white hover:bg-gray-900 shadow-sm"
                    }`}
                  >
                    {plan.buttonText}
                  </button>
                </Motion.div>
              ))}
            </div>

            {/* Compact Footer Info */}
            <div className="mt-5 text-center">
              <p className="text-xs text-gray-500">
                <i className="fas fa-shield-alt text-primary-500 mr-1"></i>
                Thanh toán an toàn & bảo mật
              </p>
            </div>
          </div>
        </Motion.div>
      </Motion.div>
    </AnimatePresence>
  );
};

export default PricingModal;

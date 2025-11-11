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
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
        onClick={onClose}
      >
        <Motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 relative px-8 py-6 rounded-t-2xl overflow-hidden">
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=2070')",
              }}
            ></div>
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/60"></div>

            <div className="relative flex justify-between items-center">
              <div>
                <h2 className="text-white text-3xl font-extrabold mb-2 drop-shadow-lg">
                  Chọn gói phù hợp với bạn
                </h2>
                <p className="text-white font-semibold drop-shadow-md">
                  Trải nghiệm đầy đủ tính năng với gói Premium
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-colors"
              >
                <i className="fas fa-times text-2xl"></i>
              </button>
            </div>

            {/* Billing Toggle */}
            <div className="relative mt-6 flex items-center justify-center gap-4">
              <span
                className={`text-sm ${
                  billingCycle === "monthly"
                    ? "text-white font-semibold"
                    : "text-white/70"
                }`}
              >
                Thanh toán theo tháng
              </span>
              <button
                onClick={() =>
                  setBillingCycle(
                    billingCycle === "monthly" ? "yearly" : "monthly"
                  )
                }
                className="relative w-14 h-7 bg-white bg-opacity-30 rounded-full transition-colors"
              >
                <Motion.div
                  animate={{ x: billingCycle === "monthly" ? 2 : 30 }}
                  className="absolute top-1 w-5 h-5 bg-white rounded-full shadow-md"
                />
              </button>
              <span
                className={`text-sm ${
                  billingCycle === "yearly"
                    ? "text-white font-semibold"
                    : "text-white/70"
                }`}
              >
                Thanh toán theo năm
                <span className="ml-2 bg-green-400 text-green-900 text-xs px-2 py-1 rounded-full font-bold">
                  Tiết kiệm 23%
                </span>
              </span>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="px-8 py-8">
            <div className="grid md:grid-cols-2 gap-6">
              {plans.map((plan, index) => (
                <Motion.div
                  key={plan.name}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative rounded-xl border-2 p-6 flex flex-col ${
                    plan.popular
                      ? "border-primary-500 shadow-xl scale-105"
                      : "border-gray-200"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                        🔥 Phổ biến nhất
                      </span>
                    </div>
                  )}

                  {/* Plan Header */}
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      {plan.name}
                    </h3>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-bold text-gray-900">
                        {plan.name === "Premium" && billingCycle === "yearly"
                          ? plan.priceYearly
                          : plan.price}
                      </span>
                      <span className="text-xl text-gray-600">VNĐ</span>
                      <span className="text-gray-500 ml-1">
                        {plan.name === "Premium" && billingCycle === "yearly"
                          ? plan.periodYearly
                          : plan.period}
                      </span>
                    </div>
                    {plan.name === "Premium" && billingCycle === "yearly" && (
                      <p className="text-sm text-green-600 mt-2">
                        Chỉ 37.500 VNĐ/tháng
                      </p>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-6 flex-grow">
                    {plan.features.map((feature, i) => (
                      <li
                        key={i}
                        className={`flex items-start gap-3 ${
                          feature.included
                            ? "text-gray-700"
                            : "text-gray-400 line-through"
                        }`}
                      >
                        <span
                          className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                            feature.included
                              ? feature.highlight
                                ? "bg-primary-500 text-white"
                                : "bg-green-100 text-green-600"
                              : "bg-gray-100 text-gray-400"
                          }`}
                        >
                          {feature.icon}
                        </span>
                        <span className="text-sm flex-1">{feature.text}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <button
                    disabled={plan.buttonDisabled}
                    className={`w-full py-3 px-6 rounded-lg font-semibold transition-all ${
                      plan.buttonDisabled
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : plan.popular
                        ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                        : "bg-gray-800 text-white hover:bg-gray-900"
                    }`}
                  >
                    {plan.buttonText}
                  </button>
                </Motion.div>
              ))}
            </div>

            {/* Additional Info */}
            <div className="mt-8 text-center text-sm text-gray-600">
              <p>
                <i className="fas fa-shield-alt text-primary-500 mr-2"></i>
                Thanh toán an toàn và bảo mật
              </p>
            </div>
          </div>
        </Motion.div>
      </Motion.div>
    </AnimatePresence>
  );
};

export default PricingModal;

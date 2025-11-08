import React, { useState } from "react";
import { Link } from "react-router-dom";
import { restaurants } from "../data/restaurants";
import { hotels } from "../data/hotels";
import { formatCurrency } from "../utils/formatCurrency";

const AIPlanner = () => {
  // Map destination values to actual city names in data
  const destinationMapping = {
    hanoi: "Hà Nội",
    halong: "Hạ Long",
    sapa: "Sa Pa",
    hue: "Huế",
    hoian: "Hội An",
    danang: "Đà Nẵng",
    nhatrang: "Nha Trang",
    dalat: "Đà Lạt",
    hcmc: "TP. Hồ Chí Minh",
    hochiminh: "TP. Hồ Chí Minh",
    phuquoc: "Phú Quốc",
    cantho: "Cần Thơ",
    vungtau: "Vũng Tàu",
    haiphong: "Hải Phòng",
    quyinhon: "Quy Nhơn",
    mytho: "Mỹ Tho",
  };

  // Helper function to format currency range
  const formatCurrencyRange = (min, max) => {
    return `${formatCurrency(min)} - ${formatCurrency(max)}`;
  };

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    destination: "",
    duration: 5, // Default 5 days
    interests: [],
    groupSize: "",
    travelStyle: "",
    accommodation: "",
    transportation: "",
    activities: [],
    specialRequirements: "",
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState(null);
  const [selectedPremiumPlan, setSelectedPremiumPlan] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [modalPlan, setModalPlan] = useState(null);
  const [userMode, setUserMode] = useState("free"); // 'free' or 'premium'

  const steps = [
    {
      number: 1,
      title: "Điểm đến",
      description: "Chọn nơi bạn muốn khám phá",
      icon: "fas fa-map-marker-alt",
    },
    {
      number: 2,
      title: "Sở thích",
      description: "Chia sẻ những gì bạn yêu thích",
      icon: "fas fa-heart",
    },
    {
      number: 3,
      title: "Chi tiết",
      description: "Hoàn thiện kế hoạch của bạn",
      icon: "fas fa-cog",
    },
  ];

  const interestOptions = [
    { id: "culture", label: "Văn hóa & Lịch sử", icon: "fas fa-landmark" },
    { id: "nature", label: "Thiên nhiên", icon: "fas fa-mountain" },
    { id: "adventure", label: "Phiêu lưu", icon: "fas fa-hiking" },
    { id: "food", label: "Ẩm thực", icon: "fas fa-utensils" },
    { id: "relax", label: "Thư giãn", icon: "fas fa-spa" },
  ];

  const handleInterestToggle = (interestId) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interestId)
        ? prev.interests.filter((id) => id !== interestId)
        : [...prev.interests, interestId],
    }));
  };

  const handleActivityToggle = (activityId) => {
    setFormData((prev) => ({
      ...prev,
      activities: prev.activities.includes(activityId)
        ? prev.activities.filter((id) => id !== activityId)
        : [...prev.activities, activityId],
    }));
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const activityOptions = [
    { id: "sightseeing", label: "Tham quan", icon: "fas fa-camera" },
    { id: "shopping", label: "Mua sắm", icon: "fas fa-shopping-bag" },
    { id: "nightlife", label: "Cuộc sống về đêm", icon: "fas fa-moon" },
    { id: "museums", label: "Bảo tàng", icon: "fas fa-university" },
    { id: "beaches", label: "Bãi biển", icon: "fas fa-umbrella-beach" },
    { id: "hiking", label: "Đi bộ đường dài", icon: "fas fa-hiking" },
    { id: "photography", label: "Chụp ảnh", icon: "fas fa-camera-retro" },
    { id: "local-food", label: "Ẩm thực địa phương", icon: "fas fa-utensils" },
    { id: "festivals", label: "Lễ hội", icon: "fas fa-music" },
  ];

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Restaurant and hotel data by destination
  const getRestaurantsByDestination = (destination, budgetLevel) => {
    // Map budget levels to price ranges
    const priceRanges = {
      budget: { min: 0, max: 150000 },
      balanced: { min: 150000, max: 500000 },
      premium: { min: 500000, max: Infinity },
    };

    const priceRange = priceRanges[budgetLevel];

    // Convert destination from form value to city name
    const cityName = destinationMapping[destination] || destination;

    // Filter restaurants from restaurants.js by destination and price range
    const filteredRestaurants = restaurants
      .filter((r) => r.location.city === cityName)
      .filter(
        (r) =>
          r.averagePrice >= priceRange.min && r.averagePrice <= priceRange.max
      )
      .slice(0, 3); // Get max 3 restaurants

    // Map to match the structure we need
    const mappedRestaurants = filteredRestaurants.map((r) => ({
      id: r.id,
      slug: r.slug,
      name: r.name,
      cuisine: r.cuisine,
      priceRange: formatCurrency(r.averagePrice),
      rating: r.rating,
      location: r.location.address.split(",")[0], // Get first part of address
    }));

    // If no restaurants found, return empty array (will use defaults in generatePlan)
    return mappedRestaurants.length > 0 ? mappedRestaurants : [];
  };

  const getHotelsByDestination = (destination, budgetLevel) => {
    // Map budget levels to price ranges (per night)
    const priceRanges = {
      budget: { min: 0, max: 800000 },
      balanced: { min: 800000, max: 3000000 },
      premium: { min: 3000000, max: Infinity },
    };

    const priceRange = priceRanges[budgetLevel];

    // Convert destination from form value to city name
    const cityName = destinationMapping[destination] || destination;

    // Filter hotels from hotels.js by destination and price range
    const filteredHotels = hotels
      .filter((h) => h.location.city === cityName)
      .filter(
        (h) =>
          h.startingPrice >= priceRange.min && h.startingPrice <= priceRange.max
      )
      .slice(0, 2); // Get max 2 hotels

    // Map to match the structure we need
    const mappedHotels = filteredHotels.map((h) => ({
      id: h.id,
      slug: h.slug,
      name: h.name,
      stars: getCategoryStars(h.category, budgetLevel),
      pricePerNight: h.priceRange, // Lấy full range thay vì chỉ giá min
      rating: h.rating,
      amenities: h.amenities
        .filter((a) => a.available)
        .slice(0, 3)
        .map((a) => a.name),
    }));

    // If no hotels found, return empty array (will use defaults in generatePlan)
    return mappedHotels.length > 0 ? mappedHotels : [];
  };

  const getCategoryStars = (category, budgetLevel) => {
    if (category === "Resort")
      return budgetLevel === "budget" ? 3 : budgetLevel === "balanced" ? 4 : 5;
    if (category === "Hotel")
      return budgetLevel === "budget" ? 2 : budgetLevel === "balanced" ? 4 : 5;
    if (category === "Villa")
      return budgetLevel === "budget" ? 3 : budgetLevel === "balanced" ? 4 : 5;
    return 3;
  };

  // Fallback function if no restaurants found (currently using empty array fallback)
  const _getDefaultRestaurants = (budgetLevel) => {
    const defaultData = {
      "Hà Nội": {
        budget: [
          {
            name: "Phở Thìn",
            cuisine: "Phở truyền thống",
            priceRange: formatCurrencyRange(40000, 60000),
            rating: 4.5,
            location: "Lò Đúc",
            slug: "pho-gia-truyen-bat-dan",
          },
          {
            name: "Bún Chả Đắc Kim",
            cuisine: "Bún chả Hà Nội",
            priceRange: formatCurrencyRange(50000, 70000),
            rating: 4.6,
            location: "Hàng Mành",
            slug: "bun-cha-huong-lien",
          },
          {
            name: "Bánh Mì 25",
            cuisine: "Bánh mì",
            priceRange: formatCurrencyRange(25000, 35000),
            rating: 4.3,
            location: "Hoàn Kiếm",
            slug: "quan-an-pho-co-hanoi",
          },
        ],
        balanced: [
          {
            name: "Nhà Hàng Madame Hiền",
            cuisine: "Việt Nam",
            priceRange: formatCurrencyRange(150000, 250000),
            rating: 4.7,
            location: "Hoàn Kiếm",
          },
          {
            name: "Essence Restaurant",
            cuisine: "Á - Âu",
            priceRange: formatCurrencyRange(200000, 350000),
            rating: 4.5,
            location: "Hai Bà Trưng",
          },
          {
            name: "Chả Cá Lã Vọng",
            cuisine: "Chả cá đặc sản",
            priceRange: formatCurrencyRange(180000, 280000),
            rating: 4.4,
            location: "Hồ Hoàn Kiếm",
          },
        ],
        premium: [
          {
            name: "La Verticale",
            cuisine: "Fine Dining Pháp",
            priceRange: formatCurrencyRange(500000, 800000),
            rating: 4.8,
            location: "Hoàn Kiếm",
          },
          {
            name: "Home Hanoi Restaurant",
            cuisine: "Cao cấp Việt Nam",
            priceRange: formatCurrencyRange(450000, 700000),
            rating: 4.7,
            location: "Tràng Tiền",
          },
          {
            name: "Maison Sen",
            cuisine: "Fusion Á-Âu",
            priceRange: formatCurrencyRange(600000, 900000),
            rating: 4.9,
            location: "Hồ Tây",
          },
        ],
      },
      "Hạ Long": {
        budget: [
          {
            name: "Hải Sản Bình Dân",
            cuisine: "Hải sản tươi",
            priceRange: formatCurrencyRange(80000, 120000),
            rating: 4.3,
            location: "Bãi Cháy",
          },
          {
            name: "Bánh Đa Cua",
            cuisine: "Đặc sản Hạ Long",
            priceRange: formatCurrencyRange(50000, 80000),
            rating: 4.4,
            location: "Chợ Hạ Long",
          },
          {
            name: "Quán Ốc Sài Gòn",
            cuisine: "Ốc các loại",
            priceRange: formatCurrencyRange(60000, 100000),
            rating: 4.2,
            location: "Hùng Thắng",
          },
        ],
        balanced: [
          {
            name: "Quán Nhà Hàng Sapa",
            cuisine: "Hải sản",
            priceRange: formatCurrencyRange(200000, 350000),
            rating: 4.5,
            location: "Bãi Cháy",
          },
          {
            name: "Emeralda Restaurant",
            cuisine: "Á - Âu",
            priceRange: formatCurrencyRange(250000, 400000),
            rating: 4.6,
            location: "Hạ Long",
          },
          {
            name: "Hải Sản Vịnh Hạ Long",
            cuisine: "Hải sản cao cấp",
            priceRange: formatCurrencyRange(300000, 500000),
            rating: 4.7,
            location: "Cảng tàu",
          },
        ],
        premium: [
          {
            name: "Au Lac Legend Cruise",
            cuisine: "Fine Dining",
            priceRange: formatCurrencyRange(600000, 1000000),
            rating: 4.9,
            location: "Du thuyền 5 sao",
          },
          {
            name: "Paradise Suites Restaurant",
            cuisine: "Fusion Seafood",
            priceRange: formatCurrencyRange(700000, 1200000),
            rating: 4.8,
            location: "Bãi Cháy",
          },
          {
            name: "Vinpearl Ha Long",
            cuisine: "Cao cấp quốc tế",
            priceRange: formatCurrencyRange(800000, 1500000),
            rating: 4.9,
            location: "Vinpearl Resort",
          },
        ],
      },
      "Hội An": {
        budget: [
          {
            name: "Cao Lầu Bà Lễ",
            cuisine: "Cao lầu đặc sản",
            priceRange: formatCurrencyRange(30000, 50000),
            rating: 4.5,
            location: "Phố Cổ",
          },
          {
            name: "Bánh Mì Phượng",
            cuisine: "Bánh mì",
            priceRange: formatCurrencyRange(20000, 35000),
            rating: 4.6,
            location: "Hoàng Diệu",
          },
          {
            name: "Mì Quảng Bà Mua",
            cuisine: "Mì Quảng",
            priceRange: formatCurrencyRange(35000, 55000),
            rating: 4.4,
            location: "Trần Cao Vân",
          },
        ],
        balanced: [
          {
            name: "Morning Glory",
            cuisine: "Việt Nam",
            priceRange: formatCurrencyRange(150000, 250000),
            rating: 4.7,
            location: "Nguyễn Thái Học",
          },
          {
            name: "Madam Khánh",
            cuisine: "Banh mi & Com ga",
            priceRange: formatCurrencyRange(100000, 180000),
            rating: 4.6,
            location: "Phố cổ",
          },
          {
            name: "Nu Eatery",
            cuisine: "Fusion Việt",
            priceRange: formatCurrencyRange(200000, 350000),
            rating: 4.8,
            location: "Nguyễn Phúc Chu",
          },
        ],
        premium: [
          {
            name: "The Market Restaurant",
            cuisine: "Fine Dining",
            priceRange: formatCurrencyRange(500000, 800000),
            rating: 4.9,
            location: "An Hội",
          },
          {
            name: "Taste of Hoi An",
            cuisine: "Haute Cuisine",
            priceRange: formatCurrencyRange(600000, 900000),
            rating: 4.8,
            location: "Riverside",
          },
          {
            name: "Mango Rooms",
            cuisine: "Fusion Cao cấp",
            priceRange: formatCurrencyRange(450000, 700000),
            rating: 4.7,
            location: "Nguyễn Thái Học",
          },
        ],
      },
      "Đà Lạt": {
        budget: [
          {
            name: "Phở Hùng",
            cuisine: "Phở",
            priceRange: formatCurrencyRange(35000, 50000),
            rating: 4.4,
            location: "Phù Đổng Thiên Vương",
          },
          {
            name: "Bánh Tráng Nướng",
            cuisine: "Đặc sản Đà Lạt",
            priceRange: formatCurrencyRange(20000, 40000),
            rating: 4.5,
            location: "Chợ Đà Lạt",
          },
          {
            name: "Nem Nướng Đà Lạt",
            cuisine: "Nem nướng",
            priceRange: formatCurrencyRange(40000, 60000),
            rating: 4.3,
            location: "Hai Bà Trưng",
          },
        ],
        balanced: [
          {
            name: "Gió Restaurant",
            cuisine: "Việt Nam",
            priceRange: formatCurrencyRange(180000, 300000),
            rating: 4.7,
            location: "Trần Phú",
          },
          {
            name: "Le Chalet Dalat",
            cuisine: "Á - Âu",
            priceRange: formatCurrencyRange(200000, 350000),
            rating: 4.6,
            location: "Hồ Xuân Hương",
          },
          {
            name: "Da Quy Restaurant",
            cuisine: "Lẩu & BBQ",
            priceRange: formatCurrencyRange(150000, 280000),
            rating: 4.5,
            location: "Phan Đình Phùng",
          },
        ],
        premium: [
          {
            name: "Le Rabelais",
            cuisine: "Fine Dining Pháp",
            priceRange: formatCurrencyRange(600000, 1000000),
            rating: 4.9,
            location: "Dalat Palace",
          },
          {
            name: "Artichoke Restaurant",
            cuisine: "Fusion Cao cấp",
            priceRange: formatCurrencyRange(500000, 800000),
            rating: 4.8,
            location: "Hồ Xuân Hương",
          },
          {
            name: "Ana Mandara Restaurant",
            cuisine: "Haute Cuisine",
            priceRange: formatCurrencyRange(700000, 1200000),
            rating: 4.9,
            location: "Ana Mandara Resort",
          },
        ],
      },
      "Nha Trang": {
        budget: [
          {
            name: "Quán Hải Sản Lam",
            cuisine: "Hải sản",
            priceRange: formatCurrencyRange(80000, 150000),
            rating: 4.4,
            location: "Bãi Dương",
          },
          {
            name: "Bánh Canh Chả Cá",
            cuisine: "Đặc sản Nha Trang",
            priceRange: formatCurrencyRange(40000, 70000),
            rating: 4.5,
            location: "Nguyễn Thiện Thuật",
          },
          {
            name: "Bún Chả Cá",
            cuisine: "Bún chả cá",
            priceRange: formatCurrencyRange(50000, 80000),
            rating: 4.3,
            location: "Hoàng Hoa Thám",
          },
        ],
        balanced: [
          {
            name: "Lanterns Vietnamese",
            cuisine: "Việt Nam",
            priceRange: formatCurrencyRange(200000, 350000),
            rating: 4.7,
            location: "Nguyễn Thiện Thuật",
          },
          {
            name: "Sailing Club",
            cuisine: "Beachfront Dining",
            priceRange: formatCurrencyRange(250000, 450000),
            rating: 4.6,
            location: "Trần Phú",
          },
          {
            name: "Galangal Restaurant",
            cuisine: "Fusion",
            priceRange: formatCurrencyRange(220000, 380000),
            rating: 4.5,
            location: "Bình Lộc",
          },
        ],
        premium: [
          {
            name: "Six Senses Restaurant",
            cuisine: "Fine Dining",
            priceRange: formatCurrencyRange(800000, 1500000),
            rating: 4.9,
            location: "Six Senses Resort",
          },
          {
            name: "Altitude Rooftop Bar",
            cuisine: "Cao cấp quốc tế",
            priceRange: formatCurrencyRange(600000, 1000000),
            rating: 4.8,
            location: "Havana Hotel",
          },
          {
            name: "La Plage",
            cuisine: "Fusion Seafood",
            priceRange: formatCurrencyRange(700000, 1200000),
            rating: 4.9,
            location: "Intercontinental",
          },
        ],
      },
      "Phú Quốc": {
        budget: [
          {
            name: "Chợ Đêm Phú Quốc",
            cuisine: "Hải sản BBQ",
            priceRange: formatCurrencyRange(100000, 180000),
            rating: 4.4,
            location: "Dương Đông",
          },
          {
            name: "Bánh Canh Ghẹ",
            cuisine: "Đặc sản",
            priceRange: formatCurrencyRange(50000, 80000),
            rating: 4.5,
            location: "Chợ Dương Đông",
          },
          {
            name: "Nhà Hàng Năm Phương",
            cuisine: "Hải sản",
            priceRange: formatCurrencyRange(120000, 200000),
            rating: 4.3,
            location: "Long Beach",
          },
        ],
        balanced: [
          {
            name: "The Spice House",
            cuisine: "Á - Âu",
            priceRange: formatCurrencyRange(250000, 400000),
            rating: 4.7,
            location: "An Thới",
          },
          {
            name: "Crab House",
            cuisine: "Hải sản cao cấp",
            priceRange: formatCurrencyRange(300000, 500000),
            rating: 4.6,
            location: "Sunset Sanato",
          },
          {
            name: "Rory's Beach Bar",
            cuisine: "Beachfront",
            priceRange: formatCurrencyRange(200000, 350000),
            rating: 4.5,
            location: "Long Beach",
          },
        ],
        premium: [
          {
            name: "Shell & Oyster",
            cuisine: "Fine Dining",
            priceRange: formatCurrencyRange(700000, 1200000),
            rating: 4.9,
            location: "JW Marriott",
          },
          {
            name: "Red Rum",
            cuisine: "Fusion Seafood",
            priceRange: formatCurrencyRange(800000, 1400000),
            rating: 4.8,
            location: "Intercontinental",
          },
          {
            name: "Altitude Beach Club",
            cuisine: "Luxury Dining",
            priceRange: formatCurrencyRange(900000, 1600000),
            rating: 4.9,
            location: "Premier Village",
          },
        ],
      },
      "Sa Pa": {
        budget: [
          {
            name: "Quán Cơm Nấm",
            cuisine: "Đặc sản Sapa",
            priceRange: formatCurrencyRange(50000, 80000),
            rating: 4.3,
            location: "Chợ Sapa",
          },
          {
            name: "Thắng Cố Sapa",
            cuisine: "Thắng cố",
            priceRange: formatCurrencyRange(60000, 100000),
            rating: 4.4,
            location: "Cầu Mây",
          },
          {
            name: "Bánh Mì BBQ",
            cuisine: "Bánh mì nướng",
            priceRange: formatCurrencyRange(30000, 50000),
            rating: 4.2,
            location: "Trung tâm",
          },
        ],
        balanced: [
          {
            name: "Red Dao House",
            cuisine: "Việt Nam",
            priceRange: formatCurrencyRange(150000, 250000),
            rating: 4.6,
            location: "Phan Si Păng",
          },
          {
            name: "Hill Station Deli",
            cuisine: "Fusion",
            priceRange: formatCurrencyRange(180000, 300000),
            rating: 4.7,
            location: "Fansipan",
          },
          {
            name: "Little Sapa Restaurant",
            cuisine: "Á - Âu",
            priceRange: formatCurrencyRange(200000, 350000),
            rating: 4.5,
            location: "Trung tâm",
          },
        ],
        premium: [
          {
            name: "La Terrasse",
            cuisine: "Fine Dining Pháp",
            priceRange: formatCurrencyRange(500000, 800000),
            rating: 4.8,
            location: "Victoria Sapa",
          },
          {
            name: "Noble & Swan",
            cuisine: "Haute Cuisine",
            priceRange: formatCurrencyRange(600000, 1000000),
            rating: 4.9,
            location: "MGallery Hotel",
          },
          {
            name: "Orchid Restaurant",
            cuisine: "Fusion Cao cấp",
            priceRange: formatCurrencyRange(550000, 900000),
            rating: 4.7,
            location: "Topas Ecolodge",
          },
        ],
      },
    };

    return defaultData[budgetLevel] || defaultData.balanced;
  };

  const _getDefaultHotels = (budgetLevel) => {
    const defaultData = {
      "Hà Nội": {
        budget: [
          {
            name: "Old Quarter View Hanoi Hostel",
            stars: 2,
            pricePerNight: formatCurrencyRange(250000, 350000),
            rating: 4.3,
            amenities: ["WiFi miễn phí", "Ăn sáng", "Gần phố cổ"],
          },
          {
            name: "Hanoi Backpackers Hostel",
            stars: 2,
            pricePerNight: formatCurrencyRange(200000, 300000),
            rating: 4.4,
            amenities: ["WiFi", "Rooftop bar", "Tour desk"],
          },
        ],
        balanced: [
          {
            name: "Essence Hanoi Hotel",
            stars: 4,
            pricePerNight: formatCurrencyRange(800000, 1200000),
            rating: 4.6,
            amenities: ["Rooftop pool", "Spa", "Nhà hàng", "Gym"],
          },
          {
            name: "La Siesta Premium Hanoi",
            stars: 4,
            pricePerNight: formatCurrencyRange(900000, 1400000),
            rating: 4.7,
            amenities: ["Bể bơi", "Spa", "Free minibar", "Butler service"],
          },
        ],
        premium: [
          {
            name: "Sofitel Legend Metropole",
            stars: 5,
            pricePerNight: formatCurrencyRange(5000000, 8000000),
            rating: 4.9,
            amenities: [
              "Hồ bơi",
              "Spa cao cấp",
              "3 nhà hàng",
              "Heritage suites",
            ],
          },
          {
            name: "Capella Hanoi",
            stars: 5,
            pricePerNight: formatCurrencyRange(6000000, 10000000),
            rating: 4.9,
            amenities: [
              "Butler 24/7",
              "Opera house view",
              "Fine dining",
              "Auriga Spa",
            ],
          },
        ],
      },
      "Hạ Long": {
        budget: [
          {
            name: "Halong Boutique Hotel",
            stars: 2,
            pricePerNight: formatCurrencyRange(300000, 450000),
            rating: 4.2,
            amenities: ["WiFi", "View vịnh", "Ăn sáng"],
          },
          {
            name: "Cat Ba Central Hotel",
            stars: 2,
            pricePerNight: formatCurrencyRange(250000, 400000),
            rating: 4.3,
            amenities: ["Gần bến tàu", "WiFi", "Tour booking"],
          },
        ],
        balanced: [
          {
            name: "Halong Pearl Hotel",
            stars: 4,
            pricePerNight: formatCurrencyRange(1000000, 1500000),
            rating: 4.6,
            amenities: ["Hồ bơi", "Spa", "View vịnh", "Nhà hàng"],
          },
          {
            name: "Wyndham Legend Halong",
            stars: 4,
            pricePerNight: formatCurrencyRange(1200000, 1800000),
            rating: 4.7,
            amenities: ["Bể bơi vô cực", "Kids club", "3 nhà hàng"],
          },
        ],
        premium: [
          {
            name: "Vinpearl Resort & Spa Ha Long",
            stars: 5,
            pricePerNight: formatCurrencyRange(3500000, 6000000),
            rating: 4.8,
            amenities: ["Private beach", "Water park", "Golf", "5 nhà hàng"],
          },
          {
            name: "FLC Halong Bay Resort",
            stars: 5,
            pricePerNight: formatCurrencyRange(4000000, 7000000),
            rating: 4.9,
            amenities: ["18-hole golf", "Private marina", "Casino", "Spa"],
          },
        ],
      },
      "Hội An": {
        budget: [
          {
            name: "Hoi An Backpackers Hostel",
            stars: 2,
            pricePerNight: formatCurrencyRange(200000, 350000),
            rating: 4.4,
            amenities: ["Pool", "Bar", "WiFi", "Gần phố cổ"],
          },
          {
            name: "Little Hoi An Central Boutique",
            stars: 3,
            pricePerNight: formatCurrencyRange(400000, 600000),
            rating: 4.3,
            amenities: ["Rooftop pool", "Bike rental", "Ăn sáng"],
          },
        ],
        balanced: [
          {
            name: "Lasenta Boutique Hotel",
            stars: 4,
            pricePerNight: formatCurrencyRange(1200000, 1800000),
            rating: 4.7,
            amenities: ["Infinity pool", "Spa", "Riverside", "Free minibar"],
          },
          {
            name: "Allegro Hoi An",
            stars: 4,
            pricePerNight: formatCurrencyRange(1000000, 1600000),
            rating: 4.6,
            amenities: ["Pool", "Free bikes", "Cooking class", "Beachfront"],
          },
        ],
        premium: [
          {
            name: "Four Seasons Nam Hai",
            stars: 5,
            pricePerNight: formatCurrencyRange(12000000, 20000000),
            rating: 4.9,
            amenities: ["3 hồ bơi", "Private villas", "Beach club", "The Spa"],
          },
          {
            name: "Anantara Hoi An Resort",
            stars: 5,
            pricePerNight: formatCurrencyRange(8000000, 15000000),
            rating: 4.9,
            amenities: [
              "Riverside",
              "Cooking academy",
              "Spa",
              "Butler service",
            ],
          },
        ],
      },
      "Đà Lạt": {
        budget: [
          {
            name: "Dalat Friendly Hostel",
            stars: 2,
            pricePerNight: formatCurrencyRange(150000, 250000),
            rating: 4.3,
            amenities: ["Dorm & Private", "Free breakfast", "Tour desk"],
          },
          {
            name: "Cozy Nook Dalat",
            stars: 3,
            pricePerNight: formatCurrencyRange(350000, 550000),
            rating: 4.4,
            amenities: ["Central location", "WiFi", "Coffee shop"],
          },
        ],
        balanced: [
          {
            name: "Dalat Wonder Resort",
            stars: 4,
            pricePerNight: formatCurrencyRange(1200000, 1800000),
            rating: 4.6,
            amenities: ["Hồ bơi", "View valley", "Restaurant", "Spa"],
          },
          {
            name: "Swiss-Belresort Tuyen Lam",
            stars: 4,
            pricePerNight: formatCurrencyRange(1400000, 2000000),
            rating: 4.7,
            amenities: ["Lake view", "Bungalows", "BBQ", "Mountain biking"],
          },
        ],
        premium: [
          {
            name: "Dalat Palace Heritage Hotel",
            stars: 5,
            pricePerNight: formatCurrencyRange(4000000, 7000000),
            rating: 4.9,
            amenities: [
              "Golf course",
              "Le Rabelais restaurant",
              "Spa",
              "Heritage",
            ],
          },
          {
            name: "Ana Mandara Villas Dalat",
            stars: 5,
            pricePerNight: formatCurrencyRange(5000000, 9000000),
            rating: 4.8,
            amenities: [
              "French villas",
              "Private gardens",
              "Fine dining",
              "Spa",
            ],
          },
        ],
      },
      "Nha Trang": {
        budget: [
          {
            name: "Mojzo Inn Nha Trang",
            stars: 2,
            pricePerNight: formatCurrencyRange(250000, 400000),
            rating: 4.3,
            amenities: ["Rooftop pool", "Bar", "Beach 5min", "WiFi"],
          },
          {
            name: "An An Hotel",
            stars: 3,
            pricePerNight: formatCurrencyRange(400000, 600000),
            rating: 4.4,
            amenities: ["City view", "Breakfast", "Beach nearby"],
          },
        ],
        balanced: [
          {
            name: "Novotel Nha Trang",
            stars: 4,
            pricePerNight: formatCurrencyRange(1500000, 2200000),
            rating: 4.6,
            amenities: ["Beachfront", "3 pools", "Kids club", "Spa"],
          },
          {
            name: "Mia Resort Nha Trang",
            stars: 4,
            pricePerNight: formatCurrencyRange(2000000, 3000000),
            rating: 4.7,
            amenities: ["Private beach", "Spa", "Sandals Restaurant", "Villas"],
          },
        ],
        premium: [
          {
            name: "Six Senses Ninh Van Bay",
            stars: 5,
            pricePerNight: formatCurrencyRange(15000000, 25000000),
            rating: 4.9,
            amenities: [
              "Private villas",
              "Spa",
              "5 restaurants",
              "Water sports",
            ],
          },
          {
            name: "Anam QT Nha Trang",
            stars: 5,
            pricePerNight: formatCurrencyRange(8000000, 14000000),
            rating: 4.8,
            amenities: [
              "Indochine style",
              "3 pools",
              "Fine dining",
              "The Anam Spa",
            ],
          },
        ],
      },
      "Phú Quốc": {
        budget: [
          {
            name: "Phú Quốc Backpackers",
            stars: 2,
            pricePerNight: formatCurrencyRange(300000, 450000),
            rating: 4.3,
            amenities: ["Pool", "Bar", "Beach access", "Tours"],
          },
          {
            name: "Green Hotel Phu Quoc",
            stars: 3,
            pricePerNight: formatCurrencyRange(500000, 700000),
            rating: 4.4,
            amenities: ["Garden view", "Bike rental", "Beach 2min"],
          },
        ],
        balanced: [
          {
            name: "Salinda Resort Phu Quoc",
            stars: 4,
            pricePerNight: formatCurrencyRange(2000000, 3000000),
            rating: 4.7,
            amenities: ["Beachfront", "Infinity pool", "Spa", "3 restaurants"],
          },
          {
            name: "La Veranda Resort",
            stars: 4,
            pricePerNight: formatCurrencyRange(2500000, 3500000),
            rating: 4.6,
            amenities: ["Colonial style", "Beach club", "Spa", "Fine dining"],
          },
        ],
        premium: [
          {
            name: "JW Marriott Phu Quoc",
            stars: 5,
            pricePerNight: formatCurrencyRange(8000000, 15000000),
            rating: 4.9,
            amenities: ["Private beach", "Water park", "6 restaurants", "Spa"],
          },
          {
            name: "Intercontinental Phu Quoc",
            stars: 5,
            pricePerNight: formatCurrencyRange(10000000, 18000000),
            rating: 4.9,
            amenities: ["Long Beach", "5 pools", "INK 360", "Kids club"],
          },
        ],
      },
      "Sa Pa": {
        budget: [
          {
            name: "Sapa Backpackers",
            stars: 2,
            pricePerNight: formatCurrencyRange(200000, 350000),
            rating: 4.2,
            amenities: ["Mountain view", "Bar", "Trekking tours", "WiFi"],
          },
          {
            name: "Little Sapa Hotel",
            stars: 3,
            pricePerNight: formatCurrencyRange(450000, 650000),
            rating: 4.3,
            amenities: ["Valley view", "Restaurant", "Tour desk"],
          },
        ],
        balanced: [
          {
            name: "Amazing Hotel Sapa",
            stars: 4,
            pricePerNight: formatCurrencyRange(1200000, 1800000),
            rating: 4.6,
            amenities: ["Valley view", "Spa", "Restaurant", "Fireplace rooms"],
          },
          {
            name: "Pao's Sapa Leisure Hotel",
            stars: 4,
            pricePerNight: formatCurrencyRange(1500000, 2200000),
            rating: 4.7,
            amenities: ["Panoramic view", "Spa", "Heated pool", "Fine dining"],
          },
        ],
        premium: [
          {
            name: "Topas Ecolodge",
            stars: 5,
            pricePerNight: formatCurrencyRange(4000000, 7000000),
            rating: 4.8,
            amenities: ["Mountain villas", "Infinity pool", "Spa", "Trekking"],
          },
          {
            name: "Victoria Sapa Resort",
            stars: 5,
            pricePerNight: formatCurrencyRange(5000000, 9000000),
            rating: 4.9,
            amenities: [
              "Colonial style",
              "Heated pool",
              "Spa",
              "La Terrasse restaurant",
            ],
          },
        ],
      },
    };

    return defaultData[budgetLevel] || defaultData.balanced;
  };

  const generatePlan = async () => {
    setIsGenerating(true);

    // Simulate AI processing
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const destination = formData.destination;

    setGeneratedPlan({
      destination: formData.destination,
      duration: formData.duration,
      // FREE PLAN
      freePlan: {
        title: `Kế hoạch cơ bản - ${formData.destination}`,
        budget: "Tiết kiệm",
        estimatedCost: formatCurrencyRange(
          formData.duration * 800000,
          formData.duration * 1200000
        ),
        itinerary: Array.from(
          { length: Math.min(formData.duration, 2) },
          (_, i) => ({
            day: i + 1,
            title: `Ngày ${i + 1}: Khám phá cơ bản`,
            activities: [
              "Tham quan điểm nổi bật",
              "Ăn trưa tại quán địa phương",
              "Tham quan thêm 1-2 địa điểm",
            ],
          })
        ),
        note: "Gói miễn phí chỉ hiển thị 2 ngày đầu tiên",
      },
      // PREMIUM PLANS (3 options)
      premiumPlans: [
        {
          id: 1,
          name: "Tiết kiệm",
          budget: formatCurrencyRange(
            formData.duration * 800000,
            formData.duration * 1200000
          ),
          badge: "💰",
          color: "from-green-400 to-green-600",
          itinerary: Array.from({ length: formData.duration }, (_, i) => ({
            day: i + 1,
            title: `Ngày ${i + 1}: ${
              i === 0
                ? "Khám phá trung tâm"
                : i === formData.duration - 1
                ? "Kết thúc hành trình"
                : "Tiếp tục khám phá"
            }`,
            activities: [
              "Tham quan điểm du lịch miễn phí/giá rẻ",
              "Ăn trưa tại quán ăn bình dân",
              "Di chuyển bằng phương tiện công cộng",
              "Check-in khách sạn 2-3 sao",
            ],
            meals: [
              "Sáng: Phở/Bánh mì",
              "Trưa: Cơm bình dân",
              "Tối: Món địa phương",
            ],
            accommodation: "Khách sạn 2-3 sao hoặc Hostel",
            restaurants: getRestaurantsByDestination(destination, "budget"),
            hotels: getHotelsByDestination(destination, "budget"),
            dayBudget: formatCurrencyRange(800000, 1200000),
          })),
          tips: [
            "Đặt phòng trước để có giá tốt",
            "Ăn tại quán địa phương",
            "Sử dụng xe bus/xe máy thuê",
          ],
        },
        {
          id: 2,
          name: "Cân bằng",
          budget: formatCurrencyRange(
            formData.duration * 1500000,
            formData.duration * 2500000
          ),
          badge: "✨",
          color: "from-blue-400 to-blue-600",
          recommended: true,
          itinerary: Array.from({ length: formData.duration }, (_, i) => ({
            day: i + 1,
            title: `Ngày ${i + 1}: ${
              i === 0
                ? "Khám phá văn hóa"
                : i === formData.duration - 1
                ? "Trải nghiệm đặc sắc"
                : "Thư giãn và tham quan"
            }`,
            activities: [
              "Tham quan điểm đến nổi tiếng",
              "Ăn trưa tại nhà hàng chất lượng",
              "Trải nghiệm hoạt động đặc trưng",
              "Nghỉ ngơi tại khách sạn tiện nghi",
              "Thưởng thức món ăn đặc sản buổi tối",
            ],
            meals: [
              "Sáng: Buffet khách sạn",
              "Trưa: Nhà hàng",
              "Tối: Đặc sản vùng",
            ],
            accommodation: "Khách sạn 3-4 sao trung tâm",
            restaurants: getRestaurantsByDestination(destination, "balanced"),
            hotels: getHotelsByDestination(destination, "balanced"),
            dayBudget: formatCurrencyRange(1500000, 2500000),
          })),
          tips: [
            "Kết hợp tham quan và nghỉ ngơi",
            "Đặt tour trọn gói tiết kiệm thời gian",
            "Thử món ăn đặc sản địa phương",
          ],
        },
        {
          id: 3,
          name: "Cao cấp",
          budget: formatCurrencyRange(
            formData.duration * 3000000,
            formData.duration * 5000000
          ),
          badge: "👑",
          color: "from-purple-400 to-purple-600",
          itinerary: Array.from({ length: formData.duration }, (_, i) => ({
            day: i + 1,
            title: `Ngày ${i + 1}: ${
              i === 0
                ? "Trải nghiệm VIP"
                : i === formData.duration - 1
                ? "Kết thúc sang trọng"
                : "Nghỉ dưỡng đẳng cấp"
            }`,
            activities: [
              "Di chuyển bằng xe riêng sang trọng",
              "Tham quan với hướng dẫn viên riêng",
              "Ăn trưa tại nhà hàng cao cấp",
              "Spa & massage thư giãn",
              "Dinner tại nhà hàng view đẹp",
              "Nghỉ dưỡng resort 5 sao",
            ],
            meals: [
              "Sáng: Fine dining",
              "Trưa: Nhà hàng cao cấp",
              "Tối: Ẩm thực đặc biệt",
            ],
            accommodation: "Resort/Khách sạn 5 sao",
            restaurants: getRestaurantsByDestination(destination, "premium"),
            hotels: getHotelsByDestination(destination, "premium"),
            dayBudget: formatCurrencyRange(3000000, 5000000),
          })),
          tips: [
            "Dịch vụ concierge 24/7",
            "Xe riêng đưa đón sân bay",
            "Trải nghiệm độc quyền VIP",
          ],
        },
      ],
    });

    setIsGenerating(false);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-display font-bold text-gray-900 mb-3">
                Bạn muốn đi đâu?
              </h2>
              <p className="text-gray-600">
                Hãy cho chúng tôi biết về chuyến đi trong mơ của bạn
              </p>
            </div>

            {/* Destination Dropdown */}
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-4">
                Điểm đến mong muốn
              </label>
              <select
                value={formData.destination}
                onChange={(e) =>
                  handleInputChange("destination", e.target.value)
                }
                className="w-full p-4 text-lg border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none transition-colors bg-white"
              >
                <option value="">Chọn điểm đến...</option>
                <option value="hanoi">🏛️ Hà Nội</option>
                <option value="halong">⛵ Hạ Long</option>
                <option value="sapa">🏔️ Sapa</option>
                <option value="hue">🏯 Huế</option>
                <option value="hoian">🏮 Hội An</option>
                <option value="danang">🌉 Đà Nẵng</option>
                <option value="nhatrang">🏖️ Nha Trang</option>
                <option value="dalat">🌸 Đà Lạt</option>
                <option value="hcmc">🏙️ TP. Hồ Chí Minh</option>
                <option value="phuquoc">🏝️ Phú Quốc</option>
                <option value="cantho">🚣 Cần Thơ</option>
                <option value="vungtau">🌊 Vũng Tàu</option>
                <option value="haiphong">⚓ Hải Phòng</option>
                <option value="quyinhon">🏖️ Quy Nhơn</option>
                <option value="mytho">🌴 Mỹ Tho</option>
              </select>
            </div>

            {/* Duration Slider */}
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-4">
                Thời gian du lịch
              </label>
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-600">Số ngày</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-3xl font-bold text-primary-600">
                      {formData.duration}
                    </span>
                    <span className="text-lg text-gray-600">ngày</span>
                  </div>
                </div>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={formData.duration}
                  onChange={(e) =>
                    handleInputChange("duration", parseInt(e.target.value))
                  }
                  className="w-full h-3 bg-white rounded-lg appearance-none cursor-pointer slider"
                  style={{
                    background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${
                      ((formData.duration - 1) / 19) * 100
                    }%, #E5E7EB ${
                      ((formData.duration - 1) / 19) * 100
                    }%, #E5E7EB 100%)`,
                  }}
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>1 ngày</span>
                  <span>20 ngày</span>
                </div>
                <div className="mt-4 text-sm text-gray-600 text-center">
                  {formData.duration <= 2 && "⚡ Chuyến đi ngắn ngày"}
                  {formData.duration >= 3 &&
                    formData.duration <= 5 &&
                    "🏖️ Nghỉ cuối tuần dài"}
                  {formData.duration >= 6 &&
                    formData.duration <= 10 &&
                    "✨ Kỳ nghỉ lý tưởng"}
                  {formData.duration >= 11 &&
                    formData.duration <= 15 &&
                    "🌍 Khám phá sâu"}
                  {formData.duration >= 16 && "🚀 Hành trình dài ngày"}
                </div>
              </div>
            </div>

            {/* Group Size */}
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-4">
                Số lượng người
              </label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {[
                  { value: "1", label: "1 người", icon: "👤" },
                  { value: "2", label: "2 người", icon: "👫" },
                  { value: "3-4", label: "3-4 người", icon: "👨‍👩‍👦" },
                  { value: "5-8", label: "5-8 người", icon: "👨‍👩‍👧‍👦" },
                  { value: "9+", label: "Trên 9 người", icon: "👥" },
                ].map((size) => (
                  <button
                    key={size.value}
                    type="button"
                    onClick={() => handleInputChange("groupSize", size.value)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 text-center ${
                      formData.groupSize === size.value
                        ? "border-primary-500 bg-primary-50 text-primary-700"
                        : "border-gray-200 hover:border-primary-300 hover:bg-gray-50"
                    }`}
                  >
                    <div className="text-2xl mb-2">{size.icon}</div>
                    <div className="font-medium text-sm">{size.label}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-display font-bold text-gray-900 mb-3">
                Bạn thích gì?
              </h2>
              <p className="text-gray-600">
                Hãy chia sẻ sở thích để chúng tôi tạo kế hoạch phù hợp nhất
              </p>
            </div>

            {/* Interests */}
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-6">
                Sở thích của bạn{" "}
                <span className="text-sm text-gray-500">(chọn nhiều)</span>
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {interestOptions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => handleInterestToggle(option.id)}
                    className={`p-6 rounded-2xl border-2 transition-all duration-200 transform hover:scale-105 text-center ${
                      formData.interests.includes(option.id)
                        ? "border-primary-500 bg-gradient-to-br from-primary-50 to-accent-50 text-primary-700 shadow-lg"
                        : "border-gray-200 hover:border-primary-300 hover:bg-gray-50 hover:shadow-md"
                    }`}
                  >
                    <i
                      className={`${option.icon} text-3xl mb-3 block ${
                        formData.interests.includes(option.id)
                          ? "text-primary-600"
                          : "text-gray-500"
                      }`}
                    ></i>
                    <span className="text-sm font-semibold">
                      {option.label}
                    </span>
                    {formData.interests.includes(option.id) && (
                      <div className="absolute top-2 right-2 w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center">
                        <i className="fas fa-check text-white text-xs"></i>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Travel Style */}
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-6">
                Phong cách du lịch
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  {
                    value: "budget",
                    label: "Tiết kiệm",
                    desc: "Tối ưu chi phí",
                    icon: "💰",
                    color: "from-green-400 to-green-600",
                  },
                  {
                    value: "comfort",
                    label: "Thoải mái",
                    desc: "Cân bằng giá và chất lượng",
                    icon: "✨",
                    color: "from-blue-400 to-blue-600",
                  },
                  {
                    value: "luxury",
                    label: "Sang trọng",
                    desc: "Trải nghiệm cao cấp",
                    icon: "👑",
                    color: "from-purple-400 to-purple-600",
                  },
                  {
                    value: "adventure",
                    label: "Mạo hiểm",
                    desc: "Thích thú thách",
                    icon: "🏔️",
                    color: "from-orange-400 to-orange-600",
                  },
                  {
                    value: "cultural",
                    label: "Văn hóa",
                    desc: "Khám phá lịch sử",
                    icon: "🏛️",
                    color: "from-red-400 to-red-600",
                  },
                  {
                    value: "relax",
                    label: "Thư giãn",
                    desc: "Nghỉ ngơi, tái tạo",
                    icon: "🧘",
                    color: "from-teal-400 to-teal-600",
                  },
                ].map((style) => (
                  <button
                    key={style.value}
                    type="button"
                    onClick={() =>
                      handleInputChange("travelStyle", style.value)
                    }
                    className={`p-6 rounded-2xl border-2 transition-all duration-200 transform hover:scale-105 ${
                      formData.travelStyle === style.value
                        ? "border-primary-500 bg-primary-50 shadow-lg"
                        : "border-gray-200 hover:border-primary-300 hover:shadow-md"
                    }`}
                  >
                    <div
                      className={`w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-r ${style.color} flex items-center justify-center text-white text-xl`}
                    >
                      {style.icon}
                    </div>
                    <div className="font-semibold text-gray-900 mb-2">
                      {style.label}
                    </div>
                    <div className="text-sm text-gray-500">{style.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Accommodation and Transportation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-4">
                  Loại hình lưu trú
                </label>
                <div className="space-y-3">
                  {[
                    {
                      value: "hostel",
                      label: "Hostel",
                      desc: "Giá rẻ, gặp gỡ bạn bè",
                      icon: "🏠",
                    },
                    {
                      value: "hotel",
                      label: "Khách sạn",
                      desc: "Tiện nghi đầy đủ",
                      icon: "🏨",
                    },
                    {
                      value: "resort",
                      label: "Resort",
                      desc: "Nghỉ dưỡng cao cấp",
                      icon: "🏖️",
                    },
                    {
                      value: "homestay",
                      label: "Homestay",
                      desc: "Trải nghiệm địa phương",
                      icon: "🏡",
                    },
                    {
                      value: "villa",
                      label: "Villa",
                      desc: "Riêng tư, sang trọng",
                      icon: "🏘️",
                    },
                  ].map((acc) => (
                    <button
                      key={acc.value}
                      type="button"
                      onClick={() =>
                        handleInputChange("accommodation", acc.value)
                      }
                      className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 flex items-center ${
                        formData.accommodation === acc.value
                          ? "border-primary-500 bg-primary-50 text-primary-700"
                          : "border-gray-200 hover:border-primary-300 hover:bg-gray-50"
                      }`}
                    >
                      <span className="text-2xl mr-4">{acc.icon}</span>
                      <div>
                        <div className="font-semibold">{acc.label}</div>
                        <div className="text-sm text-gray-500">{acc.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-4">
                  Phương tiện di chuyển
                </label>
                <div className="space-y-3">
                  {[
                    {
                      value: "bus",
                      label: "Xe khách",
                      desc: "Tiết kiệm, phổ biến",
                      icon: "🚌",
                    },
                    {
                      value: "train",
                      label: "Tàu hỏa",
                      desc: "Thoải mái, ngắm cảnh",
                      icon: "🚂",
                    },
                    {
                      value: "plane",
                      label: "Máy bay",
                      desc: "Nhanh chóng, thuận tiện",
                      icon: "✈️",
                    },
                    {
                      value: "car",
                      label: "Ô tô riêng",
                      desc: "Tự do, linh hoạt",
                      icon: "🚗",
                    },
                    {
                      value: "motorbike",
                      label: "Xe máy",
                      desc: "Phiêu lưu, khám phá",
                      icon: "🏍️",
                    },
                  ].map((trans) => (
                    <button
                      key={trans.value}
                      type="button"
                      onClick={() =>
                        handleInputChange("transportation", trans.value)
                      }
                      className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 flex items-center ${
                        formData.transportation === trans.value
                          ? "border-primary-500 bg-primary-50 text-primary-700"
                          : "border-gray-200 hover:border-primary-300 hover:bg-gray-50"
                      }`}
                    >
                      <span className="text-2xl mr-4">{trans.icon}</span>
                      <div>
                        <div className="font-semibold">{trans.label}</div>
                        <div className="text-sm text-gray-500">
                          {trans.desc}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-display font-bold text-gray-900 mb-3">
                Hoàn thiện kế hoạch
              </h2>
              <p className="text-gray-600">
                Một vài chi tiết cuối để tạo ra kế hoạch hoàn hảo cho bạn
              </p>
            </div>

            {/* Activities */}
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-6">
                Hoạt động yêu thích{" "}
                <span className="text-sm text-gray-500">(chọn nhiều)</span>
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {activityOptions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => handleActivityToggle(option.id)}
                    className={`p-6 rounded-2xl border-2 transition-all duration-200 transform hover:scale-105 text-center relative ${
                      formData.activities.includes(option.id)
                        ? "border-primary-500 bg-gradient-to-br from-primary-50 to-accent-50 text-primary-700 shadow-lg"
                        : "border-gray-200 hover:border-primary-300 hover:bg-gray-50 hover:shadow-md"
                    }`}
                  >
                    <i
                      className={`${option.icon} text-2xl mb-3 block ${
                        formData.activities.includes(option.id)
                          ? "text-primary-600"
                          : "text-gray-500"
                      }`}
                    ></i>
                    <span className="text-sm font-semibold">
                      {option.label}
                    </span>
                    {formData.activities.includes(option.id) && (
                      <div className="absolute top-2 right-2 w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center">
                        <i className="fas fa-check text-white text-xs"></i>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Special Requirements */}
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-4">
                Yêu cầu đặc biệt
              </label>
              <div className="bg-gray-50 rounded-2xl p-6">
                <textarea
                  value={formData.specialRequirements}
                  onChange={(e) =>
                    handleInputChange("specialRequirements", e.target.value)
                  }
                  placeholder="Ví dụ: Ăn chay, khuyết tật, dị ứng thức ăn, cần phòng không hút thuốc, muốn có hướng dẫn viên nói tiếng Anh..."
                  className="w-full bg-white border-2 border-gray-200 rounded-xl p-4 focus:border-primary-500 focus:outline-none transition-colors duration-200 resize-none"
                  rows={4}
                />
                <div className="flex items-center mt-4 text-sm text-gray-500">
                  <i className="fas fa-info-circle mr-2"></i>
                  Những thông tin này giúp chúng tôi tạo kế hoạch phù hợp nhất
                  với bạn
                </div>
              </div>
            </div>

            {/* Summary Preview */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <i className="fas fa-eye text-primary-600 mr-2"></i>
                Xem trước kế hoạch
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
                <div className="bg-white rounded-xl p-4">
                  <div className="text-2xl mb-2">📍</div>
                  <div className="font-semibold text-gray-900">
                    {formData.destination
                      ? formData.destination.charAt(0).toUpperCase() +
                        formData.destination.slice(1)
                      : "Chưa chọn"}
                  </div>
                  <div className="text-xs text-gray-500">Điểm đến</div>
                </div>
                <div className="bg-white rounded-xl p-4">
                  <div className="text-2xl mb-2">⏰</div>
                  <div className="font-semibold text-gray-900">
                    {formData.duration} ngày
                  </div>
                  <div className="text-xs text-gray-500">Thời gian</div>
                </div>
                <div className="bg-white rounded-xl p-4">
                  <div className="text-2xl mb-2">❤️</div>
                  <div className="font-semibold text-gray-900">
                    {formData.interests.length} sở thích
                  </div>
                  <div className="text-xs text-gray-500">Đã chọn</div>
                </div>
              </div>
              {formData.destination &&
                formData.duration &&
                formData.interests.length > 0 && (
                  <div className="mt-4 p-4 bg-green-100 rounded-xl flex items-center justify-center text-green-700">
                    <i className="fas fa-check-circle mr-2"></i>
                    <span className="font-medium">
                      Sẵn sàng tạo kế hoạch AI!
                    </span>
                  </div>
                )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (generatedPlan) {
    // Set default premium plan if not set
    if (!selectedPremiumPlan && generatedPlan.premiumPlans) {
      setSelectedPremiumPlan(generatedPlan.premiumPlans[1]); // Default to "Cân bằng"
    }

    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          {/* Clean Header */}
          <div class="text-center mb-12">
            <div class="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl flex items-center justify-center">
              <i class="fas fa-check text-white text-3xl"></i>
            </div>
            <h1 class="text-4xl font-display font-bold text-gray-900 mb-4">
              Kế hoạch du lịch đã sẵn sàng!
            </h1>
            <p class="text-xl text-gray-600">
              AI đã tạo ra kế hoạch du lịch hoàn hảo dành riêng cho bạn
            </p>
          </div>

          {/* Mode Selector */}
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-xl shadow-md p-1.5 inline-flex gap-1">
              <button
                onClick={() => setUserMode("free")}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  userMode === "free"
                    ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-md"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <i className="fas fa-gift mr-2"></i>
                Free Mode
              </button>
              <button
                onClick={() => setUserMode("premium")}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  userMode === "premium"
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <i className="fas fa-crown mr-2"></i>
                Premium Mode
              </button>
            </div>
          </div>

          {/* Mode Description */}
          <div className="text-center mb-8">
            {userMode === "free" ? (
              <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-lg">
                <i className="fas fa-info-circle"></i>
                <span className="text-sm">Xem 1 kế hoạch miễn phí</span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-700 px-4 py-2 rounded-lg">
                <i className="fas fa-star"></i>
                <span className="text-sm">Truy cập tất cả 3 kế hoạch</span>
              </div>
            )}
          </div>

          {/* 3-Column Plans Grid - Travel Themed */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {generatedPlan.premiumPlans.map((plan, index) => {
              // Logic: Free mode -> chỉ unlock plan đầu, Premium mode -> unlock tất cả
              const isLocked = userMode === "free" ? index !== 0 : false;

              // Travel background images for each plan
              const travelBackgrounds = [
                "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80", // Beach/Budget
                "https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=800&q=80", // City/Balanced
                "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80", // Luxury Beach
              ];

              return (
                <div
                  key={plan.id}
                  className={`relative bg-white rounded-xl overflow-hidden transition-all min-h-[580px] flex flex-col ${
                    isLocked
                      ? "shadow-md hover:shadow-lg"
                      : index === 0
                      ? "shadow-lg hover:shadow-xl ring-2 ring-green-500"
                      : index === 1
                      ? "shadow-lg hover:shadow-xl ring-2 ring-orange-400"
                      : "shadow-lg hover:shadow-xl ring-2 ring-purple-500"
                  }`}
                >
                  {/* Badge */}
                  {!isLocked && index === 0 && (
                    <div className="absolute top-4 left-4 z-20 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                      <i className="fas fa-unlock mr-1"></i>
                      Đã mở
                    </div>
                  )}
                  {!isLocked && index === 1 && (
                    <div className="absolute top-4 left-4 z-20 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                      ⭐ Phổ biến
                    </div>
                  )}
                  {!isLocked && index === 2 && userMode === "premium" && (
                    <div className="absolute top-4 left-4 z-20 bg-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                      <i className="fas fa-gem mr-1"></i>
                      Premium
                    </div>
                  )}

                  {/* Header with Travel Background */}
                  <div className="relative px-6 py-8 text-center overflow-hidden group">
                    {/* Background Image */}
                    {!isLocked ? (
                      <>
                        <div
                          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                          style={{
                            backgroundImage: `url(${travelBackgrounds[index]})`,
                          }}
                        />
                        {/* Animated Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/40 to-black/50 transition-opacity duration-500 group-hover:opacity-75"></div>

                        {/* Animated Color Overlay based on plan */}
                        <div
                          className={`absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500 ${
                            index === 0
                              ? "bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600"
                              : index === 1
                              ? "bg-gradient-to-br from-orange-600 via-amber-600 to-yellow-600"
                              : "bg-gradient-to-br from-purple-600 via-pink-600 to-rose-600"
                          }`}
                        ></div>
                      </>
                    ) : (
                      <>
                        <div className="absolute inset-0 bg-gray-100"></div>
                        {/* Subtle animated gradient for locked cards */}
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 animate-pulse opacity-50"></div>
                      </>
                    )}

                    {/* Content */}
                    <div className="relative z-10">
                      <div
                        className={`text-5xl mb-3 ${
                          !isLocked && "drop-shadow-lg"
                        }`}
                      >
                        {plan.badge}
                      </div>
                      <h3
                        className={`text-xl font-bold mb-2 ${
                          isLocked
                            ? "text-gray-900"
                            : "text-white drop-shadow-md"
                        }`}
                      >
                        {plan.name}
                      </h3>
                      <div
                        className={`text-sm sm:text-base font-semibold leading-tight ${
                          isLocked
                            ? "text-gray-700"
                            : "text-white drop-shadow-md"
                        }`}
                      >
                        {plan.budget}
                      </div>
                    </div>
                  </div>

                  {/* Body - Clean & Simple */}
                  <div className="p-6 flex-1 flex flex-col relative">
                    {/* Animated background gradient for body */}
                    {!isLocked && (
                      <div
                        className={`absolute inset-0 opacity-0 hover:opacity-5 transition-opacity duration-500 rounded-lg ${
                          index === 0
                            ? "bg-gradient-to-br from-green-100 to-emerald-100"
                            : index === 1
                            ? "bg-gradient-to-br from-orange-100 to-amber-100"
                            : "bg-gradient-to-br from-purple-100 to-pink-100"
                        }`}
                      ></div>
                    )}

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-6 relative z-10">
                      <div
                        className={`text-center p-4 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-md ${
                          !isLocked
                            ? index === 0
                              ? "bg-gradient-to-br from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100"
                              : index === 1
                              ? "bg-gradient-to-br from-orange-50 to-amber-50 hover:from-orange-100 hover:to-amber-100"
                              : "bg-gradient-to-br from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100"
                            : "bg-gray-50"
                        }`}
                      >
                        <div className="text-2xl font-bold text-gray-900 mb-1">
                          {plan.itinerary.length}
                        </div>
                        <div className="text-xs text-gray-600">Ngày</div>
                      </div>
                      <div
                        className={`text-center p-4 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-md ${
                          !isLocked
                            ? index === 0
                              ? "bg-gradient-to-br from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100"
                              : index === 1
                              ? "bg-gradient-to-br from-orange-50 to-amber-50 hover:from-orange-100 hover:to-amber-100"
                              : "bg-gradient-to-br from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100"
                            : "bg-gray-50"
                        }`}
                      >
                        <div className="text-2xl font-bold text-gray-900 mb-1">
                          {plan.itinerary.reduce(
                            (sum, day) => sum + day.activities.length,
                            0
                          )}
                        </div>
                        <div className="text-xs text-gray-600">Điểm đến</div>
                      </div>
                    </div>

                    {/* Key Features */}
                    <div className="space-y-3 mb-6 flex-1 relative z-10">
                      <div className="flex items-center gap-3 text-sm text-gray-700 group/feature hover:translate-x-1 transition-transform duration-200">
                        <i
                          className={`fas fa-check-circle transition-colors duration-200 ${
                            !isLocked
                              ? index === 0
                                ? "text-green-500 group-hover/feature:text-green-600"
                                : index === 1
                                ? "text-orange-500 group-hover/feature:text-orange-600"
                                : "text-purple-500 group-hover/feature:text-purple-600"
                              : "text-gray-400"
                          }`}
                        ></i>
                        <span>
                          {index === 0
                            ? "Lịch trình cơ bản, phù hợp du lịch tiết kiệm"
                            : index === 1
                            ? "Cân bằng chi phí và trải nghiệm tốt"
                            : "Dịch vụ cao cấp, trải nghiệm sang trọng"}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-700 group/feature hover:translate-x-1 transition-transform duration-200">
                        <i
                          className={`fas fa-check-circle transition-colors duration-200 ${
                            !isLocked
                              ? index === 0
                                ? "text-green-500 group-hover/feature:text-green-600"
                                : index === 1
                                ? "text-orange-500 group-hover/feature:text-orange-600"
                                : "text-purple-500 group-hover/feature:text-purple-600"
                              : "text-gray-400"
                          }`}
                        ></i>
                        <span>
                          {index === 0
                            ? "Gợi ý địa điểm và nhà hàng bình dân"
                            : index === 1
                            ? "Hướng dẫn chi tiết, địa điểm nổi tiếng"
                            : "Tư vấn riêng, địa điểm độc quyền"}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-700 group/feature hover:translate-x-1 transition-transform duration-200">
                        <i
                          className={`fas fa-check-circle transition-colors duration-200 ${
                            !isLocked
                              ? index === 0
                                ? "text-green-500 group-hover/feature:text-green-600"
                                : index === 1
                                ? "text-orange-500 group-hover/feature:text-orange-600"
                                : "text-purple-500 group-hover/feature:text-purple-600"
                              : "text-gray-400"
                          }`}
                        ></i>
                        <span>
                          {index === 0
                            ? "Lưu kế hoạch, chia sẻ với bạn bè"
                            : index === 1
                            ? "Tải PDF, hỗ trợ offline, maps"
                            : "Hỗ trợ 24/7, concierge service"}
                        </span>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <button
                      onClick={() => {
                        setModalPlan(plan);
                        setShowDetailModal(true);
                      }}
                      className={`relative overflow-hidden w-full py-3 rounded-lg font-semibold transition-all duration-300 group/btn ${
                        isLocked
                          ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                          : index === 0
                          ? "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-md hover:shadow-xl hover:scale-105"
                          : index === 1
                          ? "bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white shadow-md hover:shadow-xl hover:scale-105"
                          : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-md hover:shadow-xl hover:scale-105"
                      }`}
                    >
                      {!isLocked && (
                        <span className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></span>
                      )}
                      <span className="relative flex items-center justify-center gap-2">
                        Xem chi tiết
                        {!isLocked && (
                          <i className="fas fa-arrow-right group-hover/btn:translate-x-1 transition-transform duration-200"></i>
                        )}
                      </span>
                    </button>
                  </div>

                  {/* Lock Overlay - Full Card Coverage */}
                  {isLocked && (
                    <div className="absolute inset-0 backdrop-blur-md flex items-center justify-center z-30 rounded-xl">
                      <div className="bg-white rounded-2xl shadow-2xl p-8 text-center max-w-xs border-2 border-purple-300">
                        <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                          <i className="fas fa-lock text-3xl text-white"></i>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          Kế hoạch bị khóa
                        </h3>
                        <p className="text-sm text-gray-600 mb-5 leading-relaxed">
                          {userMode === "free"
                            ? "Chuyển sang Premium Mode để xem tất cả các kế hoạch"
                            : "Nâng cấp để mở khóa và xem chi tiết kế hoạch này"}
                        </p>
                        <button
                          onClick={() =>
                            userMode === "free" ? setUserMode("premium") : null
                          }
                          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3.5 rounded-lg transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                        >
                          <i className="fas fa-crown mr-2"></i>
                          {userMode === "free"
                            ? "Chuyển Premium Mode"
                            : "Nâng cấp ngay"}
                        </button>
                        {userMode === "premium" && (
                          <p className="text-xs text-gray-500 mt-4">
                            Chỉ từ{" "}
                            <span className="font-bold text-purple-600">
                              99.000đ
                            </span>
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Detail Modal */}
          {showDetailModal && modalPlan && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
              <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden animate-slideUp">
                {/* Modal Header with Travel Background */}
                <div className="relative p-6 text-white overflow-hidden">
                  {/* Background Image - same as card */}
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage:
                        modalPlan.id === "budget"
                          ? "url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80')"
                          : modalPlan.id === "balanced"
                          ? "url('https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=800&q=80')"
                          : "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80')",
                    }}
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/60"></div>

                  <div className="relative flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-5xl drop-shadow-lg">
                          {modalPlan.badge}
                        </span>
                        <div>
                          <h2 className="text-3xl font-display font-bold text-white drop-shadow-md">
                            {modalPlan.name}
                          </h2>
                          {modalPlan.recommended && (
                            <span className="inline-block mt-2 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold text-white">
                              ⭐ Gói đề xuất
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-4xl font-bold drop-shadow-md">
                          {modalPlan.budget}
                        </span>
                        <span className="text-white/90">/người</span>
                      </div>
                      <p className="text-white/90 drop-shadow">
                        Cho chuyến đi {generatedPlan.duration} ngày tại{" "}
                        {generatedPlan.destination}
                      </p>
                    </div>
                    <button
                      onClick={() => setShowDetailModal(false)}
                      className="flex items-center justify-center w-10 h-10 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full transition-colors"
                    >
                      <i className="fas fa-times text-xl"></i>
                    </button>
                  </div>
                </div>

                {/* Modal Body */}
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)] scrollbar-thin scrollbar-webkit scrollbar-thumb-purple-400 scrollbar-track-gray-100">
                  {/* Action Buttons - Only for Premium Mode */}
                  {userMode === "premium" ? (
                    <div className="grid grid-cols-3 gap-3 mb-6">
                      <button className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg transition-all">
                        <i className="fas fa-save"></i>
                        <span>Lưu kế hoạch</span>
                      </button>
                      <button className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-xl font-medium hover:shadow-lg transition-all">
                        <i className="fas fa-file-pdf"></i>
                        <span>Tải PDF</span>
                      </button>
                      <button className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-medium hover:shadow-lg transition-all">
                        <i className="fas fa-share-alt"></i>
                        <span>Chia sẻ</span>
                      </button>
                    </div>
                  ) : (
                    <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl p-4 mb-6">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center">
                          <i className="fas fa-crown text-white"></i>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900 mb-1">
                            Nâng cấp để sử dụng đầy đủ tính năng
                          </h4>
                          <p className="text-sm text-gray-600 mb-3">
                            Lưu kế hoạch, tải PDF và chia sẻ chỉ dành cho
                            Premium Mode
                          </p>
                          <button
                            onClick={() => setUserMode("premium")}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg transition-all shadow-md hover:shadow-lg text-sm"
                          >
                            <i className="fas fa-arrow-right"></i>
                            Chuyển sang Premium Mode
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Itinerary Timeline */}
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <i className="fas fa-route text-purple-600"></i>
                      Lịch trình chi tiết
                    </h3>
                    <div className="space-y-4">
                      {modalPlan.itinerary.map((day, index) => (
                        <div
                          key={index}
                          className="relative border-l-4 border-blue-500 rounded-r-xl overflow-hidden hover:shadow-lg transition-all"
                        >
                          {/* Mini travel background for each day */}
                          <div className="absolute inset-0 opacity-5">
                            <div
                              className="h-full bg-cover bg-center"
                              style={{
                                backgroundImage:
                                  index % 3 === 0
                                    ? "url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&q=80')" // Sunset/Travel
                                    : index % 3 === 1
                                    ? "url('https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&q=80')" // Mountains
                                    : "url('https://images.unsplash.com/photo-1504150558240-0b4fd8946624?w=400&q=80')", // Beach/Palm
                              }}
                            />
                          </div>

                          <div className="relative bg-white/80 backdrop-blur-sm p-5">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex items-center gap-3">
                                <span className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-600 text-white rounded-xl text-lg font-bold shadow-md">
                                  {day.day}
                                </span>
                                <div>
                                  <h4 className="text-lg font-bold text-gray-900">
                                    {day.title}
                                  </h4>
                                </div>
                              </div>
                            </div>

                            {/* Budget Breakdown */}
                            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-4 mb-4">
                              <h5 className="font-bold text-gray-900 mb-3 flex items-center gap-2 text-sm sm:text-base">
                                <i className="fas fa-wallet text-blue-600"></i>
                                <span className="leading-tight">
                                  Chi phí dự kiến: {day.budget}
                                </span>
                              </h5>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                <div className="bg-white rounded-lg p-3 text-center shadow-sm">
                                  <i className="fas fa-utensils text-orange-500 text-lg mb-1"></i>
                                  <div className="text-xs text-gray-600 mb-1">
                                    Ăn uống
                                  </div>
                                  <div className="font-semibold text-gray-900 text-xs leading-tight break-words">
                                    {modalPlan.id === "budget"
                                      ? formatCurrencyRange(150000, 250000)
                                      : modalPlan.id === "balanced"
                                      ? formatCurrencyRange(300000, 500000)
                                      : formatCurrencyRange(500000, 800000)}
                                  </div>
                                </div>
                                <div className="bg-white rounded-lg p-3 text-center shadow-sm">
                                  <i className="fas fa-map-marked-alt text-purple-500 text-lg mb-1"></i>
                                  <div className="text-xs text-gray-600 mb-1">
                                    Tham quan
                                  </div>
                                  <div className="font-semibold text-gray-900 text-xs leading-tight break-words">
                                    {modalPlan.id === "budget"
                                      ? formatCurrencyRange(100000, 200000)
                                      : modalPlan.id === "balanced"
                                      ? formatCurrencyRange(200000, 400000)
                                      : formatCurrencyRange(400000, 700000)}
                                  </div>
                                </div>
                                <div className="bg-white rounded-lg p-3 text-center shadow-sm">
                                  <i className="fas fa-car text-green-500 text-lg mb-1"></i>
                                  <div className="text-xs text-gray-600 mb-1">
                                    Di chuyển
                                  </div>
                                  <div className="font-semibold text-gray-900 text-xs leading-tight break-words">
                                    {modalPlan.id === "budget"
                                      ? formatCurrencyRange(50000, 100000)
                                      : modalPlan.id === "balanced"
                                      ? formatCurrencyRange(100000, 200000)
                                      : formatCurrencyRange(200000, 400000)}
                                  </div>
                                </div>
                                <div className="bg-white rounded-lg p-3 text-center shadow-sm">
                                  <i className="fas fa-bed text-pink-500 text-lg mb-1"></i>
                                  <div className="text-xs text-gray-600 mb-1">
                                    Lưu trú
                                  </div>
                                  <div className="font-semibold text-gray-900 text-xs leading-tight break-words">
                                    {modalPlan.id === "budget"
                                      ? formatCurrencyRange(200000, 350000)
                                      : modalPlan.id === "balanced"
                                      ? formatCurrencyRange(400000, 700000)
                                      : formatCurrencyRange(800000, 1500000)}
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4 mb-4">
                              <div>
                                <p className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                  <i className="fas fa-map-marked-alt text-purple-600"></i>
                                  Hoạt động trong ngày
                                </p>
                                <ul className="space-y-2">
                                  {day.activities.map((activity, i) => (
                                    <li
                                      key={i}
                                      className="flex items-start gap-2 text-sm text-gray-700"
                                    >
                                      <i className="fas fa-check-circle text-green-500 mt-0.5"></i>
                                      <span>{activity}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              <div>
                                <p className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                  <i className="fas fa-utensils text-orange-600"></i>
                                  Ẩm thực địa phương
                                </p>
                                <ul className="space-y-2">
                                  {day.meals.map((meal, i) => (
                                    <li
                                      key={i}
                                      className="flex items-start gap-2 text-sm text-gray-700"
                                    >
                                      <i className="fas fa-check-circle text-orange-500 mt-0.5"></i>
                                      <span>{meal}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>

                            {/* Restaurant Recommendations */}
                            {day.restaurants && day.restaurants.length > 0 && (
                              <div className="mb-4">
                                <p className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                  <i className="fas fa-concierge-bell text-red-600"></i>
                                  Nhà hàng đề xuất
                                </p>
                                <div className="grid md:grid-cols-3 gap-3">
                                  {day.restaurants.map((restaurant, i) => (
                                    <Link
                                      key={i}
                                      to={
                                        restaurant.slug
                                          ? `/booking/restaurants/${restaurant.slug}`
                                          : "#"
                                      }
                                      className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg p-3 border border-orange-200 hover:shadow-lg hover:scale-105 transition-all cursor-pointer block"
                                    >
                                      <h6 className="font-bold text-gray-900 text-sm mb-1">
                                        {restaurant.name}
                                      </h6>
                                      <p className="text-xs text-gray-600 mb-2">
                                        {restaurant.cuisine}
                                      </p>
                                      <div className="flex items-center justify-between text-xs">
                                        <span className="flex items-center gap-1 text-green-600 font-medium leading-tight break-words">
                                          <i className="fas fa-money-bill-wave flex-shrink-0"></i>
                                          <span className="text-xs">
                                            {restaurant.priceRange}
                                          </span>
                                        </span>
                                        <span className="flex items-center gap-1 text-yellow-600 flex-shrink-0">
                                          <i className="fas fa-star"></i>
                                          {restaurant.rating}
                                        </span>
                                      </div>
                                      <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                                        <i className="fas fa-map-marker-alt"></i>
                                        {restaurant.location}
                                      </p>
                                      <div className="mt-2 text-xs text-blue-600 font-medium flex items-center gap-1">
                                        <span>Xem chi tiết</span>
                                        <i className="fas fa-arrow-right"></i>
                                      </div>
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Hotel Recommendations */}
                            {day.hotels && day.hotels.length > 0 && (
                              <div className="mb-4">
                                <p className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                  <i className="fas fa-hotel text-indigo-600"></i>
                                  Khách sạn đề xuất
                                </p>
                                <div className="grid md:grid-cols-2 gap-3">
                                  {day.hotels.map((hotel, i) => (
                                    <Link
                                      key={i}
                                      to={
                                        hotel.slug
                                          ? `/booking/hotels/${hotel.slug}`
                                          : "#"
                                      }
                                      className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200 hover:shadow-lg hover:scale-105 transition-all cursor-pointer block"
                                    >
                                      <div className="flex items-start justify-between mb-2">
                                        <h6 className="font-bold text-gray-900 text-sm flex-1">
                                          {hotel.name}
                                        </h6>
                                        <span className="text-yellow-500 text-xs flex items-center gap-0.5 ml-2">
                                          {Array.from({
                                            length: hotel.stars,
                                          }).map((_, idx) => (
                                            <i
                                              key={idx}
                                              className="fas fa-star"
                                            ></i>
                                          ))}
                                        </span>
                                      </div>
                                      <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs text-green-600 font-semibold flex items-start gap-1 leading-tight break-words">
                                          <i className="fas fa-tag flex-shrink-0 mt-0.5"></i>
                                          <span>{hotel.pricePerNight}/đêm</span>
                                        </span>
                                        <span className="text-xs text-gray-600 flex items-center gap-1 flex-shrink-0">
                                          <i className="fas fa-star text-yellow-500"></i>
                                          {hotel.rating}
                                        </span>
                                      </div>
                                      <div className="flex flex-wrap gap-1 mb-2">
                                        {hotel.amenities
                                          .slice(0, 3)
                                          .map((amenity, idx) => (
                                            <span
                                              key={idx}
                                              className="text-xs bg-white/70 px-2 py-1 rounded-full text-gray-700"
                                            >
                                              {amenity}
                                            </span>
                                          ))}
                                        {hotel.amenities.length > 3 && (
                                          <span className="text-xs bg-white/70 px-2 py-1 rounded-full text-gray-600">
                                            +{hotel.amenities.length - 3}
                                          </span>
                                        )}
                                      </div>
                                      <div className="text-xs text-blue-600 font-medium flex items-center gap-1">
                                        <span>Xem chi tiết</span>
                                        <i className="fas fa-arrow-right"></i>
                                      </div>
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            )}

                            <div className="pt-3 border-t border-blue-200">
                              <p className="text-sm text-gray-700 flex items-center gap-2">
                                <i className="fas fa-bed text-blue-600"></i>
                                <span className="font-medium">
                                  Nơi lưu trú:
                                </span>
                                <span>{day.accommodation}</span>
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="border-t border-gray-200 p-6 bg-gray-50">
                  <div className="flex gap-3 justify-end">
                    <button
                      onClick={() => setShowDetailModal(false)}
                      className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                    >
                      Đóng
                    </button>
                    <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 shadow-lg transition-all">
                      <i className="fas fa-check mr-2"></i>
                      Chọn gói này
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Bottom Actions */}
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Sẵn sàng cho chuyến đi?
              </h3>
              <p className="text-gray-600">
                Tạo kế hoạch mới hoặc đặt tour ngay hôm nay
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  setGeneratedPlan(null);
                  setSelectedPremiumPlan(null);
                  setCurrentStep(1);
                  setFormData({
                    destination: "",
                    duration: 5,
                    interests: [],
                    groupSize: "",
                    travelStyle: "",
                    accommodation: "",
                    transportation: "",
                    activities: [],
                    specialRequirements: "",
                  });
                }}
                className="group px-8 py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-purple-500 hover:text-purple-600 hover:shadow-lg transition-all transform hover:scale-105"
              >
                <i className="fas fa-redo mr-2 group-hover:rotate-180 transition-transform duration-500"></i>
                Tạo kế hoạch mới
              </button>
              <Link className="group px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:via-pink-700 hover:to-rose-700 shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                <i className="fas fa-calendar-check mr-2"></i>
                Đặt ngay
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div
        className="relative overflow-hidden py-24"
        style={{
          backgroundImage:
            "url('https://media.vov.vn/sites/default/files/styles/large/public/2020-09/99-thuyen_hoa.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block p-4 bg-white/20 backdrop-blur-sm rounded-2xl mb-6">
            <i className="fas fa-magic text-white text-4xl"></i>
          </div>
          <h1 className="text-5xl lg:text-7xl font-display font-bold text-white mb-6 text-shadow-lg">
            AI Trip Planner
          </h1>
          <p className="text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto mb-8 text-shadow">
            Tạo kế hoạch du lịch thông minh trong vài phút với sức mạnh của AI
          </p>
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">1M+</div>
              <div className="text-white/80 text-sm">Kế hoạch tạo</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">50+</div>
              <div className="text-white/80 text-sm">Điểm đến</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">4.9★</div>
              <div className="text-white/80 text-sm">Đánh giá</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">24/7</div>
              <div className="text-white/80 text-sm">Hỗ trợ</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative -mt-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Progress Steps */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 mb-8">
          <div className="flex items-center justify-center mb-8">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                      currentStep >= step.number
                        ? "bg-gradient-to-r from-primary-600 to-accent-600 text-white shadow-lg scale-110"
                        : currentStep === step.number
                        ? "bg-primary-100 text-primary-600 border-2 border-primary-300"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    <i className={`${step.icon} text-lg`}></i>
                  </div>
                  <div className="mt-3 text-center">
                    <div
                      className={`text-sm font-semibold ${
                        currentStep >= step.number
                          ? "text-primary-600"
                          : "text-gray-400"
                      }`}
                    >
                      {step.title}
                    </div>
                    <div className="text-xs text-gray-500 mt-1 max-w-24">
                      {step.description}
                    </div>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className="flex-1 mx-8 mt-8">
                    <div
                      className={`h-1 rounded-full transition-all duration-300 ${
                        currentStep > step.number
                          ? "bg-gradient-to-r from-primary-600 to-accent-600"
                          : "bg-gray-200"
                      }`}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Step Counter */}
          <div className="text-center mb-8">
            <div className="text-sm text-gray-500">
              Bước {currentStep} / {steps.length}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div
                className="bg-gradient-to-r from-primary-600 to-accent-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(currentStep / steps.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Form Content */}
          <div className="min-h-96">{renderStepContent()}</div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-100">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                currentStep === 1
                  ? "text-gray-400 cursor-not-allowed invisible"
                  : "text-gray-600 hover:text-primary-600 hover:bg-primary-50"
              }`}
            >
              <i className="fas fa-arrow-left mr-2"></i>
              Quay lại
            </button>

            <div className="flex space-x-2">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    index + 1 <= currentStep ? "bg-primary-600" : "bg-gray-200"
                  }`}
                />
              ))}
            </div>

            {currentStep < 3 ? (
              <button
                onClick={nextStep}
                className="flex items-center px-8 py-4 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-xl font-semibold hover:from-primary-700 hover:to-accent-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Tiếp theo
                <i className="fas fa-arrow-right ml-2"></i>
              </button>
            ) : (
              <button
                onClick={generatePlan}
                disabled={isGenerating}
                className={`flex items-center px-8 py-4 rounded-xl font-semibold transition-all duration-200 shadow-lg ${
                  isGenerating
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 transform hover:scale-105 shadow-xl hover:shadow-2xl"
                } text-white`}
              >
                {isGenerating ? (
                  <>
                    <i className="fas fa-spinner fa-spin mr-3"></i>
                    Đang tạo kế hoạch...
                  </>
                ) : (
                  <>
                    <i className="fas fa-sparkles mr-3"></i>
                    Tạo kế hoạch AI
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Features */}
        {/* <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
            <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center transform hover:scale-110 transition-transform duration-200">
              <i className="fas fa-brain text-white text-2xl"></i>
            </div>
            <h3 className="text-xl font-display font-bold text-gray-900 mb-4 text-center">
              AI Thông minh
            </h3>
            <p className="text-gray-600 text-center leading-relaxed">
              Sử dụng trí tuệ nhân tạo để phân tích sở thích và tạo lộ trình tối
              ưu cho từng cá nhân
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
            <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl flex items-center justify-center transform hover:scale-110 transition-transform duration-200">
              <i className="fas fa-clock text-white text-2xl"></i>
            </div>
            <h3 className="text-xl font-display font-bold text-gray-900 mb-4 text-center">
              Tiết kiệm thời gian
            </h3>
            <p className="text-gray-600 text-center leading-relaxed">
              Tạo kế hoạch du lịch hoàn chỉnh chỉ trong vài phút thay vì hàng
              giờ nghiên cứu
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
            <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center transform hover:scale-110 transition-transform duration-200">
              <i className="fas fa-user-cog text-white text-2xl"></i>
            </div>
            <h3 className="text-xl font-display font-bold text-gray-900 mb-4 text-center">
              Cá nhân hóa
            </h3>
            <p className="text-gray-600 text-center leading-relaxed">
              Lộ trình được thiết kế riêng theo sở thích, ngân sách và phong
              cách du lịch của bạn
            </p>
          </div>
        </div> */}

        {/* Testimonials */}
        {/* <div className="mt-20 bg-white rounded-3xl p-12 shadow-xl border border-gray-100">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">
              Khách hàng nói gì về chúng tôi
            </h2>
            <p className="text-gray-600">
              Hơn 10,000+ khách hàng đã tin tưởng sử dụng dịch vụ
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <i key={i} className="fas fa-star text-yellow-400"></i>
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">
                "AI Planner đã giúp tôi tạo ra chuyến du lịch Sapa tuyệt vời.
                Mọi thứ được sắp xếp chi tiết và phù hợp với ngân sách."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-primary-600 to-accent-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
                  A
                </div>
                <div>
                  <div className="font-semibold">Nguyễn Văn An</div>
                  <div className="text-sm text-gray-500">Khách hàng VIP</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-6">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <i key={i} className="fas fa-star text-yellow-400"></i>
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">
                "Dịch vụ tuyệt vời! AI hiểu rõ sở thích của tôi và tạo ra kế
                hoạch hoàn hảo cho chuyến đi Phú Quốc."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
                  M
                </div>
                <div>
                  <div className="font-semibold">Trần Thị Mai</div>
                  <div className="text-sm text-gray-500">
                    Du khách thường xuyên
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default AIPlanner;

import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { landmarks } from "../data/landmarks";
import MediaGallery from "../components/MediaGallery";
import VoicePlayer from "../components/VoicePlayer";
import ReviewsList from "../components/ReviewsList";
import FAQList from "../components/FAQList";

const DestinationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // Chỉ lấy từ landmarks
  const loc = landmarks.find((l) => l.id === id);
  const [weather, setWeather] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [attractionsPage, setAttractionsPage] = useState(1);
  const attractionsPerPage = 5;

  // Fetch weather data
  useEffect(() => {
    if (loc?.coordinates) {
      fetchWeatherData(loc.coordinates.lat, loc.coordinates.lng);
    }
  }, [loc]);

  // Reset attractions page when location changes
  useEffect(() => {
    setAttractionsPage(1);
  }, [id]);

  // Reset attractions page when switching to overview tab
  useEffect(() => {
    if (activeTab === "overview") {
      setAttractionsPage(1);
    }
  }, [activeTab]);

  const fetchWeatherData = async (lat, lng) => {
    try {
      setWeatherLoading(true);
      // Using Open-Meteo API (free, no API key required)
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&daily=temperature_2m_max,temperature_2m_min,weathercode,precipitation_probability_max&timezone=Asia/Bangkok&forecast_days=3`
      );
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      console.error("Error fetching weather:", error);
    } finally {
      setWeatherLoading(false);
    }
  };

  const getWeatherIcon = (code) => {
    // WMO Weather interpretation codes
    if (code === 0)
      return { icon: "fa-sun", name: "Nắng đẹp", color: "text-yellow-500" };
    if (code <= 3)
      return { icon: "fa-cloud-sun", name: "Có mây", color: "text-orange-400" };
    if (code <= 48)
      return { icon: "fa-cloud", name: "Nhiều mây", color: "text-skyblue-500" };
    if (code <= 67)
      return { icon: "fa-cloud-rain", name: "Mưa", color: "text-blue-500" };
    if (code <= 77)
      return { icon: "fa-snowflake", name: "Tuyết", color: "text-blue-300" };
    if (code <= 82)
      return {
        icon: "fa-cloud-showers-heavy",
        name: "Mưa to",
        color: "text-blue-600",
      };
    return { icon: "fa-bolt", name: "Dông bão", color: "text-purple-600" };
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const days = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
    return {
      day: days[date.getDay()],
      date: `${date.getDate()}/${date.getMonth() + 1}`,
    };
  };

  if (!loc) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">Không tìm thấy điểm đến</h3>
          <button onClick={() => navigate(-1)} className="btn btn-primary">
            Quay lại
          </button>
        </div>
      </div>
    );
  }

  const mapSrc = `https://www.google.com/maps?q=${loc.coordinates.lat},${loc.coordinates.lng}&hl=vi&z=14&output=embed`;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[400px] overflow-hidden">
        <img
          src={
            loc.images?.[0] ||
            "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1600"
          }
          alt={loc.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto">
            <Link
              to="/destinations"
              className="inline-flex items-center text-white/90 hover:text-white mb-4 transition-colors"
            >
              <i className="fas fa-arrow-left mr-2"></i>
              Quay về danh sách
            </Link>

            <h1 className="text-5xl font-bold text-white mb-4">{loc.name}</h1>

            <div className="flex flex-wrap items-center gap-4 text-white/90">
              <div className="flex items-center">
                <i className="fas fa-map-marker-alt mr-2"></i>
                {loc.region}
              </div>
              <div className="flex items-center">
                <i className="fas fa-tag mr-2"></i>
                {loc.category}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Navigation Tabs */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="flex border-b">
                {[
                  {
                    id: "overview",
                    label: "Tổng quan",
                    icon: "fa-info-circle",
                  },
                  { id: "media", label: "Hình ảnh & Video", icon: "fa-images" },
                  // { id: "reviews", label: "Đánh giá", icon: "fa-star" },
                  { id: "reviews", label: "Chia sẻ", icon: "fa-share-nodes" },
                  { id: "faq", label: "FAQ", icon: "fa-question-circle" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? "bg-primary-50 text-primary-600 border-b-2 border-primary-600"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    <i className={`fas ${tab.icon} mr-2`}></i>
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="p-6">
                {/* Overview Tab */}
                {activeTab === "overview" && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        Giới thiệu
                      </h2>
                      {loc.introduction ? (
                        <div className="text-gray-700 leading-relaxed space-y-4">
                          {loc.introduction
                            .split("\n\n")
                            .map((paragraph, idx) => (
                              <p key={idx} className="text-justify">
                                {paragraph}
                              </p>
                            ))}
                        </div>
                      ) : (
                        <p className="text-gray-700 leading-relaxed mb-4">
                          {loc.description}
                        </p>
                      )}
                    </div>

                    {loc.highlights && loc.highlights.length > 0 && (
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4">
                          Điểm nổi bật
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {loc.highlights.map((highlight, idx) => (
                            <div
                              key={idx}
                              className="flex items-center p-3 bg-primary-50 rounded-lg"
                            >
                              <i className="fas fa-check-circle text-primary-600 mr-3"></i>
                              <span className="text-gray-800">{highlight}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {loc.history && (
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4">
                          Lịch sử & Văn hóa
                        </h3>
                        <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg">
                          {loc.history}
                        </p>
                      </div>
                    )}

                    {/* Attractions - Địa điểm tham quan gợi ý */}
                    {loc.attractions && loc.attractions.length > 0 && (
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-xl font-bold text-gray-900 flex items-center">
                            <i className="fas fa-map-marked-alt text-primary-600 mr-3"></i>
                            Địa điểm tham quan gợi ý
                          </h3>
                          <div className="text-sm text-gray-600">
                            {loc.attractions.length} địa điểm
                          </div>
                        </div>

                        <div className="space-y-4 mb-6">
                          {loc.attractions
                            .slice(
                              (attractionsPage - 1) * attractionsPerPage,
                              attractionsPage * attractionsPerPage
                            )
                            .map((attraction, idx) => {
                              const actualIndex =
                                (attractionsPage - 1) * attractionsPerPage +
                                idx +
                                1;
                              return (
                                <div
                                  key={idx}
                                  className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                                >
                                  <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                                      <span className="text-primary-600 font-bold">
                                        {actualIndex}
                                      </span>
                                    </div>
                                    <div className="flex-1">
                                      <h4 className="font-bold text-gray-900 mb-2">
                                        {attraction.name}
                                      </h4>
                                      <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                                        {attraction.description}
                                      </p>
                                      <div className="flex flex-wrap gap-4 text-sm">
                                        <div className="flex items-center text-gray-500">
                                          <i className="far fa-clock mr-2 text-primary-600"></i>
                                          <span>{attraction.time}</span>
                                        </div>
                                        <div className="flex items-center text-gray-500">
                                          <i className="fas fa-ticket-alt mr-2 text-primary-600"></i>
                                          <span>{attraction.price}</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                        </div>

                        {/* Pagination */}
                        {loc.attractions.length > attractionsPerPage && (
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() =>
                                setAttractionsPage((prev) =>
                                  Math.max(1, prev - 1)
                                )
                              }
                              disabled={attractionsPage === 1}
                              className={`px-4 py-2 rounded-lg border transition-colors ${
                                attractionsPage === 1
                                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                  : "bg-white text-gray-700 hover:bg-primary-50 hover:border-primary-500"
                              }`}
                            >
                              <i className="fas fa-chevron-left mr-2"></i>
                              Trước
                            </button>

                            <div className="flex items-center gap-2">
                              {Array.from(
                                {
                                  length: Math.ceil(
                                    loc.attractions.length / attractionsPerPage
                                  ),
                                },
                                (_, i) => i + 1
                              ).map((pageNum) => (
                                <button
                                  key={pageNum}
                                  onClick={() => setAttractionsPage(pageNum)}
                                  className={`w-10 h-10 rounded-lg border transition-colors ${
                                    attractionsPage === pageNum
                                      ? "bg-primary-600 text-white border-primary-600"
                                      : "bg-white text-gray-700 hover:bg-primary-50 hover:border-primary-500"
                                  }`}
                                >
                                  {pageNum}
                                </button>
                              ))}
                            </div>

                            <button
                              onClick={() =>
                                setAttractionsPage((prev) =>
                                  Math.min(
                                    Math.ceil(
                                      loc.attractions.length /
                                        attractionsPerPage
                                    ),
                                    prev + 1
                                  )
                                )
                              }
                              disabled={
                                attractionsPage ===
                                Math.ceil(
                                  loc.attractions.length / attractionsPerPage
                                )
                              }
                              className={`px-4 py-2 rounded-lg border transition-colors ${
                                attractionsPage ===
                                Math.ceil(
                                  loc.attractions.length / attractionsPerPage
                                )
                                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                  : "bg-white text-gray-700 hover:bg-primary-50 hover:border-primary-500"
                              }`}
                            >
                              Sau
                              <i className="fas fa-chevron-right ml-2"></i>
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* Media Tab */}
                {activeTab === "media" && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      Hình ảnh & Video
                    </h2>
                    <MediaGallery images={loc.images} videos={loc.videos} />
                  </div>
                )}

                {/* Reviews Tab */}
                {activeTab === "reviews" && (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-2xl font-bold text-gray-900">
                        Chia sẻ từ cộng đồng
                      </h2>
                      <div className="text-sm text-gray-600">
                        {loc.reviews?.length || 0} chia sẻ
                      </div>
                    </div>
                    <ReviewsList reviews={loc.reviews} />
                  </div>
                )}

                {/* FAQ Tab */}
                {activeTab === "faq" && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      Câu hỏi thường gặp
                    </h2>
                    <FAQList faqs={loc.faqs} />
                  </div>
                )}
              </div>
            </div>

            {/* Map & Directions */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <i className="fas fa-map-marked-alt text-primary-600 mr-3"></i>
                Bản đồ & Chỉ đường
              </h3>
              <div className="w-full h-80 rounded-lg overflow-hidden mb-4">
                <iframe
                  title={`map-${loc.id}`}
                  src={mapSrc}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${loc.coordinates.lat},${loc.coordinates.lng}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center w-full px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
              >
                <i className="fas fa-directions mr-2"></i>
                Chỉ đường đến đây
              </a>
            </div>
          </div>

          <aside className="space-y-6">
            {/* Voice Player */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h4 className="font-bold text-lg mb-4 flex items-center text-gray-900">
                <i className="fas fa-headphones text-primary-600 mr-2"></i>
                Story Voice
              </h4>
              <div className="mb-3 text-sm text-gray-600">
                <i className="fas fa-info-circle mr-2"></i>
                Nghe câu chuyện về lịch sử và văn hóa của {loc.name}
              </div>
              <div className="mb-3 text-xs text-amber-600 bg-amber-50 px-3 py-2 rounded-lg flex items-center">
                <i className="fas fa-language mr-2"></i>
                <span>
                  Hiện tại tính năng này chỉ hỗ trợ Tiếng Việt và Tiếng Anh
                </span>
              </div>
              <VoicePlayer
                text={
                  loc.audioGuideScript ||
                  `${loc.name}. ${loc.history}. ${loc.description}`
                }
                textEn={
                  loc.audioGuideScriptEn ||
                  `${loc.name}. ${loc.history}. ${loc.description}`
                }
                audioUrl={loc.audioStory}
              />
            </div>

            {/* Weather Widget */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4">
                <h4 className="font-bold text-lg text-white flex items-center">
                  <i className="fas fa-cloud-sun mr-2"></i>
                  Dự báo thời tiết 3 ngày
                </h4>
              </div>

              {weatherLoading ? (
                <div className="text-center py-12">
                  <i className="fas fa-spinner fa-spin text-4xl text-blue-500 mb-3"></i>
                  <p className="text-sm text-gray-600">Đang tải thời tiết...</p>
                </div>
              ) : weather?.daily ? (
                <div className="p-4">
                  <div className="grid grid-cols-1 gap-3">
                    {weather.daily.time.slice(0, 3).map((date, idx) => {
                      const dateInfo = formatDate(date);
                      const weatherInfo = getWeatherIcon(
                        weather.daily.weathercode[idx]
                      );
                      const isToday = idx === 0;

                      return (
                        <div
                          key={idx}
                          className={`relative rounded-lg p-4 transition-all ${
                            isToday
                              ? "bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-300"
                              : "bg-gray-50 hover:bg-gray-100 border border-gray-200"
                          }`}
                        >
                          {/* {isToday && (
                            <div className="absolute top-2 right-2">
                              <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                                Hôm nay
                              </span>
                            </div>
                          )} */}

                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <div
                                className={`font-bold text-lg ${
                                  isToday ? "text-blue-700" : "text-gray-900"
                                }`}
                              >
                                {dateInfo.day}
                              </div>
                              <div className="text-sm text-gray-600">
                                {dateInfo.date}
                              </div>
                            </div>
                            <div className="text-center">
                              <i
                                className={`fas ${weatherInfo.icon} text-4xl ${weatherInfo.color}`}
                              ></i>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="text-sm font-medium text-gray-700">
                              {weatherInfo.name}
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <div className="flex items-center">
                                  <i className="fas fa-temperature-high text-red-500 mr-1"></i>
                                  <span className="font-bold text-gray-900">
                                    {Math.round(
                                      weather.daily.temperature_2m_max[idx]
                                    )}
                                    °
                                  </span>
                                </div>
                                <span className="text-gray-400">|</span>
                                <div className="flex items-center">
                                  <i className="fas fa-temperature-low text-blue-500 mr-1"></i>
                                  <span className="text-gray-700">
                                    {Math.round(
                                      weather.daily.temperature_2m_min[idx]
                                    )}
                                    °
                                  </span>
                                </div>
                              </div>

                              <div className="flex items-center bg-white px-3 py-1 rounded-full">
                                <i className="fas fa-tint text-blue-500 mr-1.5 text-sm"></i>
                                <span className="font-semibold text-gray-700 text-sm">
                                  {
                                    weather.daily.precipitation_probability_max[
                                      idx
                                    ]
                                  }
                                  %
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 px-4">
                  <i className="fas fa-exclamation-triangle text-3xl text-yellow-500 mb-2"></i>
                  <p className="text-sm text-gray-600">
                    Không thể tải dữ liệu thời tiết
                  </p>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h4 className="font-bold text-lg mb-4 text-gray-900">
                Hành động nhanh
              </h4>
              <div className="space-y-3">
                <button className="w-full px-4 py-3 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors font-medium flex items-center justify-center">
                  <i className="fab fa-facebook mr-2"></i>
                  Chia sẻ Facebook
                </button>
                <button className="w-full px-4 py-3 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors font-medium flex items-center justify-center">
                  <i className="fas fa-comment mr-2"></i>
                  Chia sẻ Zalo
                </button>
                <button className="w-full px-4 py-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium flex items-center justify-center">
                  <i className="fas fa-heart mr-2"></i>
                  Lưu vào yêu thích
                </button>
              </div>
            </div>

            {/* Quick Info */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h4 className="font-bold text-lg mb-4 text-gray-900">
                Thông tin nhanh
              </h4>
              <div className="space-y-3">
                <div className="flex items-start">
                  <i className="fas fa-map-marker-alt text-primary-600 mt-1 mr-3"></i>
                  <div>
                    <div className="text-sm text-gray-500">Vị trí</div>
                    <div className="font-medium text-gray-900">
                      {loc.region}
                    </div>
                  </div>
                </div>
                <div className="flex items-start">
                  <i className="fas fa-tag text-primary-600 mt-1 mr-3"></i>
                  <div>
                    <div className="text-sm text-gray-500">Danh mục</div>
                    <div className="font-medium text-gray-900">
                      {loc.category}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetail;

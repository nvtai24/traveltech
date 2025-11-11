import React, { useState, useEffect, useRef } from "react";

const VoicePlayer = ({ text, textEn, audioUrl = null }) => {
  const [playing, setPlaying] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [language, setLanguage] = useState("vi"); // Ngôn ngữ: "vi" hoặc "en"
  const rate = 1.1; // Tốc độ cố định
  const pitch = 1; // Cao độ cố định
  const naturalSpeech = true; // Chế độ nói tự nhiên luôn bật
  const shouldStopRef = useRef(false); // Dùng ref để kiểm tra ngay lập tức
  const timeoutIdsRef = useRef([]); // Lưu trữ timeout IDs để hủy

  // Load available voices
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);

      // Chọn giọng dựa trên ngôn ngữ đã chọn
      selectVoiceByLanguage(language, availableVoices);
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  // Update voice when language changes
  useEffect(() => {
    if (voices.length > 0) {
      selectVoiceByLanguage(language, voices);
    }
  }, [language, voices]);

  // Function to select voice based on language
  const selectVoiceByLanguage = (lang, availableVoices) => {
    let selectedVoice = null;

    if (lang === "vi") {
      // Tìm giọng nữ Việt Nam
      const femaleViVoices = availableVoices.filter((v) => {
        const isVietnamese = v.lang.includes("vi") || v.lang === "vi-VN";
        const isFemale =
          v.name.toLowerCase().includes("female") ||
          v.name.toLowerCase().includes("woman") ||
          v.name.toLowerCase().includes("nữ") ||
          v.name.toLowerCase().includes("cô");
        return isVietnamese && isFemale;
      });

      if (femaleViVoices.length > 0) {
        selectedVoice = femaleViVoices[0];
      } else {
        // Nếu không có giọng nữ, tìm bất kỳ giọng Việt nào
        const viVoices = availableVoices.filter(
          (v) => v.lang.includes("vi") || v.lang === "vi-VN"
        );
        selectedVoice = viVoices.length > 0 ? viVoices[0] : availableVoices[0];
      }
    } else if (lang === "en") {
      // Tìm giọng tiếng Anh (US hoặc UK)
      const enVoices = availableVoices.filter(
        (v) =>
          v.lang.includes("en-US") ||
          v.lang.includes("en-GB") ||
          v.lang.includes("en")
      );
      selectedVoice = enVoices.length > 0 ? enVoices[0] : availableVoices[0];
    }

    setSelectedVoice(selectedVoice);
  };

  // Hàm xử lý văn bản để nói tự nhiên hơn
  const processTextForNaturalSpeech = (inputText) => {
    if (!naturalSpeech) return inputText;

    let processedText = inputText;

    // Chỉ thêm ngắt nghỉ nhẹ tại dấu chấm câu lớn (. ! ?)
    // Không thêm ... để tránh ngắt quãng quá nhiều
    processedText = processedText.replace(/([.!?])\s+/g, "$1 ");

    // Giữ nguyên dấu phay, chấm phẩy để giọng đọc tự nhiên
    // Không thêm pause thêm

    return processedText;
  };

  // Hàm chia văn bản thành các đoạn (paragraphs) để đọc trôi chảy hơn
  const speakWithVariation = (inputText, langCode) => {
    // Chia thành các đoạn lớn hơn (2-3 câu) thay vì từng câu nhỏ
    // Chia theo dấu chấm + khoảng trắng, nhưng gộp lại thành chunks
    const allSentences = inputText
      .split(/(?<=[.!?])\s+/)
      .filter((s) => s.trim());

    // Gộp 2-3 câu thành một đoạn để đọc trôi chảy
    const chunks = [];
    for (let i = 0; i < allSentences.length; i += 2) {
      const chunk = allSentences.slice(i, i + 2).join(" ");
      if (chunk.trim()) chunks.push(chunk);
    }

    let currentIndex = 0;

    const speakNextChunk = () => {
      // Kiểm tra flag dừng
      if (shouldStopRef.current) {
        shouldStopRef.current = false;
        setPlaying(false);
        return;
      }

      if (currentIndex >= chunks.length) {
        setPlaying(false);
        // Clear all timeouts khi hoàn thành
        timeoutIdsRef.current.forEach(clearTimeout);
        timeoutIdsRef.current = [];
        return;
      }

      const chunk = chunks[currentIndex].trim();
      if (!chunk) {
        currentIndex++;
        speakNextChunk();
        return;
      }

      const utter = new SpeechSynthesisUtterance(chunk);
      utter.lang = langCode;
      utter.rate = rate;
      utter.pitch = pitch;

      // Biến đổi nhẹ pitch và rate để tự nhiên hơn
      // Không thay đổi quá mạnh để giữ sự liên tục
      const variation = (Math.random() - 0.5) * 0.1; // Giảm variation để ổn định hơn
      utter.pitch = Math.max(0.5, Math.min(pitch + variation, 2));
      utter.rate = Math.max(0.5, Math.min(rate + variation * 0.3, 2));

      if (selectedVoice) {
        utter.voice = selectedVoice;
      }

      utter.onend = () => {
        // Kiểm tra flag dừng trước khi tiếp tục
        if (shouldStopRef.current) {
          shouldStopRef.current = false;
          setPlaying(false);
          return;
        }
        currentIndex++;
        // Giảm pause giữa các đoạn xuống 100ms để trôi chảy hơn
        const timeoutId = setTimeout(speakNextChunk, 100);
        timeoutIdsRef.current.push(timeoutId);
      };

      utter.onerror = () => {
        currentIndex++;
        speakNextChunk();
      };

      window.speechSynthesis.speak(utter);
    };

    speakNextChunk();
  };

  const handlePlay = async () => {
    // Reset flag dừng khi bắt đầu phát
    shouldStopRef.current = false;
    // Clear old timeouts
    timeoutIdsRef.current.forEach(clearTimeout);
    timeoutIdsRef.current = [];

    // Chọn text dựa trên ngôn ngữ
    const currentText = language === "en" ? textEn || text : text;
    const langCode = language === "en" ? "en-US" : "vi-VN";

    if (audioUrl) {
      // play audio URL
      const audio = new Audio(audioUrl);
      setPlaying(true);
      audio.play();
      audio.onended = () => setPlaying(false);
    } else if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setPlaying(true);

      if (naturalSpeech) {
        // Chế độ nói tự nhiên với biến đổi âm điệu
        const processedText = processTextForNaturalSpeech(currentText || "");
        speakWithVariation(processedText, langCode);
      } else {
        // Chế độ nói đơn giản
        const utter = new SpeechSynthesisUtterance(currentText || "");
        utter.lang = langCode;
        utter.rate = rate;
        utter.pitch = pitch;
        if (selectedVoice) {
          utter.voice = selectedVoice;
        }
        utter.onend = () => setPlaying(false);
        window.speechSynthesis.speak(utter);
      }
    } else {
      alert("Trình duyệt của bạn không hỗ trợ SpeechSynthesis.");
    }
  };

  const handleStop = () => {
    // Thiết lập flag dừng để ngắt vòng lặp đệ quy
    shouldStopRef.current = true;

    // Hủy tất cả các timeout đang chờ
    timeoutIdsRef.current.forEach(clearTimeout);
    timeoutIdsRef.current = [];

    // Hủy speech synthesis
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }

    setPlaying(false);
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-3">
        <button
          onClick={() => (playing ? handleStop() : handlePlay())}
          className={`px-4 py-2 rounded-lg border transition-colors text-sm font-medium ${
            playing
              ? "bg-red-600 text-white border-red-600"
              : "bg-white text-gray-800 border-gray-300 hover:border-primary-500"
          }`}
          title="Nghe chuyện AI"
        >
          <i className={`fas ${playing ? "fa-stop" : "fa-volume-up"} mr-2`}></i>
          {playing ? "Dừng" : "Nghe chuyện"}
        </button>

        {/* Settings Button */}
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:border-primary-500 transition-colors text-sm"
          title="Cài đặt giọng đọc"
        >
          <i className="fas fa-cog"></i>
        </button>

        {/* <div className="text-sm text-gray-600">AI voice story (minh họa)</div> */}
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 p-4 w-80 z-50">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-900 flex items-center gap-2">
              <i className="fas fa-language text-primary-600"></i>
              Cài đặt ngôn ngữ
            </h4>
            <button
              onClick={() => setShowSettings(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>

          {/* Language Selection */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Chọn ngôn ngữ giọng đọc:
            </label>

            {/* Vietnamese Option */}
            <button
              onClick={() => setLanguage("vi")}
              className={`w-full p-4 rounded-lg border-2 transition-all ${
                language === "vi"
                  ? "border-primary-600 bg-primary-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    language === "vi" ? "border-primary-600" : "border-gray-300"
                  }`}
                >
                  {language === "vi" && (
                    <div className="w-3 h-3 rounded-full bg-primary-600"></div>
                  )}
                </div>
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900">
                      Tiếng Việt
                    </span>
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    Vietnamese voice narration
                  </div>
                </div>
              </div>
            </button>

            {/* English Option */}
            <button
              onClick={() => setLanguage("en")}
              className={`w-full p-4 rounded-lg border-2 transition-all ${
                language === "en"
                  ? "border-primary-600 bg-primary-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    language === "en" ? "border-primary-600" : "border-gray-300"
                  }`}
                >
                  {language === "en" && (
                    <div className="w-3 h-3 rounded-full bg-primary-600"></div>
                  )}
                </div>
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900">English</span>
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    English voice narration
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VoicePlayer;

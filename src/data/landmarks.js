// Dữ liệu các địa danh nổi tiếng Việt Nam
export const landmarks = [
  {
    id: "ho-hoan-kiem",
    name: "Hồ Hoàn Kiếm",
    location: "Hà Nội",
    region: "Miền Bắc",
    category: "Culture",
    type: "Hồ", // Hồ, Chùa, Đền, Núi, Vịnh, Đảo, Cố đô, Bảo tàng...
    description:
      "Trái tim của Hà Nội với truyền thuyết thanh kiếm thần, đền Ngọc Sơn trên đảo và tháp Rùa giữa hồ.",
    introduction:
      "Hồ Hoàn Kiếm là biểu tượng của thủ đô Hà Nội, nằm ở trung tâm thành phố với diện tích khoảng 12 ha. Tên gọi 'Hoàn Kiếm' (nghĩa là trả lại gươm) xuất phát từ truyền thuyết vua Lê Lợi trả lại thanh kiếm thần cho Rùa thần sau khi đánh thắng quân Minh.\n\nHồ có hai đảo nhỏ: đảo Ngọc Sơn với đền Ngọc Sơn (được xây dựng từ thế kỷ 18) và đảo Rùa với tháp Rùa - biểu tượng của Hà Nội. Đền Ngọc Sơn thờ Trần Hưng Đạo, Văn Xương Đế Quân và La Tổ. Du khách có thể đến đền qua cầu Thê Húc (cầu Ngọc) màu đỏ rực rỡ.\n\nKhu vực xung quanh hồ là không gian văn hóa, giải trí của người dân Hà Nội. Buổi sáng có người tập thể dục, buổi tối đi dạo, cuối tuần có phố đi bộ sôi động. Đây cũng là điểm check-in nổi tiếng với view tháp Rùa, nhất là vào hoàng hôn.",
    highlights: [
      "Đền Ngọc Sơn",
      "Tháp Rùa",
      "Cầu Thê Húc",
      "Phố đi bộ cuối tuần",
      "Xem rùa Hồ Gươm (nếu may mắn)",
    ],
    nearbyAttractions: [
      {
        name: "Phố Cổ 36 Phố Phường",
        distance: "500m",
        description: "Khu phố cổ với kiến trúc nhà ống đặc trưng",
      },
      {
        name: "Nhà Hát Lớn Hà Nội",
        distance: "800m",
        description: "Kiến trúc Pháp đẹp nhất Hà Nội",
      },
      {
        name: "Chợ Đồng Xuân",
        distance: "1.2km",
        description: "Chợ lớn nhất phố cổ",
      },
    ],
    activities: [
      {
        name: "Dạo quanh hồ",
        description: "Đi bộ quanh hồ, ngắm cảnh, chụp ảnh",
        time: "30 phút - 1 giờ",
        price: "Miễn phí",
      },
      {
        name: "Tham quan Đền Ngọc Sơn",
        description: "Vào đền thờ, tìm hiểu lịch sử và kiến trúc",
        time: "30 - 45 phút",
        price: "30.000 VND",
      },
      {
        name: "Phố đi bộ cuối tuần",
        description: "Thưởng thức âm nhạc đường phố, ẩm thực, mua sắm",
        time: "Cả ngày",
        price: "Miễn phí",
      },
    ],
    history:
      "Hồ Hoàn Kiếm có lịch sử hàng nghìn năm, từng có tên là Lục Thủy (nước xanh) vì nước hồ có màu xanh quanh năm. Thế kỷ 15, vua Lê Lợi đánh thắng quân Minh nhờ thanh kiếm thần mà Long Vương ban cho. Sau khi thắng trận, vua đến hồ này và Rùa thần hiện lên đòi lại kiếm. Vua liền trả lại và từ đó hồ được đổi tên thành Hồ Hoàn Kiếm (Hồ Gươm).",
    bestTimeToVisit:
      "Quanh năm, đặc biệt đẹp vào buổi sáng sớm (5-7h) và chiều tối (18-20h)",
    openingHours: "24/7 (Đền Ngọc Sơn: 8:00 - 17:00)",
    entryFee: "Miễn phí (Đền Ngọc Sơn: 30.000 VND)",
    timeNeeded: "1-2 giờ",
    coordinates: { lat: 21.0285, lng: 105.8522 },
    thumbnail:
      "https://static.vinwonders.com/production/ho-hoan-kiem-banner.jpg", // Ảnh hiển thị ở danh sách điểm đến
    images: [
      // Các ảnh trong trang chi tiết
      "https://thumbs.dreamstime.com/b/tortoise-tower-hanoi-5825114.jpg",
      "https://dulich3mien.vn/wp-content/uploads/2021/11/1-min.jpg",
      "https://kenhhomestay.com/wp-content/uploads/2023/02/cau-the-huc-6.jpg",
    ],
    videos: ["https://www.youtube.com/watch?v=xyz123"],
    audioStory: null,
    audioGuideScript:
      "Chào mừng bạn đến với Hồ Hoàn Kiếm, trái tim của thủ đô Hà Nội. Hồ này gắn liền với truyền thuyết thanh kiếm thần của vua Lê Lợi. Vào thế kỷ mười lăm, khi đánh giặc Minh, vua Lê Lợi được Long Vương ban cho thanh kiếm thần. Sau khi thắng trận, vua đi thuyền trên hồ này thì một con rùa vàng khổng lồ nổi lên, đòi lại thanh kiếm. Vua liền trả lại và từ đó hồ được gọi là Hồ Hoàn Kiếm. Giữa hồ có tháp Rùa, còn trên đảo Ngọc có đền Ngọc Sơn, được nối với bờ bằng cầu Thê Húc màu đỏ tươi. Hãy dạo quanh hồ để cảm nhận nhịp sống của người Hà Nội.",
    tips: [
      "Nên đi vào buổi sáng sớm để tránh đông người",
      "Cuối tuần có phố đi bộ từ 19h thứ 7 đến 24h Chủ nhật",
      "Mặc trang phục lịch sự khi vào đền",
      "Cẩn thận với túi xách khi đi trong khu vực đông người",
    ],
    faqs: [
      {
        q: "Có thể bơi trong hồ không?",
        a: "Không, hồ Hoàn Kiếm là di tích lịch sử, nghiêm cấm bơi lội.",
      },
      {
        q: "Có thể nhìn thấy rùa Hồ Gươm không?",
        a: "Rất khó, rùa hiếm khi nổi lên. Nếu may mắn có thể thấy vào đầu xuân hoặc cuối thu.",
      },
      {
        q: "Phố đi bộ mở cửa khi nào?",
        a: "Từ 19h thứ 7 đến 24h Chủ nhật hàng tuần.",
      },
    ],
    reviews: [
      {
        id: 1,
        author: "Minh Anh",
        text: "Địa điểm biểu tượng của Hà Nội, rất đẹp vào buổi tối. Phố đi bộ cuối tuần rất vui!",
        rating: 5,
        images: [],
      },
      {
        id: 2,
        author: "John Smith",
        text: "Beautiful lake in the heart of Hanoi. The temple is amazing!",
        rating: 5,
        images: [],
      },
    ],
  },
  {
    id: "van-mieu-quoc-tu-giam",
    name: "Văn Miếu - Quốc Tử Giám",
    location: "Hà Nội",
    region: "Miền Bắc",
    category: "Culture",
    type: "Di tích",
    description:
      "Ngôi trường đại học đầu tiên của Việt Nam với 82 bia tiến sĩ - Di sản ký ức thế giới UNESCO.",
    introduction:
      "Văn Miếu - Quốc Tử Giám là quần thể di tích lịch sử văn hóa nổi tiếng của Hà Nội và cả nước, được xây dựng vào năm 1070 dưới thời Lý Thánh Tông để thờ Khổng Tử. Năm 1076, Quốc Tử Giám - trường đại học đầu tiên của Việt Nam - được thành lập tại đây.\n\nKiến trúc Văn Miếu được xây dựng theo kiểu chữ Công với năm khu vực: Đại Trung Môn, Khuê Văn Các, Thiên Quang Tỉnh (giếng trời), Đại Thành và Thái học. Đặc biệt nổi tiếng là 82 tấm bia tiến sĩ được UNESCO công nhận là Di sản tư liệu thế giới năm 2010. Những tấm bia này ghi tên 1307 tiến sĩ đỗ từ năm 1442 đến 1779.\n\nVăn Miếu không chỉ là nơi thờ phượng Khổng Tử mà còn là biểu tượng của truyền thống hiếu học, tôn sư trọng đạo của dân tộc Việt Nam. Đây là điểm đến không thể bỏ qua cho những ai muốn tìm hiểu về giáo dục và văn hóa Việt Nam.",
    highlights: [
      "82 bia tiến sĩ - Di sản UNESCO",
      "Khuê Văn Các - biểu tượng Hà Nội",
      "Kiến trúc cổ kính",
      "Giếng Thiên Quang",
      "Cây đa ngàn năm",
    ],
    nearbyAttractions: [
      {
        name: "Hoàng Thành Thăng Long",
        distance: "1.5km",
        description: "Di sản thế giới UNESCO",
      },
      {
        name: "Bảo tàng Mỹ thuật",
        distance: "800m",
        description: "Bảo tàng nghệ thuật Việt Nam",
      },
    ],
    activities: [
      {
        name: "Tham quan",
        description: "Khám phá kiến trúc, bia tiến sĩ, tìm hiểu lịch sử",
        time: "1.5 - 2 giờ",
        price: "30.000 VND",
      },
      {
        name: "Chụp ảnh kỷ yếu",
        description: "Địa điểm phổ biến cho ảnh kỷ yếu, áo dài",
        time: "1-2 giờ",
        price: "30.000 VND + phí chụp",
      },
    ],
    history:
      "Văn Miếu được xây dựng năm 1070 để thờ Khổng Tử và các hi현 nhân. Năm 1076, vua Lý Nhân Tông ra lệnh xây dựng Quốc Tử Giám - trường học đầu tiên dành cho hoàng tử và con em quý tộc. Từ thế kỷ 15, nơi đây trở thành trường đại học quốc gia, đào tạo nhiều nhân tài cho đất nước.",
    bestTimeToVisit: "Quanh năm, tránh giờ cao điểm (9-11h, 14-16h)",
    openingHours: "8:00 - 17:00 hàng ngày",
    entryFee: "30.000 VND",
    timeNeeded: "1.5 - 2 giờ",
    coordinates: { lat: 21.0277, lng: 105.8355 },
    thumbnail:
      "https://img1.kienthucvui.vn/uploads/2019/08/15/hinh-anh-van-mieu_103833097.jpg",
    images: [
      "https://ik.imagekit.io/tvlk/blog/2023/09/khue-van-cac-acc-1.webp?tr=dpr-2,w-675",
      "https://studiochupanhdep.com/Upload/Images/Album/anh-ao-dai-quoc-tu-giam-08.jpg",
      "https://live.staticflickr.com/65535/639854037_b38abd6bd2_b.jpg",
    ],
    videos: [],
    tips: [
      "Mặc trang phục lịch sự, không quá hở hang",
      "Thuê hướng dẫn viên để hiểu rõ hơn về lịch sử",
      "Đến sớm để tránh đông người và ánh sáng đẹp",
      "Không leo lên bia tiến sĩ",
    ],
    faqs: [
      {
        q: "Vé học sinh có giảm giá không?",
        a: "Có, học sinh/sinh viên được giảm 50% khi xuất trình thẻ.",
      },
      {
        q: "Có cho thuê áo dài chụp ảnh không?",
        a: "Có nhiều cửa hàng cho thuê áo dài gần cổng vào, giá khoảng 100.000 - 150.000 VND/bộ.",
      },
    ],
    reviews: [],
  },
  {
    id: "vinh-ha-long",
    name: "Vịnh Hạ Long",
    location: "Quảng Ninh",
    region: "Miền Bắc",
    category: "Nature",
    type: "Vịnh",
    description:
      "Di sản thiên nhiên thế giới với hàng nghìn hòn đảo đá vôi kỳ vĩ và hang động tuyệt đẹp.",
    introduction:
      "Vịnh Hạ Long là một trong những kỳ quan thiên nhiên thế giới, được UNESCO công nhận là Di sản Thiên nhiên Thế giới hai lần (1994 và 2000). Nằm ở tỉnh Quảng Ninh, vịnh có diện tích khoảng 1.553 km² với 1.969 hòn đảo đá vôi lớn nhỏ.\n\nTheo truyền thuyết, Vịnh Hạ Long được tạo thành khi Rồng mẹ và đàn Rồng con từ trên trời xuống giúp dân chống giặc. Rồng phun ngọc, ngọc rơi xuống biển hóa thành hàng nghìn hòn đảo đá vôi đủ hình dáng kỳ thú, tạo thành bức tường thành kiên cố chống giặc ngoại xâm.\n\nDu khách có thể khám phá vịnh bằng du thuyền qua đêm, tham quan các hang động nổi tiếng như Động Thiên Cung, Hang Đầu Gỗ, Hang Sửng Sốt. Ngoài ra còn có thể chèo kayak, bơi lội, thăm làng chài, leo núi đảo Ti Tốp.",
    highlights: [
      "Hàng nghìn hòn đảo đá vôi",
      "Động Thiên Cung, Hang Đầu Gỗ, Hang Sửng Sốt",
      "Du thuyền qua đêm",
      "Làng chài cổ",
      "Đảo Ti Tốp",
    ],
    nearbyAttractions: [
      {
        name: "Đảo Cát Bà",
        distance: "30km",
        description: "Đảo lớn nhất vịnh Lan Hạ",
      },
      {
        name: "Yên Tử",
        distance: "60km",
        description: "Quần thể danh thắng tâm linh",
      },
    ],
    activities: [
      {
        name: "Du thuyền qua đêm",
        description: "Ngủ đêm trên tàu, ngắm bình minh, hoàng hôn",
        time: "2 ngày 1 đêm",
        price: "2.000.000 - 10.000.000 VND/người",
      },
      {
        name: "Chèo kayak",
        description: "Chèo kayak khám phá hang động, vịnh nhỏ",
        time: "1-2 giờ",
        price: "Miễn phí (bao gồm trong tour)",
      },
      {
        name: "Tham quan hang động",
        description: "Khám phá Động Thiên Cung, Hang Đầu Gỗ...",
        time: "30-45 phút/hang",
        price: "Bao gồm trong vé tour",
      },
    ],
    history:
      "Vịnh Hạ Long được hình thành cách đây 500 triệu năm qua quá trình kiến tạo địa chất phức tạp. Khu vực này từng là đáy biển nông, qua hàng triệu năm nâng lên, bào mòn bởi nước và gió tạo nên cảnh quan kỳ vĩ ngày nay.",
    bestTimeToVisit: "Tháng 3-5 và tháng 9-11 (thời tiết đẹp, ít mưa bão)",
    openingHours: "24/7 (tour thường khởi hành 8:00-12:00)",
    entryFee: "Vé vào vịnh: 300.000 VND/người (tour trọn gói từ 1.500.000 VND)",
    timeNeeded: "2 ngày 1 đêm (tối thiểu)",
    coordinates: { lat: 20.9101, lng: 107.1839 },
    thumbnail:
      "https://tophalong.com/uploads/2023/05/17/anh-vinh-ha-long-cuc-dep_014445838.jpg",
    images: [
      "https://sacotravel.com/wp-content/uploads/2021/12/lang-chai-ba-hang.jpg",
      "https://images2.thanhnien.vn/528068263637045248/2023/6/24/img4099-16875776586881216884140.jpg",
    ],
    videos: [],
    audioGuideScript: "",
    tips: [
      "Đặt tour trước 1-2 tuần vào mùa cao điểm",
      "Mang theo thuốc say sóng nếu cần",
      "Mặc trang phục thoải mái, mang dép lê",
      "Chuẩn bị kem chống nắng, mũ, kính",
      "Mang theo áo ấm vào mùa đông",
    ],
    faqs: [
      {
        q: "Nên đi tour 2N1Đ hay 3N2Đ?",
        a: "Tour 2N1Đ đủ để tham quan các điểm chính. Tour 3N2Đ sẽ thư thái hơn và đi được nhiều điểm hơn.",
      },
      {
        q: "Có bị say sóng không?",
        a: "Tùy cơ địa. Nên uống thuốc say sóng trước 30 phút lên tàu để phòng tránh.",
      },
    ],
    reviews: [],
  },
  {
    id: "pho-co-hoi-an",
    name: "Phố Cổ Hội An",
    location: "Quảng Nam",
    region: "Miền Trung",
    category: "Culture",
    type: "Phố cổ",
    description:
      "Thị trấn cổ được bảo tồn nguyên vẹn với kiến trúc độc đáo, đèn lồng rực rỡ và văn hóa giao thoa Đông Tây.",
    introduction:
      "Phố cổ Hội An là một trong những điểm đến hấp dẫn nhất Việt Nam, được UNESCO công nhận là Di sản Văn hóa Thế giới năm 1999. Từng là thương cảng quốc tế sầm uất từ thế kỷ 16-18, Hội An là nơi giao thoa của nhiều nền văn hóa: Việt, Trung, Nhật, và châu Âu.\n\nKiến trúc phố cổ Hội An gồm khoảng 1.360 di tích với nhà cổ, hội quán, đình, chùa, miếu, nhà thờ tộc, giếng cổ... được bảo tồn nguyên vẹn. Nổi bật nhất là Chùa Cầu Nhật Bản (được xây từ thế kỷ 17), Hội quán Phúc Kiến, Nhà cổ Tấn Ký, Phố Hội.\n\nĐiểm đặc biệt của Hội An là đèn lồng rực rỡ về đêm. Mỗi tháng, vào rằm âm lịch, phố cổ tắt hết đèn điện, chỉ thắp đèn lồng và nến tạo không khí cổ kính, lãng mạn. Du khách có thể thả đèn hoa đăng trên sông Hoài, dạo phố ăn vặt, may áo dài, mua đèn lồng làm quà.",
    highlights: [
      "Chùa Cầu Nhật Bản",
      "Hội quán Phúc Kiến",
      "Nhà cổ Tấn Ký",
      "Đêm phố cổ với đèn lồng",
      "Thả đèn hoa đăng sông Hoài",
    ],
    nearbyAttractions: [
      {
        name: "Rừng Dừa Bảy Mẫu",
        distance: "5km",
        description: "Rừng dừa nước, chèo thuyền thúng",
      },
      {
        name: "Mỹ Sơn",
        distance: "40km",
        description: "Thánh địa Chăm Pa, Di sản UNESCO",
      },
      {
        name: "Cù Lao Chàm",
        distance: "20km (đường biển)",
        description: "Đảo san hô, lặn biển",
      },
    ],
    activities: [
      {
        name: "Dạo phố cổ",
        description: "Đi bộ khám phá kiến trúc, chụp ảnh",
        time: "2-3 giờ",
        price: "Vé tham quan: 120.000 VND (5 điểm)",
      },
      {
        name: "May áo dài",
        description: "Đo và may áo dài theo yêu cầu",
        time: "24 giờ (giao sau)",
        price: "300.000 - 800.000 VND/bộ",
      },
      {
        name: "Thả đèn hoa đăng",
        description: "Thả đèn trên sông Hoài vào đêm rằm",
        time: "15-30 phút",
        price: "10.000 - 20.000 VND/đèn",
      },
    ],
    history:
      "Hội An hình thành từ thế kỷ 16, là thương cảng quốc tế quan trọng, thu hút thương nhân Trung Quốc, Nhật Bản, Hà Lan, Bồ Đào Nha... Thế kỷ 19, khi sông Thu Bồn bị bồi lắng, thương cảng chuyển về Đà Nẵng, Hội An trở nên tĩnh lặng và may mắn tránh được chiến tranh, giữ nguyên vẹn kiến trúc cổ.",
    bestTimeToVisit: "Tháng 2-5 (khô ráo, mát mẻ)",
    openingHours: "24/7 (một số điểm tham quan: 8:00 - 17:30)",
    entryFee: "120.000 VND (vé combo 5 điểm, có hiệu lực 10 ngày)",
    timeNeeded: "1-2 ngày",
    coordinates: { lat: 15.8801, lng: 108.338 },
    thumbnail:
      "https://th.bing.com/th/id/R.21570ebc0bfba64cccd36c47a642cfee?rik=1t2vXaJjR5%2fZmw&pid=ImgRaw&r=0",
    images: [
      "https://thumbs.dreamstime.com/b/hoi-ancient-town-central-vieatnam-landmark-popular-tourist-attractions-vietnam-november-264866144.jpg",
    ],
    videos: [],
    tips: [
      "Thuê xe đạp để dạo phố (50.000 VND/ngày)",
      "Nên ở qua đêm để trải nghiệm phố cổ về đêm",
      "Đến vào rằm âm lịch để thấy đêm hội đèn lồng",
      "Mặc cả khi mua đồ lưu niệm",
      "Thử các món ăn đặc sản: cao lầu, bánh mì, bánh bao bánh vạc",
    ],
    faqs: [
      {
        q: "Vé tham quan sử dụng như thế nào?",
        a: "Vé 120.000 VND cho phép vào 5 điểm trong 22 điểm tham quan, có hiệu lực 10 ngày.",
      },
      {
        q: "Đêm hội đèn lồng tổ chức khi nào?",
        a: "Mỗi tháng vào đêm 14 âm lịch (rằm), phố cổ tắt đèn điện, chỉ thắp đèn lồng.",
      },
    ],
    reviews: [],
  },
  {
    id: "chua-tran-quoc",
    name: "Chùa Trấn Quốc",
    location: "Hà Nội",
    region: "Miền Bắc",
    category: "Culture",
    type: "Chùa",
    description:
      "Ngôi chùa cổ nhất Hà Nội với tháp Bảo Tháp 15 tầng, nằm giữa Hồ Tây thơ mông.",
    introduction:
      "Chùa Trấn Quốc là ngôi chùa cổ nhất Thăng Long - Hà Nội, được xây dựng từ thời Lý Nam Đế (năm 541-547), ban đầu mang tên Khai Quốc. Chùa nằm trên một hòn đảo nhỏ giữa Hồ Tây, được nối với bờ bằng một con đường đắp, tạo nên khung cảnh thanh tịnh, yên bình.\n\nĐiểm nổi bật nhất của chùa là tháp Bảo Tháp cao 15 tầng, được xây dựng năm 1998, có kiến trúc đẹp mắt. Mỗi tầng thờ một pho tượng Phật A Di Đà. Trong chùa còn có cây Bồ Đề thiêng được tặng từ Ấn Độ năm 1959, là nhánh từ cây Bồ Đề mà Đức Phật Thích Ca đạt đạo.\n\nChùa Trấn Quốc không chỉ là nơi tâm linh mà còn là điểm du lịch, chụp ảnh đẹp. Khung cảnh chùa bên Hồ Tây vào lúc hoàng hôn vô cùng thơ mộng.",
    highlights: [
      "Tháp Bảo Tháp 15 tầng",
      "Cây Bồ Đề từ Ấn Độ",
      "View Hồ Tây",
      "Kiến trúc cổ kính",
      "Không gian thanh tịnh",
    ],
    nearbyAttractions: [
      {
        name: "Hồ Tây",
        distance: "0m",
        description: "Hồ nước ngọt lớn nhất Hà Nội",
      },
      {
        name: "Chùa Quán Thánh",
        distance: "500m",
        description: "Chùa thờ Huyền Thiên Trấn Vũ",
      },
    ],
    activities: [
      {
        name: "Tham quan chùa",
        description: "Lễ phật, chiêm bái, tìm hiểu lịch sử",
        time: "30-45 phút",
        price: "Miễn phí",
      },
      {
        name: "Chụp ảnh",
        description: "Chụp ảnh với tháp, Hồ Tây, hoàng hôn",
        time: "30 phút",
        price: "Miễn phí",
      },
    ],
    history:
      "Chùa được dựng từ thời Lý Nam Đế (541-547) bên bờ sông Hồng với tên Khai Quốc. Thế kỷ 17, do sông Hồng sạt lở, chùa được dời về vị trí hiện tại trên đảo Hồ Tây và đổi tên thành Trấn Quốc (Trấn giữ quốc gia).",
    bestTimeToVisit: "Buổi chiều (15h-17h) để ngắm hoàng hôn, hoặc sáng sớm",
    openingHours: "6:00 - 18:00",
    entryFee: "Miễn phí",
    timeNeeded: "30 phút - 1 giờ",
    coordinates: { lat: 21.0455, lng: 105.8352 },
    thumbnail: "https://statics.vinpearl.com/chua-tran-quoc-8_1685970745.jpg",
    images: ["https://statics.vinpearl.com/chua-tran-quoc-5_1685970788.jpg"],
    videos: [],
    tips: [
      "Mặc trang phục lịch sự, không hở hang",
      "Tắt tiếng điện thoại khi vào chùa",
      "Nên đi vào buổi chiều để chụp ảnh hoàng hôn đẹp",
      "Có thể kết hợp đạp xe quanh Hồ Tây",
    ],
    faqs: [
      {
        q: "Chùa có mở cửa vào ngày lễ không?",
        a: "Có, chùa mở cửa quanh năm kể cả ngày lễ, Tết.",
      },
    ],
    reviews: [],
  },
  {
    id: "phong-nha-ke-bang",
    name: "Vườn Quốc Gia Phong Nha - Kẻ Bàng",
    location: "Quảng Bình",
    region: "Miền Trung",
    category: "Nature",
    type: "Vườn quốc gia",
    description:
      "Di sản thiên nhiên thế giới với hệ thống hang động lớn nhất hành tinh, bao gồm Sơn Đoòng - hang động lớn nhất thế giới.",
    introduction:
      "Vườn Quốc gia Phong Nha - Kẻ Bàng là Di sản Thiên nhiên Thế giới được UNESCO công nhận năm 2003 và mở rộng năm 2015. Nằm tại tỉnh Quảng Bình, vườn quốc gia có diện tích 857,54 km² với địa hình núi đá vôi karst điển hình.\n\nĐây là nơi có hệ thống hang động lớn nhất, đẹp nhất và đa dạng nhất thế giới với hơn 300 hang động đã được khám phá. Nổi bật nhất là Hang Sơn Đoòng - hang động tự nhiên lớn nhất hành tinh, có thể chứa cả một tòa nhà cao tầng. Ngoài ra còn có Động Phong Nha, Hang En, Hang Pygmy...\n\nKhu vực còn có hệ sinh thái rừng nhiệt đới phong phú với nhiều loài động thực vật quý hiếm. Du khách có thể tham gia tour thám hiểm hang động, leo núi, trekking, kayak trên sông Son.",
    highlights: [
      "Hang Sơn Đoòng - hang lớn nhất thế giới",
      "Động Phong Nha",
      "Hang En",
      "Suối Nước Moọc",
      "Vườn Bách Thảo Hang Tiên",
    ],
    nearbyAttractions: [
      {
        name: "Động Thiên Đường",
        distance: "15km",
        description: "Hang động đẹp nhất châu Á",
      },
      {
        name: "Biển Đá Nhảy",
        distance: "50km",
        description: "Bãi biển hoang sơ với đá kỳ thú",
      },
    ],
    activities: [
      {
        name: "Tour Sơn Đoòng",
        description: "Khám phá hang động lớn nhất thế giới",
        time: "4 ngày 3 đêm",
        price: "69.000.000 - 72.000.000 VND/người",
      },
      {
        name: "Tour Động Phong Nha",
        description: "Đi thuyền vào hang, ngắm nhũ đá",
        time: "1-2 giờ",
        price: "150.000 VND/người",
      },
      {
        name: "Trekking Hang En",
        description: "Leo núi, cắm trại trong hang",
        time: "1 ngày hoặc 2 ngày 1 đêm",
        price: "4.500.000 - 6.500.000 VND/người",
      },
    ],
    history:
      "Khu vực Phong Nha - Kẻ Bàng được hình thành cách đây 400 triệu năm, là hệ thống karst lâu đời nhất châu Á. Nhiều hang động chỉ mới được khám phá trong vài thập kỷ gần đây, đặc biệt Sơn Đoòng được tìm thấy năm 2009 bởi thợ rừng địa phương và đội thám hiểm người Anh.",
    bestTimeToVisit: "Tháng 2-8 (mùa khô, thuận lợi thám hiểm hang động)",
    openingHours: "7:00 - 17:00",
    entryFee:
      "Tour Động Phong Nha: 150.000 VND, Tour Sơn Đoòng: 69.000.000 - 72.000.000 VND",
    timeNeeded: "2-5 ngày tùy tour",
    coordinates: { lat: 17.5813, lng: 106.2852 },
    thumbnail:
      "https://i2.ex-cdn.com/crystalbay.com/files/content/2024/08/13/du-lich-phong-nha-ke-bang-123-2134.jpg",
    images: [
      "https://tse4.mm.bing.net/th/id/OIP.LCw3RCa4WAwauvToqTcxGQHaE8?cb=ucfimg2ucfimg=1&w=960&h=640&rs=1&pid=ImgDetMain&o=7&rm=3",
    ],
    videos: [],
    tips: [
      "Đặt tour trước nhiều tháng, đặc biệt tour Sơn Đoòng",
      "Chuẩn bị thể lực tốt cho các tour thám hiểm",
      "Mang theo đèn pin, giày chống trượt",
      "Tuân thủ hướng dẫn an toàn của HDV",
    ],
    faqs: [
      {
        q: "Tour Sơn Đoòng có khó không?",
        a: "Khá khó, yêu cầu sức khỏe tốt. Phải đi bộ, leo dốc, lội suối, cắm trại trong hang.",
      },
      {
        q: "Có tour nào dễ hơn không?",
        a: "Có, tour Động Phong Nha rất dễ (đi thuyền), Động Thiên Đường cũng dễ (đi bộ có lối đi rõ ràng).",
      },
    ],
    reviews: [],
  },
  {
    id: "bai-bien-nha-trang",
    name: "Bãi Biển Nha Trang",
    location: "Khánh Hòa",
    region: "Miền Trung",
    category: "Beach",
    type: "Bãi biển",
    description:
      "Vịnh biển đẹp nhất Việt Nam với nước trong xanh, cát trắng mịn và các hoạt động thể thao biển sôi động.",
    introduction:
      "Nha Trang nổi tiếng với bãi biển dài 6km, nước trong xanh quanh năm và là một trong 29 vịnh biển đẹp nhất thế giới. Thành phố biển năng động này có khí hậu ôn hòa, nắng ấm quanh năm.\n\nNha Trang không chỉ có bãi biển đẹp mà còn có nhiều hòn đảo xinh đẹp như Hòn Mun, Hòn Tằm, Hòn Miễu. Du khách có thể tham gia các hoạt động như lặn ngắm san hô, dù lượn, mô tô nước, hoặc thư giãn tại các khu nghỉ dưỡng cao cấp.\n\nThành phố còn có nhiều điểm tham quan như Tháp Bà Ponagar, Nhà Thờ Đá, Vinpearl Land, và các khu vui chơi giải trí hiện đại.",
    highlights: [
      "Bãi biển dài 6km",
      "Lặn ngắm san hô tại Hòn Mun",
      "Vinpearl Land & Resort",
      "Tháp Bà Ponagar",
      "Ẩm thực hải sản phong phú",
    ],
    nearbyAttractions: [
      {
        name: "Đảo Hòn Mun",
        distance: "10km (đường biển)",
        description: "Khu bảo tồn biển, lặn ngắm san hô",
      },
      {
        name: "Vinpearl Land",
        distance: "3km",
        description: "Công viên giải trí lớn nhất miền Trung",
      },
    ],
    activities: [
      {
        name: "Tắm biển & thể thao nước",
        description: "Bơi lội, dù lượn, mô tô nước, lướt ván",
        time: "Cả ngày",
        price: "Miễn phí - 500.000 VND tùy hoạt động",
      },
      {
        name: "Tour 4 đảo",
        description: "Tham quan Hòn Mun, Hòn Tằm, Hòn Miễu",
        time: "1 ngày",
        price: "300.000 - 500.000 VND/người",
      },
      {
        name: "Lặn biển ngắm san hô",
        description: "Lặn ống thở hoặc lặn bình khí",
        time: "2-3 giờ",
        price: "400.000 - 1.200.000 VND",
      },
    ],
    bestTimeToVisit: "Tháng 3-9 (thời tiết đẹp, biển êm)",
    openingHours: "24/7",
    entryFee: "Miễn phí (hoạt động thể thao tính phí riêng)",
    timeNeeded: "2-3 ngày",
    coordinates: { lat: 12.2388, lng: 109.1967 },
    thumbnail: "https://xaviahotel.com/vnt_upload/news/11_2017/nha-trang_1.jpg",
    images: [
      "https://dulichkhampha24.com/wp-content/uploads/2018/09/Bai-bien-doc-let-nha-trang-5.jpg",
    ],
    tips: [
      "Đặt khách sạn gần bãi biển Trần Phú",
      "Đi tour 4 đảo vào buổi sáng để tránh nắng gắt",
      "Thử hải sản tươi sống tại chợ Đầm",
      "Mang theo kem chống nắng và kính bảo vệ mắt",
    ],
    faqs: [
      {
        q: "Mùa nào đẹp nhất để đi Nha Trang?",
        a: "Tháng 3-9 là thời điểm đẹp nhất, biển êm, nắng đẹp. Tránh tháng 10-2 vì có thể gặp mưa và sóng lớn.",
      },
    ],
    reviews: [],
  },
  {
    id: "phu-quoc",
    name: "Đảo Phú Quốc",
    location: "Kiên Giang",
    region: "Miền Nam",
    category: "Beach",
    type: "Đảo",
    description:
      "Đảo ngọc thiên đường với bãi biển hoang sơ, rừng nhiệt đới và hải sản tươi ngon.",
    introduction:
      "Phú Quốc là hòn đảo lớn nhất Việt Nam, nằm ở vịnh Thái Lan. Được mệnh danh là 'đảo ngọc', Phú Quốc sở hữu những bãi biển tuyệt đẹp như Bãi Sao, Bãi Dài, Bãi Kem với cát trắng mịn và nước biển trong xanh.\n\nNgoài bãi biển, đảo còn có Vườn Quốc gia Phú Quốc với rừng nhiệt đới nguyên sinh, các trang trại nuôi ngọc trai, vườn tiêu, nhà máy sản xuất nước mắm truyền thống. Vinpearl Safari và VinWonders là điểm đến hấp dẫn cho gia đình.\n\nPhú Quốc cũng nổi tiếng với hải sản tươi sống, nước mắm Phú Quốc, và các khu nghỉ dưỡng cao cấp dọc bờ biển.",
    highlights: [
      "Bãi Sao - bãi biển đẹp nhất",
      "Vinpearl Safari & VinWonders",
      "Chợ đêm Phú Quốc",
      "Lặn ngắm san hô",
      "Nước mắm truyền thống",
    ],
    nearbyAttractions: [
      {
        name: "Hòn Thơm",
        distance: "15km",
        description: "Đảo nhỏ với cáp treo vượt biển dài nhất thế giới",
      },
      {
        name: "Dinh Cậu",
        distance: "10km",
        description: "Đền thờ thần biển, ngắm hoàng hôn",
      },
    ],
    activities: [
      {
        name: "Tắm biển & thư giãn",
        description: "Thưởng thức bãi biển đẹp nhất Việt Nam",
        time: "Cả ngày",
        price: "Miễn phí",
      },
      {
        name: "Tour khám phá đảo",
        description: "Tham quan vườn tiêu, nhà máy nước mắm, rừng nguyên sinh",
        time: "1 ngày",
        price: "500.000 - 800.000 VND/người",
      },
      {
        name: "Lặn biển & câu cá",
        description: "Khám phá đại dương Phú Quốc",
        time: "3-4 giờ",
        price: "600.000 - 1.500.000 VND",
      },
    ],
    bestTimeToVisit: "Tháng 11-3 (mùa khô, nắng đẹp)",
    openingHours: "24/7",
    entryFee: "Miễn phí",
    timeNeeded: "3-5 ngày",
    coordinates: { lat: 10.2899, lng: 103.9842 },
    thumbnail: "Đảo Phú Quốc",
    images: [
      "https://th.bing.com/th/id/R.870d0375ffa522d3411fd2f9a980008a?rik=lgvfVFqVquP2yw&riu=http%3a%2f%2fsungetawaystravel.com%2fwp-content%2fuploads%2f2023%2f06%2fHinh-anh-dao-ngoc-Phu-Quoc-1024x602.jpg&ehk=3pj0OsLwf9BAMf3K5%2f36LzgK%2bnjMRCOeL%2bA1w%2bErjo8%3d&risl=&pid=ImgRaw&r=0",
    ],
    tips: [
      "Thuê xe máy để tự do khám phá đảo",
      "Thử hải sản tươi sống tại chợ đêm",
      "Đặt resort trước nếu đi cao điểm",
      "Ghé tham quan vườn tiêu và mua nước mắm làm quà",
    ],
    faqs: [
      {
        q: "Cần bao nhiêu ngày để khám phá Phú Quốc?",
        a: "Tối thiểu 3-4 ngày để tham quan các điểm chính và thư giãn.",
      },
    ],
    reviews: [],
  },
  {
    id: "sa-pa",
    name: "Sa Pa",
    location: "Lào Cai",
    region: "Miền Bắc",
    category: "Adventure",
    type: "Thị trấn núi",
    description:
      "Thị trấn trên núi với ruộng bậc thang tuyệt đẹp, văn hóa dân tộc thiểu số đa dạng và khí hậu mát mẻ quanh năm.",
    introduction:
      "Sa Pa là thị trấn du lịch nổi tiếng nằm ở độ cao 1.600m, cách Hà Nội khoảng 350km. Với khí hậu mát mẻ quanh năm, ruộng bậc thang hùng vĩ và văn hóa đặc sắc của các dân tộc H'Mông, Dao, Tày, Giáy... Sa Pa là điểm đến lý tưởng cho những ai yêu thiên nhiên và khám phá.\n\nRuộng bậc thang Sa Pa đẹp nhất vào mùa lúa chín (tháng 9-10) khi cả thung lũng chuyển màu vàng óng. Đỉnh Fansipan (3.143m) - 'nóc nhà Đông Dương' có thể chinh phục bằng cáp treo hoặc trekking.\n\nDu khách có thể tham quan các bản làng như Cát Cát, Tả Van, Lao Chải, trải nghiệm homestay, thưởng thức ẩm thực núi rừng độc đáo.",
    highlights: [
      "Ruộng bậc thang mùa lúa chín",
      "Đỉnh Fansipan",
      "Bản Cát Cát",
      "Chợ tình Sa Pa",
      "Thác Bạc & Cầu Mây",
    ],
    nearbyAttractions: [
      {
        name: "Thung lũng Mường Hoa",
        distance: "10km",
        description: "Ruộng bậc thang đẹp nhất",
      },
      {
        name: "Đèo Ô Quy Hồ",
        distance: "30km",
        description: "Một trong tứ đại đỉnh đèo Việt Nam",
      },
    ],
    activities: [
      {
        name: "Chinh phục Fansipan",
        description: "Lên đỉnh bằng cáp treo hoặc trekking",
        time: "4-8 giờ (tùy cách)",
        price: "Cáp treo: 600.000 - 700.000 VND",
      },
      {
        name: "Trekking ruộng bậc thang",
        description: "Đi bộ qua các bản làng dân tộc",
        time: "3-6 giờ",
        price: "300.000 - 500.000 VND (thuê guide)",
      },
      {
        name: "Homestay bản làng",
        description: "Trải nghiệm sống cùng người dân tộc",
        time: "1 đêm",
        price: "150.000 - 300.000 VND/người",
      },
    ],
    bestTimeToVisit: "Tháng 3-5 (hoa mùa xuân), tháng 9-10 (lúa chín)",
    openingHours: "24/7",
    entryFee: "Miễn phí (điểm tham quan tính riêng)",
    timeNeeded: "2-3 ngày",
    coordinates: { lat: 22.3364, lng: 103.8438 },
    thumbnail:
      "https://veelzijdigvietnam.nl/wp-content/uploads/2022/09/Sa-Pa.jpg",
    images: [
      "https://static.toiimg.com/photo/msid-100795741,width-96,height-65.cms",
    ],
    tips: [
      "Mang theo áo ấm, Sa Pa lạnh quanh năm",
      "Đi vào mùa lúa chín để ngắm ruộng bậc thang đẹp nhất",
      "Thuê guide địa phương để trekking an toàn",
      "Thử thịt trâu gác bếp và rượu ngô đặc sản",
    ],
    faqs: [
      {
        q: "Sa Pa có tuyết rơi không?",
        a: "Hiếm khi có tuyết, thường chỉ có băng giá vào tháng 12-1 khi nhiệt độ xuống dưới 0°C.",
      },
    ],
    reviews: [],
  },
  {
    id: "da-lat",
    name: "Đà Lạt",
    location: "Lâm Đồng",
    region: "Miền Nam",
    category: "Adventure",
    type: "Thành phố",
    description:
      "Thành phố ngàn hoa với khí hậu mát mẻ, thác nước hùng vĩ, đồi chè xanh mướt và kiến trúc Pháp cổ kính.",
    introduction:
      "Đà Lạt - 'thành phố ngàn hoa' nằm trên cao nguyên Lâm Viên, độ cao 1.500m, có khí hậu ôn đới quanh năm với nhiệt độ trung bình 18-24°C. Từng là khu nghỉ dưỡng của thực dân Pháp, Đà Lạt giữ được nhiều công trình kiến trúc Pháp đẹp như nhà ga, biệt thự cổ.\n\nThành phố nổi tiếng với các thác nước đẹp (Datanla, Pongour, Prenn), hồ Xuân Hương thơ mộng, Thung lũng Tình Yêu, và đồi chè Cầu Đất. Đà Lạt cũng là nơi trồng hoa, rau, cà phê chất lượng cao.\n\nDu khách có thể tham quan làng hoa Vạn Thành, đạp xe quanh hồ Xuân Hương, chơi canyoning, hoặc thưởng thức ẩm thực độc đáo như bánh tráng nướng, sữa đậu nành, lẩu gà lá é.",
    highlights: [
      "Hồ Xuân Hương",
      "Thác Datanla - Canyoning",
      "Đồi chè Cầu Đất",
      "Nhà ga Đà Lạt",
      "Chợ Đà Lạt - ẩm thực đêm",
    ],
    nearbyAttractions: [
      {
        name: "Thung lũng Tình Yêu",
        distance: "5km",
        description: "Thung lũng hoa đẹp lãng mạn",
      },
      {
        name: "Thiền viện Trúc Lâm",
        distance: "8km",
        description: "Chùa trên núi, đi cáp treo",
      },
    ],
    activities: [
      {
        name: "Canyoning thác Datanla",
        description: "Trượt thác, nhảy thác cực thú vị",
        time: "2-3 giờ",
        price: "450.000 - 650.000 VND",
      },
      {
        name: "Tour ngắm hoàng hôn đồi chè",
        description: "Chụp ảnh tại đồi chè Cầu Đất",
        time: "2 giờ",
        price: "200.000 - 300.000 VND",
      },
      {
        name: "Đạp xe quanh hồ Xuân Hương",
        description: "Thuê xe đạp đôi, ngắm cảnh thành phố",
        time: "1-2 giờ",
        price: "50.000 - 100.000 VND",
      },
    ],
    bestTimeToVisit: "Quanh năm (mùa hoa tháng 12-4)",
    openingHours: "24/7",
    entryFee: "Miễn phí (điểm tham quan tính riêng)",
    timeNeeded: "2-3 ngày",
    coordinates: { lat: 11.9404, lng: 108.4583 },
    thumbnail:
      "https://img6.thuthuatphanmem.vn/uploads/2022/03/04/background-da-lat_034631315.jpg",
    images: [
      "https://th.bing.com/th/id/R.9bd25a8a13dc710518e5b16a32206827?rik=inJpr8HqTTI1fw&pid=ImgRaw&r=0",
    ],
    tips: [
      "Mang áo khoác vì Đà Lạt mát vào buổi sáng và tối",
      "Thử cà phê Mê Linh hoặc cà phê chồn",
      "Đi chợ đêm để ăn vặt và mua hoa tươi",
      "Thuê xe máy để tự do khám phá",
    ],
    faqs: [
      {
        q: "Đà Lạt có lạnh không?",
        a: "Có, nhiệt độ dao động 15-24°C, buổi sáng và tối khá lạnh, cần mang áo ấm.",
      },
    ],
    reviews: [],
  },
  {
    id: "ben-thanh-market",
    name: "Chợ Bến Thành",
    location: "TP. Hồ Chí Minh",
    region: "Miền Nam",
    category: "Food & Shopping",
    type: "Chợ",
    description:
      "Biểu tượng của Sài Gòn với ẩm thực đường phố đa dạng, mua sắm sầm uất và kiến trúc độc đáo.",
    introduction:
      "Chợ Bến Thành là một trong những địa điểm du lịch nổi tiếng nhất TP. Hồ Chí Minh, được xây dựng từ năm 1914. Với kiến trúc đồng hồ đặc trưng ở cổng chính, chợ đã trở thành biểu tượng của thành phố.\n\nBên trong chợ có hơn 3.000 gian hàng bán đủ loại mặt hàng từ thời trang, lưu niệm, thủ công mỹ nghệ đến ẩm thực. Đặc biệt, khu ẩm thực trong chợ phục vụ nhiều món đặc sản miền Nam như hủ tiếu, bún mắm, cơm tấm, chè.\n\nBuổi tối, chợ đêm Bến Thành mở cửa với hàng trăm quầy hàng ẩm thực đường phố, tạo nên bầu không khí sôi động.",
    highlights: [
      "Kiến trúc đồng hồ cổng chính",
      "Ẩm thực đường phố đa dạng",
      "Chợ đêm sầm uất",
      "Đồ lưu niệm Việt Nam",
      "Vải lụa, áo dài truyền thống",
    ],
    nearbyAttractions: [
      {
        name: "Phố đi bộ Nguyễn Huệ",
        distance: "500m",
        description: "Phố đi bộ hiện đại với đài phun nước",
      },
      {
        name: "Nhà Thờ Đức Bà",
        distance: "1km",
        description: "Công trình kiến trúc Pháp nổi tiếng",
      },
    ],
    activities: [
      {
        name: "Mua sắm đồ lưu niệm",
        description: "Mua quà, thủ công mỹ nghệ, áo dài",
        time: "1-2 giờ",
        price: "Tùy ngân sách",
      },
      {
        name: "Thưởng thức ẩm thực",
        description: "Ăn các món đặc sản miền Nam",
        time: "1 giờ",
        price: "50.000 - 150.000 VND/món",
      },
      {
        name: "Dạo chợ đêm",
        description: "Trải nghiệm chợ đêm từ 18h-23h",
        time: "2-3 giờ",
        price: "Miễn phí vào cửa",
      },
    ],
    bestTimeToVisit: "Quanh năm (tránh giờ cao điểm 10h-14h)",
    openingHours: "6:00 - 18:00 (chợ ngày), 18:00 - 23:00 (chợ đêm)",
    entryFee: "Miễn phí",
    timeNeeded: "2-3 giờ",
    coordinates: { lat: 10.7722, lng: 106.698 },
    thumbnail:
      "https://dulichbandonghanh.com/wp-content/uploads/2023/06/Ben_Thanh_market_2.jpg",
    images: [
      "https://katana.bdatrip.com/image/w=0/https://images.bdatrip.com/2023/11/cke/cua-hang.jpg",
    ],
    tips: [
      "Mặc cả giá khi mua đồ",
      "Cẩn thận túi xách trong chợ đông người",
      "Đi buổi sáng sớm để tránh đông",
      "Thử các món ăn đường phố tại chợ đêm",
    ],
    faqs: [
      {
        q: "Chợ Bến Thành bán gì?",
        a: "Đủ loại: quần áo, giày dép, đồ lưu niệm, thực phẩm, ẩm thực, thủ công mỹ nghệ.",
      },
    ],
    reviews: [],
  },
  {
    id: "pho-co-36",
    name: "Phố Cổ 36 Phố Phường",
    location: "Hà Nội",
    region: "Miền Bắc",
    category: "Food & Shopping",
    type: "Khu phố",
    description:
      "Trung tâm thương mại lịch sử với kiến trúc nhà ống độc đáo, ẩm thực phong phú và văn hóa làng nghề truyền thống.",
    introduction:
      "Phố Cổ Hà Nội với 36 phố phường cổ kính là trung tâm thương mại và văn hóa có lịch sử hơn 1000 năm. Mỗi con phố mang tên một nghề thủ công truyền thống: Hàng Bạc, Hàng Đào, Hàng Mã, Hàng Gai...\n\nKiến trúc nhà ống (nhà ống) đặc trưng với mặt tiền hẹp, chiều sâu dài là nét độc đáo của Phố Cổ. Cuối tuần, khu vực trở thành phố đi bộ sôi động với nghệ thuật đường phố, ẩm thực và mua sắm.\n\nPhố Cổ là thiên đường ẩm thực với vô số món đặc sản: phở, bún chả, chả cá Lã Vọng, bánh cuốn, trà chanh, cà phê trứng... Du khách có thể dạo phố, mua sắm, thưởng thức ẩm thực và trải nghiệm nhịp sống người Hà Nội.",
    highlights: [
      "36 phố phường lịch sử",
      "Kiến trúc nhà ống",
      "Phố đi bộ cuối tuần",
      "Ẩm thực đường phố đa dạng",
      "Chợ Đồng Xuân",
    ],
    nearbyAttractions: [
      {
        name: "Hồ Hoàn Kiếm",
        distance: "300m",
        description: "Hồ biểu tượng Hà Nội",
      },
      {
        name: "Nhà Hát Lớn",
        distance: "700m",
        description: "Kiến trúc Pháp đẹp nhất",
      },
    ],
    activities: [
      {
        name: "Dạo phố cuối tuần",
        description: "Phố đi bộ từ 19h thứ 7 đến 24h CN",
        time: "2-3 giờ",
        price: "Miễn phí",
      },
      {
        name: "Food tour",
        description: "Thử các món ăn đặc sản Hà Nội",
        time: "2-3 giờ",
        price: "300.000 - 600.000 VND",
      },
      {
        name: "Mua sắm đồ thủ công",
        description: "Mua lụa, tranh, đồ gỗ, lacquerware",
        time: "1-2 giờ",
        price: "Tùy ngân sách",
      },
    ],
    bestTimeToVisit: "Quanh năm (cuối tuần có phố đi bộ)",
    openingHours: "24/7",
    entryFee: "Miễn phí",
    timeNeeded: "3-4 giờ",
    coordinates: { lat: 21.0355, lng: 105.8495 },
    thumbnail:
      "https://static.vinwonders.com/production/ha-noi-36-pho-phuong-4.jpg",
    images: ["https://statics.vinpearl.com/36-pho-phuong-3_1688917141.jpg"],
    tips: [
      "Đi bộ hoặc thuê xe đạp để dễ di chuyển",
      "Thử bún chả, phở, cà phê trứng",
      "Cuối tuần đến sớm để tránh đông",
      "Mặc cả khi mua đồ lưu niệm",
    ],
    faqs: [
      {
        q: "Phố đi bộ mở khi nào?",
        a: "Từ 19h thứ 7 đến 24h Chủ nhật hàng tuần.",
      },
    ],
    reviews: [],
  },
  {
    id: "ba-na-hills",
    name: "Bà Nà Hills",
    location: "Đà Nẵng",
    region: "Miền Trung",
    category: "Adventure",
    type: "Khu du lịch",
    description:
      "Khu du lịch trên núi với Cầu Vàng nổi tiếng, cáp treo kỷ lục và làng Pháp cổ kính.",
    introduction:
      "Bà Nà Hills là khu du lịch nghỉ dưỡng nằm trên đỉnh núi Bà Nà, độ cao 1.487m so với mực nước biển. Nơi đây nổi tiếng với Cầu Vàng (Golden Bridge) được nâng đỡ bởi đôi bàn tay khổng lồ - công trình kiến trúc độc đáo được truyền thông quốc tế ca ngợi.\n\nHệ thống cáp treo Bà Nà giữ nhiều kỷ lục thế giới: dài nhất, chênh lệch độ cao lớn nhất. Trên đỉnh núi có làng Pháp với kiến trúc châu Âu cổ kính, vườn hoa Le Jardin d'Amour, Fantasy Park - công viên giải trí trong nhà lớn nhất Đông Nam Á.\n\nKhí hậu Bà Nà mát mẻ quanh năm (15-20°C), có 4 mùa trong ngày. Du khách có thể tham quan chùa Linh Ứng, thưởng thức ẩm thực, chơi game tại Fantasy Park.",
    highlights: [
      "Cầu Vàng - Golden Bridge",
      "Cáp treo kỷ lục Guinness",
      "Làng Pháp cổ kính",
      "Fantasy Park",
      "Vườn hoa Le Jardin",
    ],
    nearbyAttractions: [
      {
        name: "Bãi biển Mỹ Khê",
        distance: "25km",
        description: "Bãi biển đẹp nhất Đà Nẵng",
      },
      {
        name: "Ngũ Hành Sơn",
        distance: "30km",
        description: "Quần thể núi đá vôi có động",
      },
    ],
    activities: [
      {
        name: "Vé tham quan toàn khu",
        description: "Cáp treo + Fantasy Park + tất cả điểm tham quan",
        time: "Cả ngày",
        price: "750.000 - 850.000 VND/người",
      },
      {
        name: "Chụp ảnh Cầu Vàng",
        description: "Check-in điểm sống ảo nổi tiếng",
        time: "30 phút",
        price: "Bao gồm trong vé",
      },
      {
        name: "Chơi game Fantasy Park",
        description: "Hơn 90 trò chơi trong nhà",
        time: "3-4 giờ",
        price: "Bao gồm trong vé",
      },
    ],
    bestTimeToVisit: "Quanh năm (tránh mưa to tháng 9-12)",
    openingHours: "7:00 - 22:00",
    entryFee: "750.000 - 850.000 VND (bao gồm cáp treo và tất cả trò chơi)",
    timeNeeded: "1 ngày",
    coordinates: { lat: 15.9959, lng: 107.9983 },
    thumbnail:
      "https://tiki.vn/blog/wp-content/uploads/2023/03/ba-na-hills.jpg",
    images: [
      "https://dulichconvoi.com/wp-content/uploads/2023/04/Banahill-D-1-1-scaled.jpg",
    ],
    tips: [
      "Đi sớm để tránh đông (7h-8h)",
      "Mang áo khoác vì trên núi lạnh",
      "Đặt vé online để được giảm giá",
      "Dành cả ngày để khám phá hết khu vực",
    ],
    faqs: [
      {
        q: "Bà Nà Hills có lạnh không?",
        a: "Có, nhiệt độ 15-20°C, cần mang áo khoác.",
      },
    ],
    reviews: [],
  },
  {
    id: "mui-ne",
    name: "Mũi Né",
    location: "Bình Thuận",
    region: "Miền Nam",
    category: "Beach",
    type: "Bãi biển",
    description:
      "Bãi biển với đồi cát đỏ, đồi cát trắng, suối tiên và các môn thể thao biển sôi động.",
    introduction:
      "Mũi Né là bãi biển nổi tiếng nằm ở thành phố Phan Thiết, cách TP. HCM khoảng 200km. Nơi đây nổi tiếng với cảnh quan độc đáo: đồi cát đỏ, đồi cát trắng như sa mạc Sahara thu nhỏ, và suối Tiên với dòng nước trong vắt chảy giữa cát.\n\nMũi Né là thiên đường cho các môn thể thao biển như lướt ván diều (kitesurfing), lướt sóng. Bãi biển dài với cát mịn, nước trong xanh rất thích hợp tắm biển và nghỉ dưỡng.\n\nKhu vực còn có làng chài truyền thống, chợ hải sản Mũi Né buổi sáng, và nhiều resort cao cấp. Du khách có thể thuê ATV để khám phá đồi cát, xem bình minh tại Hòn Rơm.",
    highlights: [
      "Đồi cát đỏ & đồi cát trắng",
      "Suối Tiên",
      "Lướt ván diều",
      "Làng chài Mũi Né",
      "Hải sản tươi ngon",
    ],
    nearbyAttractions: [
      {
        name: "Tháp Chàm Poshanu",
        distance: "10km",
        description: "Tháp Chăm cổ trên đồi",
      },
      {
        name: "Hòn Rơm",
        distance: "15km",
        description: "Ngắm bình minh đẹp nhất",
      },
    ],
    activities: [
      {
        name: "Khám phá đồi cát",
        description: "Thuê ATV hoặc jeep khám phá đồi cát",
        time: "2-3 giờ",
        price: "200.000 - 400.000 VND",
      },
      {
        name: "Lướt ván diều",
        description: "Học và chơi kitesurfing",
        time: "1 ngày",
        price: "1.500.000 - 3.000.000 VND/khóa học",
      },
      {
        name: "Tour suối Tiên",
        description: "Đi bộ khám phá suối nước ngọt",
        time: "1-2 giờ",
        price: "25.000 VND vé vào cửa",
      },
    ],
    bestTimeToVisit: "Tháng 11-4 (ít mưa, gió thổi phù hợp lướt ván)",
    openingHours: "24/7",
    entryFee: "Miễn phí (điểm tham quan tính riêng)",
    timeNeeded: "2-3 ngày",
    coordinates: { lat: 10.9333, lng: 108.2833 },
    thumbnail:
      "https://booking.pystravel.vn/uploads/posts/avatar/1686049084.jpeg",
    images: [
      "https://wanderlusttips.asia/wp-content/uploads/2023/04/Cung-Centara-Mirage-Resort-Mui-Ne-nang-tam-nghi-duong-voi-hang-phong-moi-Premier-Pool-Access-1.jpg",
    ],
    tips: [
      "Thuê xe máy để tự do di chuyển",
      "Xem bình minh ở Hòn Rơm rất đẹp",
      "Mang giày thể thao khi lên đồi cát",
      "Thử hải sản tươi sống tại chợ Mũi Né",
    ],
    faqs: [
      {
        q: "Mũi Né có gì đặc biệt?",
        a: "Đồi cát đỏ/trắng độc đáo, suối Tiên, và môn lướt ván diều nổi tiếng.",
      },
    ],
    reviews: [],
  },
  // Thêm các địa danh khác...
];

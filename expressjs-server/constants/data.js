import bcrypt from "bcryptjs";

const data = {
  products: [
    // {
    //     name: 'K 39',
    //     brand: 'Apple',
    //     category: 'Solar light',
    //     description: 'Một sản phẩm tốt',
    //     specification: ".",
    //     price: 245,
    //     rating: 2.3,
    //     numOfReviews: 10,
    //     image: 'https://happysolar.vn/wp-content/uploads/2020/09/z2111150120666_91fb845dafebed81722c9df8a8bf53bf.jpg',
    //     countInStock: 1000,
    // }

    {
      description:
        "<p>Đèn pha led năng lượng mặt trời JD8825L, công suất 25w</p><p>Chíp led SMD 5730 công suất cao 72Led. Thời gian chiếu sáng: 10-12h/ngày.</p><p>Không gian chiếu sáng: khoảng 60m2</p><p>Thân đèn: Nhôm sơn tĩnh điện được đúc nguyên khối có phay rãnh tản nhiệt. Chống nước: IP67</p><p>Kích thước đèn: 210*178*40 mm, Có đèn báo dung lượng pin</p><p>Kích thước tấm pin Poly: 340*175*17 mm, tuổi thọ 10-12 năm</p><p>Điện áp đầu vào tấm pin: 6v/14w, tuổi thọ 10-12 năm</p><p>Dung lượng pin Lithium: 9.600 mAh. Thời gian sạc: 4-6 giờ</p><p>Bộ sản phẩm gồm: Khung gắn chữ U/ đèn và remote</p><p>Bảo hành: 2 năm</p><p></p>",
      active: true,
      name: "JD-8825L (25w)",
      brand: "Apple",
      category: "Solar light",
      specification:
        "<p>Đèn pha led năng lượng mặt trời JD8825L, công suất 25w</p><p>Chíp led SMD 5730 công suất cao 72Led. Thời gian chiếu sáng: 10-12h/ngày.</p><p>Không gian chiếu sáng: khoảng 60m2</p><p>Thân đèn: Nhôm sơn tĩnh điện được đúc nguyên khối có phay rãnh tản nhiệt. Chống nước: IP67</p><p>Kích thước đèn: 210*178*40 mm, Có đèn báo dung lượng pin</p><p>Kích thước tấm pin Poly: 340*175*17 mm, tuổi thọ 10-12 năm</p><p>Điện áp đầu vào tấm pin: 6v/14w, tuổi thọ 10-12 năm</p><p>Dung lượng pin Lithium: 9.600 mAh. Thời gian sạc: 4-6 giờ</p><p>Bộ sản phẩm gồm: Khung gắn chữ U/ đèn và remote</p><p>Bảo hành: 2 năm</p><p></p>",
      price: 670000,
      rating: 5,
      numOfReviews: 0,
      images: [{name: "JD-8825L (25w)", url:"/resource/uploads/1618939162145.jpg"}],
      countInStock: 1000,
    },
    {
      description:
        "<p>Đèn pha led năng lượng mặt trời JD8840L, công suất 40w</p><p>Chíp led SMD 5730 công suất cao 110Led. Thời gian chiếu sáng: 10-12h/ngày</p><p>Không gian chiếu sáng: khoảng 90m2</p><p>Thân đèn: Nhôm sơn tĩnh điện được đúc nguyên khối có phay rãnh tản nhiệt. Chống nước: IP67</p><p>Kích thước đèn: 220*255*45 mm, Có đèn báo dung lượng pin</p><p>Kích thước tấm pin Poly: 340*290*17 mm</p><p>Điện áp đầu vào tấm pin: 6v/18w. tuổi thọ 10-12 năm</p><p>Dung lượng pin Lithium: 12.800 mAh. Thời gian sạc: 4-6 giờ </p><p>Bộ sản phẩm gồm: Khung gắn chữ U/ đèn và remote</p><p>Bảo hành: 2 năm</p>",
      active: true,
      name: "JD-8840L (40w)",
      category: "Solar light",
      brand: "Việt SOLAR",
      price: 870000,
      rating: 5,
      numOfReviews: 0,
      images: [{name: "JD-8825L (25w)", url:"/resource/uploads/1618939162145.jpg"}],
      specification:
        "<p>Đèn pha led năng lượng mặt trời JD8840L, công suất 40w</p><p>Chíp led SMD 5730 công suất cao 110Led. Thời gian chiếu sáng: 10-12h/ngày</p><p>Không gian chiếu sáng: khoảng 90m2</p><p>Thân đèn: Nhôm sơn tĩnh điện được đúc nguyên khối có phay rãnh tản nhiệt. Chống nước: IP67</p><p>Kích thước đèn: 220*255*45 mm, Có đèn báo dung lượng pin</p><p>Kích thước tấm pin Poly: 340*290*17 mm</p><p>Điện áp đầu vào tấm pin: 6v/18w. tuổi thọ 10-12 năm</p><p>Dung lượng pin Lithium: 12.800 mAh. Thời gian sạc: 4-6 giờ </p><p>Bộ sản phẩm gồm: Khung gắn chữ U/ đèn và remote</p><p>Bảo hành: 2 năm</p>",
      countInStock: 100,
    },
    {
      description:
        "<p><p>Đèn pha led năng lượng mặt trời JD8860L, công suất 60w</p><p>Chíp led SMD công suất cao 156Led. Thời gian chiếu sáng: 10-12h/ngày.</p><p>Không gian chiếu sáng: khoảng 120m2</p><p>Thân đèn: Nhôm sơn tĩnh điện được đúc nguyên khối có phay rãnh tản nhiệt. Chống nước: IP67</p><p>Kích thước đèn: 223*282*50 mm, Có đèn báo dung lượng pin</p><p>Kích thước tấm pin Poly: 340*500*17 mm</p><p>Điện áp đầu vào tấm pin: 6v/22w tuổi thọ 10-12 năm</p><p>Dung lượng pin: 16.000 mAh. Thời gian sạc: 4-6 giờ</p><p>Bộ sản phẩm gồm: Khung gắn chữ U/ đèn và remote</p><p>Bảo hành: 2 năm</p></p>",
      active: true,
      name: "JD-8860L   (60w)",
      category: "Việt SOLAR",
      brand: "Việt SOLAR",
      price: 1070000,
      rating: 5,
      numOfReviews: 0,
      images: [{name: "JD-8825L (25w)", url:"/resource/uploads/1618939162145.jpg"}],
      specification:
        "<p><p>Đèn pha led năng lượng mặt trời JD8860L, công suất 60w</p><p>Chíp led SMD công suất cao 156Led. Thời gian chiếu sáng: 10-12h/ngày.</p><p>Không gian chiếu sáng: khoảng 120m2</p><p>Thân đèn: Nhôm sơn tĩnh điện được đúc nguyên khối có phay rãnh tản nhiệt. Chống nước: IP67</p><p>Kích thước đèn: 223*282*50 mm, Có đèn báo dung lượng pin</p><p>Kích thước tấm pin Poly: 340*500*17 mm</p><p>Điện áp đầu vào tấm pin: 6v/22w tuổi thọ 10-12 năm</p><p>Dung lượng pin: 16.000 mAh. Thời gian sạc: 4-6 giờ</p><p>Bộ sản phẩm gồm: Khung gắn chữ U/ đèn và remote</p><p>Bảo hành: 2 năm</p></p>",
      countInStock: 100,
    },
    {
      description:
        "<p>Đèn pha led năng lượng mặt trời JD8800L, công suất 100w</p><p>Chíp led SMD 5730 công suất cao 256Led. Thời gian chiếu sáng: 10-12h/ngày.</p><p>Không gian chiếu sáng: khoảng 200m2</p><p>Thân đèn: Nhôm sơn tĩnh điện được đúc nguyên khối có phay rãnh tản nhiệt. Chống nước: IP67</p><p>Kích thước đèn: 330*290*60 mm, Có đèn báo dung lượng pin </p><p>Kích thước tấm pin Poly: 580*360*17 mm</p><p>Điện áp đầu vào tấm pin: 6v/35w tuổi thọ 10-12 năm</p><p>Dung lượng pin: 36.000 mAh. Thời gian sạc: 4-6 giờ</p><p>Bộ sản phẩm gồm: Khung gắn chữ U/ đèn và remote</p><p>Bảo hành: 2 năm</p>",
      active: true,
      name: "JD-8800L (100w)",
      category: "Solar light",
      brand: "Việt SOLAR",
      price: 1290000,
      rating: 5,
      numOfReviews: 0,
      images: [{name: "JD-8825L (25w)", url:"/resource/uploads/1618939162145.jpg"}],
      specification:
        "<p>Đèn pha led năng lượng mặt trời JD8800L, công suất 100w</p><p>Chíp led SMD 5730 công suất cao 256Led. Thời gian chiếu sáng: 10-12h/ngày.</p><p>Không gian chiếu sáng: khoảng 200m2</p><p>Thân đèn: Nhôm sơn tĩnh điện được đúc nguyên khối có phay rãnh tản nhiệt. Chống nước: IP67</p><p>Kích thước đèn: 330*290*60 mm, Có đèn báo dung lượng pin </p><p>Kích thước tấm pin Poly: 580*360*17 mm</p><p>Điện áp đầu vào tấm pin: 6v/35w tuổi thọ 10-12 năm</p><p>Dung lượng pin: 36.000 mAh. Thời gian sạc: 4-6 giờ</p><p>Bộ sản phẩm gồm: Khung gắn chữ U/ đèn và remote</p><p>Bảo hành: 2 năm</p>",
      countInStock: 100,
    },
    {
      description:
        "<p>Đèn pha led năng lượng mặt trời JD8200L, công suất 200w</p><p>Chíp led SMD 5730 công suất cao 400Led. Thời gian chiếu sáng:10-12h/ngày.</p><p>Không gian chiếu sáng: khoảng 300m2</p><p>Thân đèn: Nhôm sơn tĩnh điện được đúc nguyên khối có phay rãnh tản nhiệt. Chống nước: IP67</p><p>Kích thước đèn: 375*330*65 mm, Có đèn báo dung lượng pin </p><p>Kích thước tấm pin Poly: 580*360*17 mm</p><p>Điện áp đầu vào tấm pin: 6v/48w, tuổi thọ 10-12 năm</p><p>Dung lượng pin: 40.000 mAh. Thời gian sạc: 4-6 giờ </p><p>Bộ sản phẩm gồm: Khung gắn chữ U/ đèn và remote</p><p>Bảo hành: 2 năm</p>",
      active: true,
      name: "JD-8200L (200w)",
      category: "Solar light",
      brand: "Việt SOLAR",
      price: 1490000,
      rating: 5,
      numOfReviews: 0,
      images: [{name: "JD-8825L (25w)", url:"/resource/uploads/1618939162145.jpg"}],
      specification:
        "<p>Đèn pha led năng lượng mặt trời JD8200L, công suất 200w</p><p>Chíp led SMD 5730 công suất cao 400Led. Thời gian chiếu sáng:10-12h/ngày.</p><p>Không gian chiếu sáng: khoảng 300m2</p><p>Thân đèn: Nhôm sơn tĩnh điện được đúc nguyên khối có phay rãnh tản nhiệt. Chống nước: IP67</p><p>Kích thước đèn: 375*330*65 mm, Có đèn báo dung lượng pin </p><p>Kích thước tấm pin Poly: 580*360*17 mm</p><p>Điện áp đầu vào tấm pin: 6v/48w, tuổi thọ 10-12 năm</p><p>Dung lượng pin: 40.000 mAh. Thời gian sạc: 4-6 giờ </p><p>Bộ sản phẩm gồm: Khung gắn chữ U/ đèn và remote</p><p>Bảo hành: 2 năm</p>",
      countInStock: 100,
    },
    {
      description:
        "<p>Đèn pha led năng lượng mặt trời JD8300L, công suất 300w</p><p>Chíp led: SMD 5730 công suất cao 696Led. Thời gian chiếu hàng 12h-24h/ngày</p><p>Không gian chiếu sáng khoảng 400m2</p><p>Thân đèn: Nhôm sơn tỉnh điện được đúc nguyên khối có phay rãnh tản nhiệt. Chống nước: IP67</p><p>Kích thước đèn: 415*365*90 mm, Có đèn báo dung lượng pin</p><p>Kích thước tấm pin Poly: 720*420*17 mm</p><p>Điện áp  đầu vào tấm pin 6v/55w,  tuổi thọ 10-12 năm</p><p>Dung lượng pin Lithium: 60.000 mAh. Thời gian sạc: 4-6 giờ. </p><p>Bộ sản phẩm gồm: Khung gắn chữ U/ đèn và remote</p><p>Bảo hành: 2 năm</p>",
      active: true,
      name: "JD-8300L (300w)",
      category: "Solar light",
      brand: "Việt SOLAR",
      price: 1690000,
      rating: 5,
      numOfReviews: 0,
      images: [{name: "JD-8825L (25w)", url:"/resource/uploads/1618939162145.jpg"}],
      specification:
        "<p>Đèn pha led năng lượng mặt trời JD8300L, công suất 300w</p><p>Chíp led: SMD 5730 công suất cao 696Led. Thời gian chiếu hàng 12h-24h/ngày</p><p>Không gian chiếu sáng khoảng 400m2</p><p>Thân đèn: Nhôm sơn tỉnh điện được đúc nguyên khối có phay rãnh tản nhiệt. Chống nước: IP67</p><p>Kích thước đèn: 415*365*90 mm, Có đèn báo dung lượng pin</p><p>Kích thước tấm pin Poly: 720*420*17 mm</p><p>Điện áp  đầu vào tấm pin 6v/55w,  tuổi thọ 10-12 năm</p><p>Dung lượng pin Lithium: 60.000 mAh. Thời gian sạc: 4-6 giờ. </p><p>Bộ sản phẩm gồm: Khung gắn chữ U/ đèn và remote</p><p>Bảo hành: 2 năm</p>",
      countInStock: 100,
    },
    {
      description:
        "<p>Đèn đường năng lượng mặt trời</p><p>Đèn LED: 84 cái 3030LED</p><p>Bảng điều khiển năng lượng mặt trời: 6V 12W, đa tinh thể</p><p>Loại pin: Lithium-Ion 3.2V 6AH</p><p>Thời gian sạc: 4 - 6 giờ</p><p>Thời gian làm việc: 10-15 ngày hoặc nhiều mây</p><p>Chất liệu: nhôm + kính cường lực</p><p>Kích thước đèn: 392 * 161 * 48mm</p><p>Bảng điều khiển siza: 340 * 240 * 17mm</p><p>Chiều cao lắp đặt: 3-5 m</p><p>Bảo hành: 2 năm</p><p>8 chiếc / ctn 23kg / caton 87 * 45 * 35 </p>",
      active: true,
      name: "JD -198 (80w)",
      category: "Solar light",
      brand: "Việt SOLAR",
      price: 990000,
      rating: 5,
      numOfReviews: 0,
      images: [{name: "JD-8825L (25w)", url:"/resource/uploads/1618939162145.jpg"}],
      specification:
        "<p>Đèn đường năng lượng mặt trời</p><p>Đèn LED: 84 cái 3030LED</p><p>Bảng điều khiển năng lượng mặt trời: 6V 12W, đa tinh thể</p><p>Loại pin: Lithium-Ion 3.2V 6AH</p><p>Thời gian sạc: 4 - 6 giờ</p><p>Thời gian làm việc: 10-15 ngày hoặc nhiều mây</p><p>Chất liệu: nhôm + kính cường lực</p><p>Kích thước đèn: 392 * 161 * 48mm</p><p>Bảng điều khiển siza: 340 * 240 * 17mm</p><p>Chiều cao lắp đặt: 3-5 m</p><p>Bảo hành: 2 năm</p><p>8 chiếc / ctn 23kg / caton 87 * 45 * 35 </p>",
      countInStock: 100,
    },
    {
      description:
        "<p>Đèn đường năng lượng mặt trời 100W</p><p>Đèn LED: 126 cái 3030LED</p><p>Bảng điều khiển năng lượng mặt trời: 6V 22W, đa tinh thể</p><p>Loại pin: Lithium-Ion 3.2V 18AH</p><p>Thời gian sạc: 4 - 6 giờ</p><p>Thời gian làm việc: 10-15 ngày hoặc nhiều mây</p><p>Chất liệu: nhôm + kính cường lực</p><p>Kích thước đèn: 491 * 210 * 50mm</p><p>Bảng điều khiển siza: 500 * 340 * 17mm</p><p>Chiều cao cài đặt: 5-6 m</p><p>Bảo hành: 2 năm</p><p>6 cái / ctn 32,8kg / caton 65 * 61 * 40cm</p>",
      active: true,
      name: "JD-298 (100W)",
      category: "Solar light",
      brand: "Việt SOLAR",
      price: 1190000,
      rating: 5,
      numOfReviews: 0,
      images: [{name: "JD-8825L (25w)", url:"/resource/uploads/1618939162145.jpg"}],
      specification:
        "<p>Đèn đường năng lượng mặt trời 100W</p><p>Đèn LED: 126 cái 3030LED</p><p>Bảng điều khiển năng lượng mặt trời: 6V 22W, đa tinh thể</p><p>Loại pin: Lithium-Ion 3.2V 18AH</p><p>Thời gian sạc: 4 - 6 giờ</p><p>Thời gian làm việc: 10-15 ngày hoặc nhiều mây</p><p>Chất liệu: nhôm + kính cường lực</p><p>Kích thước đèn: 491 * 210 * 50mm</p><p>Bảng điều khiển siza: 500 * 340 * 17mm</p><p>Chiều cao cài đặt: 5-6 m</p><p>Bảo hành: 2 năm</p><p>6 cái / ctn 32,8kg / caton 65 * 61 * 40cm</p>",
      countInStock: 100,
    },
    {
      description:
        "<p>Đèn đường năng lượng mặt trời JD-399, công suất 70w</p><p>Chíp led SMD 3030 công suất cao 96 chíp. Thời gian chiếu sáng 10-12h/ngày. </p><p>Không gian chiếu sáng: 120m2.</p><p>Chất liệu: Nhôm đúc nguyên khối</p><p>Dung lượng pin 3.2V 16.500 mAh. Thời gian xạc 4-6h.</p><p>Kích thước thân đèn: 500 * 210 mm, Chống nước: IP65</p><p>Kích thước tấm pin Poly: 500 * 340mm, tuổi thọ 10-12 năm</p><p>Điện áp đầu vào của tấm pin: 6v/22w.</p><p>Bộ sản phẩm gồm: Đèn + điều khiển từ xa thông minh + Tấm pin năng lượng mặt trời + cần gắn đèn</p><p>Bảo hành: 2 năm</p>",
      active: true,
      name: "JD - 399 (100w)",
      category: "Solar light",
      brand: "Việt SOLAR",
      price: 1390000,
      rating: 5,
      numOfReviews: 0,
      images: [{name: "JD-8825L (25w)", url:"/resource/uploads/1618939162145.jpg"}],
      specification:
        "<p>Đèn đường năng lượng mặt trời JD-399, công suất 70w</p><p>Chíp led SMD 3030 công suất cao 96 chíp. Thời gian chiếu sáng 10-12h/ngày. </p><p>Không gian chiếu sáng: 120m2.</p><p>Chất liệu: Nhôm đúc nguyên khối</p><p>Dung lượng pin 3.2V 16.500 mAh. Thời gian xạc 4-6h.</p><p>Kích thước thân đèn: 500 * 210 mm, Chống nước: IP65</p><p>Kích thước tấm pin Poly: 500 * 340mm, tuổi thọ 10-12 năm</p><p>Điện áp đầu vào của tấm pin: 6v/22w.</p><p>Bộ sản phẩm gồm: Đèn + điều khiển từ xa thông minh + Tấm pin năng lượng mặt trời + cần gắn đèn</p><p>Bảo hành: 2 năm</p>",
      countInStock: 100,
    },
    {
      description:
        "<p>Đèn đường năng lượng mặt trời 200W</p><p>Chíp Led: SMD 3030 công suất cao 448Led</p><p>Tấm pin năng lượng mặt trời Poly: 6V/45W</p><p>Pin lưu trữ: Lithium-Ion 3.2V 36.000 mAh</p><p>Thời gian sạc: 4-6 giờ</p><p>Kích thước đèn: 557 * 240mm</p><p>Kích thước tấm pin: 670 * 445mm</p><p>Thời gian chiếu sáng: 12-20h/ngày</p><p>Chất liệu: nhôm + kính cường lực</p><p>Chiều cao lắp đặt: 6-8m</p><p>Bộ sản phẩm gồm: Đèn + điều khiển từ xa thông minh + Tấm pin năng lượng mặt trời + cần gắn đèn</p><p>Bảo hành: 2 năm</p>",
      active: true,
      name: "JD - 699 (200w)",
      category: "Solar light",
      brand: "Việt SOLAR",
      price: 1890000,
      rating: 5,
      numOfReviews: 0,
      images: [{name: "JD-8825L (25w)", url:"/resource/uploads/1618939162145.jpg"}],
      specification:
        "<p>Đèn đường năng lượng mặt trời 200W</p><p>Chíp Led: SMD 3030 công suất cao 448Led</p><p>Tấm pin năng lượng mặt trời Poly: 6V/45W</p><p>Pin lưu trữ: Lithium-Ion 3.2V 36.000 mAh</p><p>Thời gian sạc: 4-6 giờ</p><p>Kích thước đèn: 557 * 240mm</p><p>Kích thước tấm pin: 670 * 445mm</p><p>Thời gian chiếu sáng: 12-20h/ngày</p><p>Chất liệu: nhôm + kính cường lực</p><p>Chiều cao lắp đặt: 6-8m</p><p>Bộ sản phẩm gồm: Đèn + điều khiển từ xa thông minh + Tấm pin năng lượng mặt trời + cần gắn đèn</p><p>Bảo hành: 2 năm</p>",
      countInStock: 100,
    },
    {
      description:
        "<p>Đèn đường năng lượng mặt trời 300W</p><p>Tấm pin mặt trời: Poly 6V/60W</p><p>Pin Lithium sắt phosphate 3.2V 50.000 mAh</p><p>Chíp led: Chíp SMD 3030 công suất cao 126Led, nhiệt độ màu 6000K</p><p>Chất liệu: Kháng alumina</p><p>Cấp chống nước: IP66. Nhiệt độ làm việc: -15°C ÷ 80°C</p><p>Thời gian sạc: 4 - 6h. Thời gian chiếu sáng: ≥12h/ngày</p><p>Diện tích chiếu xạ: khoảng 300m2</p><p>Kích thước đèn: 620 * 310mm</p><p>Kích thước tấm pin: 700 * 700mm, tuổi thọ 10-12 năm</p><p>Sản phẩm gồm: đèn đường + tấm pin năng lượng mặt trời + điều khiển từ xa</p><p>Bảo hành: 2 năm</p>",
      active: true,
      name: "JD-798 (300w) ",
      category: "Solar light",
      brand: "Việt SOLAR",
      price: 2365000,
      rating: 5,
      numOfReviews: 0,
      images: [{name: "JD-8825L (25w)", url:"/resource/uploads/1618939162145.jpg"}],
      specification:
        "<p>Đèn đường năng lượng mặt trời 300W</p><p>Tấm pin mặt trời: Poly 6V/60W</p><p>Pin Lithium sắt phosphate 3.2V 50.000 mAh</p><p>Chíp led: Chíp SMD 3030 công suất cao 126Led, nhiệt độ màu 6000K</p><p>Chất liệu: Kháng alumina</p><p>Cấp chống nước: IP66. Nhiệt độ làm việc: -15°C ÷ 80°C</p><p>Thời gian sạc: 4 - 6h. Thời gian chiếu sáng: ≥12h/ngày</p><p>Diện tích chiếu xạ: khoảng 300m2</p><p>Kích thước đèn: 620 * 310mm</p><p>Kích thước tấm pin: 700 * 700mm, tuổi thọ 10-12 năm</p><p>Sản phẩm gồm: đèn đường + tấm pin năng lượng mặt trời + điều khiển từ xa</p><p>Bảo hành: 2 năm</p>",
      countInStock: 100,
    },
    {
      description:
        "<p>Công suất đèn: 90w.</p><p>Số lượng đèn led: 432 led</p><p>Pin sạc: Lithium 52000mAh 3.2V.</p><p>Kích thước đèn: 210 x 49c0mm</p><p>Tấm pin NLMT: 12V 55W</p><p>Kích thước tấm pin: 700x500x15 cm</p><p>Cảm biến ánh sáng và cảm biến hành động</p><p>Tấm pin công nghệ Poly, tuổi thọ lên đến 10-12 năm</p><p>Thời gian sạc: 4-6 tiếng, Thời gian chiếu sáng 14-16h</p><p>sản phẩm bao gồm: Đèn + Tâm Pin NLMT + Đk từ xa + Giá đỡ</p><p>Bảo hành:  2 năm</p>",
      active: true,
      name: "JD-9990s (90w)",
      category: "Solar light",
      brand: "Việt SOLAR",
      price: 2515000,
      rating: 5,
      numOfReviews: 0,
      images: [{name: "JD-8825L (25w)", url:"/resource/uploads/1618939162145.jpg"}],
      specification:
        "<p>Công suất đèn: 90w.</p><p>Số lượng đèn led: 432 led</p><p>Pin sạc: Lithium 52000mAh 3.2V.</p><p>Kích thước đèn: 210 x 49c0mm</p><p>Tấm pin NLMT: 12V 55W</p><p>Kích thước tấm pin: 700x500x15 cm</p><p>Cảm biến ánh sáng và cảm biến hành động</p><p>Tấm pin công nghệ Poly, tuổi thọ lên đến 10-12 năm</p><p>Thời gian sạc: 4-6 tiếng, Thời gian chiếu sáng 14-16h</p><p>sản phẩm bao gồm: Đèn + Tâm Pin NLMT + Đk từ xa + Giá đỡ</p><p>Bảo hành:  2 năm</p>",
      countInStock: 100,
    },
    {
      description:
        "<p>Đèn đường tích hợp ZL1960W Phương pháp điều khiển: điều khiển ánh sáng cộng với phiên bản điều khiển từ xa / cảm biến radar bảng điều khiển năng lượng mặt trời: silicon đa tinh thể / silicon đơn tinh thể (6V / 4W) Pin: 1 pin lithium sắt phosphate 5A LED SMD: 180 chip Sanan Chất liệu: ABS Mức độ chống thấm nước: IP65 Phương thức sạc, thời gian: sạc bằng năng lượng mặt trời, khoảng 6 giờ Thời gian chiếu sáng: khoảng 12 giờ chiếu sáng bền vững</p>",
      active: true,
      name: "ZL-1960 (60W)",
      category: "Solar light",
      brand: "Việt SOLAR",
      price: 339000,
      rating: 5,
      numOfReviews: 0,
      images: [{name: "JD-8825L (25w)", url:"/resource/uploads/1618939162145.jpg"}],
      specification:
        "<p>Đèn đường tích hợp ZL1960W Phương pháp điều khiển: điều khiển ánh sáng cộng với phiên bản điều khiển từ xa / cảm biến radar bảng điều khiển năng lượng mặt trời: silicon đa tinh thể / silicon đơn tinh thể (6V / 4W) Pin: 1 pin lithium sắt phosphate 5A LED SMD: 180 chip Sanan Chất liệu: ABS Mức độ chống thấm nước: IP65 Phương thức sạc, thời gian: sạc bằng năng lượng mặt trời, khoảng 6 giờ Thời gian chiếu sáng: khoảng 12 giờ chiếu sáng bền vững</p>",
      countInStock: 100,
    },
    {
      description:
        "<p>Điều khiển ánh sáng /Cảm Biến radar Chuyển động ,Tấm pin Silicon Poly (6v-10w) ,Pin lithium : 15.000mah ,Hạt led SMD : 216 Chip Sanan ,Chống nước IP67 ,Sạc từ 6-8 tiếng,thời gian chiếu sáng 12-14h/đêm, Có chế độ sáng liên tục,kèm điều khiển</p>",
      active: true,
      name: "ZL-1990 (90W)",
      category: "Solar light",
      brand: "Việt SOLAR",
      price: 990000,
      rating: 5,
      numOfReviews: 0,
      images: [{name: "JD-8825L (25w)", url:"/resource/uploads/1618939162145.jpg"}],
      specification:
        "<p>Điều khiển ánh sáng /Cảm Biến radar Chuyển động ,Tấm pin Silicon Poly (6v-10w) ,Pin lithium : 15.000mah ,Hạt led SMD : 216 Chip Sanan ,Chống nước IP67 ,Sạc từ 6-8 tiếng,thời gian chiếu sáng 12-14h/đêm, Có chế độ sáng liên tục,kèm điều khiển</p>",
      countInStock: 100,
    },
    {
      description:
        "<p>Điều khiển ánh sáng /Cảm Biến radar Chuyển động ,Tấm pin Silicon Poly (6v-15w) ,Pin lithium : 20.000mah ,Hạt led SMD : 288 Chip Sanan ,Chống nước IP67 ,Sạc từ 6-8 tiếng,thời gian chiếu sáng 12-14h/đêm, Có chế độ sáng liên tục,kèm điều khiển</p>",
      active: true,
      name: "ZL-19120 (120W)",
      category: "Solar light",
      brand: "Việt SOLAR",
      price: 1190000,
      rating: 5,
      numOfReviews: 0,
      images: [{name: "JD-8825L (25w)", url:"/resource/uploads/1618939162145.jpg"}],
      specification:
        "<p>Điều khiển ánh sáng /Cảm Biến radar Chuyển động ,Tấm pin Silicon Poly (6v-15w) ,Pin lithium : 20.000mah ,Hạt led SMD : 288 Chip Sanan ,Chống nước IP67 ,Sạc từ 6-8 tiếng,thời gian chiếu sáng 12-14h/đêm, Có chế độ sáng liên tục,kèm điều khiển</p>",
      countInStock: 100,
    },
    {
      description:
        "<p>Phương pháp điều khiển: điều khiển ánh sáng cộng với phiên bản điều khiển từ xa, kích thước bảng điều khiển năng lượng mặt trời 670 * 445 * 17mm</p><p>Bảng điều khiển năng lượng mặt trời: polysilicon / (6V / 50W)</p><p>Pin: 60.000mA pin lithium sắt phosphate ( 10 pin )</p><p>Hạt đèn SMD: 936 chip Sanan</p><p>Chất liệu: ABS + nhôm đúc Số đóng gói: 1 bộ / thùng</p><p>Kích thước hộp: 71CM * 48CM * 17CM Trọng lượng cả hộp: 9,7 kg</p>",
      active: true,
      name: "ZL-79300 (300W)",
      category: "Solar light",
      brand: "Việt SOLAR",
      price: 2490000,
      rating: 5,
      numOfReviews: 0,
      images: [{name: "JD-8825L (25w)", url:"/resource/uploads/1618939162145.jpg"}],
      specification:
        "<p>Phương pháp điều khiển: điều khiển ánh sáng cộng với phiên bản điều khiển từ xa, kích thước bảng điều khiển năng lượng mặt trời 670 * 445 * 17mm</p><p>Bảng điều khiển năng lượng mặt trời: polysilicon / (6V / 50W)</p><p>Pin: 60.000mA pin lithium sắt phosphate ( 10 pin )</p><p>Hạt đèn SMD: 936 chip Sanan</p><p>Chất liệu: ABS + nhôm đúc Số đóng gói: 1 bộ / thùng</p><p>Kích thước hộp: 71CM * 48CM * 17CM Trọng lượng cả hộp: 9,7 kg</p>",
      countInStock: 100,
    },
    {
      description:
        "<p>Chế độ điều khiển: điều khiển ánh sáng cộng với phiên bản điều khiển từ xa Kích thước bảng điều khiển năng lượng mặt trời 580 * 350 * 17mm</p><p>Bảng điều khiển năng lượng mặt trời: polysilicon / (6V / 28W)</p><p>Pin: Pin lithium sắt phosphate 24000mA</p><p>SMD LED: 520 chip Sanan </p><p>Chất liệu: ABS + nhôm đúc Số lượng đóng gói: 1 bộ / hộp</p><p>Kích thước tủ: 61.5CM * 41CM * 17CM</p>",
      active: true,
      name: "ZL-150 (150W)",
      category: "Solar light",
      brand: "Việt SOLAR",
      price: 1290000,
      rating: 5,
      numOfReviews: 0,
      images: [{name: "JD-8825L (25w)", url:"/resource/uploads/1618939162145.jpg"}],
      specification:
        "<p>Chế độ điều khiển: điều khiển ánh sáng cộng với phiên bản điều khiển từ xa Kích thước bảng điều khiển năng lượng mặt trời 580 * 350 * 17mm</p><p>Bảng điều khiển năng lượng mặt trời: polysilicon / (6V / 28W)</p><p>Pin: Pin lithium sắt phosphate 24000mA</p><p>SMD LED: 520 chip Sanan </p><p>Chất liệu: ABS + nhôm đúc Số lượng đóng gói: 1 bộ / hộp</p><p>Kích thước tủ: 61.5CM * 41CM * 17CM</p>",
      countInStock: 100,
    },
    {
      description:
        "<p>Chế độ điều khiển: điều khiển ánh sáng cộng với phiên bản điều khiển từ xa Kích thước bảng điều khiển năng lượng mặt trời 580 * 360 * 17mm</p><p>Bảng điều khiển năng lượng mặt trời: silicon đa tinh thể / (6V / 32W)</p><p>Pin: 30000mA pin lithium sắt phosphate</p><p>SMD LED: 666 chip Sanan </p><p>Chất liệu: ABS + nhôm đúc Số lượng đóng gói: 1 bộ / hộp</p><p>Kích thước tủ: 61.5CM * 41CM * 17CM </p>",
      active: true,
      name: "ZL-200 (200W)",
      category: "Solar light",
      brand: "Việt SOLAR",
      price: 1440000,
      rating: 5,
      numOfReviews: 0,
      images: [{name: "JD-8825L (25w)", url:"/resource/uploads/1618939162145.jpg"}],
      specification:
        "<p>Chế độ điều khiển: điều khiển ánh sáng cộng với phiên bản điều khiển từ xa Kích thước bảng điều khiển năng lượng mặt trời 580 * 360 * 17mm</p><p>Bảng điều khiển năng lượng mặt trời: silicon đa tinh thể / (6V / 32W)</p><p>Pin: 30000mA pin lithium sắt phosphate</p><p>SMD LED: 666 chip Sanan </p><p>Chất liệu: ABS + nhôm đúc Số lượng đóng gói: 1 bộ / hộp</p><p>Kích thước tủ: 61.5CM * 41CM * 17CM </p>",
      countInStock: 100,
    },
    {
      description:
        "<p>Chế độ điều khiển: điều khiển ánh sáng cộng với phiên bản điều khiển từ xa Kích thước bảng điều khiển năng lượng mặt trời 580 * 360 * 17mm</p><p>Bảng điều khiển năng lượng mặt trời: silicon đa tinh thể / (6V / 32W)</p><p>Pin: Pin lithium sắt phosphate 36000mA</p><p>SMD LED: 1000 chip Sanan </p><p>Chất liệu: ABS + nhôm đúc Số lượng đóng gói: 1 bộ / hộp</p><p>Kích thước tủ: 61.5CM * 41CM * 17CM</p>",
      active: true,
      name: "ZL-300 (300W)",
      category: "Solar light",
      brand: "Việt SOLAR",
      price: 1590000,
      rating: 5,
      numOfReviews: 0,
      images: [{name: "JD-8825L (25w)", url:"/resource/uploads/1618939162145.jpg"}],
      specification:
        "<p>Chế độ điều khiển: điều khiển ánh sáng cộng với phiên bản điều khiển từ xa Kích thước bảng điều khiển năng lượng mặt trời 580 * 360 * 17mm</p><p>Bảng điều khiển năng lượng mặt trời: silicon đa tinh thể / (6V / 32W)</p><p>Pin: Pin lithium sắt phosphate 36000mA</p><p>SMD LED: 1000 chip Sanan </p><p>Chất liệu: ABS + nhôm đúc Số lượng đóng gói: 1 bộ / hộp</p><p>Kích thước tủ: 61.5CM * 41CM * 17CM</p>",
      countInStock: 100,
    },
    {
      description:
        "<p>Đèn đường ZLUFO 150W UFO Chế độ điều khiển: điều khiển ánh sáng cộng với phiên bản điều khiển từ xa / bảng điều khiển năng lượng mặt trời cảm ứng cơ thể người: silicon đa tinh thể / silicon đơn tinh thể (6V / 15W)</p><p>Pin: 3PIN 3 pin lithium iron phosphate Dung lượng: 18000 mAh</p><p>Hạt đèn SMD: Sanan chip 240</p><p>Chất liệu: ABS</p><p>Mức độ chống thấm nước: IP65</p><p>Phương thức sạc, thời gian: sạc bằng năng lượng mặt trời, khoảng 6 giờ</p><p>Thời gian chiếu sáng: khoảng 12 giờ chiếu sáng bền vững</p>",
      active: true,
      name: "UFO 150W",
      category: "Solar light",
      brand: "Việt SOLAR",
      price: 1190000,
      rating: 5,
      numOfReviews: 0,
      images: [{name: "JD-8825L (25w)", url:"/resource/uploads/1618939162145.jpg"}],
      specification:
        "<p>Đèn đường ZLUFO 150W UFO Chế độ điều khiển: điều khiển ánh sáng cộng với phiên bản điều khiển từ xa / bảng điều khiển năng lượng mặt trời cảm ứng cơ thể người: silicon đa tinh thể / silicon đơn tinh thể (6V / 15W)</p><p>Pin: 3PIN 3 pin lithium iron phosphate Dung lượng: 18000 mAh</p><p>Hạt đèn SMD: Sanan chip 240</p><p>Chất liệu: ABS</p><p>Mức độ chống thấm nước: IP65</p><p>Phương thức sạc, thời gian: sạc bằng năng lượng mặt trời, khoảng 6 giờ</p><p>Thời gian chiếu sáng: khoảng 12 giờ chiếu sáng bền vững</p>",
      countInStock: 100,
    },
    {
      description:
        "<p>Đèn đường ZLUFO 250W UFO Chế độ điều khiển: điều khiển ánh sáng cộng với phiên bản điều khiển từ xa / bảng điều khiển năng lượng mặt trời cảm ứng cơ thể người: silicon đa tinh thể / silicon đơn tinh thể (6V / 22W)</p><p>Pin: 5 pin lithium iron 5PIN phosphate Dung lượng: 25000 mAh pin lithium iron phosphate</p><p>LED SMD: 400 chip Sanan</p><p>Chất liệu: ABS</p><p>Mức độ chống thấm nước: IP65</p><p>Phương thức sạc, thời gian: sạc bằng năng lượng mặt trời, khoảng 6 giờ</p><p>Thời gian chiếu sáng: khoảng 12 giờ chiếu sáng bền vững</p>",
      active: true,
      name: "UFO 250W",
      category: "Solar light",
      brand: "Việt SOLAR",
      price: 1430000,
      rating: 5,
      numOfReviews: 0,
      images: [{name: "JD-8825L (25w)", url:"/resource/uploads/1618939162145.jpg"}],
      specification:
        "<p>Đèn đường ZLUFO 250W UFO Chế độ điều khiển: điều khiển ánh sáng cộng với phiên bản điều khiển từ xa / bảng điều khiển năng lượng mặt trời cảm ứng cơ thể người: silicon đa tinh thể / silicon đơn tinh thể (6V / 22W)</p><p>Pin: 5 pin lithium iron 5PIN phosphate Dung lượng: 25000 mAh pin lithium iron phosphate</p><p>LED SMD: 400 chip Sanan</p><p>Chất liệu: ABS</p><p>Mức độ chống thấm nước: IP65</p><p>Phương thức sạc, thời gian: sạc bằng năng lượng mặt trời, khoảng 6 giờ</p><p>Thời gian chiếu sáng: khoảng 12 giờ chiếu sáng bền vững</p>",
      countInStock: 100,
    },
    {
      description:
        "<p>Đèn đường năng lượng mặt trời Dự án 150w</p><p>Model: ZL - 88150</p><p>Điều khiển ánh sáng Plus Điều khiển từ xa, </p><p>Kích thước tấm pin năng lượng mặt trời:  670*445*25mm.</p><p>Polycrystalline Silicon (6V/40W)</p><p>Pin lưu trữ: 60.000 mAh Lithium sắt phosphate pin</p><p>Chíp led cao cấp: 110Chips</p><p>Chất liệu đèn: Nhôm nguyên khối</p><p>Chỉ số chống nước: IP65</p><p>Thời gian sạc: 4-6giờ.</p><p>Thời gian chiếu sáng: 3 ngày mưa</p><p>Sản phẩm gồm: đèn đường + tấm pin năng lượng mặt trời + điều khiển từ xa + giá và cần đèn</p><p>Bảo hành: 2 năm</p>",
      active: true,
      name: "Zl- 88150 (150w)",
      category: "Solar light",
      brand: "Việt SOLAR",
      price: 2215000,
      rating: 5,
      numOfReviews: 0,
      images: [{name: "JD-8825L (25w)", url:"/resource/uploads/1618939162145.jpg"}],
      specification:
        "<p>Đèn đường năng lượng mặt trời Dự án 150w</p><p>Model: ZL - 88150</p><p>Điều khiển ánh sáng Plus Điều khiển từ xa, </p><p>Kích thước tấm pin năng lượng mặt trời:  670*445*25mm.</p><p>Polycrystalline Silicon (6V/40W)</p><p>Pin lưu trữ: 60.000 mAh Lithium sắt phosphate pin</p><p>Chíp led cao cấp: 110Chips</p><p>Chất liệu đèn: Nhôm nguyên khối</p><p>Chỉ số chống nước: IP65</p><p>Thời gian sạc: 4-6giờ.</p><p>Thời gian chiếu sáng: 3 ngày mưa</p><p>Sản phẩm gồm: đèn đường + tấm pin năng lượng mặt trời + điều khiển từ xa + giá và cần đèn</p><p>Bảo hành: 2 năm</p>",
      countInStock: 100,
    },
    {
      description:
        "<p>Đèn đường năng lượng mặt trời Dự án 200w</p><p>Model: ZL - 88200</p><p>Điều khiển ánh sáng Plus Điều khiển từ xa, </p><p>Kích thước tấm pin năng lượng mặt trời 670*640*25mm.</p><p>Polycrystalline Silicon (6V/60W)</p><p>Pin lưu trữ: 72.000 mAh Lithium sắt phosphate pin</p><p>Chíp led cao cấp: 163Chips</p><p>Chất liệu đèn: Nhôm nguyên khối</p><p>Chỉ số chống nước: IP65</p><p>Thời gian sạc: 4-6giờ.</p><p>Thời gian chiếu sáng: 3 ngày mưa</p><p>Sản phẩm gồm: đèn đường + tấm pin năng lượng mặt trời + điều khiển từ xa + giá và cần đèn</p><p>Bảo hành: 2 năm</p>",
      active: true,
      name: "ZL- 88200 (200w)",
      category: "Solar light",
      brand: "Việt SOLAR",
      price: 2665000,
      rating: 5,
      numOfReviews: 0,
      images: [{name: "JD-8825L (25w)", url:"/resource/uploads/1618939162145.jpg"}],
      specification:
        "<p>Đèn đường năng lượng mặt trời Dự án 200w</p><p>Model: ZL - 88200</p><p>Điều khiển ánh sáng Plus Điều khiển từ xa, </p><p>Kích thước tấm pin năng lượng mặt trời 670*640*25mm.</p><p>Polycrystalline Silicon (6V/60W)</p><p>Pin lưu trữ: 72.000 mAh Lithium sắt phosphate pin</p><p>Chíp led cao cấp: 163Chips</p><p>Chất liệu đèn: Nhôm nguyên khối</p><p>Chỉ số chống nước: IP65</p><p>Thời gian sạc: 4-6giờ.</p><p>Thời gian chiếu sáng: 3 ngày mưa</p><p>Sản phẩm gồm: đèn đường + tấm pin năng lượng mặt trời + điều khiển từ xa + giá và cần đèn</p><p>Bảo hành: 2 năm</p>",
      countInStock: 100,
    },
    {
      description:
        "<p>Công suất :\t6W </p><p>Ánh sáng màu  :\tTrắng</p><p>Nguồn điện \tNăng lượng mặt trời</p><p>Cấp bảo vệ chống nước :\tIP65, chống nước hoàn toàn</p><p>Cảm biến khoảng cách :\t3-5 m, 1-120 độ</p><p>Thời gian chiếu sáng :\t4h liên tục</p><p>Kiểu lắp đặt\t: Treo tường</p><p>Kích thước\t:    125x97x50 mm</p>",
      active: true,
      name: "Cảm biến (6W)",
      category: "Solar light",
      brand: "Việt SOLAR",
      price: 120000,
      rating: 5,
      numOfReviews: 0,
      images: [{name: "JD-8825L (25w)", url:"/resource/uploads/1618939162145.jpg"}],
      specification:
        "<p>Công suất :\t6W </p><p>Ánh sáng màu  :\tTrắng</p><p>Nguồn điện \tNăng lượng mặt trời</p><p>Cấp bảo vệ chống nước :\tIP65, chống nước hoàn toàn</p><p>Cảm biến khoảng cách :\t3-5 m, 1-120 độ</p><p>Thời gian chiếu sáng :\t4h liên tục</p><p>Kiểu lắp đặt\t: Treo tường</p><p>Kích thước\t:    125x97x50 mm</p>",
      countInStock: 100,
    },
    {
      description:
        "<p>Chất liệu\tPC+ABS</p><p>Pin\tLoại Pin 18650 –  Lithium 3.7V 2.200mAh có bảo vệ sạc & xả</p><p>Công suất đầu ra 3.2V / 7W</p><p>Số lượng led\t100 chip LED bên trong – 100 smd28350. chiếc</p><p>Tấm pin NLMT\tPoly hiệu suất cao, đầu ra 6V</p><p>kích thước 135x220x17 mm</p><p>Kích thước đèn\t13 * 9.5 * 5 cm                                                                                 3 Chế độ Cảm biến ánh sáng</p>",
      active: true,
      name: "Cảm biến (100Led)",
      category: "Solar light",
      brand: "Việt SOLAR",
      price: 200000,
      rating: 5,
      numOfReviews: 0,
      images: [{name: "JD-8825L (25w)", url:"/resource/uploads/1618939162145.jpg"}],
      specification:
        "<p>Chất liệu\tPC+ABS</p><p>Pin\tLoại Pin 18650 –  Lithium 3.7V 2.200mAh có bảo vệ sạc & xả</p><p>Công suất đầu ra 3.2V / 7W</p><p>Số lượng led\t100 chip LED bên trong – 100 smd28350. chiếc</p><p>Tấm pin NLMT\tPoly hiệu suất cao, đầu ra 6V</p><p>kích thước 135x220x17 mm</p><p>Kích thước đèn\t13 * 9.5 * 5 cm                                                                                 3 Chế độ Cảm biến ánh sáng</p>",
      countInStock: 100,
    },
    {
      description:
        "<p>Kích thước đèn: 200*120 mm </p><p>Tấm pin năng lượng mặt trời: size: 143*236*18 mm</p><p>Chất liệu tấm pin: Poly tuổi thọ 10-12 năm </p><p>Điện áp đầu vào tấm pin: 6v/3.3w. Chống nước: IP67</p><p>Bộ sản phẩm gồm: đèn + tấm pin và remote</p><p>Bảo hành: 1 năm</p>",
      active: true,
      name: "JD-X50 (50w)",
      category: "Solar light",
      brand: "Việt SOLAR",
      price: 295000,
      rating: 5,
      numOfReviews: 0,
      images: [{name: "JD-8825L (25w)", url:"/resource/uploads/1618939162145.jpg"}],
      specification:
        "<p>Kích thước đèn: 200*120 mm </p><p>Tấm pin năng lượng mặt trời: size: 143*236*18 mm</p><p>Chất liệu tấm pin: Poly tuổi thọ 10-12 năm </p><p>Điện áp đầu vào tấm pin: 6v/3.3w. Chống nước: IP67</p><p>Bộ sản phẩm gồm: đèn + tấm pin và remote</p><p>Bảo hành: 1 năm</p>",
      countInStock: 100,
    },
    {
      description:
        "<p>Đèn Trụ Cổng NLMT                                                                              Kích thước đèn 25 x 25 x25 cm, Điện áp tấm pin : 5V 4w                                                                         Chất liệu : Hợp kim nhôm sơn tĩnh điện                                                  Dung lượng pin : 5000 mah                                                                         Thời gian chiếu sáng : 10-12h/đêm                                                            Chức năng : 2 màu ánh sáng                                                                          Bộ sản phẩm bao gồm : Thân đèn ,điều khiển từ xa ,sách hd sử dụng,bộ ốc lắp đặt                                                                                        Bảo hành 2 năm</p>",
      active: true,
      name: "Đèn Trụ       cổng ( 25 x 25cm)",
      category: "Solar light",
      brand: "Việt SOLAR",
      price: 1090000,
      rating: 5,
      numOfReviews: 0,
      images: [{name: "JD-8825L (25w)", url:"/resource/uploads/1618939162145.jpg"}],
      specification:
        "<p>Đèn Trụ Cổng NLMT                                                                              Kích thước đèn 25 x 25 x25 cm, Điện áp tấm pin : 5V 4w                                                                         Chất liệu : Hợp kim nhôm sơn tĩnh điện                                                  Dung lượng pin : 5000 mah                                                                         Thời gian chiếu sáng : 10-12h/đêm                                                            Chức năng : 2 màu ánh sáng                                                                          Bộ sản phẩm bao gồm : Thân đèn ,điều khiển từ xa ,sách hd sử dụng,bộ ốc lắp đặt                                                                                        Bảo hành 2 năm</p>",
      countInStock: 100,
    },
    {
      description:
        "<p>Đèn Trụ Cổng NLMT                                                                              Kích thước đèn 30 x 30 x30 cm    ,Điện áp tấm pin 5V 4w                                                            Chất liệu : Hợp kim nhôm sơn tĩnh điện                                                  Dung lượng pin : 6000 mah                                                                         Thời gian chiếu sáng : 10-12h/đêm                                                            Chức năng : 2 màu ánh sáng                                                                          Bộ sản phẩm bao gồm : Thân đèn ,điều khiển từ xa ,sách hd sử dụng,bộ ốc lắp đặt                                                                                        Bảo hành 2 năm </p>",
      active: true,
      name: "Đèn Trụ       cổng ( 30 x 30cm)",
      category: "Solar light",
      brand: "Việt SOLAR",
      price: 1390000,
      rating: 5,
      numOfReviews: 0,
      images: [{name: "JD-8825L (25w)", url:"/resource/uploads/1618939162145.jpg"}],
      specification:
        "<p>Đèn Trụ Cổng NLMT                                                                              Kích thước đèn 30 x 30 x30 cm    ,Điện áp tấm pin 5V 4w                                                            Chất liệu : Hợp kim nhôm sơn tĩnh điện                                                  Dung lượng pin : 6000 mah                                                                         Thời gian chiếu sáng : 10-12h/đêm                                                            Chức năng : 2 màu ánh sáng                                                                          Bộ sản phẩm bao gồm : Thân đèn ,điều khiển từ xa ,sách hd sử dụng,bộ ốc lắp đặt                                                                                        Bảo hành 2 năm </p>",
      countInStock: 100,
    },
    {
      description:
        "<p>Đèn ốp Trần NLMT                                                                                          Công suất : 50w                                                                                              Dung Lượng Pin : 36.000 mah                                                                      Tấm Pin đầu ra : 6v -28w                                                                             Bao gồm : 159 Chip led                                                                               Kích thước đèn : 55*50cm                                                                            Kích thước tấm pin : 53 *35cm  Bộ Sản phẩm bao gồm : Thân đèn ,tấm pin ,điều khiển từ xa,sách hdsd ,bộ ốc lắp đặt                          Bảo hành 2 năm                    </p>",
      active: true,
      name: "Đèn Ốp Trần (XD50w)",
      category: "Solar light",
      brand: "Việt SOLAR",
      price: 1190000,
      rating: 5,
      numOfReviews: 0,
      images: [{name: "JD-8825L (25w)", url:"/resource/uploads/1618939162145.jpg"}],
      specification:
        "<p>Đèn ốp Trần NLMT                                                                                          Công suất : 50w                                                                                              Dung Lượng Pin : 36.000 mah                                                                      Tấm Pin đầu ra : 6v -28w                                                                             Bao gồm : 159 Chip led                                                                               Kích thước đèn : 55*50cm                                                                            Kích thước tấm pin : 53 *35cm  Bộ Sản phẩm bao gồm : Thân đèn ,tấm pin ,điều khiển từ xa,sách hdsd ,bộ ốc lắp đặt                          Bảo hành 2 năm                    </p>",
      countInStock: 100,
    },
    {
      description:
        "<p>Đèn pin xách tay : JD -998                                                                        Kích thước đèn : 20 *12 cm                                                                                 Kích thước tấm pin : 13,5 * 22cm                                                               Dung Lượng pin : 10.000mah                                                                      Chức năng : 2 Đầu đèn chiếu xa,chiếu pha ,cảnh báo Sos ,Sạc điện thoại                                                                                                                         Bộ Sản phẩm bao gồm : Đèn xách tay,tấm pin năng lượng mặt trời,sạc adapter 4,2v 1A,bóng điện chiếu sáng dây dài 5m kèm công tắc ,công suất chiếu sáng 5w</p>",
      active: true,
      name: "JD-998",
      category: "Solar light",
      brand: "Việt SOLAR",
      price: 790000,
      rating: 5,
      numOfReviews: 0,
      images: [{name: "JD-8825L (25w)", url:"/resource/uploads/1618939162145.jpg"}],
      specification:
        "<p>Đèn pin xách tay : JD -998                                                                        Kích thước đèn : 20 *12 cm                                                                                 Kích thước tấm pin : 13,5 * 22cm                                                               Dung Lượng pin : 10.000mah                                                                      Chức năng : 2 Đầu đèn chiếu xa,chiếu pha ,cảnh báo Sos ,Sạc điện thoại                                                                                                                         Bộ Sản phẩm bao gồm : Đèn xách tay,tấm pin năng lượng mặt trời,sạc adapter 4,2v 1A,bóng điện chiếu sáng dây dài 5m kèm công tắc ,công suất chiếu sáng 5w</p>",
      countInStock: 100,
    },
    {
      description:
        "<p>Đèn NLMT liền thể JD -1920 (20w)                                                              Kích thước :                                                                                                Dung lương pin : 3000 mah                                                                          Số Lượng chip led : 42 chip                                                                       Chức năng : Cảm biến chuyển động                                                       Chiếu sáng 10-12h /đêm                                                                             Bảo hành : 6 Tháng</p>",
      active: true,
      name: "JD-1920",
      category: "Solar light",
      brand: "Việt SOLAR",
      price: 529000,
      rating: 5,
      numOfReviews: 0,
      images: [{name: "JD-8825L (25w)", url:"/resource/uploads/1618939162145.jpg"}],
      specification:
        "<p>Đèn NLMT liền thể JD -1920 (20w)                                                              Kích thước :                                                                                                Dung lương pin : 3000 mah                                                                          Số Lượng chip led : 42 chip                                                                       Chức năng : Cảm biến chuyển động                                                       Chiếu sáng 10-12h /đêm                                                                             Bảo hành : 6 Tháng                          </p><p></p>",
      countInStock: 100,
    },
    {
      description:
        "<p>Tấm pin mặt trời: đa tinh thể 6V/15W</p><p>Pin: pin lithium sắt phosphate 3.2V - 10000mah</p><p>Số lượng chíp led: 20 led, nhiệt độ màu 6000K</p><p>Nguồn sáng: 15W</p><p>Thời gian sạc: 4 - 6h. Thời gian chiếu sáng: ≥12h</p><p>Diện tích chiếu xạ: khoảng 50m2</p><p>Kích thước thân đèn: 220*330mm</p><p>Kích thước tấm: 290*340mm</p><p>Sản phẩm gồm: đèn  + tấm pin năng lượng mặt trời + điều khiển từ xa + khung</p><p>Bảo hành: 2 năm</p>",
      active: true,
      name: "JD-9909 (15w)",
      category: "Solar light",
      brand: "Việt SOLAR",
      price: 1090000,
      rating: 5,
      numOfReviews: 0,
      images: [{name: "JD-8825L (25w)", url:"/resource/uploads/1618939162145.jpg"}],
      specification:
        "<p>Tấm pin mặt trời: đa tinh thể 6V/15W</p><p>Pin: pin lithium sắt phosphate 3.2V - 10000mah</p><p>Số lượng chíp led: 20 led, nhiệt độ màu 6000K</p><p>Nguồn sáng: 15W</p><p>Thời gian sạc: 4 - 6h. Thời gian chiếu sáng: ≥12h</p><p>Diện tích chiếu xạ: khoảng 50m2</p><p>Kích thước thân đèn: 220*330mm</p><p>Kích thước tấm: 290*340mm</p><p>Sản phẩm gồm: đèn  + tấm pin năng lượng mặt trời + điều khiển từ xa + khung</p><p>Bảo hành: 2 năm</p>",
      countInStock: 100,
    },
    {
      description:
        "<p>Công suất: 25 w</p><p>Bảng điều khiển năng lượng mặt trời: 25w polysilicon</p><p>Dung lượng pin: pin lithium sắt phosphate 24000mah</p><p>Bộ sạc: Bộ sạc bộ chuyển đổi 1A (5 mét)</p><p>Thời gian sạc: 4 - 6h</p><p>Thời lượng: 10-12h</p><p>Chế độ làm việc: nút đa chức năng + điều khiển từ xa</p><p>Kích thước quạt: cao 120cm, rộng 45cm</p><p>Kích thước tấm: 35 * 48cm</p><p>Số lượng đóng gói: 3 bộ / thùng</p><p>Màu sản phẩm: Đen ,Bh 2 năm với tấm pin và động cơ ,pin tích 12 tháng</p>",
      active: true,
      name: "JD-S88",
      category: "Solar light",
      brand: "Việt SOLAR",
      price: 1840000,
      rating: 5,
      numOfReviews: 0,
      images: [{name: "JD-8825L (25w)", url:"/resource/uploads/1618939162145.jpg"}],
      specification:
        "<p>Công suất: 25 w</p><p>Bảng điều khiển năng lượng mặt trời: 25w polysilicon</p><p>Dung lượng pin: pin lithium sắt phosphate 24000mah</p><p>Bộ sạc: Bộ sạc bộ chuyển đổi 1A (5 mét)</p><p>Thời gian sạc: 4 - 6h</p><p>Thời lượng: 10-12h</p><p>Chế độ làm việc: nút đa chức năng + điều khiển từ xa</p><p>Kích thước quạt: cao 120cm, rộng 45cm</p><p>Kích thước tấm: 35 * 48cm</p><p>Số lượng đóng gói: 3 bộ / thùng</p><p>Màu sản phẩm: Đen ,Bh 2 năm với tấm pin và động cơ ,pin tích 12 tháng</p>",
      countInStock: 100,
    },
    {
      description:
        "<p>Quạt công suất: 25w                                                                                             Tấm pin poly, công suất đầu ra 15v - 25w                                                           Dung lượng pin: Lithium-ion 12V-18.000mAh                                                           Cấp số hoạt động từ 1 đến 10                                                                                 Sạc điện PC 5V - 1A                                                                                              Thời gian sạc: 4-6h                                                                                               Thời gian sử dụng: 8-12h                                                                                      Bảo hành :2 năm với tấm pin và động cơ ,pin tích 12 tháng</p>",
      active: true,
      name: "JD-S99",
      category: "Solar light",
      brand: "Việt SOLAR",
      price: 1630000,
      rating: 5,
      numOfReviews: 0,
      images: [{name: "JD-8825L (25w)", url:"/resource/uploads/1618939162145.jpg"}],
      specification:
        "<p>Quạt công suất: 25w                                                                                             Tấm pin poly, công suất đầu ra 15v - 25w                                                           Dung lượng pin: Lithium-ion 12V-18.000mAh                                                           Cấp số hoạt động từ 1 đến 10                                                                                 Sạc điện PC 5V - 1A                                                                                              Thời gian sạc: 4-6h                                                                                               Thời gian sử dụng: 8-12h                                                                                      Bảo hành :2 năm với tấm pin và động cơ ,pin tích 12 tháng</p>",
      countInStock: 100,
    },
    {
      description:
        "<p>Quạt công suất: 25w                                                                                                   Tấm pin poly, công suất đầu ra 15v - 30w                                            Dung lượng pin:  Pin lithium sắt phosphate 7800mah                                                                                                  Bộ sạc: Bộ sạc thích ứng 1A                                                                       Số cánh quat : 5 cánh                                                                                     Cấp số hoạt động từ 1 đến 3 + Đèn LED                                                          Sạc điện :  DC 12.6V - 1A                                                                          Thời gian sạc: 4-6h                                                                                     Thời gian sử dụng:   12 tiếng liên tục số 3                                                              Bảo hành: 2 năm với tấm pin và động cơ ,pin tích 12 tháng</p>",
      active: true,
      name: "JD-S888",
      category: "Solar light",
      brand: "Việt SOLAR",
      price: 1390000,
      rating: 5,
      numOfReviews: 0,
      images: [{name: "JD-8825L (25w)", url:"/resource/uploads/1618939162145.jpg"}],
      specification:
        "<p>Quạt công suất: 25w                                                                                                   Tấm pin poly, công suất đầu ra 15v - 30w                                            Dung lượng pin:  Pin lithium sắt phosphate 7800mah                                                                                                  Bộ sạc: Bộ sạc thích ứng 1A                                                                       Số cánh quat : 5 cánh                                                                                     Cấp số hoạt động từ 1 đến 3 + Đèn LED                                                          Sạc điện :  DC 12.6V - 1A                                                                          Thời gian sạc: 4-6h                                                                                     Thời gian sử dụng:   12 tiếng liên tục số 3                                                              Bảo hành: 2 năm với tấm pin và động cơ ,pin tích 12 tháng</p>",
      countInStock: 100,
    },
    {
      description:
        "<p>Quạt công suất: 25w                                                                                    Tấm pin poly, công suất đầu ra 15v - 25w                                         Dung lượng pin:  Pin lithium sắt phosphate 7800mah                                                                                                  Sạc điện thoai: 5V-1A                                                                                    Số cánh quat : 5 cánh                                                                                 Cấp số hoạt động từ 1 đến 3 + Đèn LED                                                          Sạc điện :  DC 12.6V - 1A                                                                          Thời gian sạc: 4-6h                                                                                      Thời gian sử dụng:  12 tiếng liên tục số 3                                                               Bảo hành:2 năm với tấm pin và động cơ ,pin tích 12 tháng </p>",
      active: true,
      name: "JD-S688",
      category: "Solar light",
      brand: "Việt SOLAR",
      price: 1190000,
      rating: 5,
      numOfReviews: 0,
      images: [{name: "JD-8825L (25w)", url:"/resource/uploads/1618939162145.jpg"}],
      specification:
        "<p>Quạt công suất: 25w                                                                                    Tấm pin poly, công suất đầu ra 15v - 25w                                         Dung lượng pin:  Pin lithium sắt phosphate 7800mah                                                                                                  Sạc điện thoai: 5V-1A                                                                                    Số cánh quat : 5 cánh                                                                                 Cấp số hoạt động từ 1 đến 3 + Đèn LED                                                          Sạc điện :  DC 12.6V - 1A                                                                          Thời gian sạc: 4-6h                                                                                      Thời gian sử dụng:  12 tiếng liên tục số 3                                                               Bảo hành:2 năm với tấm pin và động cơ ,pin tích 12 tháng </p>",
      countInStock: 100,
    },
    {
      description: "Một sản phẩm tốt",
      active: true,
      name: "K 39",
      brand: "Apple",
      category: "Solar light",
      specification: ".",
      price: 245,
      rating: 2.3,
      numOfReviews: 10,
      images: [
        {name: "JD-8825L (25w)", url:"/resource/uploads/1618939162145.jpg"}
      ],
      countInStock: 1000,
    },
  ],
  users: [
    {
      name: "Quản lý",
      email: "solarhta@gmail.com",
      address: "Thanh Long, Thanh Chương, Nghệ An",
      password: bcrypt.hashSync("S@l@rht@2021", 8),
      isAdmin: true,
    },
    {
      name: "Ned Stark",
      email: "stark@nothern-kingdom.com",
      address: "Winterfell, westeros",
      password: bcrypt.hashSync("123", 8),
      isAdmin: false,
    },
  ],
};

export default data;

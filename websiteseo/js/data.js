// Mock Data - Danh sách sản phẩm AuraStyle
const products = [
    {
        id: 1,
        name: "Áo Sơ Mi Linen Trắng",
        category: "ao-so-mi",
        price: 890000,
        image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&h=1000&fit=crop",
        description: "Áo sơ mi linen cao cấp, chất liệu thoáng mát, phù hợp cho mùa hè. Thiết kế tối giản nhưng thanh lịch, dễ dàng phối đồ.",
        featured: true
    },
    {
        id: 2,
        name: "Váy Maxi Hoa Nhí",
        category: "vay",
        price: 1250000,
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&h=1000&fit=crop",
        description: "Váy maxi dáng suông với họa tiết hoa nhí nữ tính. Chất vải mềm mại, thoải mái khi di chuyển. Hoàn hảo cho dạo phố cuối tuần.",
        featured: true
    },
    {
        id: 3,
        name: "Blazer Đen Công Sở",
        category: "ao-khoac",
        price: 1890000,
        image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&h=1000&fit=crop",
        description: "Blazer đen cổ điển với đường cắt may tinh tế. Phù hợp cho môi trường công sở chuyên nghiệp. Chất liệu polyester cao cấp.",
        featured: true
    },
    {
        id: 4,
        name: "Quần Jeans Ống Rộng",
        category: "quan",
        price: 750000,
        image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&h=1000&fit=crop",
        description: "Quần jeans ống rộng phong cách vintage. Chất denim bền bỉ, màu sắc không phai. Thiết kế năng động, trẻ trung.",
        featured: true
    },
    {
        id: 5,
        name: "Áo Thun Basic Beige",
        category: "ao-thun",
        price: 390000,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=1000&fit=crop",
        description: "Áo thun basic tông màu trung tính, dễ phối đồ. Cotton 100% mềm mại, thấm hút mồ hôi tốt. Item không thể thiếu trong tủ đồ.",
        featured: true
    },
    {
        id: 6,
        name: "Chân Váy Midi Xếp Ly",
        category: "vay",
        price: 680000,
        image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800&h=1000&fit=crop",
        description: "Chân váy midi xếp ly thanh lịch. Phù hợp cho cả công sở lẫn dạo phố. Chất liệu polyester cao cấp, không nhăn.",
        featured: true
    },
    {
        id: 7,
        name: "Áo Khoác Cardigan Len",
        category: "ao-khoac",
        price: 920000,
        image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&h=1000&fit=crop",
        description: "Cardigan len mỏng nhẹ, ấm áp nhưng không gây bí. Thiết kế oversized hiện đại. Hoàn hảo cho mùa thu đông.",
        featured: false
    },
    {
        id: 8,
        name: "Quần Tây Ống Đứng",
        category: "quan",
        price: 850000,
        image: "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=800&h=1000&fit=crop",
        description: "Quần tây ống đứng thanh lịch. Đường may chỉn chu, form dáng chuẩn. Thích hợp cho môi trường công sở.",
        featured: false
    },
    {
        id: 9,
        name: "Váy Dạ Hội Lụa",
        category: "vay",
        price: 2890000,
        image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&h=1000&fit=crop",
        description: "Váy dạ hội chất liệu lụa cao cấp. Thiết kế sang trọng, quyến rũ. Hoàn hảo cho các buổi tiệc trang trọng.",
        featured: false
    },
    {
        id: 10,
        name: "Áo Polo Trắng",
        category: "ao-so-mi",
        price: 590000,
        image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=800&h=1000&fit=crop",
        description: "Áo polo basic màu trắng. Chất cotton thoáng mát. Phong cách lịch sự, năng động.",
        featured: false
    },
    {
        id: 11,
        name: "Quần Short Kaki",
        category: "quan",
        price: 490000,
        image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&h=1000&fit=crop",
        description: "Quần short kaki thoải mái cho mùa hè. Thiết kế đơn giản, dễ mix đồ. Chất vải bền đẹp.",
        featured: false
    },
    {
        id: 12,
        name: "Váy Midi Hoa Cúc",
        category: "vay",
        price: 980000,
        image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&h=1000&fit=crop",
        description: "Váy midi họa tiết hoa cúc tươi mới. Phong cách nữ tính, nhẹ nhàng. Chất vải mềm mại, thoải mái.",
        featured: false
    },
    {
                id: 13,
                name: "Đầm Công Sở Đen",
                category: "dam",
                price: 1450000,
                image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=800&h=1000&fit=crop",
                description: "Đầm công sở đen sang trọng, thiết kế tôn dáng. Chất liệu cao cấp, form dáng chuẩn.",
                featured: true
            },
            {
                id: 14,
                name: "Áo Thun Polo Xanh Navy",
                category: "ao-thun",
                price: 450000,
                image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=800&h=1000&fit=crop",
                description: "Áo polo xanh navy cổ điển. Chất cotton thoáng mát, phù hợp mọi hoàn cảnh.",
                featured: false
            },
            {
                id: 15,
                name: "Túi Xách Tay Da",
                category: "phu-kien",
                price: 2100000,
                image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&h=1000&fit=crop",
                description: "Túi xách tay da thật cao cấp. Thiết kế tinh tế, nhiều ngăn tiện dụng.",
                featured: true
            },
            {
                id: 16,
                name: "Giày Boot Cao Cổ",
                category: "giay-dep",
                price: 1890000,
                image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&h=1000&fit=crop",
                description: "Boot cao cổ da lộn. Đế chống trượt, phù hợp cho mùa đông và phong cách cá tính.",
                featured: false
            },
            {
                id: 17,
                name: "Khăn Quàng Cổ Lụa",
                category: "phu-kien",
                price: 350000,
                image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800&h=1000&fit=crop",
                description: "Khăn quàng lụa họa tiết độc đáo. Nhẹ nhàng, dễ phối đồ, tạo điểm nhấn cho outfit.",
                featured: false
            },
            {
                id: 18,
                name: "Váy Xòe Vintage",
                category: "vay",
                price: 1150000,
                image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&h=1000&fit=crop",
                description: "Váy xòe phong cách vintage. Chất vải cao cấp, thiết kế cổ điển nhưng hiện đại.",
                featured: false
            },
            {
                id: 19,
                name: "Áo Len Cổ Cao",
                category: "ao-len",
                price: 780000,
                image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&h=1000&fit=crop",
                description: "Áo len cổ cao ấm áp. Chất len cao cấp, mềm mại không gây ngứa. Hoàn hảo cho mùa đông.",
                featured: true
            },
            {
                id: 20,
                name: "Đầm Dạ Hội Đỏ",
                category: "dam",
                price: 3200000,
                image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&h=1000&fit=crop",
                description: "Đầm dạ hội màu đỏ quyến rũ. Thiết kế tôn dáng, sang trọng cho sự kiện quan trọng.",
                featured: false
            },
            {
                id: 21,
                name: "Quần Culottes Nâu",
                category: "quan",
                price: 890000,
                image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&h=1000&fit=crop",
                description: "Quần culottes nâu trung tính. Dáng rộng thoải mái, phù hợp nhiều phong cách.",
                featured: false
            },
            {
                id: 22,
                name: "Áo Khoác Denim",
                category: "ao-khoac",
                price: 990000,
                image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=1000&fit=crop",
                description: "Áo khoác denim cổ điển. Chất denim bền đẹp, phong cách năng động trẻ trung.",
                featured: false
            },
            {
                id: 23,
                name: "Giày Sneaker Trắng",
                category: "giay-dep",
                price: 1200000,
                image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&h=1000&fit=crop",
                description: "Sneaker trắng basic. Đế êm ái, phù hợp vận động và mix đồ hàng ngày.",
                featured: true
            },
            {
                id: 24,
                name: "Đầm Suông Họa Tiết",
                category: "dam",
                price: 1350000,
                image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&h=1000&fit=crop",
                description: "Đầm suông họa tiết hoa nữ tính. Chất vải mát mẻ, thoải mái cả ngày dài.",
                featured: false
            },
            {
                id: 25,
                name: "Áo Sơ Mi Sọc Xanh",
                category: "ao-so-mi",
                price: 650000,
                image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&h=1000&fit=crop",
                description: "Áo sơ mi họa tiết sọc xanh trắng. Phong cách thanh lịch, dễ phối đồ công sở.",
                featured: false
            },
            {
                id: 26,
                name: "Mũ Rộng Vành",
                category: "phu-kien",
                price: 420000,
                image: "https://images.unsplash.com/photo-1529958030586-3aae4ca485ff?w=800&h=1000&fit=crop",
                description: "Mũ rộng vành chống nắng. Chất liệu nhẹ nhàng, tạo điểm nhấn thời trang.",
                featured: false
            },
            {
                id: 27,
                name: "Áo Len Cardigan Beige",
                category: "ao-len",
                price: 890000,
                image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&h=1000&fit=crop",
                description: "Cardigan len màu be trung tính. Thiết kế oversized, ấm áp và trendy.",
                featured: false
            },
            {
                id: 28,
                name: "Chân Váy Jeans",
                category: "vay",
                price: 750000,
                image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800&h=1000&fit=crop",
                description: "Chân váy denim form A. Phong cách năng động, dễ kết hợp với nhiều loại áo.",
                featured: false
            },
            {
                id: 29,
                name: "Sandal Cao Gót",
                category: "giay-dep",
                price: 1450000,
                image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&h=1000&fit=crop",
                description: "Sandal cao gót thanh lịch. Thiết kế tôn chân, phù hợp sự kiện trang trọng.",
                featured: false
            },
            {
                id: 30,
                name: "Áo Thun Oversize",
                category: "ao-thun",
                price: 420000,
                image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=1000&fit=crop",
                description: "Áo thun oversize thoải mái. Cotton 100%, form rộng trendy, dễ mix đồ.",
                featured: false
    }
];

// Danh mục sản phẩm
const categories = [
    { id: "ao-so-mi", name: "Áo Sơ Mi" },
    { id: "ao-thun", name: "Áo Thun" },
    { id: "ao-len", name: "Áo Len" },
    { id: "ao-khoac", name: "Áo Khoác" },
    { id: "quan", name: "Quần" },
    { id: "vay", name: "Váy" },
    { id: "dam", name: "Đầm" },
    { id: "giay-dep", name: "Giày Dép" },
    { id: "phu-kien", name: "Phụ Kiện" }
];

// Khoảng giá
const priceRanges = [
    { id: "0-500", name: "Dưới 500.000đ", min: 0, max: 500000 },
    { id: "500-1000", name: "500.000đ - 1.000.000đ", min: 500000, max: 1000000 },
    { id: "1000-2000", name: "1.000.000đ - 2.000.000đ", min: 1000000, max: 2000000 },
    { id: "2000+", name: "Trên 2.000.000đ", min: 2000000, max: Infinity }
];

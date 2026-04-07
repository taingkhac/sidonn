-- Nâng cấp bảng articles để hỗ trợ các trường đặc thù của Giải Pháp (Solution Features/Benefits/Apps)
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS features_translations JSONB DEFAULT '{}'::jsonb;
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS benefits_translations JSONB DEFAULT '{}'::jsonb;
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS applications_translations JSONB DEFAULT '{}'::jsonb;
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS icon_name TEXT; -- Lưu tên icon lucide (Bot, Package, etc.)

-- 1. Xoá dữ liệu cũ để migrate sạch (Tùy chọn, ở đây ta dùng UPSERT để giữ bài viết cũ của user)

-- 2. DỮ LIỆU NHÃN CHUNG (Shared UI Labels) cho toàn website
INSERT INTO public.content_blocks (view_target, block_key, content_type, translations) VALUES 
('shared', 'nav_contact', 'text', '{"en":"Contact Us", "vi":"Liên hệ", "zh":"联系我们", "ja":"お問い合わせ", "ko":"문의하기"}'),
('shared', 'nav_newsroom', 'text', '{"en":"Newsroom", "vi":"Phòng tin", "zh":"新闻室", "ja":"ニュースルーム", "ko":"뉴스룸"}'),
('shared', 'nav_support', 'text', '{"en":"Support", "vi":"Hỗ trợ", "zh":"支持", "ja":"サポート", "ko":"지원"}'),
('shared', 'btn_learn_more', 'text', '{"en":"Learn more", "vi":"Tìm hiểu thêm", "zh":"了解更多", "ja":"詳細を見る", "ko":"더 알아보기"}'),
('shared', 'global_countries', 'text', '{"en":"Countries", "vi":"Quốc gia", "zh":"国家", "ja":"国", "ko":"국가"}'),
('shared', 'global_projects', 'text', '{"en":"Projects", "vi":"Dự án", "zh":"项目", "ja":"プロジェクト", "ko":"프로젝트"}'),
('shared', 'footer_description', 'text', '{"en":"Global leader in warehouse automation and innovative logistics solutions.", "vi":"Lãnh đạo toàn cầu về tự động hóa kho hàng và giải pháp logistics sáng tạo."}')
ON CONFLICT (view_target, block_key) DO UPDATE SET translations = EXCLUDED.translations;

-- 3. DỮ LIỆU TRANG CHỦ (HomePage Blocks)
INSERT INTO public.content_blocks (view_target, block_key, content_type, translations) VALUES 
('home', 'solutions_title', 'text', '{"en":"Our Core Expertise", "vi":"Chuyên môn cốt lõi", "zh":"我们的核心专长", "ja":"当社の中核専門分野", "ko":"우리의 핵심 전문성"}'),
('home', 'solutions_subtitle', 'text', '{"en":"Six pillars of innovation powering the future of logistics automation", "vi":"Sáu trụ cột đổi mới thúc đẩy tương lai logistics tự động hóa", "zh":"推动物流自动化未来的六大支柱", "ja":"物流自動化の未来を支える6つの柱", "ko":"물류 자동화의 미래를 이끄는 여섯 개의 기둥"}'),
('home', 'global_title', 'text', '{"en":"Global Presence", "vi":"Hiện diện toàn cầu", "zh":"全球业务", "ja":"グローバルプレゼンス", "ko":"글로벌 입지"}'),
('home', 'global_subtitle', 'text', '{"en":"Trusted by leading enterprises across the world", "vi":"Được các doanh nghiệp hàng đầu trên thế giới tin cậy", "zh":"受全球领先企业信赖", "ja":"世界の主要企業から信頼されています", "ko":"전 세계 선도 기업들의 신뢰"}')
ON CONFLICT (view_target, block_key) DO UPDATE SET translations = EXCLUDED.translations;

-- 4. DỮ LIỆU 6 GIẢI PHÁP GỐC (Articles - Solutions)

-- Smart Warehouse
INSERT INTO public.articles (category, slug, icon_name, title_translations, desc_translations, content_translations, features_translations, benefits_translations, applications_translations) VALUES 
('solutions', 'smart-warehouse', 'Bot', 
'{"en":"Smart Warehouse", "vi":"Kho thông minh"}', 
'{"en":"Automated storage & retrieval.", "vi":"Lưu trữ & truy xuất tự động."}',
'{"en":"Our Smart Warehouse solutions integrate cutting-edge... ", "vi":"Giải pháp Kho thông minh tích hợp công nghệ..."}',
'{"en":["Automated Storage and Retrieval Systems (AS/RS)", "Real-time inventory tracking"], "vi":["Hệ thống tự động lưu trữ và truy xuất (AS/RS)", "Theo dõi kho thời gian thực"]}',
'{"en":["Increase storage density by up to 85%", "Reduce picking errors"], "vi":["Tăng mật độ lưu trữ lên 85%", "Giảm sai sót nhặt hàng"]}',
'{"en":["E-commerce fulfillment centers", "Manufacturing warehouses"], "vi":["Trung tâm xử lý TMĐT", "Kho nhà máy sản xuất"]}')
ON CONFLICT (slug) DO UPDATE SET title_translations = EXCLUDED.title_translations, benefits_translations = EXCLUDED.benefits_translations;

-- Fulfillment
INSERT INTO public.articles (category, slug, icon_name, title_translations, desc_translations, content_translations, features_translations, benefits_translations, applications_translations) VALUES 
('solutions', 'fulfillment', 'Package', 
'{"en":"Fulfillment Warehouse", "vi":"Kho phân phối"}', 
'{"en":"E-commerce speed & precision.", "vi":"Tốc độ & độ chính xác thương mại điện tử."}',
'{"en":"Purpose-built for e-commerce and omnichannel retail...", "vi":"Dành riêng cho thương mại điện tử và bán lẻ đa kênh..."}',
'{"en":["High-speed picking and packing systems"], "vi":["Hệ thống nhặt và đóng gói tốc độ cao"]}',
'{"en":["Process orders 3x faster than manual"], "vi":["Xử lý đơn hàng nhanh gấp 3 lần thủ công"]}',
'{"en":["E-commerce fulfillment", "Omnichannel retail"], "vi":["Xử lý đơn hàng TMĐT", "Phân phối bán lẻ đa kênh"]}')
ON CONFLICT (slug) DO UPDATE SET title_translations = EXCLUDED.title_translations;

-- Sorting (Tương tự cho các bài khác, ở đây tôi viết mẫu các bài chính)
INSERT INTO public.articles (category, slug, icon_name, title_translations, desc_translations, content_translations) VALUES 
('solutions', 'sorting', 'Boxes', '{"en":"Sorting Systems", "vi":"Hệ thống phân loại"}', '{"en":"High-speed sortation systems.", "vi":"Hệ thống phân loại tốc độ cao."}', '{"en":"Our advanced sorting systems provide unparalleled throughput...", "vi":"Hệ thống phân loại tiên tiến cung cấp thông lượng vô song..."}'),
('solutions', 'automation', 'Factory', '{"en":"Automation Factory", "vi":"Nhà máy tự động hóa"}', '{"en":"Integrated production logic.", "vi":"Logic sản xuất tích hợp."}', '{"en":"Transform your manufacturing operations with our comprehensive...", "vi":"Chuyển đổi hoạt động sản xuất của bạn với các giải pháp toàn diện..."}'),
('solutions', 'catering', 'Plane', '{"en":"Airport Catering", "vi":"Phục vụ sân bay"}', '{"en":"Hygienic food logistics.", "vi":"Logistics thực phẩm vệ sinh."}', '{"en":"Specialized automation solutions for airline catering operations...", "vi":"Giải pháp tự động hóa chuyên dụng cho suất ăn hàng không..."}'),
('solutions', 'seaport-agv', 'Ship', '{"en":"Seaport AGV", "vi":"AGV cảng biển"}', '{"en":"Heavy-load autonomous transport.", "vi":"Vận chuyển tự động tải trọng nặng."}', '{"en":"Our heavy-duty Automated Guided Vehicles (AGVs) are engineered...", "vi":"Xe tự hành tải trọng nặng (AGVs) được thiết kế cho cảng biển..."}')
ON CONFLICT (slug) DO UPDATE SET title_translations = EXCLUDED.title_translations;

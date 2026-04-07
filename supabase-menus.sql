-- Tạo bảng menus để chứa cấu trúc đa ngôn ngữ
CREATE TABLE IF NOT EXISTS public.menus (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    menu_type TEXT NOT NULL, -- solutions, products, software, company, solutions-category
    key TEXT NOT NULL UNIQUE, -- mã nội bộ
    view_target TEXT, -- URL hoặc view component name
    translations JSONB NOT NULL DEFAULT '{}'::jsonb, -- Dữ liệu JSON dịch
    order_index INTEGER DEFAULT 0,
    parent_id UUID REFERENCES public.menus(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bật RLS và cấp quyền public READ/WRITE (Vì đây là dự án cá nhân đơn giản, hoặc bạn có thể lock lại sau)
ALTER TABLE public.menus ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Cho phép tất cả đọc menu" ON public.menus FOR SELECT USING (true);
CREATE POLICY "Cho phép tất cả chỉnh sửa menu" ON public.menus FOR ALL USING (true);

-- Chèn dữ liệu mẫu gốc (Dựa trên Solutions, Products, Software, Company)

-- 1. Solutions Categories
INSERT INTO public.menus (id, menu_type, key, translations, order_index) VALUES 
('11111111-1111-1111-1111-111111111111', 'solutions-category', 'cat-warehousing', '{"en":"Warehousing", "vi":"Kho vận", "zh":"仓储", "ja":"倉庫", "ko":"창고"}', 1),
('22222222-2222-2222-2222-222222222222', 'solutions-category', 'cat-processing', '{"en":"Processing", "vi":"Xử lý", "zh":"处理", "ja":"処理", "ko":"처리"}', 2),
('33333333-3333-3333-3333-333333333333', 'solutions-category', 'cat-transport', '{"en":"Transport", "vi":"Vận tải", "zh":"运输", "ja":"輸送", "ko":"운송"}', 3);

-- Solutions Items
INSERT INTO public.menus (menu_type, key, view_target, parent_id, translations, order_index) VALUES 
('solutions', 'smart-warehouse', 'smart-warehouse', '11111111-1111-1111-1111-111111111111', '{"en":"Smart Warehouse","vi":"Kho thông minh","zh":"智能仓库","ja":"スマート倉庫","ko":"스마트 창고"}', 1),
('solutions', 'fulfillment', 'fulfillment', '11111111-1111-1111-1111-111111111111', '{"en":"Fulfillment Warehouse","vi":"Kho phân phối","zh":"配送仓库","ja":"配送倉庫","ko":"풀필먼트 창고"}', 2),
('solutions', 'sorting', 'sorting', '22222222-2222-2222-2222-222222222222', '{"en":"Sorting Systems","vi":"Hệ thống phân loại","zh":"分拣系统","ja":"仕分けシステム","ko":"분류 시스템"}', 1),
('solutions', 'automation', 'automation', '22222222-2222-2222-2222-222222222222', '{"en":"Automation Factory","vi":"Nhà máy tự động hóa","zh":"自动化工厂","ja":"自動化工場","ko":"자동화 공장"}', 2),
('solutions', 'catering', 'catering', '33333333-3333-3333-3333-333333333333', '{"en":"Airport Catering","vi":"Phục vụ sân bay","zh":"机场餐饮","ja":"空港ケータリング","ko":"공항 케이터링"}', 1),
('solutions', 'seaport-agv', 'seaport-agv', '33333333-3333-3333-3333-333333333333', '{"en":"Seaport AGV","vi":"AGV cảng biển","zh":"港口AGV","ja":"港湾AGV","ko":"항만 AGV"}', 2);

-- 2. Products
INSERT INTO public.menus (menu_type, key, view_target, translations, order_index) VALUES
('products', 'product-racking', 'product-racking', '{"en":"Racking","vi":"Giá kệ","zh":"货架","ja":"ラッキング","ko":"랙킹"}', 1),
('products', 'product-containers', 'product-containers', '{"en":"Containers","vi":"Container","zh":"容器","ja":"コンテナ","ko":"컨테이너"}', 2),
('products', 'product-conveyors', 'product-conveyors', '{"en":"Conveyors","vi":"Băng tải","zh":"输送机","ja":"コンベア","ko":"컨베이어"}', 3),
('products', 'product-robotics', 'product-robotics', '{"en":"Robotics","vi":"Robot","zh":"机器人","ja":"ロボティクス","ko":"로봇공학"}', 4);

-- 3. Software
INSERT INTO public.menus (menu_type, key, view_target, translations, order_index) VALUES
('software', 'software-wamas', 'software-wamas', '{"en":"WAMAS","vi":"WAMAS","zh":"WAMAS","ja":"WAMAS","ko":"WAMAS"}', 1),
('software', 'software-sap', 'software-sap', '{"en":"SAP Solutions","vi":"Giải pháp SAP","zh":"SAP解决方案","ja":"SAPソリューション","ko":"SAP 솔루션"}', 2);

-- 4. Company
INSERT INTO public.menus (menu_type, key, view_target, translations, order_index) VALUES
('company', 'about', 'about', '{"en":"About Us","vi":"Về chúng tôi","zh":"关于我们","ja":"会社概要","ko":"회사 소개"}', 1),
('company', 'career', 'career', '{"en":"Career","vi":"Nghề nghiệp","zh":"职业","ja":"キャリア","ko":"채용"}', 2),
('company', 'resources', 'resources', '{"en":"Downloads & Resources","vi":"Tải xuống & Tài nguyên","zh":"下载与资源","ja":"ダウンロード＆リソース","ko":"다운로드 & 리소스"}', 3);

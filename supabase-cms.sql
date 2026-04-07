-- Tạo bảng content_blocks để chứa các đoạn nội dung lẻ tẻ trên một trang (VD: Tiêu đề banner, video mô tả)
CREATE TABLE IF NOT EXISTS public.content_blocks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    view_target TEXT NOT NULL, -- Xác định trang (VD: 'home', 'about', 'contact')
    block_key TEXT NOT NULL, -- Tên nhận diện block (VD: 'hero_title', 'hero_video')
    content_type TEXT NOT NULL DEFAULT 'text', -- text, image_url, video_url, file_url, json
    translations JSONB NOT NULL DEFAULT '{}'::jsonb, -- Dữ liệu JSON dịch ngôn ngữ (Lưu trữ URL nếu là image/video)
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(view_target, block_key)
);

-- Tạo bảng articles để chứa các bài viết dài (Giải pháp, Sản phẩm, Tin tức)
CREATE TABLE IF NOT EXISTS public.articles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category TEXT NOT NULL, -- VD: 'solutions', 'products', 'news', 'career'
    slug TEXT NOT NULL UNIQUE, -- Đường dẫn sạch để truy cập (VD: 'smart-warehouse')
    thumbnail_url TEXT, -- Ảnh bìa chung
    title_translations JSONB NOT NULL DEFAULT '{}'::jsonb,
    desc_translations JSONB NOT NULL DEFAULT '{}'::jsonb, -- Mô tả ngắn 
    content_translations JSONB NOT NULL DEFAULT '{}'::jsonb, -- Nội dung dài (Bài viết HTML/Markdown)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Các chính sách RLS
ALTER TABLE public.content_blocks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Cho phép đọc content block" ON public.content_blocks FOR SELECT USING (true);
CREATE POLICY "Cho phép chỉnh sửa content block" ON public.content_blocks FOR ALL USING (true);

ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Cho phép đọc articles" ON public.articles FOR SELECT USING (true);
CREATE POLICY "Cho phép chỉnh sửa articles" ON public.articles FOR ALL USING (true);

-- Chèn mẫu 1 block cho trang chủ
INSERT INTO public.content_blocks (view_target, block_key, content_type, translations) VALUES 
('home', 'hero_title', 'text', '{"en":"Future of Intralogistics & Automation", "vi":"Tương lai của Logistics nội bộ & Tự động hóa", "zh":"智能物流与自动化的未来", "ja":"イントラロジスティクスと自動化の未来", "ko":"인트라로지스틱스 및 자동화의 미래"}'),
('home', 'hero_subtitle', 'text', '{"en":"Industry-leading warehouse automation solutions that drive efficiency", "vi":"Giải pháp tự động hóa kho hàng hàng đầu", "zh":"行业领先的仓库自动化解决方案", "ja":"効率を高める倉庫自動化ソリューション", "ko":"효율성을 높이는 창고 자동화 솔루션"}'),
('home', 'hero_video', 'video_url', '{"en":""}'); -- Chừa link cho user thêm video sau

-- Giải pháp đầu tiên mẫu
INSERT INTO public.articles (category, slug, title_translations, desc_translations, content_translations) VALUES 
('solutions', 'smart-warehouse', 
'{"en":"Smart Warehouse", "vi":"Kho thông minh"}', 
'{"en":"Automated storage & retrieval.", "vi":"Lưu trữ & truy xuất tự động."}', 
'{"en":"Our Smart Warehouse solutions integrate cutting-edge automation technology...", "vi":"Giải pháp Kho thông minh tích hợp tự động hóa tiên tiến..."}');

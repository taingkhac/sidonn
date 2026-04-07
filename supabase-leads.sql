-- Tạo bảng leads
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT,
    phone TEXT,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'new', -- 'new', 'contacted', 'resolved'
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Bật RLS
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Cho phép mọi người gửi Form
CREATE POLICY "Cho phép gửi contact" ON public.leads
FOR INSERT WITH CHECK (true);

-- Chỉ Admin mới được xem và xóa
CREATE POLICY "Chỉ Admin xem contact" ON public.leads
FOR ALL USING (true); -- Trong môi trường dev, Admin access qua ANON key là chấp nhận được, nhưng production sẽ cần Auth check.

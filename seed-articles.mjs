import fs from 'fs'
import path from 'path'
import { createClient } from '@supabase/supabase-js'

const envPath = path.join(process.cwd(), '.env.local')
const envContent = fs.readFileSync(envPath, 'utf8')
const envs = {}
envContent.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/)
  if (match) envs[match[1].trim()] = match[2].trim()
})

const supabaseUrl = envs['NEXT_PUBLIC_SUPABASE_URL']
const supabaseKey = envs['NEXT_PUBLIC_SUPABASE_ANON_KEY']
const supabase = createClient(supabaseUrl, supabaseKey)

async function seed() {
  // Thay vì upload ảnh lên bằng API (Bị kẹt lỗi RLS Storage Của Supabase nếu bạn chưa cấp quyền `INSERT` trên UI), 
  // tôi sẽ dùng một link ảnh demo chất lượng cao về Smart Warehouse từ xa.
  const imageUrl = 'https://images.unsplash.com/photo-1586528116311-ad8ed7c80a30?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
  const sampleVideoUrl = 'https://www.w3schools.com/html/mov_bbb.mp4'

  console.log('Cập nhật Video nền cho trang chủ (HomePage)...')
  const { error: blockErr } = await supabase.from('content_blocks').upsert({
    view_target: 'home',
    block_key: 'hero_video',
    content_type: 'video_url',
    translations: {
      en: sampleVideoUrl,
      vi: sampleVideoUrl,
      zh: sampleVideoUrl,
      ja: sampleVideoUrl,
      ko: sampleVideoUrl
    }
  }, { onConflict: 'view_target,block_key' })
  
  if (blockErr) {
    console.error('Lỗi khi chèn Block video vào home:', blockErr.message)
    return
  }

  console.log('Tạo bài viết chuyên sâu về Smart Warehouse...')
  const contentVi = `<h2>Giới thiệu Kho Thông Minh (Smart Warehouse)</h2>
<p>Kho thông minh là thế hệ tiếp theo của giải pháp logistics nội bộ. Dự án này tận dụng xe tự hành (AGV) và robot lấy hàng tự động giúp doanh nghiệp giảm chi phí đến 40%.</p>
<p>Dưới đây là một đoạn video thực tế (mẫu 10s):</p>
<video src="${sampleVideoUrl}" controls style="width: 100%; border-radius: 8px; margin: 16px 0;"></video>
<p><strong>Lợi ích chính:</strong></p>
<ul>
  <li>Tăng tốc độ nhặt hàng (picking) lên 300%</li>
  <li>Giảm rủi ro tai nạn lao động</li>
  <li>Vận hành bền bỉ 24/7</li>
</ul>`

  const contentEn = `<h2>Introduction to Smart Warehouse</h2>
<p>The smart warehouse is the next generation of intralogistics solutions. This utilizes autonomous vehicles (AGVs) and automated picking robots to reduce costs by 40%.</p>
<p>Here is a practical video (10s sample):</p>
<video src="${sampleVideoUrl}" controls style="width: 100%; border-radius: 8px; margin: 16px 0;"></video>
<p><strong>Key Benefits:</strong></p>
<ul>
  <li>Increase picking speed by 300%</li>
  <li>Decrease workplace accidents</li>
  <li>24/7 autonomous operations</li>
</ul>`

  const { error: articleErr } = await supabase.from('articles').upsert({
    category: 'solutions',
    slug: 'smart-warehouse-nextgen',
    thumbnail_url: imageUrl,
    title_translations: {
      en: 'Smart Warehouse: The Next Generation Factory',
      vi: 'Kho Thông Minh: Tự Động Hóa Thế Hệ Mới',
    },
    desc_translations: {
      en: 'A deep dive into how AI and Robotics are reshaping fulfillment processes.',
      vi: 'Hệ thống tối ưu được chứng nhận bởi các tập đoàn hậu cần toàn cầu.',
    },
    content_translations: {
      en: contentEn,
      vi: contentVi
    }
  }, { onConflict: 'slug' })

  if (articleErr) {
    console.error('Lỗi tạo bài viết:', articleErr.message)
  } else {
    console.log('Xong! Bài viết đã được tạo và Video Home đã được cập nhật.')
  }
}

seed()

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const blocks = [
  // --- SHARED (GLOBAL) ---
  { view_target: 'shared', block_key: 'company_logo_url', default_text: '/sidonn-logo-clean.jpg' },
  { view_target: 'shared', block_key: 'social_facebook_url', default_text: '#' },
  { view_target: 'shared', block_key: 'social_twitter_url', default_text: '#' },
  { view_target: 'shared', block_key: 'social_linkedin_url', default_text: '#' },
  { view_target: 'shared', block_key: 'social_youtube_url', default_text: '#' },
  { view_target: 'shared', block_key: 'company_email_primary', default_text: 'info@gla-corp.com' },
  { view_target: 'shared', block_key: 'company_email_secondary', default_text: 'sales@gla-corp.com' },
  { view_target: 'shared', block_key: 'company_phone_primary', default_text: '+1 (555) 123-4567' },
  { view_target: 'shared', block_key: 'company_phone_secondary', default_text: '+1 (555) 765-4321' },
  {
    view_target: 'shared',
    block_key: 'company_address_html',
    default_text: '123 Innovation Drive<br />Silicon Valley, CA 94025<br />United States',
  },
  {
    view_target: 'shared',
    block_key: 'footer_description',
    default_text:
      'Sidonn - Leading provider of innovative warehouse automation and logistics solutions worldwide.',
  },
  { view_target: 'shared', block_key: 'nav_solutions', default_text: 'Solutions' },
  { view_target: 'shared', block_key: 'nav_products', default_text: 'Products' },
  { view_target: 'shared', block_key: 'nav_software', default_text: 'Software' },
  { view_target: 'shared', block_key: 'nav_company', default_text: 'Company' },
  { view_target: 'shared', block_key: 'nav_newsroom', default_text: 'Newsroom' },
  { view_target: 'shared', block_key: 'nav_support', default_text: 'Support' },
  { view_target: 'shared', block_key: 'nav_contact', default_text: 'Contact Us' },
  { view_target: 'shared', block_key: 'label_legal', default_text: 'Legal' },
  { view_target: 'shared', block_key: 'label_privacy', default_text: 'Privacy Policy' },
  { view_target: 'shared', block_key: 'label_terms', default_text: 'Terms of Service' },
  { view_target: 'shared', block_key: 'label_all_rights', default_text: 'All rights reserved.' },

  // --- HOME ---
  {
    view_target: 'home',
    block_key: 'hero_title',
    default_text: 'Future of Intralogistics & Automation',
  },
  {
    view_target: 'home',
    block_key: 'hero_subtitle',
    default_text: 'Industry-leading warehouse automation solutions that drive efficiency',
  },
  { view_target: 'home', block_key: 'hero_video', default_text: '' },
  { view_target: 'home', block_key: 'hero_explore', default_text: 'Explore Solutions' },
  { view_target: 'home', block_key: 'hero_watch', default_text: 'Watch Video' },
  { view_target: 'home', block_key: 'solutions_title', default_text: 'Our Core Expertise' },
  {
    view_target: 'home',
    block_key: 'solutions_subtitle',
    default_text: 'Six pillars of innovation powering the future of logistics automation',
  },
  { view_target: 'home', block_key: 'btn_learn_more', default_text: 'Learn more' },
  { view_target: 'home', block_key: 'global_title', default_text: 'Global Presence' },
  {
    view_target: 'home',
    block_key: 'global_subtitle',
    default_text: 'Trusted by leading enterprises across the world',
  },
  { view_target: 'home', block_key: 'global_countries', default_text: 'Countries' },
  { view_target: 'home', block_key: 'global_projects', default_text: 'Projects' },

  // --- ABOUT ---
  { view_target: 'about', block_key: 'about_title', default_text: 'About Sidonn' },
  {
    view_target: 'about',
    block_key: 'about_subtitle',
    default_text:
      'Leading the transformation of logistics through intelligent automation solutions since 1985',
  },
  { view_target: 'about', block_key: 'about_mission_title', default_text: 'Our Mission' },
  {
    view_target: 'about',
    block_key: 'about_mission_desc',
    default_text:
      'To empower businesses worldwide with cutting-edge automation solutions that enhance efficiency, reduce operational costs, and drive sustainable growth in the logistics industry.',
  },
  { view_target: 'about', block_key: 'about_vision_title', default_text: 'Our Vision' },
  {
    view_target: 'about',
    block_key: 'about_vision_desc',
    default_text:
      'To be the global leader in logistics automation, setting new standards for innovation, reliability, and customer satisfaction across all industries we serve.',
  },
  { view_target: 'about', block_key: 'about_stats_label_1', default_text: 'Countries Worldwide' },
  { view_target: 'about', block_key: 'about_stats_label_2', default_text: 'Projects Delivered' },
  { view_target: 'about', block_key: 'about_stats_label_3', default_text: 'Team Members' },
  { view_target: 'about', block_key: 'about_stats_label_4', default_text: 'Years of Excellence' },
  { view_target: 'about', block_key: 'about_story_title', default_text: 'Our Story' },
  {
    view_target: 'about',
    block_key: 'about_story_content',
    default_text:
      'Founded in 1985, Global Logistics Automation Corporation began as a small engineering firm with a vision to revolutionize warehouse operations through automation technology.',
  },
  {
    view_target: 'about',
    block_key: 'about_cta_title',
    default_text: 'Ready to Transform Your Operations?',
  },
  {
    view_target: 'about',
    block_key: 'about_cta_subtitle',
    default_text: 'Join thousands of companies worldwide who trust us for their automation needs',
  },
  { view_target: 'about', block_key: 'btn_contact_us', default_text: 'Contact Us Today' },

  // --- CONTACT ---
  { view_target: 'contact', block_key: 'breadcrumb_back_home', default_text: 'Back to Home' },
  { view_target: 'contact', block_key: 'breadcrumb_home', default_text: 'Home' },
  { view_target: 'contact', block_key: 'breadcrumb_contact', default_text: 'Contact Us' },
  { view_target: 'contact', block_key: 'contact_title', default_text: 'Get in Touch' },
  {
    view_target: 'contact',
    block_key: 'contact_subtitle',
    default_text:
      "Let's discuss how our automation solutions can transform your business operations",
  },
  { view_target: 'contact', block_key: 'contact_info_title', default_text: 'Contact Information' },
  {
    view_target: 'contact',
    block_key: 'contact_info_desc',
    default_text: 'Reach out to our team for inquiries, support, or to schedule a consultation.',
  },
  { view_target: 'contact', block_key: 'contact_email_label', default_text: 'Email' },
  { view_target: 'contact', block_key: 'contact_phone_label', default_text: 'Phone' },
  { view_target: 'contact', block_key: 'contact_address_label', default_text: 'Headquarters' },
  { view_target: 'contact', block_key: 'contact_form_title', default_text: 'Send us a Message' },
  { view_target: 'contact', block_key: 'label_full_name', default_text: 'Full Name' },
  { view_target: 'contact', block_key: 'label_email', default_text: 'Email Address' },
  { view_target: 'contact', block_key: 'label_company', default_text: 'Company' },
  { view_target: 'contact', block_key: 'label_phone', default_text: 'Phone Number' },
  { view_target: 'contact', block_key: 'label_message', default_text: 'Message' },
  { view_target: 'contact', block_key: 'btn_sending', default_text: 'Sending...' },
  { view_target: 'contact', block_key: 'btn_send_message', default_text: 'Send Message' },
  { view_target: 'contact', block_key: 'contact_success_title', default_text: 'Message Sent!' },
  {
    view_target: 'contact',
    block_key: 'contact_success_desc',
    default_text:
      'Thank you for contacting us. Our team has received your inquiry and will get back to you shortly.',
  },
  { view_target: 'contact', block_key: 'btn_send_another', default_text: 'Send another message' },

  // --- CAREER ---
  { view_target: 'career', block_key: 'career_title', default_text: 'Join Our Team' },
  {
    view_target: 'career',
    block_key: 'career_subtitle',
    default_text:
      "Build your career with a global leader in logistics automation. We're looking for talented individuals.",
  },
  { view_target: 'career', block_key: 'career_why_title', default_text: 'Why Work With Us' },
  {
    view_target: 'career',
    block_key: 'career_benefit_1_title',
    default_text: 'Innovative Projects',
  },
  {
    view_target: 'career',
    block_key: 'career_benefit_1_desc',
    default_text: 'Work on cutting-edge automation projects.',
  },
  {
    view_target: 'career',
    block_key: 'career_benefit_2_title',
    default_text: 'Global Opportunities',
  },
  {
    view_target: 'career',
    block_key: 'career_benefit_2_desc',
    default_text: 'Join a worldwide team with offices in over 50 countries.',
  },
  { view_target: 'career', block_key: 'career_benefit_3_title', default_text: 'Work-Life Balance' },
  {
    view_target: 'career',
    block_key: 'career_benefit_3_desc',
    default_text: 'Flexible work arrangements and comprehensive benefits package.',
  },
  { view_target: 'career', block_key: 'career_positions_title', default_text: 'Open Positions' },
  { view_target: 'career', block_key: 'btn_apply_now', default_text: 'Apply Now' },
  { view_target: 'career', block_key: 'career_cta_title', default_text: "Don't See the Right Role?" },
  {
    view_target: 'career',
    block_key: 'career_cta_subtitle',
    default_text: "Send us your resume and we'll keep you in mind for future opportunities.",
  },
  { view_target: 'career', block_key: 'btn_get_in_touch', default_text: 'Get In Touch' },

  // --- RESOURCES (RESOURCES) ---
  { view_target: 'resources', block_key: 'btn_back', default_text: 'Back' },
  { view_target: 'resources', block_key: 'breadcrumb_home', default_text: 'Home' },
  { view_target: 'resources', block_key: 'breadcrumb_downloads', default_text: 'Downloads' },
  { view_target: 'resources', block_key: 'downloads_title', default_text: 'Knowledge Center' },
  {
    view_target: 'resources',
    block_key: 'downloads_search_placeholder',
    default_text: 'Search for manuals...',
  },
  { view_target: 'resources', block_key: 'filter_all', default_text: 'All' },
  { view_target: 'resources', block_key: 'filter_brochures', default_text: 'Brochures' },
  { view_target: 'resources', block_key: 'filter_case_studies', default_text: 'Case Studies' },
  { view_target: 'resources', block_key: 'filter_whitepapers', default_text: 'Whitepapers' },
  { view_target: 'resources', block_key: 'filter_videos', default_text: 'Videos' },
  {
    view_target: 'resources',
    block_key: 'downloads_no_results',
    default_text: 'No resources found.',
  },
  { view_target: 'resources', block_key: 'btn_download', default_text: 'Download' },
];

async function seed() {
  console.log('[Seeder] Starting CMS Seeding...');

  for (const block of blocks) {
    const translations = {
      en: block.default_text,
      vi: block.default_text,
      zh: block.default_text,
      ja: block.default_text,
      ko: block.default_text,
    };

    console.log(`[Seeder] Seeding block: ${block.view_target} / ${block.block_key}`);

    const { data, error } = await supabase.from('content_blocks').upsert(
      [
        {
          view_target: block.view_target,
          block_key: block.block_key,
          translations: translations,
        },
      ],
      { onConflict: 'view_target,block_key' }
    );

    if (error) {
      console.error(`[Seeder] Error seeding ${block.block_key}:`, error.message);
    }
  }

  console.log('[Seeder] Seeding completed!');
}

seed();

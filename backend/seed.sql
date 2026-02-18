-- ╔══════════════════════════════════════════════════╗
-- ║       CODEVAULT — Seed Data                       ║
-- ║       Run AFTER schema.sql in SQL Editor          ║
-- ╚══════════════════════════════════════════════════╝

-- ─── Categories ───
INSERT INTO public.categories (name, slug) VALUES
  ('Full Stack', 'full-stack'),
  ('E-Commerce', 'e-commerce'),
  ('UI Kit', 'ui-kit'),
  ('Mobile', 'mobile'),
  ('AI/ML', 'ai-ml'),
  ('Portfolio', 'portfolio'),
  ('Templates', 'templates')
ON CONFLICT (slug) DO NOTHING;

-- ─── Products ───
INSERT INTO public.products (slug, name, description, short_description, price, original_price, category, tags, image_url, rating, reviews_count, downloads, featured, tech_stack, features, demo_url) VALUES
(
  'nextjs-saas-starter',
  'Next.js SaaS Starter Kit',
  'Complete SaaS boilerplate with authentication, payments, dashboards, admin panel, and responsive landing pages. Built with Next.js 15, Tailwind CSS, and Stripe.',
  'Full-stack SaaS boilerplate with auth, payments & dashboards.',
  1999, 4999, 'Full Stack',
  ARRAY['Next.js', 'React', 'Tailwind', 'Stripe', 'Auth'],
  '/images/products/saas-starter.png',
  4.9, 124, 2340, true,
  ARRAY['Next.js 15', 'Tailwind CSS', 'Prisma', 'Stripe', 'NextAuth'],
  ARRAY['Complete authentication system', 'Stripe payment integration', 'Admin dashboard', 'User dashboard', 'Responsive landing page', 'Email templates', 'Dark mode support', 'SEO optimized'],
  '/demo/nextjs-saas-starter'
),
(
  'react-ecommerce-pro',
  'React E-Commerce Pro',
  'Production-ready e-commerce template with product catalog, cart system, checkout flow, order management, and admin panel. Fully responsive with stunning animations.',
  'Complete e-commerce solution with cart, checkout & admin.',
  1499, 3999, 'E-Commerce',
  ARRAY['React', 'Node.js', 'MongoDB', 'Redux', 'Stripe'],
  '/images/products/ecommerce-pro.png',
  4.8, 89, 1870, true,
  ARRAY['React 19', 'Node.js', 'Express', 'MongoDB', 'Redux Toolkit'],
  ARRAY['Product catalog with filters', 'Shopping cart system', 'Secure checkout flow', 'Order tracking', 'Admin panel', 'Inventory management', 'Review & rating system', 'Responsive design'],
  '/demo/react-ecommerce-pro'
),
(
  'tailwind-dashboard-ui',
  'Tailwind Dashboard UI Kit',
  '50+ premium dashboard components, 10 page templates, charts, tables, forms, and widgets. Perfect for building admin panels and analytics dashboards.',
  '50+ dashboard components with charts, tables & forms.',
  999, 2499, 'UI Kit',
  ARRAY['Tailwind', 'React', 'Charts', 'Dashboard', 'Components'],
  '/images/products/dashboard-ui.png',
  4.7, 156, 3120, true,
  ARRAY['React', 'Tailwind CSS', 'Recharts', 'Headless UI'],
  ARRAY['50+ UI components', '10 page templates', 'Interactive charts', 'Data tables', 'Form components', 'Notification system', 'Sidebar layouts', 'Dark & light themes'],
  '/demo/tailwind-dashboard-ui'
),
(
  'mern-social-network',
  'MERN Social Network',
  'Complete social media platform with user profiles, posts, stories, real-time chat, notifications, and friend system. Built with the MERN stack and Socket.io.',
  'Full social media platform with chat & notifications.',
  2499, 5999, 'Full Stack',
  ARRAY['MongoDB', 'Express', 'React', 'Node.js', 'Socket.io'],
  '/images/products/social-network.png',
  4.6, 67, 980, false,
  ARRAY['MongoDB', 'Express.js', 'React', 'Node.js', 'Socket.io'],
  ARRAY['User profiles & bios', 'Posts with images & videos', 'Stories feature', 'Real-time chat', 'Push notifications', 'Friend system', 'Search & discover', 'Content moderation'],
  '/demo/mern-social-network'
),
(
  'flutter-food-delivery',
  'Flutter Food Delivery App',
  'Beautiful food delivery app with restaurant listings, cart, real-time order tracking, and payment integration. Cross-platform for iOS and Android.',
  'Cross-platform food delivery app with order tracking.',
  1799, 3999, 'Mobile',
  ARRAY['Flutter', 'Dart', 'Firebase', 'Google Maps', 'Stripe'],
  '/images/products/food-delivery.png',
  4.8, 45, 760, false,
  ARRAY['Flutter', 'Dart', 'Firebase', 'Google Maps API', 'Stripe'],
  ARRAY['Restaurant listings', 'Menu browsing', 'Cart & checkout', 'Real-time tracking', 'Payment integration', 'Rating & reviews', 'Push notifications', 'Admin panel'],
  '/demo/flutter-food-delivery'
),
(
  'ai-chatbot-template',
  'AI Chatbot Template',
  'Production-ready AI chatbot interface with OpenAI integration, conversation history, streaming responses, and beautiful glassmorphic UI.',
  'AI chatbot with OpenAI integration & streaming.',
  1299, 2999, 'AI/ML',
  ARRAY['Next.js', 'OpenAI', 'AI', 'Chatbot', 'Streaming'],
  '/images/products/ai-chatbot.png',
  4.9, 78, 1540, true,
  ARRAY['Next.js 15', 'OpenAI API', 'Tailwind CSS', 'Vercel AI SDK'],
  ARRAY['OpenAI GPT integration', 'Streaming responses', 'Conversation history', 'Code highlighting', 'Markdown rendering', 'File uploads', 'Dark/Light themes', 'Mobile responsive'],
  '/demo/ai-chatbot-template'
),
(
  'portfolio-starter',
  'Developer Portfolio Pro',
  'Stunning portfolio website with animated sections, project showcase, blog, contact form, and glassmorphic design. Perfect for developers and designers.',
  'Animated portfolio with project showcase & blog.',
  699, 1499, 'Portfolio',
  ARRAY['Next.js', 'Framer Motion', 'Tailwind', 'MDX', 'Portfolio'],
  '/images/products/portfolio.png',
  4.7, 198, 4200, false,
  ARRAY['Next.js 15', 'Framer Motion', 'Tailwind CSS', 'MDX'],
  ARRAY['Animated hero section', 'Project showcase grid', 'Blog with MDX', 'Contact form', 'Testimonials', 'Skills section', 'Resume download', 'SEO optimized'],
  '/demo/portfolio-starter'
),
(
  'landing-page-collection',
  'Landing Page Collection',
  '12 premium landing page templates for SaaS, agency, startup, product launch, and more. Fully responsive with conversion-optimized layouts.',
  '12 premium landing page templates for every need.',
  899, 1999, 'Templates',
  ARRAY['HTML', 'Tailwind', 'Landing Pages', 'Templates', 'Responsive'],
  '/images/products/landing-pages.png',
  4.5, 234, 5100, false,
  ARRAY['HTML5', 'Tailwind CSS', 'JavaScript', 'Alpine.js'],
  ARRAY['12 unique templates', 'Conversion optimized', 'Fully responsive', 'Custom animations', 'Contact forms', 'Pricing sections', 'Testimonial sections', 'Newsletter signups'],
  '/demo/landing-page-collection'
)
ON CONFLICT (slug) DO NOTHING;

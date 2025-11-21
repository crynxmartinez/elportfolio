-- Insert all projects
INSERT INTO projects (title, description, category, image_url, live_url, tech_stack, featured, order_index) VALUES
-- Systems
('Boat Booking System', 'User-friendly boat rental platform with booking calendar, payment integration, and customer management features.', 'systems', 'https://storage.googleapis.com/msgsndr/xzA6eU8kOYmBuwFdr3CF/media/689e644cf20a61f985e83752.png', 'https://elportfolio.site/boat-booking-system', ARRAY['GoHighLevel', 'JavaScript', 'Firebase'], true, 1),

('Flight Booking Request', 'Yacht charter booking platform with advanced search filters and seamless reservation process.', 'systems', 'https://storage.googleapis.com/msgsndr/xzA6eU8kOYmBuwFdr3CF/media/689e644c902d12e7e7bc23fa.png', 'https://elportfolio.site/yatch-project', ARRAY['GoHighLevel', 'JavaScript'], false, 2),

('Boat Booking Admin Panel', 'Comprehensive admin dashboard for managing boat bookings, schedules, and customer data with real-time analytics.', 'systems', 'https://storage.googleapis.com/msgsndr/xzA6eU8kOYmBuwFdr3CF/media/689e644ca58c4c0b27a86b7e.png', 'https://elportfolio.site/boat-booking-system-admin', ARRAY['GoHighLevel', 'JavaScript', 'Firebase'], true, 3),

('Real Estate Listing Web System', 'Complete real estate listing website in GHL with database and admin page - like Zillow.', 'systems', 'https://storage.googleapis.com/msgsndr/xzA6eU8kOYmBuwFdr3CF/media/68a2621f25dfa3d625203a40.png', 'https://app.gohighlevel.com/v2/preview/iksanOJVGzLjXedy1OJ2', ARRAY['GoHighLevel', 'JavaScript', 'Database'], true, 4),

('Roof Estimate with Calculator', 'Roofing website with calculator estimate to get customer details and provide accurate pricing.', 'systems', 'https://storage.googleapis.com/msgsndr/xzA6eU8kOYmBuwFdr3CF/media/68a26299f4db3f655ab54067.png', 'https://app.gohighlevel.com/v2/preview/j2XSo7l50hPR3NUyBJMx', ARRAY['GoHighLevel', 'JavaScript'], false, 5),

('Hotel Booking System', 'Complete hotel reservation platform with booking management and comprehensive admin dashboard.', 'systems', 'https://storage.googleapis.com/msgsndr/xzA6eU8kOYmBuwFdr3CF/media/68a51a17b130b39bbf2341f3.png', 'https://elportfolio.site/hotel-booking', ARRAY['GoHighLevel', 'JavaScript', 'Firebase'], true, 6),

('Blood Donor System', 'Complete system with admin. Blood donors can register, then people can browse blood donors to contact them. System has 24 hour IP cooldown to avoid spam requests.', 'systems', 'https://storage.googleapis.com/msgsndr/xzA6eU8kOYmBuwFdr3CF/media/68a2632225dfa36eab254cc2.png', 'https://myblooddonorph.com/home', ARRAY['GoHighLevel', 'JavaScript', 'Firebase'], true, 7),

('Staff Staff - Time Tracking System', 'A Hubstaff-like web browser time tracking system built in GHL. Staff Login: Username: staff, Password: staff123 | Admin Login: Username: admin, Password: admin123', 'systems', 'https://storage.googleapis.com/msgsndr/xzA6eU8kOYmBuwFdr3CF/media/68a6e89448220c313e1d4433.png', 'https://elportfolio.site/staff-staff-login', ARRAY['GoHighLevel', 'JavaScript', 'Time Tracking'], false, 8),

('MedSpa Queue Booking System', 'A simple and efficient medical spa queue booking system for managing appointments and customer flow.', 'systems', 'https://storage.googleapis.com/msgsndr/xzA6eU8kOYmBuwFdr3CF/media/68a84f497dc6b0552b6c1e38.png', 'https://elportfolio.site/med-spa-index', ARRAY['GoHighLevel', 'JavaScript'], false, 9),

('AFC Arena for Creatives', 'Social media contest website for creatives to showcase their work and compete in challenges.', 'systems', 'https://placehold.co/600x400/2563eb/ffffff?text=AFC+Arena', 'https://afc-kappa.vercel.app', ARRAY['Next.js', 'React', 'TypeScript', 'Vercel'], true, 10),

('Aljinan Clinic V2', 'Appointment booking system for clinic with backend CRM for creating doctors, staff and services. Connected with GHL automations for email and WhatsApp notifications.', 'systems', 'https://placehold.co/600x400/2563eb/ffffff?text=Aljinan+Clinic', 'https://aljinan-clinic-v2.vercel.app', ARRAY['Next.js', 'React', 'TypeScript', 'GoHighLevel', 'CRM'], true, 11),

('Car Booking System', 'Improved car booking system with backend CRM for the company to manage bookings and customers.', 'systems', 'https://placehold.co/600x400/2563eb/ffffff?text=Car+Booking', 'https://car-booking-gules.vercel.app', ARRAY['Next.js', 'React', 'TypeScript', 'CRM'], true, 12),

('GHL Store Fulfillment Dashboard', 'Custom order fulfillment dashboard that fetches any store order via automations. Includes extensive customizations and API integrations since GHL order fulfillment is not for everyone.', 'systems', 'https://placehold.co/600x400/2563eb/ffffff?text=GHL+Store', 'https://ghl-order-fulfillment-dashboard.vercel.app', ARRAY['Next.js', 'React', 'TypeScript', 'GoHighLevel', 'API'], true, 13),

-- Websites
('Maven HQ', 'Professional business website featuring modern design and conversion optimization.', 'websites', 'https://storage.googleapis.com/msgsndr/xzA6eU8kOYmBuwFdr3CF/media/6890045671c40f68aae47b02.png', 'https://elportfolio.site/maven', ARRAY['GoHighLevel', 'HTML', 'CSS', 'JavaScript'], false, 14),

('Codex Trading Card Game', 'Trading card game website with custom design, product showcase, and e-commerce functionality.', 'websites', 'https://storage.googleapis.com/msgsndr/xzA6eU8kOYmBuwFdr3CF/media/68900456c8d412572aca23b7.png', 'https://codexlegendtcg.site/home', ARRAY['GoHighLevel', 'E-commerce'], false, 15),

('Matrix', 'Modern tech-focused website with sleek design and advanced functionality.', 'websites', 'https://storage.googleapis.com/msgsndr/xzA6eU8kOYmBuwFdr3CF/media/6890045635bd21753df3c8d7.png', 'https://elportfolio.site/matrix', ARRAY['GoHighLevel', 'HTML', 'CSS', 'JavaScript'], false, 16),

('JCI Tawitawi', 'Professional organization website featuring member portal, events management, and community features.', 'websites', 'https://storage.googleapis.com/msgsndr/xzA6eU8kOYmBuwFdr3CF/media/6890045671c40f2de0e47b00.png', 'https://jcitawitawi.com/home', ARRAY['GoHighLevel', 'Community'], false, 17),

('LanderX', 'Modern landing page with sleek design, conversion optimization, and professional user experience.', 'websites', 'https://storage.googleapis.com/msgsndr/xzA6eU8kOYmBuwFdr3CF/media/68900456c8d4129822ca23b6.png', 'https://elportfolio.site/landerx', ARRAY['GoHighLevel', 'Landing Page'], false, 18),

('One Path Umrah', 'Travel and pilgrimage website with booking system, package details, and customer management.', 'websites', 'https://storage.googleapis.com/msgsndr/xzA6eU8kOYmBuwFdr3CF/media/68900456c8d4122676ca23b5.png', 'https://onepathumrah.com/home', ARRAY['GoHighLevel', 'Travel', 'Booking'], false, 19),

('Taysir', 'Professional services website with modern design, service showcase, and client portal integration.', 'websites', 'https://storage.googleapis.com/msgsndr/xzA6eU8kOYmBuwFdr3CF/media/6890045671c40f9561e47b01.png', 'https://taysir.pro/front', ARRAY['GoHighLevel', 'Services'], false, 20),

('Galactic SaaS', 'Modern SaaS platform website with sleek design, feature showcase, and conversion-optimized landing pages.', 'websites', 'https://storage.googleapis.com/msgsndr/xzA6eU8kOYmBuwFdr3CF/media/6894fcf7dab355693419069b.png', 'https://elportfolio.site/galactic-saas', ARRAY['GoHighLevel', 'SaaS'], false, 21),

('Pizza', 'A modern pizza ordering website with interactive menu and cart functionality.', 'websites', 'https://storage.googleapis.com/msgsndr/xzA6eU8kOYmBuwFdr3CF/media/68900456c8d41266c2ca23b4.png', 'https://elportfolio.site/pizza', ARRAY['GoHighLevel', 'E-commerce'], false, 22),

('Anti Clone Website', 'Website designed to prevent easy cloning by cloner apps. They can still clone it if given enough time but not easily.', 'websites', 'https://storage.googleapis.com/msgsndr/xzA6eU8kOYmBuwFdr3CF/media/68a261be25dfa3223e1f2bc6.png', 'https://elportfolio.site/matrix---anti-clone', ARRAY['GoHighLevel', 'Security'], false, 23),

('New Full Page Gallery', 'Gallery on the bottom right then displayed full page. Good for creatives showcasing their work.', 'websites', 'https://storage.googleapis.com/msgsndr/xzA6eU8kOYmBuwFdr3CF/media/68a261be25dfa34dcb1f2bc5.png', 'https://elportfolio.site/hero-image-slider', ARRAY['GoHighLevel', 'Gallery'], false, 24),

-- Games
('GHL Color Match Game', 'Who said we cant create games in GHL. Try it and test your color matching skills in this fun interactive game.', 'games', 'https://storage.googleapis.com/msgsndr/xzA6eU8kOYmBuwFdr3CF/media/68a261bee6615f7f3b56504d.png', 'https://elportfolio.site/color-match-ghl-game', ARRAY['GoHighLevel', 'JavaScript', 'Game'], true, 25);

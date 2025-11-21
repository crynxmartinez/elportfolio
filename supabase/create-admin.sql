-- Create admin user
-- IMPORTANT: You MUST create the user through Supabase Dashboard UI
-- Direct SQL insert into auth.users is not allowed for security reasons

-- Instructions:
-- 1. Go to Supabase Dashboard > Authentication > Users
-- 2. Click "Add User" or "Invite User"
-- 3. Enter your credentials
-- 4. Check "Auto Confirm User" 
-- 5. Click Create

-- After creating the user in Supabase Auth UI, optionally run this:
-- (Replace 'your-email@example.com' with the email you used)
INSERT INTO admin_users (email)
VALUES ('your-email@example.com')
ON CONFLICT (email) DO NOTHING;

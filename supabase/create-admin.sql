-- Create admin user with username: eladmin and password: eladmin
-- Run this in Supabase SQL Editor

-- Step 1: Create the auth user
-- Note: Supabase requires email format, so we use eladmin as the email prefix
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  confirmation_token
)
VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'eladmin',
  crypt('eladmin', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  FALSE,
  ''
);

-- Step 2: Add to admin_users table (optional)
INSERT INTO admin_users (email)
VALUES ('eladmin')
ON CONFLICT (email) DO NOTHING;

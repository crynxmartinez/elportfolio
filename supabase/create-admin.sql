-- Create admin_users table if it doesn't exist
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add admin user
INSERT INTO admin_users (email)
VALUES ('elportfolio@admin.com')
ON CONFLICT (email) DO NOTHING;

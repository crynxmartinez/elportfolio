# El Martinez Portfolio V3

A modern, dynamic portfolio website built with Next.js 14, Supabase, and TailwindCSS. Features a full admin panel for managing projects without touching code.

## Features

- 🎨 Modern, responsive design
- 📱 Mobile-first approach
- 🔐 Secure admin authentication
- ✏️ Full CRUD operations for projects
- 🗂️ Category filtering (Websites, Systems, Games)
- ⭐ Featured projects section
- 🚀 Built with Next.js 14 App Router
- 💾 Supabase backend with PostgreSQL
- 🎯 TypeScript for type safety

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** TailwindCSS
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **Deployment:** Vercel
- **Language:** TypeScript

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase Database

Run the SQL scripts in the Supabase SQL Editor:

1. First, run `supabase/schema.sql` to create tables
2. (Optional) Run `supabase/seed.sql` to add sample projects

### 3. Configure Environment Variables

The `.env.local` file is already configured with your Supabase credentials:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 4. Create Admin User

In Supabase Dashboard:
1. Go to Authentication > Users
2. Click "Add User"
3. Create an account with email and password
4. Use these credentials to log in at `/admin/login`

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
├── app/
│   ├── page.tsx              # Home page
│   ├── projects/             # Projects listing
│   ├── contact/              # Contact page
│   └── admin/                # Admin panel
│       ├── login/            # Admin login
│       └── dashboard/        # Project management
├── components/
│   ├── Navigation.tsx        # Main navigation
│   ├── ProjectCard.tsx       # Project card component
│   ├── ProjectFilter.tsx     # Category filter
│   └── admin/                # Admin components
├── lib/
│   └── supabase/             # Supabase client setup
├── types/
│   └── database.ts           # TypeScript types
└── supabase/
    ├── schema.sql            # Database schema
    └── seed.sql              # Sample data
```

## Usage

### Admin Panel

1. Navigate to `/admin/login`
2. Sign in with your Supabase credentials
3. Add, edit, or delete projects
4. Mark projects as "featured" to show on homepage
5. Organize projects by category

### Adding Projects

From the admin dashboard:
1. Click "Add New Project"
2. Fill in project details:
   - Title
   - Description
   - Category (Websites/Systems/Games)
   - Live URL
   - Image URL (optional)
   - Tech Stack (comma-separated)
   - Featured checkbox
   - Order Index (for sorting)
3. Click "Create Project"

## Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Import repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

Vercel will automatically detect Next.js and configure everything.

## Database Schema

### Projects Table
- `id` - UUID (Primary Key)
- `title` - Text
- `description` - Text
- `category` - Enum (websites, systems, games)
- `image_url` - Text (optional)
- `live_url` - Text
- `tech_stack` - Text Array
- `featured` - Boolean
- `order_index` - Integer
- `created_at` - Timestamp
- `updated_at` - Timestamp

## License

MIT

## Author

El Martinez - Professional Web Developer

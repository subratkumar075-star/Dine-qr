# Install required tools
npm install -g bun

# Create Next.js 14 project with Dine QR branding
bun create next-app dine-qr --typescript --tailwind --app

cd dine-qr

# Install dependencies
bun add @supabase/supabase-js @supabase/auth-helpers-nextjs qrcode \
  @types/qrcode @heroicons/react lucide-react i18next react-i18next

# Initialize Supabase
bunx supabase init
bunx supabase start

# Run dev server
bun run dev

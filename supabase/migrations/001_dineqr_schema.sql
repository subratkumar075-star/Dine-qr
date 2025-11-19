-- Restaurants table
create table restaurants (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  slug text unique not null,  -- for URL: dineqr.sa/burger-king-riyadh
  owner_id uuid references auth.users(id),
  subscription_tier text default 'free',  -- free, basic, premium
  logo_url text,
  brand_color text default '#2563eb',  -- Blue for Dine QR
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Menus table
create table menus (
  id uuid default gen_random_uuid() primary key,
  restaurant_id uuid references restaurants(id),
  name text not null,  -- "Main Menu", "Breakfast Menu"
  is_active boolean default true,
  qr_code_data text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Menu items
create table menu_items (
  id uuid default gen_random_uuid() primary key,
  menu_id uuid references menus(id),
  name_ar text not null,
  name_en text not null,
  description_ar text,
  description_en text,
  price decimal(10,2) not null,
  image_url text,
  category text,
  is_available boolean default true,
  is_popular boolean default false,  -- Dine QR feature
  sort_order integer default 0
);

-- QR scan analytics
create table qr_scans (
  id uuid default gen_random_uuid() primary key,
  menu_id uuid references menus(id),
  scanned_at timestamp with time zone default now(),
  ip_address inet,
  user_agent text,
  city text,
  country text default 'SA'
);

-- Subscriptions (Dine QR billing)
create table subscriptions (
  id uuid default gen_random_uuid() primary key,
  restaurant_id uuid references restaurants(id),
  plan_name text not null,  -- 'basic', 'premium'
  price_sar decimal(10,2) not null,
  status text default 'active',  -- active, cancelled, expired
  started_at timestamp with time zone default now(),
  expires_at timestamp with time zone
);

-- Enable Row Level Security
alter table restaurants enable row level security;
alter table menus enable row level security;
alter table menu_items enable row level security;

-- Security policies
create policy "Users manage own restaurants" on restaurants
  for all using (auth.uid() = owner_id);

create policy "Users manage own menus" on menus
  for all using (
    auth.uid() = (select owner_id from restaurants where id = menu_id)
  );

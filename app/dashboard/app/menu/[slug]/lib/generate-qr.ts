import QRCode from 'qrcode';

export async function generateQRCode(restaurantSlug: string) {
  const url = `https://dineqr.sa/menu/${restaurantSlug}`;
  
  // Generate SVG with Dine QR branding
  const svg = await QRCode.toString(url, {
    type: 'svg',
    errorCorrectionLevel: 'H',
    margin: 2,
    width: 300,
    color: {
      dark: '#2563eb',  // Dine QR blue
      light: '#FFFFFF'
    }
  });
  
  // Add Dine QR logo in center (optional)
  const svgWithLogo = svg.replace(
    '</svg>',
    `<text x="50%" y="50%" text-anchor="middle" font-size="20" font-weight="bold" fill="#f97316">Dine QR</text></svg>`
  );
  
  return svgWithLogo;
}

// API Route for generating QR codes
// app/api/qr/generate/route.ts
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { generateQRCode } from '@/lib/generate-qr';

export async function POST(request: Request) {
  const { restaurantId } = await request.json();
  const supabase = createRouteHandlerClient({ cookies });
  
  // Get restaurant slug
  const { data: restaurant } = await supabase
    .from('restaurants')
    .select('slug')
    .eq('id', restaurantId)
    .single();
  
  if (!restaurant) {
    return new Response('Restaurant not found', { status: 404 });
  }
  
  const qrSvg = await generateQRCode(restaurant.slug);
  
  // Save to database
  await supabase
    .from('menus')
    .update({ qr_code_data: qrSvg })
    .eq('restaurant_id', restaurantId);
  
  return new Response(qrSvg, {
    headers: { 'Content-Type': 'image/svg+xml' }
  });
}

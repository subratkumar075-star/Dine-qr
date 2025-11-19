// app/menu/[slug]/page.tsx
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Image from 'next/image';

export default async function MenuPage({ params }: { params: { slug: string } }) {
  const supabase = createServerComponentClient({ cookies });
  
  const { data: restaurant } = await supabase
    .from('restaurants')
    .select(`
      *,
      menus (
        id,
        name,
        menu_items (*)
      )
    `)
    .eq('slug', params.slug)
    .single();

  if (!restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">المطعم غير موجود</h1>
          <p className="text-gray-600 mt-2">تأكد من الرابط وحاول مرة أخرى</p>
        </div>
      </div>
    );
  }

  // Track QR scan
  await supabase.from('qr_scans').insert({
    menu_id: restaurant.menus[0]?.id,
    user_agent: 'mobile'
  });

  const menuItems = restaurant.menus[0]?.menu_items || [];
  const categories = [...new Set(menuItems.map(item => item.category))];

  return (
    <div className="bg-gray-50 min-h-screen" dir="rtl">
      {/* Header */}
      <header 
        className="sticky top-0 z-50 bg-white shadow-md"
        style={{ borderTop: `4px solid ${restaurant.brand_color || '#2563eb'}` }}
      >
        <div className="p-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">{restaurant.name}</h1>
            <p className="text-sm text-gray-600">القائمة الرقمية</p>
          </div>
          <button className="text-blue-600 font-bold border-2 border-blue-600 px-4 py-2 rounded-full hover:bg-blue-50">
            English
          </button>
        </div>
      </header>

      {/* Categories Tabs */}
      <div className="bg-white border-b sticky top-[72px] z-40">
        <div className="flex overflow-x-auto scrollbar-hide">
          {categories.map(cat => (
            <button 
              key={cat}
              className="px-6 py-4 whitespace-nowrap font-bold text-blue-600 border-b-4 border-blue-600 hover:bg-blue-50"
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Items */}
      <div className="p-4 space-y-6 pb-20">
        {categories.map(category => (
          <div key={category} id={category}>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">{category}</h2>
            <div className="space-y-4">
              {menuItems
                .filter(item => item.category === category)
                .map(item => (
                  <div 
                    key={item.id} 
                    className="bg-white rounded-xl shadow-md p-5 flex gap-4 hover:shadow-lg transition"
                  >
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <h3 className="font-bold text-xl">{item.name_ar}</h3>
                        {item.is_popular && (
                          <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                            الأكثر طلباً
                          </span>
                        )}
                      </div>
                      <p className="text-gray-500 text-sm mt-1">{item.name_en}</p>
                      {item.description_ar && (
                        <p className="text-gray-600 mt-2 text-sm">{item.description_ar}</p>
                      )}
                      <div className="mt-3 flex items-center justify-between">
                        <p className="text-blue-600 font-bold text-2xl">{item.price} ر.س</p>
                        {!item.is_available && (
                          <span className="text-red-500 text-sm font-bold">غير متوفر</span>
                        )}
                      </div>
                    </div>
                    {item.image_url && (
                      <div className="relative w-28 h-28 flex-shrink-0">
                        <Image 
                          src={item.image_url} 
                          alt={item.name_ar}
                          fill
                          className="rounded-lg object-cover"
                        />
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer - Powered by Dine QR */}
      <footer className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-orange-500 text-white py-3 text-center">
        <p className="text-sm">
          مدعوم بواسطة <span className="font-bold">Dine QR</span> 
          {' '}- القوائم الرقمية للمطاعم
        </p>
      </footer>
    </div>
  );
}

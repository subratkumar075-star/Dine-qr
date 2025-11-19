// app/dashboard/page.tsx
'use client';
import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { PlusIcon, TrashIcon, PencilIcon } from '@heroicons/react/24/outline';

export default function Dashboard() {
  const [menuItems, setMenuItems] = useState([]);
  const [newItem, setNewItem] = useState({ 
    name_ar: '', 
    name_en: '', 
    price: '', 
    category: 'مشروبات' 
  });
  const supabase = createClientComponentClient();

  useEffect(() => {
    loadMenu();
  }, []);

  async function loadMenu() {
    const { data } = await supabase
      .from('menu_items')
      .select('*')
      .order('sort_order', { ascending: true });
    setMenuItems(data || []);
  }

  const addItem = async () => {
    const { error } = await supabase.from('menu_items').insert([newItem]);
    if (!error) {
      loadMenu();
      setNewItem({ name_ar: '', name_en: '', price: '', category: 'مشروبات' });
    }
  };

  const deleteItem = async (id) => {
    await supabase.from('menu_items').delete().eq('id', id);
    loadMenu();
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-orange-500 text-white p-6 shadow-lg">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">Dine QR - لوحة التحكم</h1>
          <p className="text-sm mt-1">مرحباً بك في نظام إدارة القوائم</p>
        </div>
      </header>

      <div className="container mx-auto p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Add Item Form */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-lg sticky top-8">
              <h2 className="text-xl font-bold mb-6 flex items-center">
                <PlusIcon className="w-6 h-6 ml-2" />
                إضافة صنف جديد
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold mb-2">الاسم بالعربية</label>
                  <input 
                    placeholder="كابتشينو"
                    className="border-2 border-gray-200 p-3 w-full rounded-lg focus:border-blue-500"
                    value={newItem.name_ar}
                    onChange={e => setNewItem({...newItem, name_ar: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">Name in English</label>
                  <input 
                    placeholder="Cappuccino"
                    className="border-2 border-gray-200 p-3 w-full rounded-lg focus:border-blue-500"
                    value={newItem.name_en}
                    onChange={e => setNewItem({...newItem, name_en: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">السعر (ر.س)</label>
                  <input 
                    placeholder="15.00"
                    type="number"
                    step="0.01"
                    className="border-2 border-gray-200 p-3 w-full rounded-lg focus:border-blue-500"
                    value={newItem.price}
                    onChange={e => setNewItem({...newItem, price: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">التصنيف</label>
                  <select 
                    className="border-2 border-gray-200 p-3 w-full rounded-lg focus:border-blue-500"
                    value={newItem.category}
                    onChange={e => setNewItem({...newItem, category: e.target.value})}
                  >
                    <option>مشروبات</option>
                    <option>مقبلات</option>
                    <option>أطباق رئيسية</option>
                    <option>حلويات</option>
                  </select>
                </div>

                <button 
                  onClick={addItem}
                  className="w-full bg-gradient-to-r from-blue-600 to-orange-500 text-white py-3 rounded-lg font-bold hover:shadow-lg transition"
                >
                  إضافة إلى القائمة
                </button>
              </div>
            </div>
          </div>

          {/* Menu Items List */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold mb-6">قائمة الأصناف ({menuItems.length})</h2>
              
              {menuItems.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  <p className="text-lg">لا توجد أصناف بعد</p>
                  <p className="text-sm mt-2">ابدأ بإضافة أول صنف من النموذج →</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {menuItems.map(item => (
                    <div key={item.id} className="bg-gray-50 p-5 rounded-lg flex justify-between items-center hover:shadow-md transition">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg">{item.name_ar}</h3>
                        <p className="text-gray-600 text-sm">{item.name_en}</p>
                        <div className="flex gap-4 mt-2">
                          <span className="text-blue-600 font-bold text-lg">{item.price} ر.س</span>
                          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs">
                            {item.category}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="p-2 text-gray-600 hover:text-blue-600">
                          <PencilIcon className="w-5 h-5" />
                        </button>
                        <button 
                          onClick={() => deleteItem(item.id)}
                          className="p-2 text-gray-600 hover:text-red-600"
                        >
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

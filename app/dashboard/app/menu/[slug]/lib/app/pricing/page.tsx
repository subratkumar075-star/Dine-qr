// app/pricing/page.tsx
import { CheckIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

const plans = [
  {
    name: 'تجريبي',
    price: '0',
    period: '30 يوم',
    description: 'مثالي للتجربة',
    features: [
      'قائمة واحدة',
      'حتى 30 صنف',
      'QR كود واحد',
      'تحليلات أساسية',
      'دعم فني عبر الإيميل'
    ],
    cta: 'ابدأ التجربة',
    highlighted: false
  },
  {
    name: 'أساسي',
    price: '149',
    period: 'شهرياً',
    description: 'للمطاعم الصغيرة',
    features: [
      'حتى 3 قوائم',
      'أصناف غير محدودة',
      'QR لكل طاولة',
      'تحديثات فورية',
      'تحليلات متقدمة',
      'دعم واتساب 24/7',
      'نسخة إنجليزية تلقائية'
    ],
    cta: 'اشترك الآن',
    highlighted: true
  },
  {
    name: 'احترافي',
    price: '399',
    period: 'شهرياً',
    description: 'للسلاسل والفنادق',
    features: [
      'كل مميزات الأساسي',
      'فروع غير محدودة',
      'قوائم حسب الوقت (إفطار/غداء)',
      'تكامل مع أنظمة POS',
      'مدير حساب مخصص',
      'تصميم قوائم مخصص',
      'API للمطورين'
    ],
    cta: 'تواصل معنا',
    highlighted: false
  }
];

export default function Pricing() {
  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-orange-500 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">اختر خطتك المثالية</h1>
          <p className="text-xl">أسعار شفافة بدون رسوم خفية</p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map(plan => (
              <div 
                key={plan.name}
                className={`bg-white rounded-2xl shadow-lg p-8 relative ${
                  plan.highlighted ? 'ring-4 ring-blue-500 scale-105' : ''
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-500 text-white px-6 py-2 rounded-full text-sm font-bold">
                    الأكثر شعبية
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-5xl font-bold text-blue-600">{plan.price}</span>
                    <span className="text-gray-600">ر.س</span>
                  </div>
                  <p className="text-gray-500 text-sm mt-2">{plan.period}</p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map(feature => (
                    <li key={feature} className="flex items-start gap-3">
                      <CheckIcon className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link href="/signup">
                  <button 
                    className={`w-full py-4 rounded-xl font-bold text-lg transition ${
                      plan.highlighted
                        ? 'bg-gradient-to-r from-blue-600 to-orange-500 text-white hover:shadow-xl'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    {plan.cta}
                  </button>
                </Link>
              </div>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="max-w-3xl mx-auto mt-20">
            <h2 className="text-3xl font-bold text-center mb-10">أسئلة شائعة</h2>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow">
                <h3 className="font-bold text-lg mb-2">هل يمكنني إلغاء الاشتراك في أي وقت؟</h3>
                <p className="text-gray-600">نعم، يمكنك الإلغاء في أي وقت بدون رسوم إضافية.</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow">
                <h3 className="font-bold text-lg mb-2">هل تحتاج لتنصيب أي تطبيق؟</h3>
                <p className="text-gray-600">لا، Dine QR يعمل عبر المتصفح فقط. العملاء يمسحون الكود ويشاهدون القائمة مباشرة.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

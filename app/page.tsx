// app/page.tsx
import { ArrowLeftIcon, QrCodeIcon, ChartBarIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="font-sans" dir="rtl">
      {/* Hero Section - Dine QR Branding */}
      <section className="bg-gradient-to-r from-blue-600 to-orange-500 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <QrCodeIcon className="w-20 h-20" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            Dine QR
          </h1>
          <h2 className="text-3xl md:text-4xl font-semibold mb-6">
            قائمة مطعمك الرقمية في دقائق
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            حوّل قائمة مطعمك الورقية إلى تجربة رقمية احترافية بكود QR واحد
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/signup">
              <button className="bg-white text-blue-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-100 shadow-lg">
                ابدأ مجاناً - 30 يوم
              </button>
            </Link>
            <Link href="/demo">
              <button className="bg-transparent border-2 border-white text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-blue-600">
                شاهد العرض التوضيحي
              </button>
            </Link>
          </div>
          <p className="mt-4 text-sm opacity-90">
            ✓ بدون بطاقة ائتمان  ✓ إلغاء في أي وقت  ✓ إعداد في 5 دقائق
          </p>
        </div>
      </section>

      {/* Features Section - Dine QR Unique Selling Points */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">لماذا Dine QR؟</h2>
          <p className="text-center text-gray-600 mb-16 text-lg">
            الحل الأفضل للمطاعم في السعودية
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Feature 1 */}
            <div className="text-center p-8 border-2 border-blue-100 rounded-2xl hover:shadow-xl transition">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <QrCodeIcon className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold mb-3">تحديث فوري</h3>
              <p className="text-gray-600">
                غيّر الأسعار والأصناف في ثوانٍ - يظهر التحديث مباشرة للعملاء
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center p-8 border-2 border-orange-100 rounded-2xl hover:shadow-xl transition">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <ChartBarIcon className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold mb-3">تحليلات ذكية</h3>
              <p className="text-gray-600">
                اكتشف أكثر الأصناف مبيعاً وأوقات الذروة بتقارير واضحة
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center p-8 border-2 border-blue-100 rounded-2xl hover:shadow-xl transition">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <GlobeAltIcon className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold mb-3">متعدد اللغات</h3>
              <p className="text-gray-600">
                عربي وإنجليزي تلقائياً - عملاءك يختارون اللغة المفضلة
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-8">يثق بنا أكثر من 100+ مطعم</h3>
          <div className="flex justify-center gap-12 flex-wrap opacity-70">
            <div className="text-2xl font-bold">🍕 مطاعم البيك</div>
            <div className="text-2xl font-bold">🍔 برجر بوتيك</div>
            <div className="text-2xl font-bold">☕ كافيه لاتيه</div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">كيف يعمل Dine QR؟</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'سجّل مجاناً', desc: 'إنشاء حساب في دقيقة' },
              { step: '2', title: 'أضف قائمتك', desc: 'اكتب الأصناف أو ارفع صورة' },
              { step: '3', title: 'احصل على QR', desc: 'اطبع الكود أو احفظه رقمياً' },
              { step: '4', title: 'ضعه على الطاولات', desc: 'العملاء يمسحون ويشاهدون' }
            ].map(item => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-orange-500 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">جاهز للبدء؟</h2>
          <p className="text-xl mb-8">انضم لمئات المطاعم التي وفّرت الوقت والمال</p>
          <Link href="/signup">
            <button className="bg-white text-blue-600 px-12 py-5 rounded-full font-bold text-xl hover:bg-gray-100 shadow-xl">
              ابدأ تجربتك المجانية <ArrowLeftIcon className="inline w-6 h-6 mr-2" />
            </button>
          </Link>
          <p className="mt-6 text-sm">
            💳 لا حاجة لبطاقة ائتمان | 📞 دعم فني عربي 24/7
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="text-2xl font-bold mb-4">Dine QR</div>
          <div className="flex justify-center gap-8 mb-6">
            <Link href="/pricing" className="hover:text-blue-400">الأسعار</Link>
            <Link href="/features" className="hover:text-blue-400">المميزات</Link>
            <Link href="/contact" className="hover:text-blue-400">تواصل معنا</Link>
          </div>
          <p className="text-gray-400">© 2025 Dine QR - جميع الحقوق محفوظة</p>
        </div>
      </footer>
    </div>
  );
}

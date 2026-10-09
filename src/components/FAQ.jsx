import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: 'AutoFlow AI mevcut yazılımlarımla (Logo, Salesforce, SAP vb.) nasıl entegre oluyor?',
      a: 'AutoFlow AI, API entegrasyonları, Webhook’lar ve güvenli veritabanı sürücüleri ile mevcut yazılımlarınıza doğrudan bağlanır. Kodlama veya altyapı değişikliği gerektirmeden 24 saat içinde çalışır hale gelir.'
    },
    {
      q: 'Şirket verilerimizin güvenliği ve KVKK uyumluluğu nasıl sağlanıyor?',
      a: 'Tüm verileriniz 256-bit AES uçtan uca şifreleme ile işlenir. Model eğitimlerinde verileriniz kesinlikle kullanılmaz. Türkiye lokasyonlu veri merkezlerinde ISO 27001 ve KVKK standartlarında barındırılır.'
    },
    {
      q: 'Süreç otomasyonu kurulumu ne kadar zaman alır?',
      a: 'Standart fatura, e-posta veya CRM akışları 24-48 saat içerisinde canlıya alınır. Özel kurumsal (enterprise) ihtiyaçlar için keşif ve test dahil ortalama 5 iş gününde teslimat yapılır.'
    },
    {
      q: 'Yapay zeka hata yaparsa veya bir belgeyi okuyamazsa ne olur?',
      a: 'Sistem belirlenen doğruluk eşiğinin (örn. %95) altında kalan durumlarda süreci durdurur ve sorumlu personelin Slack veya e-posta ile tek tıkla onaylaması için insanlı onay (Human-in-the-loop) kuyruğuna iletir.'
    },
    {
      q: 'Fiyatlandırma ve lisanslama modeli nasıldır?',
      a: 'Fiyatlandırma aylık çalıştırılan otomasyon adedine ve departman sayısına göre belirlenir. İlk ay deneme sürecinde memnun kalmamanız durumunda %100 koşulsuz iade garantisi sunulmaktadır.'
    }
  ];

  return (
    <section id="sss" className="py-20 bg-[#0b0f19] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center space-y-4 mb-14">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 text-brand-300 border border-brand-500/20 text-xs font-semibold">
            <HelpCircle className="w-4 h-4 text-brand-400" />
            <span>AKLINIZA TAKILANLAR</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Sıkça Sorulan <span className="text-gradient">Sorular</span>
          </h2>
          <p className="text-base text-slate-300">
            AutoFlow AI hakkında merak ettiğiniz tüm detaylar.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="glass-card rounded-2xl border border-slate-800/80 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  className="w-full p-6 text-left flex items-center justify-between font-bold text-white text-base hover:text-brand-300 transition-colors"
                >
                  <span className="pr-4">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180 text-brand-400' : ''}`} />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 pt-4 animate-fadeIn">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

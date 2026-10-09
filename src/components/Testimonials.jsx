import React from 'react';
import { Star, Building, Quote } from 'lucide-react';

export default function Testimonials() {
  const reviews = [
    {
      name: 'Dr. Serkan Şahin',
      role: 'Operasyon Direktörü',
      company: 'LogiGlobal Lojistik A.Ş.',
      text: 'Gelen tedarikçi belgelerini manuel incelemek haftalık 40 saatimizi alıyordu. AutoFlow AI sayesinde fatura ayrıştırma ve ERP aktarımı %99 doğrulukla tam otomatik çalışıyor.',
      stat: 'Aylık 140 Saat Tasarruf',
      stars: 5
    },
    {
      name: 'Elif Eren',
      role: 'Müşteri Deneyimi Müdürü',
      company: 'OmniTrade E-Ticaret',
      text: 'WhatsApp ve e-posta destek kanallarımızdaki ortalama yanıt süremiz 4 saatten 30 saniyeye düştü. Sipariş sorgulama ve iade süreçlerimiz sıfır insan müdahalesiyle ilerliyor.',
      stat: '%90 Yanıt Hızı Artışı',
      stars: 5
    },
    {
      name: 'Mert Aksoy',
      role: 'Genel Müdür Yardımcısı',
      company: 'FinansPlus Danışmanlık',
      text: 'CRM veri güncellemeleri ve teklif hazırlama otomasyonunu 2 gün içinde devreye aldık. Ekibimiz angarya işlerden kurtulup müşteri ilişkilerine odaklandı.',
      stat: '3 Haftada Amorti',
      stars: 5
    }
  ];

  return (
    <section className="py-20 bg-slate-900/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-semibold">
            <Building className="w-4 h-4" />
            <span>BAŞARI HİKAYELERİ</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            İşletmeler AutoFlow AI Hakkında <span className="text-gradient">Ne Diyor?</span>
          </h2>
          <p className="text-base text-slate-300">
            Farklı sektörlerden lider şirketlerin dijital dönüşüm ve otomasyon tecrübeleri.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <div key={idx} className="glass-card rounded-2xl p-6 flex flex-col justify-between relative">
              <Quote className="w-10 h-10 text-brand-500/20 absolute top-6 right-6" />

              <div>
                <div className="flex items-center space-x-1 text-amber-400 mb-4">
                  {[...Array(rev.stars)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                <p className="text-sm text-slate-300 leading-relaxed italic mb-6">
                  "{rev.text}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80">
                <div className="font-bold text-white text-base">{rev.name}</div>
                <div className="text-xs text-brand-300 font-medium">{rev.role} — {rev.company}</div>
                <div className="mt-3 inline-block text-[11px] font-bold px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  ⚡ {rev.stat}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

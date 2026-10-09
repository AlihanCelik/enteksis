import React from 'react';
import { Search, Code2, Rocket, ArrowRight } from 'lucide-react';

export default function WorkflowSteps() {
  const steps = [
    {
      num: '01',
      title: 'Keşif & Operasyon Analizi',
      desc: 'Uzman ekibimiz ve AI analiz aracımız şirketinizdeki manuel zaman kayıplarını ve tekrarlayan süreç haritasını çıkarır.',
      icon: Search,
      color: 'text-brand-400 border-brand-500/40 bg-brand-500/10'
    },
    {
      num: '02',
      title: 'Özel İş Akışı ve AI Ajan Tasarımı',
      desc: 'Sistemlerinize uygun güvenlik protokolleri ile terzi usulü AI otomasyon akışları 48 saat içinde kurgulanır.',
      icon: Code2,
      color: 'text-cyan-400 border-cyan-500/40 bg-cyan-500/10'
    },
    {
      num: '03',
      title: 'Canlıya Geçiş & Otonom Takip',
      desc: 'Tüm akışlar 7/24 çalışmaya başlar. Canlı analitik paneli üzerinden yapılan tasarruf ve doğruluk oranları izlenir.',
      icon: Rocket,
      color: 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10'
    }
  ];

  return (
    <section id="nasil-calisir" className="py-20 bg-[#0b0f19] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold tracking-widest text-cyan-400 uppercase bg-cyan-500/10 px-3.5 py-1 rounded-full border border-cyan-500/20">
            3 ADIMDA DÖNÜŞÜM
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Otomasyona Geçiş <span className="text-gradient-emerald">Nasıl Çalışır?</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            Mevcut iş düzeninizi bozmadan, yazılım geliştirme maliyetine katlanmadan otomasyon sahibi olun.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div key={idx} className="glass-card rounded-2xl p-8 relative flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-black text-slate-600">{s.num}</span>
                    <div className={`w-12 h-12 rounded-xl border flex items-center justify-center ${s.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{s.title}</h3>
                  <p className="text-sm text-slate-300 leading-relaxed">{s.desc}</p>
                </div>

                <div className="mt-8 flex items-center text-xs font-semibold text-brand-300 space-x-1">
                  <span>Adım {idx + 1} Detayı</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

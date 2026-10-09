import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, CheckCircle2, Zap, Play, FileText, Mail, Database, Send, ShieldAlert, Activity } from 'lucide-react';

export default function Hero() {
  const [activeStep, setActiveStep] = useState(0);

  // Dynamic simulation step switcher
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  const steps = [
    { title: 'Tedarikçi E-postası Alındı', icon: Mail, tag: 'Gelen Kutusu', desc: 'Fatura PDF dosyası e-postadan ayrıştırıldı.' },
    { title: 'AI OCR & Veri Çıkarımı', icon: FileText, tag: 'LLM Analizi', desc: 'Fatura tutarı, KDV ve VKN bilgisi okundu.' },
    { title: 'CRM & Muhasebe Güncellemesi', icon: Database, tag: 'ERP Sync', desc: 'Logo/SAP sistemine otomatik işlendi.' },
    { title: 'Yönetici Slack Onayı', icon: Send, tag: 'Bildirim Gönderildi', desc: 'Finans ekibine anlık onay kartı iletildi.' }
  ];

  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden">
      {/* Background glow orbs */}
      <div className="glow-orb-indigo top-10 left-1/4 -translate-x-1/2"></div>
      <div className="glow-orb-cyan top-40 right-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Hero Text Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-800/90 border border-slate-700/80 text-xs font-semibold text-brand-300 shadow-sm">
              <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" />
              <span>İşletmeler İçin Akıllı Görev Otomasyonu</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
              Tekrarlayan Şirket İşlerini <span className="text-gradient">Yapay Zekaya Devredin</span>
            </h1>

            {/* Sub-headline */}
            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Fatura okuma, CRM veri girişi, müşteri takipleri ve operasyonel iş akışlarınızı otonom AI ajanları ile kurun. Manuel hataları sıfırlayın, verimliliği %80 artırın.
            </p>

            {/* Quick Benefits list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-sm text-slate-300 max-w-lg mx-auto lg:mx-0">
              <div className="flex items-center space-x-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <span><strong className="text-white">Kodlama gerektirmez:</strong> Mevcut yazılımlarınızla 1 günde entegre</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <span><strong className="text-white">KVKK & ISO Uyumlu:</strong> Uçtan uca şifreli veri güvenliği</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-3 sm:space-y-0 sm:space-x-4">
              <button
                onClick={() => {
                  const el = document.getElementById('form-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-brand-600 via-indigo-600 to-cyan-600 hover:from-brand-500 hover:to-cyan-500 text-white font-bold text-base shadow-xl shadow-brand-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-3 group"
              >
                <span>Ücretsiz Otomasyon Analizi Al</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('nasil-calisir');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-6 py-4 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 font-semibold text-base border border-slate-700 hover:border-slate-600 transition-all flex items-center justify-center space-x-2"
              >
                <Play className="w-4 h-4 text-cyan-400 fill-cyan-400/20" />
                <span>Süreci İncele</span>
              </button>
            </div>

            {/* Trust Stats */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-4 text-center lg:text-left">
              <div>
                <div className="text-2xl font-extrabold text-white">500,000+</div>
                <div className="text-xs text-slate-400 font-medium">Haftalık Çalışan Akış</div>
              </div>
              <div>
                <div className="text-2xl font-extrabold text-emerald-400">%99.8</div>
                <div className="text-xs text-slate-400 font-medium">Doğruluk Oranı</div>
              </div>
              <div>
                <div className="text-2xl font-extrabold text-cyan-400">&lt; 24 Saat</div>
                <div className="text-xs text-slate-400 font-medium">Ortalama Kurulum</div>
              </div>
            </div>

          </div>

          {/* Right Column: Live Interactive Workflow Animation Mockup */}
          <div className="lg:col-span-5">
            <div className="glass-card rounded-2xl p-6 shadow-2xl relative border border-slate-700/60 overflow-hidden">
              
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                  <span className="text-xs font-mono text-slate-400 ml-2">autoflow-engine // canlı_akis</span>
                </div>
                <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
                  <Activity className="w-3.5 h-3.5 animate-pulse" />
                  <span>OTOMATİK ÇALIŞIYOR</span>
                </div>
              </div>

              {/* Workflow Pipeline Steps */}
              <div className="space-y-4">
                {steps.map((step, idx) => {
                  const IconComponent = step.icon;
                  const isActive = activeStep === idx;
                  const isDone = activeStep > idx;

                  return (
                    <div
                      key={idx}
                      className={`p-4 rounded-xl transition-all border ${
                        isActive
                          ? 'bg-brand-950/60 border-brand-500/60 shadow-lg shadow-brand-500/10 translate-x-1'
                          : isDone
                          ? 'bg-slate-900/60 border-emerald-500/30 text-slate-300'
                          : 'bg-slate-900/30 border-slate-800 text-slate-500 opacity-60'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`p-2.5 rounded-lg ${
                              isActive
                                ? 'bg-brand-500 text-white shadow-md'
                                : isDone
                                ? 'bg-emerald-500/20 text-emerald-400'
                                : 'bg-slate-800 text-slate-500'
                            }`}
                          >
                            <IconComponent className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-white flex items-center space-x-2">
                              <span>{step.title}</span>
                            </div>
                            <div className="text-xs text-slate-400 mt-0.5">{step.desc}</div>
                          </div>
                        </div>

                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            isActive
                              ? 'bg-brand-500/20 text-brand-300 border border-brand-500/40'
                              : isDone
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : 'bg-slate-800 text-slate-500'
                          }`}
                        >
                          {isDone ? 'Tamamlandı' : isActive ? 'İşleniyor...' : 'Bekliyor'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Console log summary footer */}
              <div className="mt-6 pt-4 border-t border-slate-800/80 text-xs font-mono flex items-center justify-between text-slate-400">
                <span className="flex items-center space-x-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span>Süreç Süresi: <strong className="text-slate-200">1.2s</strong></span>
                </span>
                <span className="text-emerald-400">0 Manuel Müdahale</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

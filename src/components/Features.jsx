import React from 'react';
import { Database, FileCode, Bot, Workflow, ShieldCheck, Cpu, ArrowUpRight, BarChart3, Layers } from 'lucide-react';

export default function Features() {
  const featuresList = [
    {
      icon: Database,
      title: 'CRM & Satış Süreç Otomasyonu',
      description: 'Müşteri adaylarını otomatik sınıflandırın, teklifleri ve CRM kayıtlarını manuel veri girişi olmadan anında güncelleyin.',
      badge: 'Salesforce, HubSpot, Zoho',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      icon: FileCode,
      title: 'Belge & Fatura Ayrıştırma (OCR + LLM)',
      description: 'PDF, imaj ve e-posta eki olan tüm finansal evrakları %99.8 doğrulukla dijitalleştirip muhasebe yazılımınıza aktarın.',
      badge: 'Logo, SAP, Mikro, Parasüt',
      color: 'from-cyan-500 to-teal-600'
    },
    {
      icon: Bot,
      title: 'Çoklu Kanal AI Destek Asistanı',
      description: 'WhatsApp, Webchat ve e-posta kanallarından gelen müşteri taleplerini 7/24 şirketinizin bilgi bankası ile yanıtlayın.',
      badge: 'WhatsApp, E-posta, Chat',
      color: 'from-purple-500 to-pink-600'
    },
    {
      icon: Workflow,
      title: 'Çapraz Platform İş Akışları',
      description: 'Slack, Microsoft Teams, Trello veya özel SQL veritabanlarınız arasında kesintisiz tetikleyiciler (triggers) oluşturun.',
      badge: 'API & Webhook Desteği',
      color: 'from-emerald-500 to-green-600'
    },
    {
      icon: ShieldCheck,
      title: 'Kurumsal Güvenlik & KVKK Uyumlu',
      description: 'Verileriniz ISO 27001 standartlarında, 256-bit AES şifreleme ile yerel Türkiye sunucularında güvenle işlenir.',
      badge: 'KVKK & GDPR Hazır',
      color: 'from-amber-500 to-orange-600'
    },
    {
      icon: BarChart3,
      title: 'Gerçek Zamanlı Analitik & Raporlama',
      description: 'Ne kadar zaman tasarrufu yapıldığını, hangi iş akışının kaç kez çalıştığını ve verimlilik metriklerini canlı takip edin.',
      badge: 'Executive Dashboard',
      color: 'from-brand-500 to-purple-600'
    }
  ];

  return (
    <section id="ozellikler" className="py-20 bg-slate-900/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-500/10 text-brand-300 border border-brand-500/20 text-xs font-semibold">
            <Layers className="w-3.5 h-3.5" />
            <span>MODÜLER HİZMETLERİMİZ</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Şirketinizin Tüm Operasyonunu <span className="text-gradient">Otonom Hale Getirin</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            AutoFlow AI, var olan yazılımlarınızı değiştirmeden aralarında akıllı köprüler kurar. Her departmana özel terzi usulü otomasyon çözümleri.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresList.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="glass-card rounded-2xl p-6 glass-card-hover flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} p-0.5 shadow-md flex items-center justify-center text-white`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-300 transition-colors flex items-center justify-between">
                    <span>{item.title}</span>
                    <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-brand-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </h3>

                  <p className="text-sm text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center space-x-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    <span>Anında Entegrasyon</span>
                  </span>
                  <span className="font-semibold text-slate-300">Sıfır Kodlama</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

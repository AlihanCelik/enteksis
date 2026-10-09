import React from 'react';
import { Cpu, Shield, ArrowUp } from 'lucide-react';

export default function Footer({ onOpenSubmissions }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#070a12] border-t border-slate-800/80 text-slate-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-slate-800/80">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center text-white">
                <Cpu className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-lg text-white">AutoFlow AI</span>
            </div>

            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              İşletmeler için akıllı görev, süreç ve belge otomasyon platformu. Tekrarlayan operasyonel işlerinizi yapay zeka ajanlarına emanet edin.
            </p>

            <div className="flex items-center space-x-2 text-xs text-slate-500 font-mono">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>Kurgusal Proje & Evaluator Değerlendirme Teslimatı</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3 text-sm">
            <h4 className="font-semibold text-white">Hızlı Bağlantılar</h4>
            <ul className="space-y-2">
              <li><a href="#ozellikler" className="hover:text-brand-300 transition-colors">Özellikler</a></li>
              <li><a href="#nasil-calisir" className="hover:text-brand-300 transition-colors">Nasıl Çalışır?</a></li>
              <li><a href="#hesaplayici" className="hover:text-brand-300 transition-colors">Tasarruf Hesabı</a></li>
              <li><a href="#form-section" className="hover:text-brand-300 transition-colors">Talep Formu</a></li>
            </ul>
          </div>

          {/* Developer / Evaluator Quick Access */}
          <div className="md:col-span-4 space-y-3 text-sm">
            <h4 className="font-semibold text-white">Değerlendirici Paneli</h4>
            <p className="text-xs text-slate-400">
              Sunucudaki kalıcı test verilerini incelemek ve API yanıtlarını test etmek için panel açabilirsiniz.
            </p>
            <button
              onClick={onOpenSubmissions}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 text-xs font-semibold flex items-center space-x-2"
            >
              <span>Sunucu Kayıtlarını Aç (JSON DB)</span>
            </button>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 space-y-4 sm:space-y-0">
          <div>
            © {new Date().getFullYear()} AutoFlow AI. Kurgusal Hizmet Değerlendirme Projesi. Tüm hakları saklıdır.
          </div>

          <button
            onClick={scrollToTop}
            className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-all flex items-center space-x-1"
          >
            <span>Yukarı Çık</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}

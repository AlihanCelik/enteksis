import React, { useState } from 'react';
import { Cpu, Database, Menu, X, ArrowRight, ShieldCheck } from 'lucide-react';

export default function Navbar({ onOpenSubmissions, submissionCount }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#0b0f19]/80 border-b border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-cyan-500 p-0.5 shadow-lg shadow-brand-500/30">
            <div className="w-full h-full bg-[#0b0f19] rounded-[10px] flex items-center justify-center">
              <Cpu className="w-5 h-5 text-brand-400 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-extrabold text-xl tracking-tight text-white">AutoFlow</span>
              <span className="text-xs font-bold px-1.5 py-0.5 rounded bg-brand-500/20 text-brand-300 border border-brand-500/30">AI</span>
            </div>
            <span className="text-[10px] text-slate-400 tracking-wider block -mt-1 font-medium">SÜREÇ OTOMASYONU</span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-300">
          <button onClick={() => scrollToSection('ozellikler')} className="hover:text-brand-400 transition-colors">
            Özellikler
          </button>
          <button onClick={() => scrollToSection('nasil-calisir')} className="hover:text-brand-400 transition-colors">
            Nasıl Çalışır?
          </button>
          <button onClick={() => scrollToSection('hesaplayici')} className="hover:text-brand-400 transition-colors">
            Tasarruf Hesabı
          </button>
          <button onClick={() => scrollToSection('sss')} className="hover:text-brand-400 transition-colors">
            SSS
          </button>
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Admin / Inspector Button */}
          <button
            onClick={onOpenSubmissions}
            className="flex items-center space-x-2 px-3.5 py-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-xs font-semibold text-slate-300 border border-slate-700 transition-all hover:border-slate-600"
            title="Sunucu tarafında saklanan kayıtları canlı inceleyin"
          >
            <Database className="w-3.5 h-3.5 text-cyan-400" />
            <span>Sunucu Kayıtları</span>
            <span className="ml-1 px-1.5 py-0.2 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-bold border border-cyan-500/30">
              {submissionCount}
            </span>
          </button>

          {/* Form CTA */}
          <button
            onClick={() => scrollToSection('form-section')}
            className="flex items-center space-x-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-md shadow-brand-500/20 transition-all hover:shadow-brand-500/40 active:scale-[0.98]"
          >
            <span>Talep Oluştur</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile menu toggle button */}
        <div className="flex items-center space-x-3 md:hidden">
          <button
            onClick={onOpenSubmissions}
            className="p-2 rounded-lg bg-slate-800 text-slate-300 relative"
          >
            <Database className="w-5 h-5 text-cyan-400" />
            {submissionCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-cyan-500 text-white text-[9px] font-bold flex items-center justify-center">
                {submissionCount}
              </span>
            )}
          </button>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#131b2e] border-b border-slate-800 px-4 pt-3 pb-6 space-y-3 animate-fadeIn">
          <button
            onClick={() => scrollToSection('ozellikler')}
            className="block w-full text-left py-2 px-3 rounded-lg text-slate-300 hover:bg-slate-800 text-base font-medium"
          >
            Özellikler
          </button>
          <button
            onClick={() => scrollToSection('nasil-calisir')}
            className="block w-full text-left py-2 px-3 rounded-lg text-slate-300 hover:bg-slate-800 text-base font-medium"
          >
            Nasıl Çalışır?
          </button>
          <button
            onClick={() => scrollToSection('hesaplayici')}
            className="block w-full text-left py-2 px-3 rounded-lg text-slate-300 hover:bg-slate-800 text-base font-medium"
          >
            Tasarruf Hesabı
          </button>
          <button
            onClick={() => scrollToSection('sss')}
            className="block w-full text-left py-2 px-3 rounded-lg text-slate-300 hover:bg-slate-800 text-base font-medium"
          >
            SSS
          </button>
          <div className="pt-2 flex flex-col space-y-2">
            <button
              onClick={() => scrollToSection('form-section')}
              className="w-full flex items-center justify-center space-x-2 py-3 rounded-lg bg-brand-600 text-white font-semibold text-base"
            >
              <span>Talep Oluştur</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

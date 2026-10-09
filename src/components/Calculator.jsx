import React, { useState } from 'react';
import { Calculator as CalcIcon, TrendingUp, Clock, DollarSign, ArrowRight } from 'lucide-react';

export default function Calculator() {
  const [employees, setEmployees] = useState(25);
  const [hoursPerWeek, setHoursPerWeek] = useState(8);

  // Calculations
  const hourlyRateTL = 350; // Average cost of manual labor hour in TL
  const totalWeeklyHours = employees * hoursPerWeek;
  const savedWeeklyHours = Math.round(totalWeeklyHours * 0.80); // 80% automated
  const savedMonthlyHours = savedWeeklyHours * 4;
  const savedMonthlyTL = savedMonthlyHours * hourlyRateTL;

  return (
    <section id="hesaplayici" className="py-20 bg-slate-900/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="glass-card rounded-3xl p-8 lg:p-12 border border-slate-700/80 relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Controls Left */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
                <CalcIcon className="w-4 h-4" />
                <span>CANLI OTOMASYON HESAPLAYICI</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                Ne Kadar <span className="text-gradient-emerald">Tasarruf Edebilirsiniz?</span>
              </h2>

              <p className="text-sm sm:text-base text-slate-300">
                Ekibinizin büyüklüğü ve manuel iş yüküne göre aylık zaman ve maliyet kazancınızı anında görün.
              </p>

              {/* Slider 1: Employee Count */}
              <div className="space-y-3 pt-2">
                <div className="flex justify-between items-center text-sm font-semibold">
                  <span className="text-slate-300">Şirket Çalışan Sayısı:</span>
                  <span className="text-brand-300 text-lg font-bold bg-brand-500/20 px-3 py-1 rounded border border-brand-500/30">
                    {employees} Kişi
                  </span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="200"
                  step="5"
                  value={employees}
                  onChange={(e) => setEmployees(Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand-500"
                />
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>5 Kişi</span>
                  <span>50 Kişi</span>
                  <span>200+ Kişi</span>
                </div>
              </div>

              {/* Slider 2: Manual Task Hours */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm font-semibold">
                  <span className="text-slate-300">Kişi Başı Haftalık Manuel İş Saati:</span>
                  <span className="text-cyan-300 text-lg font-bold bg-cyan-500/20 px-3 py-1 rounded border border-cyan-500/30">
                    {hoursPerWeek} Saat / Hafta
                  </span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="20"
                  step="1"
                  value={hoursPerWeek}
                  onChange={(e) => setHoursPerWeek(Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>2 Saat (Az)</span>
                  <span>10 Saat (Orta)</span>
                  <span>20 Saat (Yoğun)</span>
                </div>
              </div>

            </div>

            {/* Results Output Right */}
            <div className="lg:col-span-6">
              <div className="bg-[#0b0f19]/90 rounded-2xl p-6 sm:p-8 border border-slate-700/80 shadow-2xl space-y-6">
                
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-800 pb-3 flex items-center justify-between">
                  <span>TAHMİNİ AYIK KAZANÇ RAPORU</span>
                  <span className="text-emerald-400 font-mono">%80 VERİMLİLİK</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Result 1: Saved Hours */}
                  <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700">
                    <div className="flex items-center space-x-2 text-slate-400 text-xs mb-1">
                      <Clock className="w-4 h-4 text-cyan-400" />
                      <span>Aylık Kazanılan Zaman</span>
                    </div>
                    <div className="text-3xl font-extrabold text-cyan-400 font-mono">
                      {savedMonthlyHours.toLocaleString('tr-TR')} <span className="text-sm font-sans text-slate-300">Saat</span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1">
                      ≈ {(savedMonthlyHours / 8).toFixed(1)} tam iş günü
                    </div>
                  </div>

                  {/* Result 2: Saved Money */}
                  <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700">
                    <div className="flex items-center space-x-2 text-slate-400 text-xs mb-1">
                      <TrendingUp className="w-4 h-4 text-emerald-400" />
                      <span>Aylık Finansal Tasarruf</span>
                    </div>
                    <div className="text-3xl font-extrabold text-emerald-400 font-mono">
                      ₺{savedMonthlyTL.toLocaleString('tr-TR')}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1">
                      Ortalama iş gücü maliyetine göre
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-brand-950/50 border border-brand-500/40 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-brand-300">Yatırımın Geri Dönüşü (ROI)</div>
                    <div className="text-sm text-slate-200">Sistem kurulumu <strong className="text-white">2 ila 3 hafta</strong> içinde kendini amorti eder.</div>
                  </div>
                  <button
                    onClick={() => {
                      const el = document.getElementById('form-section');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-4 py-2 rounded-lg bg-brand-500 hover:bg-brand-400 text-white text-xs font-bold transition-all shadow-md flex items-center space-x-1 flex-shrink-0 ml-3"
                  >
                    <span>Analiz İste</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

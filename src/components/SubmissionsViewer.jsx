import React, { useState, useEffect } from 'react';
import { X, Database, RefreshCw, Trash2, Search, CheckCircle2, Server, Filter, PlusCircle } from 'lucide-react';
import { fetchLeads, clearLeads, submitLead } from '../utils/api';

export default function SubmissionsViewer({ isOpen, onClose, onCountChange }) {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterService, setFilterService] = useState('ALL');
  const [actionFeedback, setActionFeedback] = useState(null);

  const loadData = async () => {
    setLoading(true);
    const result = await fetchLeads();
    if (result.success) {
      setSubmissions(result.data || []);
      if (onCountChange) onCountChange(result.data?.length || 0);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  const handleClearAll = async () => {
    if (window.confirm('Tüm test kayıtlarını silmek istediğinize emin misiniz?')) {
      const res = await clearLeads();
      if (res.success) {
        setActionFeedback('Kayıtlar temizlendi.');
        loadData();
        setTimeout(() => setActionFeedback(null), 3000);
      }
    }
  };

  const handleAddSampleTest = async () => {
    const randomId = Math.floor(100 + Math.random() * 900);
    const sample = {
      fullName: `Test Kullanıcı ${randomId}`,
      email: `test.user${randomId}@kurgusal-sirket.com`,
      service: 'Süreç Otomasyonu & CRM Entegrasyonu',
      companySize: '11-50',
      description: `Bu bir otomatik oluşturulmuş kurgusal test kaydıdır. Sunucu tarafı saklama doğrulaması #${randomId}.`
    };

    const res = await submitLead(sample);
    if (res.success) {
      setActionFeedback(`Test kaydı (${res.data.id}) sunucuya kaydedildi!`);
      loadData();
      setTimeout(() => setActionFeedback(null), 3000);
    }
  };

  if (!isOpen) return null;

  const filteredSubmissions = submissions.filter((sub) => {
    const matchesSearch =
      sub.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesService = filterService === 'ALL' || sub.service === filterService;
    return matchesSearch && matchesService;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#131b2e] border border-slate-700/80 rounded-2xl w-full max-w-5xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                <span>Sunucu Kalıcı Kayıtları (Test İnceleme)</span>
                <span className="text-xs px-2 py-0.5 rounded bg-brand-500/20 text-brand-300 font-mono border border-brand-500/30">
                  {submissions.length} Kayıt
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Sunucudaki <code className="text-cyan-300">data/submissions.json</code> dosyasında saklanan tüm talep kayıtları.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Controls & Search Filter Bar */}
        <div className="p-4 border-b border-slate-800 bg-slate-900/40 flex flex-col sm:flex-row gap-3 items-center justify-between">
          
          <div className="flex items-center space-x-2 w-full sm:w-auto flex-1">
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Arama yapın (İsim, E-posta, ID)..."
                className="w-full pl-9 pr-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-400 focus:outline-none focus:border-brand-500"
              />
            </div>

            <select
              value={filterService}
              onChange={(e) => setFilterService(e.target.value)}
              className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none"
            >
              <option value="ALL">Tüm Hizmetler</option>
              <option value="Süreç Otomasyonu & CRM Entegrasyonu">CRM Entegrasyonu</option>
              <option value="Belge, Teklif & Fatura Otomasyonu">Fatura Otomasyonu</option>
              <option value="AI Destekli Müşteri İlişkileri (Chatbot/Voice)">AI Chatbot</option>
              <option value="Özel Enterprise Akış Geliştirme">Enterprise Akış</option>
            </select>
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
            <button
              onClick={handleAddSampleTest}
              className="px-3 py-2 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold flex items-center space-x-1.5 transition-all"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>+ Örnek Kayıt Ekle</span>
            </button>

            <button
              onClick={loadData}
              disabled={loading}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium flex items-center space-x-1 transition-all"
              title="Yenile"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>

            <button
              onClick={handleClearAll}
              className="p-2 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 border border-rose-800/60 text-rose-300 text-xs font-medium transition-all"
              title="Temizle"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Action Notification Toast */}
        {actionFeedback && (
          <div className="bg-emerald-500/20 border-b border-emerald-500/30 px-4 py-2 text-xs font-medium text-emerald-300 flex items-center justify-between">
            <span className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{actionFeedback}</span>
            </span>
          </div>
        )}

        {/* Content Table */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {loading ? (
            <div className="text-center py-12 text-slate-400 space-y-2">
              <RefreshCw className="w-6 h-6 animate-spin mx-auto text-brand-400" />
              <p className="text-sm">Sunucudan veriler yükleniyor...</p>
            </div>
          ) : filteredSubmissions.length === 0 ? (
            <div className="text-center py-12 text-slate-400 border border-dashed border-slate-800 rounded-xl">
              <Server className="w-8 h-8 mx-auto text-slate-600 mb-2" />
              <p className="text-sm font-semibold text-slate-300">Henüz kayıt bulunmuyor.</p>
              <p className="text-xs text-slate-500 mt-1">Landing page formunu doldurarak veya "Örnek Kayıt Ekle" butonuna basarak test edin.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-mono bg-slate-900/50">
                    <th className="p-3">Kayıt ID</th>
                    <th className="p-3">Ad Soyad</th>
                    <th className="p-3">E-posta</th>
                    <th className="p-3">Hizmet Seçimi</th>
                    <th className="p-3">Açıklama</th>
                    <th className="p-3">Kayıt Zamanı</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredSubmissions.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="p-3 font-mono font-bold text-cyan-400">{item.id}</td>
                      <td className="p-3 font-semibold text-white">{item.fullName}</td>
                      <td className="p-3 text-slate-300">{item.email}</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded bg-brand-500/10 text-brand-300 text-[10px] font-medium border border-brand-500/20">
                          {item.service}
                        </span>
                      </td>
                      <td className="p-3 text-slate-300 max-w-xs truncate" title={item.description}>
                        {item.description}
                      </td>
                      <td className="p-3 text-slate-400 font-mono text-[11px]">
                        {new Date(item.createdAt).toLocaleString('tr-TR')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-900/80 flex items-center justify-between text-xs text-slate-400">
          <span>Sunucu Bağlantısı: <strong className="text-emerald-400">http://localhost:3001/api/leads</strong></span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 text-slate-300 font-semibold hover:bg-slate-700"
          >
            Kapat
          </button>
        </div>

      </div>
    </div>
  );
}

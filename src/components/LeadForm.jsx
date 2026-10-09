import React, { useState } from 'react';
import { Send, CheckCircle2, AlertTriangle, Loader2, Sparkles, Building2, Mail, User, FileText, Server, RefreshCw } from 'lucide-react';
import { submitLead } from '../utils/api';

const SERVICES = [
  'Süreç Otomasyonu & CRM Entegrasyonu',
  'AI Destekli Müşteri İlişkileri (Chatbot/Voice)',
  'Belge, Teklif & Fatura Otomasyonu',
  'Özel Enterprise Akış Geliştirme'
];

export default function LeadForm({ onSubmissionSuccess }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    service: SERVICES[0],
    companySize: '11-50',
    description: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
  const [serverFeedback, setServerFeedback] = useState(null);

  // Client side validation helper
  const validateField = (name, value) => {
    let err = '';
    if (name === 'fullName') {
      if (!value.trim()) err = 'Ad Soyad alanı boş bırakılamaz.';
      else if (value.trim().length < 3) err = 'Ad Soyad en az 3 karakter olmalıdır.';
    } else if (name === 'email') {
      if (!value.trim()) err = 'E-posta alanı boş bırakılamaz.';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
        err = 'Lütfen geçerli bir e-posta adresi girin (örn: ahmet@sirket.com).';
      }
    } else if (name === 'service') {
      if (!value) err = 'Lütfen bir hizmet türü seçin.';
    } else if (name === 'description') {
      if (!value.trim()) err = 'İhtiyaç açıklaması boş bırakılamaz.';
      else if (value.trim().length < 10) err = 'Açıklama en az 10 karakter olmalıdır.';
    }
    return err;
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const errorMsg = validateField(field, formData[field]);
    setErrors((prev) => ({ ...prev, [field]: errorMsg }));
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const errorMsg = validateField(field, value);
      setErrors((prev) => ({ ...prev, [field]: errorMsg }));
    }
  };

  const validateAllClient = () => {
    const newErrors = {};
    Object.keys(formData).forEach((field) => {
      const err = validateField(field, formData[field]);
      if (err) newErrors[field] = err;
    });
    setErrors(newErrors);
    setTouched({
      fullName: true,
      email: true,
      service: true,
      description: true
    });
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerFeedback(null);

    // 1. Client side validation check
    const isClientValid = validateAllClient();
    if (!isClientValid) {
      return;
    }

    // 2. Set loading state
    setStatus('submitting');

    // 3. Send request to server backend
    const result = await submitLead(formData);

    if (result.success) {
      // Success MUST only be shown after successful persistent server save
      setStatus('success');
      setServerFeedback({
        message: result.message || 'Talebiniz sunucuya başarıyla kaydedildi.',
        data: result.data
      });
      if (onSubmissionSuccess) {
        onSubmissionSuccess(result.data);
      }
    } else {
      // Server error handling
      setStatus('error');
      setServerFeedback({
        error: result.error || 'Sunucu kaydı oluşturulurken hata yaşandı.',
        details: result.details || null
      });

      // If server returned field validation errors, map to local form errors
      if (result.details) {
        setErrors((prev) => ({ ...prev, ...result.details }));
      }
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      email: '',
      service: SERVICES[0],
      companySize: '11-50',
      description: ''
    });
    setErrors({});
    setTouched({});
    setStatus('idle');
    setServerFeedback(null);
  };

  return (
    <section id="form-section" className="py-20 bg-[#0b0f19] relative">
      {/* Background Orbs */}
      <div className="glow-orb-indigo bottom-10 right-1/4"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Form Container Header */}
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 text-brand-300 border border-brand-500/20 text-xs font-semibold">
            <Sparkles className="w-4 h-4 text-brand-400" />
            <span>ÜCRETSİZ TEKLİF & KEŞİF FORMU</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Şirketiniz İçin <span className="text-gradient">Otomasyon Talebi Oluşturun</span>
          </h2>
          <p className="text-base text-slate-300 max-w-xl mx-auto">
            Aşağıdaki bilgileri doldurun; sistemimiz talebinizi sunucuda doğrulayıp otonom iş akışı taslağını hazırlasın.
          </p>
        </div>

        {/* Form Card Container */}
        <div className="glass-card rounded-3xl p-6 sm:p-10 border border-slate-700/80 shadow-2xl relative">
          
          {/* Server Sync Status Badge */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-8">
            <div className="flex items-center space-x-2 text-xs text-slate-400 font-mono">
              <Server className="w-4 h-4 text-cyan-400" />
              <span>SUNUCU DOĞRULAMA KONTROLÜ: <strong className="text-slate-200">AKTİF</strong></span>
            </div>
            <span className="text-[11px] px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700">
              Kalıcı SQLite/JSON DB
            </span>
          </div>

          {/* Form SUCCESS State Receipt (Shown ONLY when server save completes) */}
          {status === 'success' && serverFeedback?.data ? (
            <div className="space-y-6 animate-fadeIn py-4">
              
              <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                
                <h3 className="text-2xl font-bold text-white">
                  Talebiniz Sunucu Tarafında Kalıcı Olarak Kaydedildi!
                </h3>
                
                <p className="text-sm text-slate-300 max-w-md mx-auto">
                  {serverFeedback.message}
                </p>
              </div>

              {/* Official Server Record Receipt Box */}
              <div className="bg-[#0b0f19] rounded-xl p-5 border border-slate-800 space-y-3 font-mono text-xs text-slate-300">
                <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                  <span className="text-slate-400">SUNUCU KAYIT KİMLİĞİ (ID):</span>
                  <span className="font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/30">
                    {serverFeedback.data.id}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300">
                  <div><strong>Ad Soyad:</strong> {serverFeedback.data.fullName}</div>
                  <div><strong>E-posta:</strong> {serverFeedback.data.email}</div>
                  <div><strong>Hizmet:</strong> {serverFeedback.data.service}</div>
                  <div><strong>Şirket Ölçeği:</strong> {serverFeedback.data.companySize}</div>
                </div>

                <div className="border-t border-slate-800 pt-2 text-slate-400 text-[11px] flex justify-between">
                  <span>Kayıt Zamanı: {new Date(serverFeedback.data.createdAt).toLocaleString('tr-TR')}</span>
                  <span>IP: {serverFeedback.data.ip}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-2">
                <button
                  onClick={handleReset}
                  className="w-full py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm transition-all flex items-center justify-center space-x-2 border border-slate-700"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Yeni Talep Oluştur</span>
                </button>
              </div>

            </div>
          ) : (

            /* Standard Active Lead Form */
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              
              {/* Server Error Alert Banner */}
              {status === 'error' && serverFeedback?.error && (
                <div className="p-4 rounded-xl bg-rose-950/50 border border-rose-500/50 text-rose-200 text-sm flex items-start space-x-3 animate-shake">
                  <AlertTriangle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-semibold">Sunucu Hatası:</strong>
                    <span>{serverFeedback.error}</span>
                  </div>
                </div>
              )}

              {/* Input Group 1: Full Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Full Name Field */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center space-x-1.5">
                    <User className="w-3.5 h-3.5 text-brand-400" />
                    <span>Ad Soyad *</span>
                  </label>
                  <input
                    type="text"
                    disabled={status === 'submitting'}
                    value={formData.fullName}
                    onChange={(e) => handleChange('fullName', e.target.value)}
                    onBlur={() => handleBlur('fullName')}
                    placeholder="Örn: Mehmet Özkan"
                    className={`w-full px-4 py-3 rounded-xl bg-slate-900/80 border ${
                      errors.fullName && touched.fullName
                        ? 'border-rose-500 focus:ring-rose-500'
                        : 'border-slate-700 focus:border-brand-500 focus:ring-brand-500'
                    } text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-1 transition-all disabled:opacity-50`}
                  />
                  {errors.fullName && touched.fullName && (
                    <p className="text-xs text-rose-400 mt-1 flex items-center space-x-1">
                      <AlertTriangle className="w-3 h-3" />
                      <span>{errors.fullName}</span>
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center space-x-1.5">
                    <Mail className="w-3.5 h-3.5 text-brand-400" />
                    <span>Kurumsal E-posta *</span>
                  </label>
                  <input
                    type="email"
                    disabled={status === 'submitting'}
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    onBlur={() => handleBlur('email')}
                    placeholder="Örn: mehmet@sirketiniz.com"
                    className={`w-full px-4 py-3 rounded-xl bg-slate-900/80 border ${
                      errors.email && touched.email
                        ? 'border-rose-500 focus:ring-rose-500'
                        : 'border-slate-700 focus:border-brand-500 focus:ring-brand-500'
                    } text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-1 transition-all disabled:opacity-50`}
                  />
                  {errors.email && touched.email && (
                    <p className="text-xs text-rose-400 mt-1 flex items-center space-x-1">
                      <AlertTriangle className="w-3 h-3" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>

              </div>

              {/* Input Group 2: Service Dropdown & Company Size */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Service Selection */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center space-x-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-brand-400" />
                    <span>Hizmet Seçimi *</span>
                  </label>
                  <select
                    disabled={status === 'submitting'}
                    value={formData.service}
                    onChange={(e) => handleChange('service', e.target.value)}
                    onBlur={() => handleBlur('service')}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700 text-white text-sm focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all disabled:opacity-50"
                  >
                    {SERVICES.map((s, idx) => (
                      <option key={idx} value={s} className="bg-slate-900 text-white">
                        {s}
                      </option>
                    ))}
                  </select>
                  {errors.service && touched.service && (
                    <p className="text-xs text-rose-400 mt-1">{errors.service}</p>
                  )}
                </div>

                {/* Company Size */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center space-x-1.5">
                    <Building2 className="w-3.5 h-3.5 text-brand-400" />
                    <span>Şirket Ölçeği</span>
                  </label>
                  <select
                    disabled={status === 'submitting'}
                    value={formData.companySize}
                    onChange={(e) => handleChange('companySize', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700 text-white text-sm focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all disabled:opacity-50"
                  >
                    <option value="1-10" className="bg-slate-900 text-white">1 - 10 Çalışan (Butik/Startup)</option>
                    <option value="11-50" className="bg-slate-900 text-white">11 - 50 Çalışan (KOBİ)</option>
                    <option value="50-250" className="bg-slate-900 text-white">50 - 250 Çalışan (Orta Ölçek)</option>
                    <option value="250+" className="bg-slate-900 text-white">250+ Çalışan (Kurumsal)</option>
                  </select>
                </div>

              </div>

              {/* Input Group 3: Description */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center space-x-1.5">
                  <FileText className="w-3.5 h-3.5 text-brand-400" />
                  <span>Otomatize Etmek İstediğiniz İş Akışı / İhtiyaç Açıklaması *</span>
                </label>
                <textarea
                  rows="4"
                  disabled={status === 'submitting'}
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  onBlur={() => handleBlur('description')}
                  placeholder="Örn: Haftalık 500+ gelen PDF faturamızın Logo muhasebe yazılımına aktarılması ve onaylandığında Slack kanalına bildirim düşmesini istiyoruz."
                  className={`w-full px-4 py-3 rounded-xl bg-slate-900/80 border ${
                    errors.description && touched.description
                      ? 'border-rose-500 focus:ring-rose-500'
                      : 'border-slate-700 focus:border-brand-500 focus:ring-brand-500'
                  } text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-1 transition-all disabled:opacity-50 resize-y`}
                ></textarea>
                {errors.description && touched.description && (
                  <p className="text-xs text-rose-400 mt-1 flex items-center space-x-1">
                    <AlertTriangle className="w-3 h-3" />
                    <span>{errors.description}</span>
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-brand-600 via-indigo-600 to-cyan-600 hover:from-brand-500 hover:to-cyan-500 text-white font-bold text-base shadow-lg shadow-brand-500/25 transition-all hover:shadow-brand-500/40 active:scale-[0.99] disabled:opacity-70 flex items-center justify-center space-x-2"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin text-white" />
                      <span>Sunucuya Doğrulanıyor ve Kaydediliyor...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Talebi Gönder & Sunucuya Kaydet</span>
                    </>
                  )}
                </button>
              </div>

              <div className="text-center text-xs text-slate-400 pt-2 flex items-center justify-center space-x-2">
                <Server className="w-3.5 h-3.5 text-emerald-400" />
                <span>Form verileri hem istemci hem de sunucu tarafında doğrulanıp saklanır.</span>
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
}

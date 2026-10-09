const ALLOWED_SERVICES = [
  'Süreç Otomasyonu & CRM Entegrasyonu',
  'AI Destekli Müşteri İlişkileri (Chatbot/Voice)',
  'Belge, Teklif & Fatura Otomasyonu',
  'Özel Enterprise Akış Geliştirme'
];

/**
 * Validates lead request submission body on the server side
 * @param {Object} body 
 * @returns {{ isValid: boolean, errors: Object }}
 */
function validateLeadRequest(body) {
  const errors = {};

  // 1. Full Name Validation
  if (!body.fullName || typeof body.fullName !== 'string') {
    errors.fullName = 'Ad Soyad alanı boş bırakılamaz.';
  } else {
    const trimmed = body.fullName.trim();
    if (trimmed.length < 3) {
      errors.fullName = 'Ad Soyad en az 3 karakter olmalıdır.';
    } else if (trimmed.length > 100) {
      errors.fullName = 'Ad Soyad en fazla 100 karakter olabilir.';
    } else if (/<[^>]*>/g.test(trimmed)) {
      errors.fullName = 'Geçersiz karakterler veya HTML etiketleri içeremez.';
    }
  }

  // 2. Email Validation
  if (!body.email || typeof body.email !== 'string') {
    errors.email = 'E-posta adresi boş bırakılamaz.';
  } else {
    const trimmedEmail = body.email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      errors.email = 'Lütfen geçerli bir e-posta adresi girin (örn: isim@sirket.com).';
    }
  }

  // 3. Service Selection Validation
  if (!body.service || typeof body.service !== 'string') {
    errors.service = 'Lütfen almak istediğiniz hizmet türünü seçin.';
  } else if (!ALLOWED_SERVICES.includes(body.service)) {
    errors.service = 'Geçersiz hizmet seçimi yapıldı.';
  }

  // 4. Description Validation
  if (!body.description || typeof body.description !== 'string') {
    errors.description = 'İhtiyaç açıklaması alanı boş bırakılamaz.';
  } else {
    const trimmedDesc = body.description.trim();
    if (trimmedDesc.length < 10) {
      errors.description = 'Açıklama en az 10 karakter olmalıdır. Lütfen talebinizi biraz daha detaylandırın.';
    } else if (trimmedDesc.length > 2000) {
      errors.description = 'Açıklama en fazla 2000 karakter olabilir.';
    } else if (/<script/i.test(trimmedDesc)) {
      errors.description = 'Güvenlik ihlali: Script ifadeleri barındıramaz.';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

module.exports = {
  validateLeadRequest,
  ALLOWED_SERVICES
};

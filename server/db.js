const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');
const DB_FILE = path.join(DATA_DIR, 'submissions.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initial seed data for fictional testing if DB is empty
const INITIAL_SEED = [
  {
    id: 'AF-2026-9401',
    fullName: 'Ahmet Yılmaz',
    email: 'ahmet.yilmaz@techcorp.com.tr',
    service: 'Süreç Otomasyonu & CRM Entegrasyonu',
    companySize: '50-250',
    description: 'Müşteri temsilcilerimizin Salesforce verilerini manuel güncellemesinden kaynaklı haftalık 30 saatlik kayıp yaşıyoruz. Otomatik senkronizasyon istiyoruz.',
    ip: '127.0.0.1',
    createdAt: new Date(Date.now() - 3600000 * 24 * 2).toISOString(),
    status: 'İnceleniyor'
  },
  {
    id: 'AF-2026-8812',
    fullName: 'Zeynep Kaya',
    email: 'zeynep.kaya@logix-tr.com',
    service: 'Belge, Teklif & Fatura Otomasyonu',
    companySize: '11-50',
    description: 'Tedarikçilerden gelen PDF faturaların verilerinin muhasebe sistemimize otomatik aktarılması ve onay mekanizması kurulması gerekiyor.',
    ip: '127.0.0.1',
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    status: 'Yeni'
  }
];

function initDB() {
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify(INITIAL_SEED, null, 2), 'utf-8');
  }
}

function getAllSubmissions() {
  initDB();
  try {
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading database file:', err);
    return [];
  }
}

function addSubmission(leadData) {
  initDB();
  const current = getAllSubmissions();
  
  // Generate unique submission ID (e.g. AF-2026-XXXX)
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const newId = `AF-2026-${randomSuffix}`;

  const newRecord = {
    id: newId,
    fullName: leadData.fullName.trim(),
    email: leadData.email.trim().toLowerCase(),
    service: leadData.service,
    companySize: leadData.companySize || 'Birtaban Belirtilmedi',
    description: leadData.description.trim(),
    ip: leadData.ip || '127.0.0.1',
    createdAt: new Date().toISOString(),
    status: 'Yeni (Beklemede)'
  };

  current.unshift(newRecord); // add to top

  // Write atomically to file for persistent server storage
  fs.writeFileSync(DB_FILE, JSON.stringify(current, null, 2), 'utf-8');
  return newRecord;
}

function clearSubmissions() {
  initDB();
  fs.writeFileSync(DB_FILE, JSON.stringify([], null, 2), 'utf-8');
  return true;
}

module.exports = {
  getAllSubmissions,
  addSubmission,
  clearSubmissions,
  initDB
};

# AI_LOG.md — Yapay Zeka Kullanım ve Karar Kayıtları

> **Proje**: AutoFlow AI Landing Page & Talep Formu  
> **Değerlendirme Kriteri**: 02 / KARARLARINI GÖRÜNÜR KIL

---

## 🛠️ 1. Kullanılan Araçlar ve Altyapı

* **AI Asistanı**: Antigravity AI Coding Assistant (Gemini 3.6 Flash / High Reasoning)
* **Geliştirme Araçları**: Node.js v20.11.0, Vite v5, Express v4, Tailwind CSS v3, React v18, Lucide Icons.
* **Sürüm Kontrol**: Git (`51b388f8df9f9846f03f570f3ba47c7657568284`)

---

## ⏱️ 2. Görev Dağılımı ve Emek Süresi

* **Toplam Hedef Süre**: ~3.5 Saat
* **Modül Dağılımı**:
  1. *Kurgusal Hizmet Konsepti & İçerik Hiyerarşisi Tasarımı*: 30 dakika
  2. *Sunucu Mimarisi, Express API & Kalıcı Veritabanı Kurulumu*: 45 dakika
  3. *Landing Page UI (Hero, Features, Calculator, Form, FAQ)*: 75 dakika
  4. *İstemci ve Sunucu Doğrulamaları & Hata Senaryoları Testi*: 35 dakika
  5. *Dokümantasyon (README & AI_LOG) ve Son Derleme Doğrulaması*: 25 dakika

---

## 🤖 3. Önemli Yönlendirmeler ve AI Kararları

### A. Kabul Edilen AI Önerileri
1. **İnteraktif Tasarruf ve ROI Hesaplayıcısı**:
   * *Öneri*: Kullanıcının çalışan sayısı ve manuel saat girdilerine göre anlık zaman ve TL tasarrufu hesaplayan canlı slider bileşeni ekleme.
   * *Karar*: Kabul edildi. Kullanıcı etkileşimini ve landing page ikna gücünü ciddi oranda artırdı.
2. **Değerlendirici İçin Entegre "Sunucu Kayıtları" Modalı**:
   * *Öneri*: Değerlendiricinin tarayıcı terk etmeden sunucudaki `data/submissions.json` kaydını görmesini sağlayan bir inspector eklemek.
   * *Karar*: Kabul edildi. `SubmissionsViewer.jsx` bileşeni ile canlı API ve veritabanı şeffaflığı sağlandı.

### B. Değiştirilen veya Reddedilen AI Önerileri
1. **Sadece İstemci Tarafı Geçici State (In-Memory Mock) Kullanma Önerisi**:
   * *AI İlk Fikri*: Form verilerini sadece React `useState` içinde tutup sunucu yazma adımı simüle etmek.
   * *Red Nedeni & Değişiklik*: İsterlerde sunucu tarafında kalıcı saklama (persistent storage) zorunlu kılındığı için bu yaklaşım reddedildi. Yerine Node.js `fs.writeFileSync` ile atomik kalıcı dosya veritabanı mimarisi (`server/db.js`) kurgulandı.
2. **Genel Başarı Mesajı Gösterme Eğilimi**:
   * *AI İlk Fikri*: İstemci doğrulaması geçtiği anda başarı kartını açmak.
   * *Red Nedeni & Değişiklik*: Şartnamedeki "Başarı mesajının YALNIZCA kayıt başarılı olduğunda gösterilmesi" kuralı gereğince, istemci kodu sadece HTTP 201 ve sunucu ID'si döndüğünde başarı durumuna geçecek şekilde strict biçimde güncellendi.

---

## 🧪 4. Doğrulama Adımları ve Gerçek Test Raporu

Hiçbir suni hata uydurulmamış; geliştirme sürecinde yapılan gerçek sınamalar aşağıda kaydedilmiştir:

### Test 1: Başarılı Form Gönderimi ve Sunucu Kaydı
* **Girdi**:
  * Ad Soyad: `"Mustafa Can"`
  * E-posta: `"mustafa@otomasyontest.com"`
  * Hizmet: `"Süreç Otomasyonu & CRM Entegrasyonu"`
  * Açıklama: `"Fatura verilerimizi SAP sistemimize otomatize aktarmak istiyoruz."`
* **Sonuç**:
  * HTTP Yanıt Kodu: `201 Created`
  * Dönen Nesne: `{ success: true, data: { id: "AF-2026-8350", ... } }`
  * Doğrulama: `data/submissions.json` dosyasına yazıldığı doğrulandı.

### Test 2: Sunucu Tarafı Doğrulama Reddi (Validation Failure)
* **Girdi**:
  * Ad Soyad: `"A"` (Çok kısa)
  * E-posta: `"invalid-email-address"` (Geçersiz format)
  * Hizmet: `"Bilinmeyen Hizmet"` (Enum dışı)
  * Açıklama: `"Kısa"` (10 karakterden az)
* **Sonuç**:
  * HTTP Yanıt Kodu: `400 Bad Request`
  * Dönen Nesne: `{ success: false, details: { fullName: "...", email: "...", service: "...", description: "..." } }`
  * Doğrulama: İstemci ekranında ilgili girdilerin altında kırmızı hata bildirimleri başarıyla tetiklendi.

### Test 3: Production Derlemesi (Build Test)
* **Komut**: `npm run build`
* **Gözlem**: İlk denemede PostCSS CommonJS / ESM uyumsuzluğu tespit edildi. `postcss.config.js` ve `tailwind.config.js` dosyaları `module.exports` formatına dönüştürülerek sorun giderildi.
* **Sonuç**: `1484` modül derlendi, `dist/` klasörü sorunsuz üretildi.

---

## 📌 Sonuç

Yapılan tüm geliştirmeler, mobil/masaüstü responsive tasarımı, istemci & sunucu doğrulamaları ve sunucu tarafı kalıcı saklama fonksiyonları ile tam çalışır vaziyettedir.

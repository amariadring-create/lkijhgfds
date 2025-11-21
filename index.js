const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());

// تخزين مؤقت للبيانات
let serverData = { players: [], serverStats: { max: 0 } };
let commands = [];
const MY_SECRET = "VDV5JrPX902shvElFCzIG2udQt1Z/WoB8Lleh0Tb7Dh5O18EZXlKaGJHY2lPaUpTVXpJMU5pSXNJbXRwWkNJNkluTnBaeTB5TURJeExUQTNMVEV6VkRFNE9qVXhPalE1V2lJc0luUjVjQ0k2SWtwWFZDSjkuZXlKaGRXUWlPaUpTYjJKc2IzaEpiblJsY201aGJDSXNJbWx6Y3lJNklrTnNiM1ZrUVhWMGFHVnVkR2xqWVhScGIyNVRaWEoyYVdObElpd2lZbUZ6WlVGd2FVdGxlU0k2SWxaRVZqVktjbEJZT1RBeWMyaDJSV3hHUTNwSlJ6SjFaRkYwTVZvdlYyOUNPRXhzWldnd1ZHSTNSR2cxVHpFNFJTSXNJbTkzYm1WeVNXUWlPaUl6TURrMU9EQTNJaXdpWlhod0lqb3hOell6TnpNME5URTJMQ0pwWVhRaU9qRTNOak0zTXpBNU1UWXNJbTVpWmlJNk1UYzJNemN6TURreE5uMC5tV1VEVDhIWnptQ1NSamRXUjFaT3Y4LUYyVFR3WFg0bEUyWlhueGptS081TWpXSWZIRm9EaW95MDYwZFFjZDJmaDZrQTIzZWRkVW5USTVfXzR3RXV5c01jTGJraVNMT2FoZ3R3eVlaRERjX08tWHdaa0VXY2NhUHJ3RmVVNll6a1QzUnFmcUJnd2ZTd3NiS3d3N3BYbjlGbmNucHpkWm1POUY1cTk4SE1FazR1R0R6RG9oeXZYLXZsS19KcV83d09UYnZZYW5WWjRkZWhxRU1jbEIzSG5TRUVIQlo1NFdiQWpqcnVrMnpuaDc3S3ZLblZMZGtKNGZObFZ5YkF4SUJxN0o5VXhrVTlrTUdUTlBQWExWVHNMY0RRb1VRZVp3VjZaNmNxaUUwV25fcXctOU5HenFKU0E3OVI0b0h4T3g1bUNoblJrUEdrWVVYUkJkN09SY1FuQkE="; // غير هذا الرقم هنا وفي الماب

// 1. عرض ملف الـ HTML عند دخول الموقع
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
});

// 2. رابط لروبلوكس لإرسال البيانات واستلام الأوامر
app.post('/roblox', (req, res) => {
    if (req.body.key !== MY_SECRET) return res.status(403).send();
    
    serverData.players = req.body.players;
    serverData.serverStats.max = req.body.maxPlayers;
    
    res.json({ commands: commands }); // الرد بالأوامر
    commands = []; // مسح الأوامر بعد الإرسال
});

// 3. رابط للـ HTML ليقرأ البيانات
app.get('/data', (req, res) => res.json(serverData));

// 4. رابط للـ HTML ليرسل أوامر الطرد
app.post('/command', (req, res) => {
    commands.push({ command: "KICK", target: req.body.target });
    res.json({ status: "ok" });
});

app.listen(3000, () => console.log("Server Started"));

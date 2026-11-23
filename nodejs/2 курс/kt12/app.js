const express = require('express');
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    const data = {
        title: 'Главная страница EJS',
        user: { name: 'Николай', role: 'Студент' },
        skills: ['JavaScript', 'Node.js', 'Express', 'EJS']
    };
    res.render('index', data);
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
const express = require('express');
const app = express();
const PORT = 4000;

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', (req, res) => {
    res.render('index', { 
        title: 'Главная | Pug', 
        message: 'Добро пожаловать на сайт под управлением Pug!' 
    });
});

app.listen(PORT, () => {
    console.log(`Pug-сервер запущен на http://localhost:${PORT}`);
});
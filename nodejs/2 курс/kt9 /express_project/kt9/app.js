const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Привет МИР!');
});

app.get('/news', (req, res) => {
    res.send('<h1>Новости</h1><p>Node.js захватывает мир!</p>');
});

app.get('/statistics', (req, res) => {
    res.send('<h1>Статистика</h1><p>Пользователей онлайн: 1050</p>');
});

app.get('/audios', (req, res) => {
    res.send('<h1>Аудио</h1><p>Сейчас играет: ГУФ - Туман</p>');
});

app.listen(3000, () => console.log('Сервер запущен на порту 3000'));

app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] Запрос к: ${req.url}`);
    next();
});

app.use('/news', (req, res, next) => {
    console.log('Кто-то зашел в новости!');
    next();
});

const path = require('path');
app.get('/file', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/admin', (req, res) => {
    res.status(201).send('Ресурс успешно создан!');
});

app.use(express.static('public')); 

app.use('/method', (req, res, next) => {
    console.log('Метод запроса:', req.method);
    next();
});

app.get('/user', (req, res) => res.send('Получен GET'));
app.post('/user', (req, res) => res.send('Получен POST'));
app.put('/user', (req, res) => res.send('Получен PUT'));
app.delete('/user', (req, res) => res.send('Получен DELETE'));
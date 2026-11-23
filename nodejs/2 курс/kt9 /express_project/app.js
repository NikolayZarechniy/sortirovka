const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.get('/docs', (req, res) => {
    res.redirect('https://react.dev');
});

app.get('/help', (req, res) => {
    res.redirect('./contact');
});

app.get('/admin/dashboard', (req, res) => {
    res.redirect('..');
});

app.get('/shop/items/details', (req, res) => {
    res.redirect('../..'); 
});



app.get('/search', (req, res) => {
    res.send(`Город: ${req.query.city}, Погода: ${req.query.weather}`);
});

app.get('/tags', (req, res) => {
    res.send(`Выбранные цвета: ${req.query.color.join(', ')}`);
});

app.get('/user-info', (req, res) => {
    const user = req.query.info;
    res.send(`ID: ${user.id}, Имя: ${user.name}, Роль: ${user.role}`);
});


app.use(express.urlencoded({ extended: true }));

app.get('/form', (req, res) => {
    res.send(`
        <form method="POST" action="/submit">
            <input name="userName" placeholder="Имя">
            <input name="userAge" placeholder="Возраст">
            <button type="submit">Отправить</button>
        </form>
    `);
});

app.post('/submit', (req, res) => {
    res.send(`Данные получены: Имя — ${req.body.userName}, Возраст — ${req.body.userAge}`);
});


app.get('/product/:category/:id', (req, res) => {
    res.json(req.params);
});

const authRouter = express.Router();

authRouter.get('/login', (req, res) => res.send('Страница логина'));
authRouter.get('/signup', (req, res) => res.send('Страница регистрации'));

app.use('/auth', authRouter);

app.get('/api/me', (req, res) => {
    const myData = {
        name: "Николай", 
        age: 18,         
        status: "Student"
    };
    res.json(myData);
});

app.listen(PORT, () => {
    console.log(`Сервер запущен!`);
});
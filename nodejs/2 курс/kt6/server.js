const http = require('http');

http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    const path = req.url.toLowerCase();

    if (path === '/' || path === '/home') {
        res.end('<h1>Главная страница</h1>');
    } else if (path === '/about') {
        res.end('<h1>О нас</h1>');
    } else if (path === '/contact') {
        res.end('<h1>Контакты</h1>');
    } else if (path === '/old-page') {
        // Пункт 4: Переадресация
        res.writeHead(301, { 'Location': '/home' });
        res.end();
    } else {
        // Обработка несуществующего адреса
        res.writeHead(404);
        res.end('<h1>404: Страница не найдена</h1>');
    }
}).listen(3000);
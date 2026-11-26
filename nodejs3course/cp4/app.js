const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const authRoutes = require('./src/routes/auth');
const usersRoutes = require('./src/routes/users');
const postsRoutes = require('./src/routes/posts');
const adminRoutes = require('./src/routes/admin');
const errorHandler = require('./src/middleware/errorHandler');

const app = express();

app.use(helmet());
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());

app.use('/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/posts', postsRoutes);
app.use('/admin', adminRoutes);

app.use(errorHandler);

module.exports = app;
const express = require('express');
const router = express.Router();
const prisma = require('../config/index');
const { authRequired, requireRole } = require('../middleware/auth');

// Все маршруты /api/users требуют access token.
router.use(authRequired);

// GET /api/users - MODERATOR и ADMIN.
router.get('/', requireRole(['MODERATOR', 'ADMIN']), async (req, res) => {
  let { page = 1, limit = 10 } = req.query;
  page = parseInt(page);
  limit = parseInt(limit);
  const skip = (page - 1) * limit;

  try {
    const users = await prisma.user.findMany({ skip, take: limit });
    const total = await prisma.user.count();
    res.json({
      data: users,
      meta: { total, page, limit, pages: Math.ceil(total / limit) }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/users/:id - MODERATOR/ADMIN или сам пользователь.
router.get('/:id', async (req, res, next) => {
  const id = parseInt(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: 'Некорректный id' });
  }

  const isElevated = req.user.role === 'MODERATOR' || req.user.role === 'ADMIN';
  if (!isElevated && req.user.id !== id) {
    return res.status(403).json({ error: 'Доступ запрещён' });
  }

  try {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      return res.status(404).json({ error: 'Пользователь не найден' });
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
});

// POST /api/users - только ADMIN.
router.post('/', requireRole(['ADMIN']), async (req, res) => {
  const { email, name, role } = req.body;
  try {
    const user = await prisma.user.create({
      data: { email, name, role }
    });
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PATCH /api/users/:id - только ADMIN.
router.patch('/:id', requireRole(['ADMIN']), async (req, res) => {
  const { id } = req.params;
  const { name, email, role } = req.body;
  try {
    const user = await prisma.user.update({
      where: { id: parseInt(id) },
      data: { name, email, role }
    });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/users/:id - только ADMIN.
router.delete('/:id', requireRole(['ADMIN']), async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.user.delete({ where: { id: parseInt(id) } });
    res.json({ message: 'Пользователь удален' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;

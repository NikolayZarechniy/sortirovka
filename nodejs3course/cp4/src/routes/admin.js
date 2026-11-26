const express = require('express');
const router = express.Router();
const prisma = require('../config/index');
const { authRequired, requireRole } = require('../middleware/auth');

const ROLES = ['USER', 'MODERATOR', 'ADMIN'];

// PATCH /admin/users/:id/role - только ADMIN.
router.patch(
  '/users/:id/role',
  authRequired,
  requireRole(['ADMIN']),
  async (req, res, next) => {
    const id = parseInt(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ error: 'Некорректный id' });
    }

    const { role } = req.body;
    if (!ROLES.includes(role)) {
      return res.status(400).json({ error: 'Роль должна быть USER, MODERATOR или ADMIN' });
    }

    try {
      const user = await prisma.user.update({
        where: { id },
        data: { role }
      });
      res.json(user);
    } catch (err) {
      if (err.code === 'P2025') {
        return res.status(404).json({ error: 'Пользователь не найден' });
      }
      next(err);
    }
  }
);

module.exports = router;

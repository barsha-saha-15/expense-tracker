import express from 'express';
import { PrismaClient } from '@prisma/client';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();
const prisma = new PrismaClient();

router.use(verifyToken);

// Get all expenses
router.get('/', async (req, res) => {
    const expenses = await prisma.expense.findMany({
        where: { userId: req.user.userId },
        orderBy: { date: 'desc' },
    });
    res.json(expenses);
});

// Add expense
router.post('/', async (req, res) => {
    const { description, amount, category, date } = req.body;
    const expense = await prisma.expense.create({
        data: {
            description,
            amount: parseFloat(amount),
            category,
            date: new Date(date),
            userId: req.user.userId,
        },
    });
    res.json(expense);
});

// Update expense
router.put('/:id', async (req, res) => {
    const { description, amount, category, date } = req.body;
    const expense = await prisma.expense.findUnique({ where: { id: parseInt(req.params.id) } });
    if (expense.userId !== req.user.userId) return res.status(403).json({ error: 'Forbidden' });

    const updated = await prisma.expense.update({
        where: { id: expense.id },
        data: { description, amount: parseFloat(amount), category, date: new Date(date) },
    });
    res.json(updated);
});

// Delete expense
router.delete('/:id', async (req, res) => {
    const expense = await prisma.expense.findUnique({ where: { id: parseInt(req.params.id) } });
    if (expense.userId !== req.user.userId) return res.status(403).json({ error: 'Forbidden' });

    await prisma.expense.delete({ where: { id: expense.id } });
    res.json({ message: 'Deleted' });
});

export default router;

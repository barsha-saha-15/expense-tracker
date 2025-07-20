import express from 'express';
import { PrismaClient } from '@prisma/client';
import authenticate from '../middleware/verifyToken.js';

const router = express.Router();
const prisma = new PrismaClient();

//  Create new expense
router.post('/', authenticate, async (req, res) => {
  const { description, amount, category } = req.body;
  const userId = req.user.userId;

  try {
    console.log(description, amount, category, userId)

    const newExpense = await prisma.expense.create({
      data: {
        description,
        amount: parseFloat(amount),
        category,
        userId,

      },

    });
    res.json(newExpense);
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'Failed to create expense' });
  }
});

//  Get all expenses for logged-in user
router.get('/', authenticate, async (req, res) => {
  try {
    const expenses = await prisma.expense.findMany({
      where: {
        userId: req.user.userId,
      },
    });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch expenses' });
  }
});

//  Get single expense by ID
router.get('/:id', authenticate, async (req, res) => {
  const { id } = req.params;

  try {
    const expense = await prisma.expense.findUnique({
      where: { id: Number(id) },
    });

    if (!expense || expense.userId !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    res.json(expense);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch expense' });
  }
});

// Update expense
router.put('/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  const { title, amount } = req.body;

  try {
    const existingExpense = await prisma.expense.findUnique({
      where: { id: Number(id) },
    });

    if (!existingExpense || existingExpense.userId !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    const updatedExpense = await prisma.expense.update({
      where: { id: Number(id) },
      data: {
        title,
        amount: parseFloat(amount),
      },
    });

    res.json(updatedExpense);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update expense' });
  }
});

//  Delete expense
router.delete('/:id', authenticate, async (req, res) => {
  const { id } = req.params;

  try {
    const existingExpense = await prisma.expense.findUnique({
      where: { id: Number(id) },
    });

    if (!existingExpense || existingExpense.userId !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    await prisma.expense.delete({
      where: { id: Number(id) },
    });

    res.json({ message: 'Expense deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete expense' });
  }
});

export default router;

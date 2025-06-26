
import express from "express";
import type { Request, Response } from "express";
import UserService from '../services/UserService';

const userRouter = express.Router();

userRouter.post('/', async (req: Request, res: Response) => {
  try {
    const user = await UserService.createUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(400).json({ error: message });
  }
});

userRouter.get('/', async (_req: Request, res: Response) => {
  try {
    const users = await UserService.getAllUsers();
    res.json(users);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(500).json({ error: message });
  }
});

userRouter.get('/:id', (req: Request, res: Response) => {
  try {
     UserService.getUserById(req.params.id).then(user => res.json(user));
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(500).json({ error: message });
  }
});

userRouter.put('/:id', async (req: Request, res: Response) => {
  try {
    const updated = await UserService.updateUser(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(400).json({ error: message });
  }
});

userRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    await UserService.deleteUser(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(400).json({ error: message });
  }
});

export default userRouter;

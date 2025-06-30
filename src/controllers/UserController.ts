import type { Request, Response } from "express";
import UserService from '../services/UserService';
import userValidator from "../validators/user";

const createUser = async (req: Request, res: Response) => {
  try {
    const userData= userValidator.userData.parse(req.body);
    const createdUser = await UserService.createUser(userData);
    res.status(201).json(createdUser);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(400).json({ error: message });
  }
};

const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await UserService.getAllUsers();
    res.json(users);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(500).json({ error: message });
  }
};

const getUserById = async (req: Request, res: Response) => {
  try {
     const user =  await UserService.getUserById(req.params.id);
     res.status(200).json(user)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(500).json({ error: message });
    
  }
};

const updateUser =  async (req: Request, res: Response) => {
  try {
    const updated = await UserService.updateUser(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(400).json({ error: message });
  }
};

const deleteUser =  async (req: Request, res: Response) => {
  try {
    await UserService.deleteUser(req.params.id);
    res.json({ message: 'User Deleted successfully' });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(400).json({ error: message });
  }
};

export default {createUser, getAllUsers, getUserById, updateUser, deleteUser };

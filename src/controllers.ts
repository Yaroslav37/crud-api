import {Request, Response} from 'express';
import {getAllUsers, getUserById, createUser, updateUser, deleteUser} from './database';
import { validate as isUuid } from 'uuid';

export const getAllUsersController = (req: Request, res: Response): void => {
    res.status(200).json(getAllUsers());
}

export const getUserByIdController = (req: Request, res: Response): void => {
    const id = req.params.id;
    if (!isUuid(id)) {
        res.status(400).json({error: 'Invalid id'});
        return;
    }
    const user = getUserById(id);
    if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
    }
    res.status(200).json(user);
}

export const createUserController = (req: Request, res: Response): void => {
    const { username, age, hobbies } = req.body;
    if (!username || !age || !hobbies) {
        res.status(400).json({ error: 'Missing required fields' });
        return;
    }
    const user = createUser(username, age, hobbies);
    res.status(201).json(user);
}

export const updateUserController = (req: Request, res: Response): void => {
    const id = req.params.id;
    if (!isUuid(id)) {
        res.status(400).json({error: 'Invalid id'});
        return;
    }
    const { username, age, hobbies } = req.body;
    if (!username || !age || !hobbies) {
        res.status(400).json({ error: 'Missing required fields' });
        return;
    }
    const user = updateUser(id, username, age, hobbies);
    if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
    }
    res.status(200).json(user);
}

export const deleteUserController = (req: Request, res: Response): void => {
    const id = req.params.id;
    if (!isUuid(id)) {
        res.status(400).json({error: 'Invalid id'});
        return;
    }
    const user = deleteUser(id);
    if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
    }
    res.status(200).json(user);
}
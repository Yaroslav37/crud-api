import express from 'express';
import { getAllUsersController, getUserByIdController, createUserController, updateUserController, deleteUserController } from './controllers';

const router = express.Router();

router.get('/users', getAllUsersController);
router.get('/users/:id', getUserByIdController);
router.post('/users', createUserController);
router.put('/users/:id', updateUserController);
router.delete('/users/:id', deleteUserController);

export default router;
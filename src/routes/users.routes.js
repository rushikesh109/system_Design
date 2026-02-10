import express from 'express';
import * as userController from '../controllers/users.controller.js';
import { validatePartialUser, validateUser, validateUserId } from '../middleware/validator.middleware.js';

const router = express.Router();

// GET /users - with query params for filtering & pagination
router.get('/', userController.getUsers);

// GET /users/:id - with ID validation
router.get('/:id', validateUserId, userController.getUserById);

// POST /users - with validation
router.post('/', validateUser, userController.createUser);

// PUT /users/:id - with both validations
router.put('/:id', validateUserId, validateUser, userController.updateUser);

//Patch /users/:id - with partial validation
router.patch('/:id', validateUserId, validatePartialUser, userController.patchUser);

// DELETE /users/:id - with ID validation
router.delete('/:id', validateUserId, userController.deleteUser);

export default router;

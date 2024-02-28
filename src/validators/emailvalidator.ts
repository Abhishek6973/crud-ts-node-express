import { body } from 'express-validator';

export const validateEmail = [
    body('email').isEmail().withMessage('Invalid email address')
];

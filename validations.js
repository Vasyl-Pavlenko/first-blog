import { body } from "express-validator";

export const loginValidation = [
  body('email', 'Wrong email format').isEmail(),
  body('password', 'More then 5 characters required').isLength({ min: 5 })
];

export const registerValidation = [
  body('email', 'Wrong email format').isEmail(),
  body('password', 'More then 5 characters required').isLength({ min: 5 }),
  body('fullName', 'Enter your name').isLength({ min: 3 }),
  body('avatarUrl', "Wrong Url").optional().isURL(),
];

export const postCreateValidation = [
  body('title', 'Enter title').isLength({ min: 3 }).isString(),
  body('text', 'Enter text').isLength({ min: 3 }).isString(),
  body('tags', 'Wrong tags format').optional().isString(),
  body('imageUrl', 'Wrong image url').optional().isString(),
];

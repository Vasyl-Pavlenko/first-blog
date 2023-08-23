import express from 'express';
import fs from 'fs';
import mongoose from 'mongoose';
import multer from 'multer';
import cors from 'cors';

import {
  registerValidation,
  loginValidation,
  postCreateValidation
} from './validations.js';

import { checkAuth, handleValidationsErrors } from './utils/index.js';

import { UserController, PostController, CommentController } from './controllers/index.js'


mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('DB connected...')
  })
  .catch(() => {
    console.log('DB error...')
  })

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    if (!fs.existsSync('uploads')) {
      fs.mkdirSync('uploads');
    };

    cb(null, 'uploads');
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
})

const upload = multer({ storage });

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

app.post('/auth/login', loginValidation, handleValidationsErrors, UserController.login);
app.post('/auth/register', registerValidation, handleValidationsErrors, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe);

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.get('/posts', PostController.getAll);
app.get('/tags', PostController.getLastTags);
app.get('/posts/byTags', PostController.getPostsByTags);
app.get('/posts/tags', PostController.getLastTags);
app.get('/posts/:id', PostController.getOne);
app.get('/posts/popular', PostController.getPopularPosts);
app.post('/posts/', checkAuth, postCreateValidation, handleValidationsErrors, PostController.create);
app.delete('/posts/:id', checkAuth, PostController.remove);
app.patch('/posts/:id', checkAuth, postCreateValidation, handleValidationsErrors, PostController.update);
app.get('/comments', CommentController.getComments);
app.post('/comments', checkAuth, CommentController.create);

app.listen(process.env.PORT || 4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log(`Server started successufully`)
});


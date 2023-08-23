import CommentModel from '../models/Comment.js';
import PostModel from '../models/Post.js';

export const getComments = async (req, res) => {
  try {
    const comments = await CommentModel.find().populate('user').exec();

    res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch comments' });
  }
};

export const create = async (req, res) => {
  try {
    const { text, postId } = req.body;

    const comment = new CommentModel({
      text,
      user: req.userId,
      post: postId,
    });

    const savedComment = await comment.save();

    await PostModel.findByIdAndUpdate(postId, { $inc: { commentsCount: 1 } });

    res.status(201).json(savedComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to add comment' });
  }
};
import PostModel from '../models/Post.js';

export const getLastTags = async (req, res) => {
  try {
    const posts = await PostModel.find().limit(5).exec();

    const tags = posts
      .map((obj) => obj.tags)
      .flat();

    res.json(tags);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Failed get tags',
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find().populate('user').exec();
    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Failed get article',
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;

    const updatedPost = await PostModel.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        $inc: { viewsCount: 1 },
      },
      {
        returnDocument: 'after',
      }
    ).populate('user');

    if (!updatedPost) {
      return res.status(404).json({ message: 'Article not found' });
    }

    res.json(updatedPost);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Failed return article',
    });
  }
};

export const remove = async (req, res) => {
  try {
    const postId = req.params.id;

    const deletedPost = await PostModel.findOneAndDelete({ _id: postId }).exec();

    if (!deletedPost) {
      return res.status(404).json({ message: 'Article not found' });
    }

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Failed delete article',
    });
  }
};

function convertToHashtags(techString) {
  const techArray = techString.split(',').map(tech => tech.trim());
  const hashtags = techArray.map(tech => `${tech.replace('.', '').toLowerCase()}`);
  return hashtags;
}

export const create = async (req, res) => {
  try {
    const techString = req.body.tags.trim(); 
    const hashtags = convertToHashtags(techString); 

    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: hashtags, 
      user: req.userId,
    });

    const post = await doc.save();

    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Failed creating article',
    });
  }
};

export const update = async (req, res) => {
  try {
    const postId = req.params.id;

    await PostModel.updateOne(
      {
        _id: postId,
      },
      {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        user: req.userId,
        tags: req.body.tags.split(','),
      },
    );

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Failed updating',
    });
  }
};

export const getPopularPosts = async (req, res) => {
  try {
    const popularPosts = await Post.find().sort('-viewsCount').limit(10);
    res.json(popularPosts);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getPostsByTags = async (req, res) => {
  try {
    const selectedTags = req.query.tags.split(',');

    if (!selectedTags || selectedTags.length === 0) {
      return res.status(400).json({
        message: 'No tags specified for filtering.',
      });
    }

    const posts = await PostModel.find({ tags: { $in: selectedTags } }).populate('user').exec();

    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Failed to get articles by tags.',
      error: err.message,
    });
  }
};
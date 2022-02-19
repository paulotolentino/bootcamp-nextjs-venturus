const express = require('express');
const cors = require('cors');
const multer = require('multer');

const sequelize = require('./database');
const Post = require('./Post');

sequelize.sync(/*{ force: true }*/).then(() => console.log('db created'));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    const extension = file.originalname.split('.')[1];
    cb(null, `${Date.now()}.${extension}`);
  },
});

const app = express();

app.use(cors());
app.use(express.json());

app.use('/uploads', express.static('./uploads'));

app.get('/post', async (req, res) => {
  const posts = await Post.findAll({
    order: [['createdAt', 'DESC']],
  });
  res.send(posts);
});

app.get('/post/:id', async (req, res) => {
  const id = req.params.id;
  const post = await Post.findOne({ where: { id: id } });
  if (post) {
    res.send(post);
    return;
  }

  res.statusCode = 404;
  res.send({
    msg: 'Post not found',
  });
});

app.post(
  '/post',
  multer({ storage: storage }).single('picture'),
  async (req, res) => {
    try {
      const result = await Post.create({
        ...req.body,
        picture: req.file.path,
      });
      res.statusCode = 201;
      res.send(result.dataValues);
    } catch (e) {
      console.log(e);

      const errors = e.errors.map((error) => error.message);

      res.statusCode = 400;
      res.send({
        msg: errors.join('; '),
      });
    }
  }
);

app.put(
  '/post/:id',
  multer({ storage: storage }).single('picture'),
  async (req, res) => {
    try {
      const id = req.params.id;
      const { title, content } = req.body;
      const post = await Post.findOne({ where: { id: id } });

      if (!post) {
        throw new Error('Post not found');
      }

      if (title) {
        post.title = title;
      }

      if (req.file) {
        post.picture = req.file.path;
      }

      if (content) {
        post.content = content;
      }

      await post.save();
      res.send(post);
    } catch (e) {
      console.log(e);

      res.statusCode = 400;
      res.send({
        msg: e.message,
      });
    }
  }
);

app.delete('/post/:id', async (req, res) => {
  const id = req.params.id;
  await Post.destroy({ where: { id: id } });
  res.send({
    msg: 'Post removed',
  });
});

app.listen(3001, () => {
  console.log('app is running');
});

const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors');

const config = require('./config/index');
const { SERVER_PORT } = config;
const port = SERVER_PORT || 5000;

// Routes
const auth = require('./routes/api/auth/index');
const comment = require('./routes/api/comment/index');
const lobby = require('./routes/api/lobby/index');
const mypage = require('./routes/api/mypage/index');
const post = require('./routes/api/post/index');
const uploadImg = require('./routes/api/utils/uploadimg');

// Middle-ware
app.use(
  cors({
    // origin: ['http://localhost:5000'],
    credentials: true,
  }),
);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// api router
app.use('/api/auth', auth);
app.use('/api/comment', comment);
app.use('/api/lobby', lobby);
app.use('/api/mypage', mypage);
app.use('/api/post', post);
app.use('/api/utils/uploadimg', uploadImg);

// Error 처리
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use((err, req, res) => {
  res.locals.message = err.message;
  res.locals.error = config.NODE_ENV === "development" ? err : {};
  res.status(err.status || 500);
  res.end();
});

app.listen(port, () => {
  console.log(`Server on port ${port}`);
});

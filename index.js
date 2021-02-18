const express = require('express');
const app = express();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors');

const config = require('./config/index');
const { SERVER_PORT, COOKIE_SECRET } = config;
const port = SERVER_PORT || 5000;

// Middle-ware
app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'https://www.houseoftomorrow.cf',
      'https://houseoftomorrow.cf',
    ],
    methods: ['GET', 'POST', 'OPTIONS'],
    credentials: true,
  })
);
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(COOKIE_SECRET));
app.use(
  session({
    secret: COOKIE_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);

// Routes
const auth = require('./routes/api/auth/index');
const comment = require('./routes/api/comment/index');
const lobby = require('./routes/api/lobby/index');
const mypage = require('./routes/api/mypage/index');
const post = require('./routes/api/post/index');
const uploadImg = require('./routes/api/utils/uploadimg');
// api router
app.get('/', (req, res) => res.status(200).end());
app.use('/api/auth', auth);
app.use('/api/comment', comment);
app.use('/api/lobby', lobby);
app.use('/api/mypage', mypage);
app.use('/api/post', post);
app.use('/api/utils/uploadimg', uploadImg);

// Error 처리
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res) => {
  res.locals.message = err.message;
  res.locals.error = config.NODE_ENV === 'development' ? err : {};
  res.status(err.status || 500);
  res.end();
});

app.listen(port);

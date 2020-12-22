const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors');

const config = require('./config/index');
const { SERVER_PORT } = config;

// Routes
// auth
const userLogin = require('./routes/api/auth/login');
const userLogout = require('./routes/api/auth/logout');
const deleteUser = require('./routes/api/auth/deleteuser');
const getUser = require('./routes/api/auth/getuser');
const isAuth = require('./routes/api/auth/isAuth');
const updateUser = require('./routes/api/auth/updateuser');

// comment
const deleteComment = require('./routes/api/comment/delete');
const updateComment = require('./routes/api/comment/update');
const writeComment = require('./routes/api/comment/write');

// lobby
const filter = require('./routes/api/lobby/filter');
const getPosts = require('./routes/api/lobby/getposts');
const likePost = require('./routes/api/lobby/likepost');

// mypage
const getLikePost = require('./routes/api/mypage/getlikepost');
const mypageGetPost = require('./routes/api/mypage/getpost');

// post
const deletePost = require('./routes/api/post/delete');
const readPost = require('./routes/api/post/read');
const updatePost = require('./routes/api/post/update');
const writePost = require('./routes/api/post/write');

//utils
const uploadImg = require('./routes/api/utils/uploadimg');


// Middle-ware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// api router
// auth
app.use('/api/auth/login', userLogin);
app.use('/api/auth/logout', userLogout);
app.use('/api/auth/deleteuser', deleteUser);
app.use('/api/auth/getuser', getUser);
app.use('/api/auth/isAuth', isAuth);
app.use('/api/auth/updateuser', updateUser);

// comment
app.use('/api/comment/delete', deleteComment);
app.use('/api/comment/update', updateComment);
app.use('/api/comment/write', writeComment);

// lobby
app.use('/api/lobby/filter', filter);
app.use('/api/lobby/getposts', getPosts);
app.use('/api/lobby/likepost', likePost);

// mypage
app.use('/api/mypage/getlikepost', getLikePost);
app.use('/api/mypage/getpost', mypageGetPost);

// post
app.use('/api/post/delete', deletePost);
app.use('/api/post/read', readPost);
app.use('/api/post/update', updatePost);
app.use('/api/post/write', writePost);

//utils
app.use('/api/utils/uploadimg', uploadImg);


app.get('/', (req, res) => {
  res.json({text: "HELLO"})
});

app.listen(SERVER_PORT, () => {
  console.log(`Server on port ${SERVER_PORT || 5000}`);
});

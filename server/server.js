const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;
const MONGO_URI = 'mongodb+srv://codesmith:codesmith@cluster0.mr7jz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

mongoose.connect((MONGO_URI), {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'stocktrades'
})
  .then(() => console.log('Connected to Mongo DB'))
  .catch(err => console.log(err));

app.set('view engine', 'ejs');
  
const apiRouter = require('./routes/api');
const loginRouter = require('./routes/login');
const signupRouter = require('./routes/signup');
// const { sign } = require('crypto');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

if (process.env.NODE_ENV === 'production') {
  app.use('/build', express.static(path.join(__dirname, '../build')));

  // app.get('/', (req, res) => {
  //   return res.status(200).sendFile(path.join(__dirname, '../client/index.html'));
  // });
  // app.get('/index.js', (req, res) => {
  //   return res.status(200).sendFile(path.join(__dirname, '../client/index.js'));
  // })
}
app.get('/', (req, res) => {
  return res.status(200).render(path.join(__dirname, '../client/index'));
});

app.use('/api', apiRouter);

app.use('/login', loginRouter);

app.use('/signup', signupRouter);

app.get('/user', (req,res) => {
  res.render(path.join(__dirname, '../client/user'))
})


app.use((req,res) => res.status(404).send("Page not found"));

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  console.log(err);
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
})
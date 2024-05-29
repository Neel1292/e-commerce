const express = require('express');
const app = express();
const colors = require('colors');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

const userRouter = require('./router/userRouter');
const itemRouter = require('./router/itemRouter');
dotenv.config();

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.get('/', (req, res) => {
    res.send('Welcome to the ecommerce site');
})
app.use('/user', userRouter);
app.use('/item', itemRouter);

app.listen(PORT , function () {
    console.log(colors.bgYellow.black(`Server running on port ${PORT} `));
})
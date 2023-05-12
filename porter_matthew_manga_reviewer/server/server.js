const express = require('express');
const port = 8000;
const cors = require('cors');
const cookieParser = require("cookie-parser")
const app = express();
const jwt = require("jsonwebtoken");
require('dotenv').config();
require('./config/mongoose.config');

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({credentials: true, origin: "http://localhost:3000"}));

require('./routes/manga.routes')(app);

    
app.listen(port, () => console.log(`Listening on port: ${port}`) );
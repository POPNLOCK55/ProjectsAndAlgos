const express = require('express');
const cors = require('cors');
const cookieParser = require("cookie-parser")
const app = express();
const jwt = require("jsonwebtoken");




app.use(cors({credentials: true, origin: "http://localhost:3000"}));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
require('./config/mongoose.config');
require('./routes/manga.routes')(app);
const port = 8000;
    
app.listen(port, () => console.log(`Listening on port: ${port}`) );
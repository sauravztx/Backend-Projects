const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

app.use(cookieParser());

app.get('/', (req, res) => {
    
    let token = jwt.sign({ email: 'atest@gmail.com' }, 'secret');
    res.cookie('token', token);
    console.log(token);
    res.send("working fine")
})


app.get('/read', (req, res) => {
    let data = jwt.verify(req.cookies.token, 'secret');
    console.log(data);
   
    res.send("working");
})


app.listen(3000);
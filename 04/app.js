const express = require('express');
const app = express();
const path = require('path');
const userModel = require('./models/user');

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function(req, res){
    res.render('index')
})

app.get('/read', async (req, res) => {
    let users = await userModel.find()
    res.render('read', {users});
})

app.post('/create', async (req, res) => {
    let {name, email, imageUrl} = req.body;
    let createdUser = await userModel.create({
        name: name,
        email : email,
        image : imageUrl
    })
    res.redirect('/read')
})

app.get('/delete/:id', async (req, res) => {
    let userId = req.params.id;
    let users = await userModel.findOneAndDelete({_id : userId});
    res.redirect('/read');
})
app.get('/edit/:id', async (req, res) => {
    let userId = req.params.id;
    let user = await userModel.findOne({_id : userId});
    res.render('edit', {user});
})

app.post('/update/:id', async (req, res) => {
    let userId = req.params.id;
    let {name, email, image} = req.body
    let user = await userModel.findOneAndUpdate({_id : userId}, {name, email, image}, {new : true});
    res.redirect('/read');
})

app.listen(3000);
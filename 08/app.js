const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const path = require('path');
const userModel = require('./models/user')
const bcrypt = require('bcrypt');
const postModel = require('./models/post')
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const upload = require('./config/multerconfig');


app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());








app.get('/', (req, res) => {
    res.render('home');
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.get('/register', (req, res) => {
    res.render('index');
})

app.post('/register', async (req, res) => {
    let {name, username, email, password, age} = req.body;
    let user = await userModel.findOne({email});
    if(user) return res.status(500).send("Email already registered");

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            let user = await userModel.create({
                name, 
                username, 
                email,
                password : hash,
                age
            });
            let token = jwt.sign({email: email, userid: user._id}, "secret");
            res.cookie("token", token);
            res.redirect('/login');
            
        })
    })
})

app.get('/profile', isLoggedIn, async (req, res) => {
    let user = await userModel.findOne({email: req.user.email}).populate('posts');
    res.render('profile', {user});
})


app.post('/login', async (req, res) => {
    let {email, password} = req.body;
    let user = await userModel.findOne({email});
    if(!user) return res.status(500).send("User not Exists");

    bcrypt.compare(password, user.password, (err, result) => {
       if(result) {
            let token = jwt.sign({email: email, userid: user._id}, "secret");
            res.cookie("token", token);
            res.status(200).redirect('/profile');
       } 
       else res.redirect('/login');
    })
})


app.get('/logout', (req, res) => {
    res.cookie('token', "");
    res.redirect('/login');
})


app.post('/post', isLoggedIn, async (req, res) => {
    let user = await userModel.findOne({email: req.user.email});
    let post = await postModel.create({
        user: user._id,
        content : req.body.content
    });
    user.posts.push(post._id);
    await user.save();
    res.redirect('/profile');
})

app.get('/like/:id', isLoggedIn, async (req, res) => {
    let post = await postModel.findOne({_id: req.params.id}).populate('user');
    if(post.likes.indexOf(req.user.userid) === -1){
        post.likes.push(req.user.userid);
    }
    else{
        post.likes.splice(post.likes.indexOf(req.user.userid), 1);
    }
    
    await post.save();
    res.redirect('/profile');
});


app.get('/edit/:id', isLoggedIn, async (req, res) => {
    let post = await postModel.findOne({_id: req.params.id}).populate('user');
    res.render('edit', {post})
})

app.post('/update/:id', isLoggedIn, async (req, res) => {
    let post = await postModel.findOneAndUpdate({_id: req.params.id}, {content : req.body.content});
    res.redirect('/profile');
})

app.get('/profile/upload', (req, res) => {
    res.render('profileupload')
})

app.post('/upload', isLoggedIn, upload.single('image'), async (req, res) => {
    let user = await userModel.findOne({email : req.user.email});
    user.profilepic = req.file.filename;
    await user.save()
    res.redirect('/profile')
})

function isLoggedIn(req, res, next){
    if(req.cookies.token === "") res.redirect('/login');
    else{
        let data = jwt.verify(req.cookies.token, 'secret');
        req.user = data;
        next();
    }
    
}

app.listen(3000);
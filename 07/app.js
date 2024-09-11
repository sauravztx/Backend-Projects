const express = require('express');
const app = express();
const userModel = require('./models/user');
const postModel = require('./models/post');

app.get('/', (req, res) => {
    res.send("welcome");
})

app.get("/create", async (req, res) => {
    let user = await userModel.create({
        username : "saurav",
        age : 21,
        email : 'test@gmail.com'
    })
    res.send(user);
})


app.get("/post/create", async (req, res) => {
    let post = await postModel.create({
        postdata : "Here postdata will be posted",
        user : "66dec55fa2f9ecba3eecf7ad"
        
    })
    let user = await userModel.findOne({_id : "66dec55fa2f9ecba3eecf7ad"});
    user.posts.push(post._id);
    await user.save();
    res.send({user, post});
})

app.listen(3000);
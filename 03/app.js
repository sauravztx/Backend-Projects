const express = require("express");
const app = express();
const userModel = require('./usermodel');

app.get("/", function(req, res){
    res.send("working")
})



app.get('/create', async (req, res) => {
    let createdUser = await userModel.create({
        name: "Neo Thomas",
        email : "Neo.ztx@gmail.com",
        username: "neo"
    })
    res.send(createdUser);
})

app.get('/update', async (req, res) => {
    const updatedUser = await userModel.findOneAndUpdate({username: "saurav"}, {name : "Alex"}, {new : true})
    res.send(updatedUser);
})

app.get('/read', async (req, res) => {
    let users = await userModel.find();
    res.send(users);
})

app.get('/delete', async (req, res) => {
    let users = await userModel.findOneAndDelete({username: 'neo'});
    res.send(users);
})


  

app.listen(3000);

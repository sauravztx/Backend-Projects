const express = require('express');
const app = express();
const path = require("path");
const fs = require('fs');

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));


app.get('/', function(req, res){
    fs.readdir(`./files`, function(err, files){
        res.render("index", {files: files});
        console.log(files);
    })
});

app.get("/files/:filename", function(req, res){
    const fname = req.params.filename;
    fs.readFile(`./files/${fname}`, "utf-8", function(err, filedata){
        res.render("show", {filename: path.parse(fname).name, filedata: filedata});
        console.log(filedata)
    })
})

app.get("/edit/:filename", function(req, res){
    const fname = req.params.filename;
    res.render("edit", {filename: fname});
})

app.post("/edit", function(req, res){
    const prevName = req.body.prevname;
    const newName = req.body.newname.split(' ').join('');
    const safeTitle = newName.replace(/[^a-zA-Z0-9_-]/g, ''); // Sanitize filename
    const extension = req.body.fileextension
    const filePath = `./files/${safeTitle}.${extension}`;
    fs.rename(`./files/${prevName}`, filePath, function(err){
        res.redirect("/");
    })
})


app.post('/create', function(req, res){
    const title = req.body.title.split(' ').join('');
    const safeTitle = title.replace(/[^a-zA-Z0-9_-]/g, ''); // Sanitize filename
    const extension = req.body.fileextension
    const filePath = `./files/${safeTitle}.${extension}`;
    fs.writeFile(filePath, req.body.description, function(err){
        if (err) {
            console.error("Error writing file:", err);
            res.status(500).send("Error writing file");
            return;
        }
        res.redirect("/");
    });
    console.log(req.body);
})

app.listen(3000);

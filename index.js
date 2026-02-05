const express = require("express");
const app = express();
const port = 8080;
const {v4: uuidv4} = require("uuid");
const methodOverride = require("method-override");


const path = require("path");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));


app.set("view engine", "ejs"); //ejs template
app.set("views", path.join(__dirname, "views")); //path for views folder

app.use(express.static(path.join(__dirname, "public"))); //path for public folder

//Creating array and Object in array because we don't have database
let posts = [
    {
        id : uuidv4(),
        username : "ganesh",
        content : "I live in mumbai",
    },
    {
        id: uuidv4(),
        username : "sanket",
        content : "I live in pune",
    },
    {
        id: uuidv4(),
        username : "Kshitij",
        content : "I live in Kholapur",
    },
];

app.get("/posts", (req, res)=>{
    res.render("index.ejs", {posts});
});

app.get("/posts/new", (req, res) =>{
    res.render("new.ejs");
})

app.post("/posts", (req, res)=>{
    let {username, content} = req.body;
    let id = uuidv4();
    posts.push({id, username, content});
    // res.send("Post request working");
    res.redirect("/posts");
    //console.log(req.body);
})

app.get("/posts/:id", (req, res) =>{
    let  {id} = req.params;
    let post = posts.find((p) => id === p.id);
    //console.log(id);
    //console.log(post);
    //res.send("Request Working");
    res.render("show.ejs", {post});
})

app.patch("/posts/:id", (req, res)=>{
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    //console.log(id);
    // console.log(post);
    res.redirect("/posts");
})

app.get("/posts/:id/edit", (req, res)=>{
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", {post});
})

app.delete("/posts/:id", (req, res) =>{
    let {id} = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
})
  
app.listen(port, ()=>{
    console.log("Listening to port : 8080");
})
//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "";
const aboutContent = "";
const contactContent = "";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const posts = [];


app.get("/", function (req, res) {
  res.render("home", { content1: homeStartingContent, posts: posts })
})


app.get("/about", function (req, res) {
  res.render("about", { content2: aboutContent })
})

app.get("/contact", function (req, res) {
  res.render("contact", { content3: contactContent })
})


app.get("/compose", function (req, res) {
  res.render("compose")
})

app.post("/compose", function (req, res) {

  var post = {
    title: req.body.title,
    body: req.body.body
  }
  posts.push(post)
  res.redirect("/")

})


app.get("/posts/:News", function (req, res) {

  const requ = _.lowerCase(req.params.News);



  posts.forEach(function (post) {
    const old = _.lowerCase(post.title);

    if (requ === old) {
      res.render("post",{
        title : post.title,
        content :post.body
      })
    } 

  });

});

app.listen(3000, function () {
  console.log("Server started on port 3000.");
});



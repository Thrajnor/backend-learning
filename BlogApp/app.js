var express = require('express')
var methodOverride = require("method-override")
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var app = express()
var moment = require('moment')
var expressSanitizer = require("express-sanitizer");


// config

mongoose.connect("mongodb://localhost/blogapp")
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use(expressSanitizer('_method'))
app.set('view engine', 'ejs')

// Schema Config

var blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  date: {
    type: Date,
    default: Date.now
  }
})

var Blog = mongoose.model("Blog", blogSchema)

// Blog.create({
//   title: "MY FIRST BLOGPOST!!!",
//   image: "https://images.unsplash.com/photo-1522198734915-76c764a8454d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=7892e6f709c6e46512bb4b08ce3d1a3c&auto=format&fit=crop&w=500&q=60",
//   body: "Welcome on my post, im pleased that you come by!!!"
// })

// Routes

app.get("/", function(req, res) {
  res.redirect("/blogs")
})

app.get("/blogs", function(req, res) {
  Blog.find({}, function(err, blogs) {
    if (err) {
      console.log(err)
    } else {
      res.render("index", {
        blogs: blogs,
        moment: moment
      })
    }
  })
})

app.get('/blogs/new', function(req, res) {
  res.render('new')
})

// CREATE ROUTE

app.post("/blogs", function(req, res) {
  req.body.blog.body = req.sanitize(req.body.blog.body)
  Blog.create(req.body.blog, function(err, newBlog) {
    if (err) {
      res.redirect('/blogs/new')
    } else {
      res.redirect('/blogs')
    }
  })
})

// SHOW ROUTE

app.get('/blogs/:id', function(req, res) {
  Blog.findById(req.params.id, function(err, blog) {
    if (err) {
      res.redirect('/blogs')
    } else {
      res.render("show", {
        blog: blog,
        moment: moment
      })
    }
  })
})

// EDIT ROUTE

app.get('/blogs/:id/edit', function(req, res) {
  req.body.blog.body = req.sanitize(req.body.blog.body)
  Blog.findById(req.params.id, function(err, blog) {
    if (err) {
      res.redirect('/blogs')
    } else {
      res.render("edit", {
        blog: blog,
      })
    }
  })
})

app.put('/blogs/:id', function(req, res) {
  Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, editedBlog) {
    if (err) {
      console.log(err)
    } else {
      res.redirect('/blogs/' + req.params.id)
    }
  })
})

// delete route

app.delete('/blogs/:id', function(req, res) {
  Blog.findByIdAndRemove(req.params.id, function(err, blog) {
    if (err) {
      console.log(err)
    } else {
      res.redirect('/blogs')
    }
  })
})




// if(err) {
// res.redirect('/blogs/:id')
// alert("Error Something went Wrong" + err);
// }

app.listen(process.env.PORT, process.env.IP, function() {
  console.log('BLOG server has started !')
})

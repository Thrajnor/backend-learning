var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/references')

// POST profile

var postSchema = new mongoose.Schema({
  title: String,
  content: String
})

var Post = mongoose.model('Post', postSchema)

// USER profile

var userSchema = new mongoose.Schema({
  email: String,
  name: String,
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post'
    }
  ]
})

var User = mongoose.model('User', userSchema)


// User.create({
//   email: 'bob@gmail.com',
//   name: 'bob burger'
// }, function(err, User) {
//   if (err) {
//     console.log(err)
//   } else {
//     console.log(User)
//   }
// })

// Post.create({
//   title: 'How to cook the best burger pt. 3',
//   content: 'asdfasdfasd fasdf asdf asd f asdfas'
// }, function(err, post) {
//   if (err) {
//     console.log(err)
//   } else {
//     User.findOne({
//       name: "bob burger"
// }, function(err, user) {
//   if (err) {
//     console.log(err)
//   } else {
//     user.posts.push(post)
//     user.save(function(err, data) {
//       if (err) {
//         console.log(err)
//       } else {
//         console.log(data)
//       }
//     })
//   }
// })
//   }
// })

User.findOne({
  name: "bob burger"
}).populate('posts').exec(function(err, user) {
  if (err) {
    console.log(err)
  } else {
    console.log(user)
  }
})
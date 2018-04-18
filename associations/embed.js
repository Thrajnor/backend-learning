var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/embending')

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
  posts: [postSchema]
})

var User = mongoose.model('User', userSchema)

// User.create({
//   email: 'hermione@hogwards.edu',
//   name: 'Hermione Granger'
// }, function (err, User) {
//   if (err) {
//     console.log(err)
//   } else {
//     console.log(User)
//   }
// })

// User.findOne({name: 'Hermione Granger'}, function (err, user) {
//   if (err) {
//     console.log(err)
//   } else {
//     user.posts.push({
//       title: '3 things i hate',
//       content: 'Vordemort! Vordemort! Vordemort!'
//     })
//     user.save(function (err, user) {
//       if (err) {
//         console.log(err)
//       } else {
//         console.log(user)
//       }
//     })
//   }
// })

// User.findByIdAndUpdate('5ad61d02e27b6b18698363f0', {
//   posts: [{
//   title: 'How to brew Apple Juice ?!',
//   content: 'Just kidding go to potion class instead looking on internet!'
// }]}, function (err, user) {
//   if (err) {
//     console.log(err)
//   } else {
//     console.log(user)
//   }
// })
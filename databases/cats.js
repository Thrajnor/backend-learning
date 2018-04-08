var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/cat_app')

var catSchema = new mongoose.Schema({
  name: String,
  age: Number,
  isCute: Boolean
})

var Cat = mongoose.model('Cat', catSchema)

// var natalia = new Cat({
//   name: 'Natalia',
//   age: 18,
//   isCute: true
// })

// natalia.save(function (err, cat) {
//   if (err) {
//     console.log('something went wrong')
//     console.log(err)
//   } else {
//     console.log('cat saved !!!')
//     console.log(cat)
//   }
// })

Cat.create({
  name: 'miałek',
  age: 5,
  isCute: true
}, function (err, cat) {
  if(err) {
    console.log(err)
  } else {
    console.log(cat)
  }
})

// Cat.find({}, function (err, cats) {
//   if (err) {
//     console.log('error')
//     console.log(err)
//   } else {
//     console.log('cats are :')
//     console.log(cats)
//   }
// })

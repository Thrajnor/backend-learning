var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var id

app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(express.static('public'))
app.set('view engine', 'ejs')

mongoose.connect('mongodb://localhost/yelp_camp')

var campSchema = new mongoose.Schema({
  name: String,
  image: String,
  desc: String
})
var camp = mongoose.model('camp', campSchema)

// camp.create(
//   {
//     name: 'Salmon Creek',
//     image: 'https://farm4.staticflickr.com/3872/15119367505_f52d0d729e.jpg',
//     desc: 'description for Salmon Creek'
//   },
//   {
//     name: "cat's hiccup",
//     image: 'https://farm3.staticflickr.com/2259/2182093741_164dc44a24.jpg',
//     desc: "description for cat's hiccup"
//   },
//   {
//     name: 'fish fungal',
//     image: 'https://farm8.staticflickr.com/7258/7121861565_3f4957acb1.jpg',
//     desc: 'description for fish fungal'
//   },
//   {
//     name: 'Kitten lair',
//     image: 'https://farm9.staticflickr.com/8579/16706717975_bdc99767d7.jpg',
//     desc: 'description for Kitten lair'
//   },
//   {
//     name: 'Koci Karton',
//     image: 'https://farm7.staticflickr.com/6147/6040800665_f931d1ee3c.jpg',
//     desc: 'description for Koci Karton'
//   }, {
//     name: "Troll camp",
//     image: "https://pixabay.com/get/ea37b70d21f0003ed1584d05fb1d4e97e07ee3d21cac104497f3c27aa4ebb7b0_340.jpg",
//     desc: "An camp where you will be trolled"
//   },
//   function(err, camp) {
//     if (err) {{
//       console.log(err})
//     }
//   })

app.get('/', function(req, res) {
  res.render('landing')
})

app.get('/campgrounds', function(req, res) {
  camp.find({}, function(err, campgrounds) {
    if (err) {
      return console.log(err)
    } else {
      res.render('index', {
        campgrounds: campgrounds
      })
    }
  })
})

app.post('/campgrounds', function(req, res) {
  var newCamp = {
    name: req.body.name,
    image: req.body.image,
    desc: req.body.desc
  }
  camp.create(newCamp, function(err, camp) {
    if (err) {
      return console.log(err)
    } else {
      res.redirect('/campgrounds')
    }
  })
})

app.post('/campgrounds/edit', function(req, res) {
  var editedCamp = {
    name: req.body.name,
    image: req.body.image,
    desc: req.body.desc
  }
  camp.findById(id, function(err, camp) {
    if (err) {
      return console.log(err)
    } else {
      camp.name = editedCamp.name
      camp.image = editedCamp.image
      camp.desc = editedCamp.desc
      camp.save(function(err, camp) {
        if (err) {
          return console.log(err)
        } else {
          res.redirect('/campgrounds/' + id)
        }
      })
    }
  });
})

app.get('/campgrounds/new', function(req, res) {
  res.render('new')
})

app.get('/campgrounds/:id', function(req, res) {
  id = req.params.id
  camp.find({
    _id: id
  }, function(err, foundCampgrounds) {
    if (err) {
      return console.log(err)
    } else {
      res.render('show', {
        campgrounds: foundCampgrounds
      })
    }
  })
})

app.listen(process.env.PORT, process.env.IP, function() {
  console.log('YELP CAMP server has started !')
})

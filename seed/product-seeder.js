var Product = require('../models/product')

var mongoose = require('mongoose')

mongoose.connect('localhost:27017/shopping');



var products = [
  new Product({
  imagePath: 'https://images.pexels.com/photos/40797/wild-flowers-flowers-plant-macro-40797.jpeg?w=940&h=650&auto=compress&cs=tinysrgb',
  title: 'My first title',
  description: 'Awesome decription here!!!!!!',
  price: 10
  }),
  new Product({
  imagePath: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSaOjxSFYGEB-CN5l0eM5Kx3M3WDfkM8oPV1mhcJXY2Py1VNrZ',
  title: 'My second title',
  description: 'Awesome decription here!!!!!!',
  price: 25
  }),
  new Product({
  imagePath: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTftl27EPvqhN08Fxgu5Vt-7eVnOSLWZyjRzbmUXm_59vAIppO9',
  title: 'My third title',
  description: 'Awesome decription here!!!!!!',
  price: 45
  }),
  new Product({
  imagePath: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSarck5qGdjQ_RoSKpMZ7EyzByY75SLVdYJTWXvEeqb-50-gF6',
  title: 'My fourty title',
  description: 'Awesome decription here!!!!!!',
  price: 15
  }),
  new Product({
  imagePath: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuGqQI8WHIBlVskaPuAdYsxmnNug4SLlAl0SFAGO6V6eaf_PGY',
  title: 'My n-th title',
  description: 'Awesome decription here!!!!!!',
  price: 100
  }),
  new Product({
  imagePath: 'https://images.pexels.com/photos/40797/wild-flowers-flowers-plant-macro-40797.jpeg?w=940&h=650&auto=compress&cs=tinysrgb',
  title: 'My wherever title',
  description: 'Awesome decription here!!!!!!',
  price: 32
  })
]

let done = 0;
for(let i = 0; i < products.length; i++){
  products[i].save((err, result) => {
    done++
    if(done === products.length) exit()
  })
}

const exit = () => mongoose.disconnect()

mongoose.disconnect()
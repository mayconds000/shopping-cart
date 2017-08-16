var express = require('express');
var router = express.Router();
var csrf = require('csurf')

const Cart = require('../models/cart')
const Product = require('../models/product')

/* GET home page. */
router.get('/', function(req, res, next) {
  var products = Product.find((err, docs)=>{
    let productChunks = []
    let chunkSize =3
    for(var i = 0; i < docs.length; i += chunkSize) {
      productChunks.push(docs.slice(i, i + chunkSize))
    }
    res.render('shop/index', { title: 'Variable shared', products: productChunks })
  })
})

router.get('/add-to-cart/:id', (req, res) => {
  let productId = req.params.id
  let cart = new Cart(req.session.cart ? req.session.cart : {})

  Product.findById(productId, function(err, product) {
    if(err)
      return res.redirect('/')
    
    cart.add(product, product.id)
    req.session.cart = cart
    res.redirect('/')
    console.log(req.session.cart)
  })
})


router.get('/shopping-cart', (req, res, next) => {
  if(!req.session.cart)
    return res.render('shop/shopping-cart', {products: null})

  let cart = new Cart(req.session.cart);
  res.render('shop/shopping-cart', {products: cart.generateArray(), totalPrice: cart.totalPrice})
})

router.get('/checkout', (req, res, next) => {
  if(!req.session.cart)
    return res.redirect('/shopping-cart')

  let cart = new Cart(req.session.cart)
  res.render('shop/checkout', {total: cart.totalPrice})
})


module.exports = router;

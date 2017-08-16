var express = require('express');
var router = express.Router();
var csrf = require('csurf')
var passport = require('passport')

var csrfProtection = csrf()
router.use(csrfProtection)

const isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated())
    return next()

  res.redirect('/')
}
const notLoggedIn = (req, res, next) => {
  if(!req.isAuthenticated())
    return next()

  res.redirect('/')
}

router.get('/profile', isLoggedIn, (req, res, next) => {
  res.render('user/profile')
})

router.get('/logout', isLoggedIn, (req, res, next) => {
  req.logout()
  res.redirect('/')
})

router.use('/', notLoggedIn, (req, res, next) => {
  next()
})

router.get('/signup', function(req, res, next) {
  let messages = req.flash('error')
  res.render('user/signup', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0})
})

router.post('/signup', passport.authenticate('local.signup', {
  successRedirect: 'profile',
  failureRedirect: 'signup',
  failureFlash: true
}))



router.get('/signin', (req, res, next) => {
  let messages = req.flash('error')
  res.render('user/signin', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0})
})

router.post('/signin', passport.authenticate('local.signin', {
  successRedirect: 'profile',
  failureRedirect: 'signin',
  failureFlash: true
}))



module.exports = router


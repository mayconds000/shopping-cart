let passport = require('passport')
let User = require('../models/user')
let LocalStrategy = require('passport-local').Strategy

passport.serializeUser((user, done)=>{
  done(null, user.id)
})

passport.deserializeUser((id, done)=> {
  User.findById(id, (err, user) => {
    done(err, user)
  })
})

passport.use('local.signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, (req, email, password, done) => {
  req.checkBody('email', 'Invalid email').notEmpty().isEmail()
  req.checkBody('password', 'Invalid password').notEmpty().isLength({min:4})
  
  req.getValidationResult().then((result) => {
    
    if(!result.isEmpty()) {
      let errors = result.array().map(elm => elm.msg)
      return done(null, false, req.flash('error', errors))
    }

    User.findOne({'email': email}, (err, user) => {
      if(err) {
        return done(err)
      }
      if(user) {
        return done(null, false, {message: 'Email is already in use.'})
      }
  
      var newUser = new User()
      newUser.email = email
      newUser.password = newUser.encryptPassword(password)
      newUser.save((err, result) => {
        if(err){
          return done(err)
        }
        return done(null, newUser)
      })
    })
  })
}))

passport.use('local.signin', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, (req, email, password, done) => {
  req.checkBody('email', 'Invalid email').notEmpty().isEmail()
  req.checkBody('password', 'Invalid password').notEmpty().isLength({min:4})
 
  req.getValidationResult().then((result) => {
    
    if(!result.isEmpty()) {
      let errors = result.array().map(elm => elm.msg)
      return done(null, false, req.flash('error', errors))
    }

    User.findOne({'email': email}, (err, user) => {
      if(err) 
        return done(err)
      
      if(!user) 
        return done(null, false, {message: 'No user find.'})
      
      if(!user.validPassword(password))
        return done(null, false, {message: 'Wrong password'})
      
      return done(null, user)
    })
      

  })
    
  
  

}))
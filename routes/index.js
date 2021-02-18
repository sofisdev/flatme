const router = require("express").Router();
const bcrypt = require('bcryptjs');
const UserModel = require('../models/User.js')
const CommentModel = require('../models/Comment.js');
const geocoder = require('../utils/geocoder');
const capitalized = (string) => string[0].toUpperCase() + string.slice(1).toLowerCase();

//GET Methods
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/about", (req, res, next)=>{
  res.render("about")
})

router.get("/login", (req, res, next)=>{
  res.render("login")
})

router.get('/signup', (req, res, next) => {
  res.render('signup.hbs');
});

//POST Methods
router.post('/signup', (req, res, next) => {
  const {name, lastname, email, password, password2, country} = req.body

  let profileBody = {
    name: name,
    lastname: lastname,
    email: email,
    password: password,
    country: country
  }

  //check for all required filled in values
  if (!email.length || !name.length || !lastname.length ||
     !password.length || !country.length || !name.length) {
      res.render('signup.hbs', {msg: 'Seems like you forgot to fill out all the fields!', profileBody})
      return;
  }
  else if(!(password == password2)) {
     res.render('signup.hbs', {msg: 'Passwords do not match', profileBody})
     return;
  }

  //check for password
  let regexPass = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!#$%&?]{8,20}$/;
  if (!regexPass.test(password)) {
     res.render('signup.hbs', {msg: 'Password needs to have special characters, at least one Upppercase letter and one number and be 8 characters at least', profileBody})
     return;
  }

  //password goes through bcryptjs library
  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(password, salt);

  //check for already existing email 
  UserModel.findOne({email: email})
    .then((user) => {
      if(user) {
        res.render('signup.hbs', {msg: 'This email is not available, are you sure you don not have an account with us already?', profileBody})
        return;
      }
    })
    .catch((err) => next(err))
  
  UserModel.create({email, name: capitalized(name), lastname: capitalized(lastname), password: hash, 
    country: country})
    .then(() => res.redirect('/login'))
    .catch((err) => next(err))
})

router.post('/login', (req, res, next) =>{

  const {email, password} = req.body

  if (!email.length || !password.length ) {
    res.render('login', {msg: 'Holy guacamole 🥑 ! Seems like you forgot to fill out all the fields!'})
    return;
  }

  UserModel.findOne({email : email})
    .then((result)=>{
        if (result){
          let isMatching = bcrypt.compareSync(password, result.password)
          if(isMatching){
            req.session.loggedInUser = result
            res.redirect('/profile')
          }
          else {
            res.render('login', {msg: 'Good lord! Seems like your forgot your password, too many beers perhaps 🍺 ?'})
          }
        }
        else {
          res.render('login', {msg: 'Good lord! Seems like we do not know this email, try again with a different email or sign up for free!'})
        }
    })
    .catch((err)=>{
      next(err)
    })
})


//Export Router
module.exports = router

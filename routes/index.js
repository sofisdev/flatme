const router = require("express").Router();
const bcrypt = require('bcryptjs');
const UserModel = require('../models/User.js')
const CommentModel = require('../models/Comment.js')
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

router.get('/reviews', (req, res, next)=>{
  res.render('user/reviews')
})

router.get('/writereview', (req, res, next)=>{
  res.render('user/writereview')
})

router.get('/profile', (req, res, next)=>{

  let email = req.session.loggedInUser.email

  UserModel.find({email : email})
    .then((user)=>{
      res.render('user/profile', {user})
      console.log(user)
    })
    .catch(()=>{
      console.log('Something is not working rendering the user')
    })
})

//POST Methods
router.post('/signup', (req, res, next) => {
  const {name, lastname, 
          email, password, 
          hobbies, country} = req.body


  //check for all required filled in values
  if (!email.length || !name.length || !lastname.length ||
     !password.length || !country.length || !name.length) {
      res.render('signup.hbs', {msg: 'Please enter all fields'})
      return;
  }

  //check for password
  let regexPass = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!#$%&?]{8,20}$/;
  if (!regexPass.test(password)) {
     res.render('signup.hbs', {msg: 'Password needs to have special characters, some numbers and be 6 characters at least'})
     return;
  }

  //password goes through bcryptjs library
  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(password, salt);

  //check for already existing email 
  UserModel.findOne({email: email})
    .then((user) => {
      if(user) {
        res.render('signup.hbs', {msg: 'This email is not available, please try a different one'})
        return;
      }
    })
    .catch((err) => next(err))
  
  UserModel.create({email, name: capitalized(name), lastname: capitalized(lastname), password: hash, 
    country: country, hobbies: hobbies})
    .then(() => res.redirect('/login'))
    .catch((err) => next(err))
})

router.post('/login', (req, res, next)=>{
  const {email, password} = req.body

  UserModel.findOne({email : email})
    .then((result)=>{
        if (result){
          let isMatching = bcrypt.compareSync(password, result.password)
          if(isMatching){
            req.session.loggedInUser = result
            res.redirect('/profile')
          }
          else {
            res.redirect('/signup')
          }
        }
    })
    .catch(()=>{
      console.log('Working working')
    })
})

router.post('/writereview', (req, res, next) => {
  const {country, city, district, street, title, review, score, tags} = req.body;
  
   //check for all required filled in values
   if (!country.length || !city.length || !district.length || !title.length ||
    !street.length || !review.length || !score.length ) {
     res.render('signup.hbs', {msg: 'Please enter all fields'})
     return;
 }

  //create a review on the database
  CommentModel.create({country, city, district, street, title, review, score, tags})
    .then(() => res.redirect('/reviews'))
    .catch((err) => next(err))

})

//Export Router
module.exports = router;

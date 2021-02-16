const router = require("express").Router();
const bcrypt = require('bcryptjs');
const UserModel = require('../models/User.js')
const CommentModel = require('../models/Comment.js');
const geocoder = require('../utils/geocoder');

const capitalized = (string) => string[0].toUpperCase() + string.slice(1).toLowerCase();

//google auth
const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID = '136668872566-suma2arehmhvb8ehtt65v8queg50jggk.apps.googleusercontent.com'
const client = new OAuth2Client(CLIENT_ID);

const checkLoggedInUser = (req, res, next) =>{
  if(req.session.loggedInUser){
    next()
  }
  else {
    res.redirect('/signup')
  }
}

//Import leaflet
global.window = { screen:{} }
global.document = {
  documentElement: { style: {} },
  getElementsByTagName: () => { return {} },
  createElement: () => { return {} }
}
global.navigator = { userAgent: 'nodejs', platform: 'nodejs'}
const L = require('leaflet');

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

router.get('/reviews', checkLoggedInUser, (req, res, next)=>{
  
  CommentModel.find()
    .then((result) => {
      res.render('user/reviews', {review: result})
    })
    .catch((error)=>{
      next(error)
    })
})

router.get('/writereview',checkLoggedInUser, (req, res, next) =>{
  res.render('user/writereview')
})

router.get('/profile',checkLoggedInUser, (req, res, next) =>{

  let email = req.session.loggedInUser.email

  UserModel.find({email : email})
    .then((user)=>{
      CommentModel.find({userId: req.session.loggedInUser._id})
            .populate('userId')
            .then((comment) => {
              res.render('user/profile', {user, comment})
              // res.json(comment)
            })
    })
    .catch(()=>{
      console.log('Something is not working rendering the user')
    })

})

router.get('/profile/edit', checkLoggedInUser, (req, res, next)=>{

  let email = req.session.loggedInUser.email

  UserModel.find({email : email})
    .then((user)=>{
      res.render('user/update-profile', {user})
    })
    .catch((err)=>{
      next(err)
    })
})

router.get('/review/:id/edit/',checkLoggedInUser, (req,res,next)=>{

  let id = req.params.id

  CommentModel.findById(id)
    .then((comment)=>{
      res.render('user/update-review', {comment})
    })
    .catch((err)=>{
       next(err)
    })
})

router.get('/reviews/:id/delete/', checkLoggedInUser, (req, res, next)=>{

  let id = req.params.id

  CommentModel.findByIdAndDelete(id)
    .then(()=>{
      console.log('deleting')
      res.redirect('/profile')
    })
    .catch(()=>{
      console.log('Not possible to delete')
    })
})

router.get('/logout', checkLoggedInUser, (req,res,next)=>{
  req.session.destroy()
  res.redirect('/')
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

router.post('/login', (req, res, next) =>{

  // let token = req.body.token;

  // async function verify() {

  //   const ticket = await client.verifyIdToken({
  //       idToken: token,
  //       audience: CLIENT_ID,
  //   });

  //   const payload = ticket.getPayload();
  //   const userid = payload['sub'];
  // }

  // verify()
  //   .then(()=>{
  //     res.cookie('session-token', token);
  //     res.send('success')
  
  //   })
  //   .catch(console.error);

  const {email, password} = req.body

  if (!email.length || !password.length ) {
    res.render('login', {msg: 'Please enter all fields'})
    return;
  } //no se porque me da error ahora, dice que no se puede leer legth de undefined

  UserModel.findOne({email : email})
    .then((result)=>{
        if (result){
          let isMatching = bcrypt.compareSync(password, result.password)
          if(isMatching){
            req.session.loggedInUser = result
            res.redirect('/profile')
          }
          else {
            res.render('login', {msg: 'Seems like your forgot your password....'})
          }
        }
    })
    .catch((err)=>{
      next(err)
    })
})

router.post('/profile/edit', (req, res, next)=>{
  const {name, lastname, 
          email, hobbies, country} = req.body

  let editedUser = {
    name: name,
    lastname : lastname,
    hobbies: hobbies,
    country: country
  }

  if( !editedUser.name || !editedUser.lastname || !editedUser.country){
    res.render('user/update-profile', {msg: 'Please enter all fields'})
  } else {
    UserModel.findOneAndUpdate({email : email}, editedUser)
    .then(() => res.redirect('/profile'))
    .catch((err) => next(err))
  }
})

router.post('/review/:id/edit', (req,res, next)=>{

  let id = req.params.id

  const {city, address, zipcode, title, review, score, tags} = req.body;

  let editedComment = {
    city: city,
    address: address,
    zipcode: zipcode,
    title: title,
    review: review,
    score: score,
    tags: tags
  }

  CommentModel.findByIdAndUpdate(id, editedComment)
    .then(()=>{
      res.redirect('/profile')
    })
    .catch((err)=>{
      next(err)
    })
});

router.post('/writereview', (req, res, next) => {
  const {city, address, zipcode, title, review, score, tags} = req.body;
  
   //check for all required filled in values
   if (!city.length && zipcode.length != 5 && !title.length || !address.length || !review.length || !score.length ) {
     res.render('user/writereview', {msg: 'Please enter all fields'})
     return;
     }

  //transform address and city into coordinates and create element in the database
  geocoder.geocode({address: address, city: city, zipcode: zipcode})
    .then((data) => {
      //update coordinates
      let idGeo = {
        type: 'Point',
        coordinates: [data[0].longitude, data[0].latitude],
        formattedAddress: data[0].formattedAddress
      }

      // create a review on the database
      CommentModel.create({idGeo, address, city, zipcode, title, review, score, tags, userId: req.session.loggedInUser._id})
        .then(() => res.redirect('/profile'))
        .catch((err) => next(err))
    })
})

router.post('/publishreview', (req, res, next) => {
  const {city, address,zipcode, title, review, score, tags} = req.body;
  
   //check for all required filled in values
   if (!city.length && zipcode.length != 5 && !title.length || !address.length || !review.length || !score.length ) {
    res.render('user/writereview', {msg: 'Please enter all fields'})
    return;
    }

  //transform address and city into coordinates and create element in the database
  geocoder.geocode({address: address, city: city, zipcode: zipcode})
   .then((data) => {
     //update coordinates
     let idGeo = {
       type: 'Point',
       coordinates: [data[0].longitude, data[0].latitude],
       formattedAddress: data[0].formattedAddress
     }

     // create a review on the database
     CommentModel.create({idGeo, address, city, zipcode, title, published: true, review, score, tags, userId: req.session.loggedInUser._id})
       .then(() => res.redirect('/profile'))
       .catch((err) => next(err))
   })
})

router.post('/review/:id/edit/publish', (req, res, next)=>{

  let id = req.params.id

  const {city, address, zipcode, title, review, score, tags} = req.body;

  let editedComment = {
    city: city,
    address: address,
    zipcode: zipcode,
    title: title,
    review: review,
    score: score,
    tags: tags,
    published: true,
  }

  CommentModel.findByIdAndUpdate(id, editedComment)
    .then(()=>{
      res.redirect('/profile')
    })
    .catch((err)=>{
      next(err)
    })
})

router.post('/reviews', (req, res, next) => {
  const {score, tags} = req.body;

  //Define filter according to search results
  let filter = {}

  if(score && tags) {
  filter = {$and:[{score: score}, {tags: tags}]}
  }
  else if (score){
    filter = {score:score}
  }
  else if (tags){
    filter = {tags:tags}
  }

  CommentModel.find(filter)
    .then((result) => {
      res.render('user/reviews', {review: result})
    })
    .catch(() => res.redirect('/reviews'))
})

router.get('/flatmecoordinates', (req, res, next) =>{
CommentModel.find()
  .then((result) => res.json(result))
})

//Export Router
module.exports = router

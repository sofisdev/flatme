const User = require("../models/User.js");


const router = require("express").Router();

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
  res.render('user/profile')
})

//POST Methods
router.post('/signup', (req, res, next) => {
  const {name, lastname, 
          email, password, 
          hobbies, country} = req.body

  // if (!email.length || !name.length || !lastname.length ||
  //    !password.length || !country.length || !name.length) {
  //     res.render('auth/signup', {msg: 'Please enter all fields'})
  //     return;
  // }
})

// router.post('/login', (req, res, next)=>{

//   const {email , password} = req.body

//   User.findOne({email : email})
//     .then((result)=>{
//         if (result){
//           bcrypt.compare(password, result.password)
//             .then((isMatching)=>{
//                 if(isMatching){
//                   res.redirect('/reviews')
//                 }
//                 else {
//                   res.render('login')
//                 }
//             })
//             .catch(()=>{
//               console.log('Comparing the password failed')
//             })
//         }
//         else {
//           res.render('login')
//         }
//     })
//     .catch(()=>{
//       console.log('Not working')
//     })
// })

//Export Router
module.exports = router;

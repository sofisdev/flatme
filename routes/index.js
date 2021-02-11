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

//Export Router
module.exports = router;

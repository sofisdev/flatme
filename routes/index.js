const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get('/signup', (req, res, next) => {
  res.render('signup.hbs');
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

module.exports = router;

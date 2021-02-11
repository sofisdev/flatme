const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

<<<<<<< HEAD
router.get('/signup', (req, res, next) => {
  res.render('signup.hbs');
});
=======
>>>>>>> origin/marta
router.get("/about", (req, res, next)=>{
  res.render("about")
})

router.get("/login", (req, res, next)=>{
  res.render("login")
})

<<<<<<< HEAD
=======
router.get('/signup', (req, res, next) => {
  res.render('signup.hbs');
});

router.get('/reviews', (req, res, next)=>{
  res.render('user/reviews')
})
>>>>>>> origin/marta

module.exports = router;

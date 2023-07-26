// @desc Get landing page
// route GET /
// @access Public
const getIndex = (req, res) => {
    res.render("index.ejs");
  };

// @desc Get login page
// route GET /login
// @access Public
const getUserLogin = (req, res) => {
  res.render("login.ejs");
};

//@desc Get user register page
// route GET /register
// @access Public
const getUserRegister = (req, res) => {
  res.render("signup.ejs", {
    title: "Create Account",
  });
};
  export { getIndex, 
    getUserLogin, 
    getUserRegister 
  };

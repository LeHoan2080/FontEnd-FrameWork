const Users = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Payment = require('../models/paymentModel')

const userCtrl = {
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      const user = await Users.findOne({email});
      if (user)
        return res.status(400).json({
          message: "email already exists."
        });
      if (password.length < 6) return res.status(400).json({ message: "pasword length > 6 char"})

      // password encryption
      const passwordHash = await bcrypt.hash(password, 10)
      const newUser = new Users({
        name, email, password: passwordHash
      })
      //  save mongoDB
      await newUser.save()

      //  create jsonwebtoken to authentication
      const accesstoken = createAcessToken({id: newUser._id})
      const refreshtoken = createRefreshToken({id: newUser._id})

      res.cookie('refreshtoken', refreshtoken, {
        httpOnly: true,
        path: '/user/refresh_token'
      })

      res.json({accesstoken})

      // res.json({newUser})
      // res.json({password, passwordHash})


    } catch (error) {
      return res.status(500).json({message: error.message,});
    }
  },
  login: async(req, res) => {
    try {
      const {email, password} = req.body

      const user = await Users.findOne({email})
      if(!user) return res.status(400).json({message: "user not exist"})

      const isMatch = await bcrypt.compare(password, user.password)
      if(!isMatch) return res.status(400).json({message: "incorrect password"})

      // if login success, create access token and refresh token
      const accesstoken = createAcessToken({id: user._id})
      const refreshtoken = createRefreshToken({id: user._id})

      res.cookie('refreshtoken', refreshtoken, {
        httpOnly: true,
        path: '/user/refresh_token'
      })

      res.json({accesstoken})

    } catch (err) {
      return res.status(500).json({message: error.message,});
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie('refreshtoken', {path: '/user/refresh_token'})
      return res.json({message: "logout success"})
    } catch (err) {
      return res.status(500).json({message: error.message,});
    }
  },
  refreshToken: (req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken;
      if(!rf_token) return res.status(400).json({
        message: "please login or register"
      })

      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if(err) return res.status(400).json({
          message: "please login or register"
        })

        const accesstoken = createAcessToken({id: user.id})
        res.json({accesstoken})
      })

    } catch (error) {
      return res.status(500).json({message: error.message,});
    }

    // res.json({rf_token})
  },
  getUser: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id).select('-password')
      if(!user) return res.status(400).json({message: "user not exist"})

      res.json(user)
    } catch (err) {
      return res.status(500).json({message: error.message,});
    }
  },
  addCart: async (req, res) =>{
    try {
      const user = await Users.findById(req.user.id)
      if(!user) return res.status(400).json({message: "user does not exist"})

      await Users.findByIdAndUpdate({_id: req.user.id},{
        cart: req.body.cart
      })

      return res.json({message: "add cart success"})
    } catch (err) {
      return res.status(500).json({message: err.message})
    }
  },
  history: async (req, res) => {
    try {
      const history = await Payment.find({user_id: req.user.id})
      res.json(history)
    } catch (err) {
      return res.status(500).json({message: err.message})
    }
  }
};

const createAcessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1d'})
}

const createRefreshToken = (user) =>{
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
}


module.exports = userCtrl;

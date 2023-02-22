import express from 'express'
import bcrypt from 'bcrypt'
import passport from 'passport'
import LocalStrategyInit from 'passport-local'
import { createUser, getUserByEmail, getUserById } from '../services/user.js'

const saltRounds = 10

const LocalStrategy = LocalStrategyInit.Strategy

async function authenticateUser (email, password, done) {
  const user = await getUserByEmail(email)
  console.log(user)
  if (!user) {
    return done(null, false, { message: 'No user with that email!' })
  }

  try {
    const validatePassword = await bcrypt.compare(password, user.password)
    if (validatePassword) {
      return done(null, user)
    } else {
      return done(null, false, { message: 'Incorrect password!' })
    }
  } catch (err) {
    return done(null, false, { message: err })
  }
}

passport.use(
  new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    authenticateUser
  )
)
passport.serializeUser(function (user, done) {
  done(null, user._id)
})

passport.deserializeUser(function (id, done) {
  const user = getUserById(id)
  done(null, user)
})

async function handleRegister (req, res) {
  try {
    const user = req.body.user

    const userExist = getUserByEmail(user.email)
    if (userExist) {
      return res.status(403).send({ error: 'User with email already exists' })
    }

    const salt = await bcrypt.genSalt(saltRounds)
    const hashedPassword = await bcrypt.hash(user?.password, salt)
    user.password = hashedPassword
    const { data, err } = createUser(user)
    if (err) {
      res.status(403).send({
        error: err
      })
    } else {
      res.send({ success: 'User created successfully', data: data })
    }
  } catch (err) {
    res.status(403).send({
      error: 'Failed to create User',
      err
    })
  }
}

// Routes
const router = express.Router()

router.post('/register', handleRegister)

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err)
    }
    if (!user) {
      return res.status(403).send({ error: info })
    }

    req.logIn(user, function (err) {
      if (err) {
        return next(err)
      }
      return res.send({ success: 'Login successful!', data: user })
    })
  })(req, res, next)
})

router.post('/logout', function (req, res, next) {
  req.logout(err => {
    if (err) {
      return next(err)
    }
    res.send({ message: 'logout successful!' })
  })
})

export default router

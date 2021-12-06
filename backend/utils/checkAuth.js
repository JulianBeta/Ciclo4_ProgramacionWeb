const jwt = require('jsonwebtoken')

exports.checkAuth = async (req, res, next) => {
  const isAuth = req.headers.isAuth
  try {
    await jwt.verify(isAuth, process.env.JWT_SECRET)
    next()
  } catch (err) {
    console.log(err)
    res.status(401).send('Does not have Authorization!')
    // next()
  }
}

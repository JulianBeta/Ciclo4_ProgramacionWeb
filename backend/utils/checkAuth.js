const jwt = require('jsonwebtoken')

exports.checkAuth = async (req, res, next) => {
  const auth = req.headers.Authorization
  try {
    await jwt.verify(auth, process.env.JWT_SECRET)
    next()
  } catch (err) {
    console.log(err)
    res.status(401).send('Does not have Authorization!')
    // next()
  }
}

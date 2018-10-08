const { ObjectId } = require('mongodb')
const mongo = require('./utilities/mongo')
const { createError, noConnect, operationErr } = require('./utilities/handleErrors')
const catchy = require('./utilities/catchy')
const omit = require('./utilities/omit')
const bcrypt = require('bcryptjs')


async function login(req, res) {
  const { email, password } = req.body
  if (!email || !password) return res.sendStatus(403)

  const [dbErr, client, db] = await mongo()
  if (dbErr) return noConnect(res, dbErr)

  const users = db.collection('users')
  const [findErr, user] = await catchy(users.findOne({ email }))
  client.close()

  if (findErr || user === null) {
    findErr && operationErr(findErr, 'findOne', 'users', req)
    return res.sendStatus(404)
  }

  // https://goo.gl/4ZdaKr
  // Avoiding `genSaltSync` and `hashSync` because the async versions are optimized for the event loop.
  bcrypt.compare(password, user.password, (err, response) => {
    if (err || !response) return res.sendStatus(403)

    req.session.user = omit(user, ['_id', 'createdAt', 'password'])
    res.json(req.session.user)
  })
}

async function createUser(req, res) {
  const { email, password } = req.body
  if (!email || !password) return res.sendStatus(403)

  const [dbErr, client, db] = await mongo()
  if (dbErr) return noConnect(res, dbErr)

  // https://goo.gl/4ZdaKr
  // Avoiding `genSaltSync` and `hashSync` because the async versions are optimized for the event loop.
  bcrypt.hash(password, 10, async (err, hash) => {
    if (err || !hash) {
      client.close()
      res.sendStatus(500)
      return createError('bcrypt hash', { message: err })
    }

    const user = {
      createdAt: Date.now(),
      budgets: [],
      defaultBudget: [],
      password: hash,
      email
    }

    const users = db.collection('users')
    const [insertErr] = await catchy(users.insertOne(user))
    client.close()

    if (insertErr) return res.sendStatus(500)
    res.json(true)
  })
}

function isLoggedIn(req, res) {
  if (req.session.user) return res.json(req.session.user)
  res.sendStatus(404)
}

function logout(req, res) {
  delete req.session.user
  res.json(true)
}

module.exports = {
  login,
  isLoggedIn,
  logout
}

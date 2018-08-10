const axios = require('axios');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('knex')(require('../knexfile').development);

const jwtKey = require('../_secrets/keys').jwtKey;
const { authenticate } = require('./middlewares');

module.exports = (server) => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};
function makeJWT(payload, cb) {
  jwt.sign(payload, jwtKey, { expiresIn: '24h' }, cb);
}

function register(req, res) {
  const { username, password } = req.body;
  bcrypt
    .hash(password, 14)
    .then(hash => db('users').insert({ username, password: hash }))
    .then(() => {
      makeJWT({ username }, (err, token) => {
        if (err) {
          throw err;
        } else {
          res.status(200).json(token);
        }
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(402).json({ message: 'Could not register user' });
    });
}

function login(req, res) {
  const { username, password } = req.body;
  db('users')
    .select('password')
    .where('username', '=', username)
    .first()
    .then(hash => bcrypt.compare(password, hash.password))
    .then((verdict) => {
      if (verdict) {
        makeJWT({ username }, (err, token) => {
          if (err) {
            throw err;
          } else {
            res.status(200).json(token);
          }
        });
      } else {
        res.status(402).json({ message: 'Could not verify username and password.' });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ message: 'Could not perform log in of user.' });
    });
}

function getJokes(req, res) {
  axios
    .get('https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_ten')
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((err) => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}

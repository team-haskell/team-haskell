var db = require('../db')

var bcrypt = require('bcrypt')
var User = {}
var saltRounds = 10
User.findUser = function (username) {
  return db('user').where({username: username}).select('id')
}

User.hashPassword = function (password) {
  return new Promise(function (resolve) {
    if (resolve) {
      bcrypt.hash(password, saltRounds, function (err, hash) {
        if (err) {
          throw err
        }
        resolve(hash)
      })
    }
  })
}
User.findPassword = function (username) {
  return db('user').where({username: username}).select('password')
}
User.comparePassword = function (username, password) {
  return new Promise(function (resolve) {
    if (resolve) {
      User.findPassword(username)
        .then(function (data) {
          bcrypt.compare(password, data[0].password, function (err, res) {
            if (err) {
              throw err
            }
            resolve(res)
          })
        })
    }
  })
}

User.insertUserPw = function (username, password) {
  var signUpObj = {
    username: username,
    password: password
  }
  return db('user').insert(signUpObj)
}

User.insertUserProfile = function (age, weight, height, gender, interest, gym, id) {
  console.log('inside helper', id)
  var profileObj = {
    age: age,
    weight: weight,
    height: height,
    gender: gender,
    interest: interest,
    gym: gym
  }

  return db('user').where({id: id}).update(profileObj)
}

User.registerProfile = function (id, bodyFat, activitylvl, interest) {
  console.log('inside User helper.registerProfile id=', id)
  var profileDetails = {
    bodyfat: bodyFat,
    activitylvl: activitylvl,
    interest: interest
  }
  console.log('id', id)
console.log('User.registerProfile, profile details', profileDetails)
  return db('user').where({id: id}).update(profileDetails)
}

module.exports = User

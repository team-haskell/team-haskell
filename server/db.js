require('dotenv').config()

var knex = require('knex')({
  client: 'mysql',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DB
  },
  pool: {
    min: 0,
    max: 12
  }
})

knex.schema.createTableIfNotExists('user', function (user) {
  user.increments('id').primary()
  user.string('username', 50)
  user.string('password', 200)
  user.integer('age')
  user.integer('height')
  user.integer('weight')
  user.string('gender')
  user.integer('bodyfat')
  user.string('activitylvl', 50)
  user.string('interest', 50)
  user.string('gym', 50)
  user.integer('zipcode')
}).then(function () {
  console.log('user table created')
})

knex.schema.createTableIfNotExists('strength_record', function (strength) {
  strength.increments('id').primary()
  strength.integer('user_id').unsigned().references('id').inTable('user')
  strength.string('type')
  strength.date('date')
  strength.integer('sets')
  strength.integer('intensity')
  strength.integer('duration')
  strength.integer('weight')
  strength.integer('reps')
}).then(function () {
  console.log('strength_record table created')
})

knex.schema.createTableIfNotExists('goals', function (goals) {
  goals.increments('id').primary()
  goals.integer('user_id').unsigned().references('id').inTable('user')
  goals.string('type', 50)
  goals.string('inc_dec', 50)
  goals.integer('range')
  goals.date('date')
}).then(function () {
  console.log('goals table created')
})

knex.schema.createTableIfNotExists('nutrition_record', function (nutrition) {
  nutrition.increments('id').primary()
  nutrition.integer('user_id').unsigned().references('id').inTable('user')
  nutrition.string('name', 50)
  nutrition.string('time', 50)
  nutrition.integer('serving')
  nutrition.integer('cal')
  nutrition.integer('carbs')
  nutrition.integer('fat')
  nutrition.integer('fiber')
  nutrition.integer('sodium')
  nutrition.integer('protein')
  nutrition.integer('water')
}).then(function () {
  console.log('nutrition_records table created')
})

knex.schema.createTableIfNotExists('cardio_record', function (cardio) {
  cardio.increments('id').primary()
  cardio.integer('user_id').unsigned().references('id').inTable('user')
  cardio.decimal('distance')
  cardio.integer('duration')
  cardio.integer('intensity')
  cardio.decimal('pace')
  cardio.string('type')
  cardio.date('date')
}).then(function () {
  console.log('cardio_record table created')
})

module.exports = knex

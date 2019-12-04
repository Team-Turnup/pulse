const db = require('./server/db')
const faker = require('faker')
const {
  Interval,
  Routine,
  User,
  Workout,
  WorkoutTimestamp,
  Class
} = require('./server/db/models')

const userCount = 100
const routineCount = 100
const intervalCount = 300
const workoutCount = 100
const WorkoutTimestampCount = 3000

const classCount = 100

const createUser = async () => {
  const pass = faker.internet.password()
  return await User.create({
    role: faker.random.arrayElement(['leader', 'follower']),
    email: faker.internet.email(),
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    password: pass,
    age: faker.random.number({min: 18, max: 65}),
    height: Math.round(faker.random.number({min: 12 * 5, max: 12 * 6.5})),
    weight: faker.random.number({min: 1200, max: 250}),
    gender: faker.random.arrayElement(['male', 'female', 'non-binary'])
  })
}

const createRoutine = async () => {
  return await Routine.create({
    name: faker.name.firstName(),
    activityType: faker.random.arrayElement([
      'running',
      'walking',
      'jumpingJacks',
      'pushups',
      'stairs',
      'rowing',
      'swimming',
      'dancing',
      'playingMusic',
      'breathing',
      'combo',
      'jumprope',
      'cycling'
    ]),
    public: faker.random.boolean()
  })
}

const createInterval = async () => {
  return await Interval.create({
    activityType: faker.random.arrayElement([
      'running',
      'walking',
      'jumpingJacks',
      'pushups',
      'stairs',
      'rowing',
      'swimming',
      'dancing',
      'playingMusic',
      'breathing',
      'jumprope',
      'cycling'
    ]),
    cadence: faker.random.number({min: 1, max: 999}),
    duration: faker.random.arrayElement([5, 10, 15, 20, 25, 30])
  })
}

const createWorkout = async () => {
  return await Workout.create({
    timestamp: new Date(),
    duration: faker.random.arrayElement([30, 60, 90])
  })
}

const createWorkoutstamp = async () => {
  return await WorkoutTimestamp.create({
    cadence: faker.random.number({min: -1, max: 999}),
    goalCadence: Math.round(faker.random.number({min: -1, max: 999})),
    timestamp: new Date()
  })
}
const createClass = async () => {
  return await Class.create({
    name: `Class # ${faker.random.number()}`,
    canEnroll: true,
    when: faker.date.recent(-3)
  })
}

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const cody = await User.create({
    email: 'cody@email.com',
    name: 'Cody Pug',
    password: '123',
    //username: 'MrCody',
    role: 'leader'
  })

  const users = await Promise.all(
    Array.from({length: userCount}, () => createUser())
  )

  const routines = await Promise.all(
    Array.from({length: routineCount}, () =>
      createRoutine().then(d => d.setUser(faker.random.arrayElement(users)))
    )
  )

  const classes = await Promise.all(
    Array.from({length: classCount}, () =>
      createClass().then(d => {
        d.setRoutine(faker.random.arrayElement(routines))
        d.setUser(
          faker.random.arrayElement(users.filter(d => d.role === 'leader'))
        )
        d.addAttendees(
          Array.from(
            {length: faker.random.number({min: 5, max: 9})},
            (d, i) => faker.random.number({min: 1, max: 9}) + 10 * i
          )
        ).catch(e => console.error(e))
      })
    )
  )

  const workouts = await Promise.all(
    Array.from({length: workoutCount}, () =>
      createWorkout().then(d => {
        d.setClass(faker.random.arrayElement([...classes, null]))
        d.setRoutine(faker.random.arrayElement(routines))
        d.setUser(faker.random.arrayElement(users))
      })
    )
  )

  const intervals = await Promise.all(
    Array.from({length: intervalCount}, (d, i) =>
      createInterval().then(d => d.setRoutine(Math.ceil((i + 1) / 3)))
    )
  )

  const workoutTimeStamps = await Promise.all(
    Array.from({length: WorkoutTimestampCount}, (d, i) =>
      createWorkoutstamp().then(d =>
        d.setWorkout(
          Math.ceil((i + 1) / (WorkoutTimestampCount / workoutCount))
        )
      )
    )
  )

  await User.create({
    role: 'leader',
    email: 'leader@gmail.com',
    password: '123'
  })

  await User.create({
    role: 'follower',
    email: 'follower@gmail.com',
    password: '123'
  })
}

async function runSeed() {
  console.log('Seeding...')
  try {
    await seed()
  } catch (error) {
    console.error(error)
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

if (module === require.main) {
  runSeed()
}

module.exports = seed

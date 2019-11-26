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
const WorkoutTimestampCount = 100

const classCount = 100

const createUser = async () => {
  const pass = faker.internet.password()
  return await User.create({
    role: faker.random.arrayElement(['leader', 'follower']),
    email: faker.internet.email(),
    password: pass,
    age: faker.random.number({min: 18, max: 65}),
    sex: faker.random.arrayElement(['male', 'female', 'non-binary'])
  })
}

const createRoutine = async () => {
  return await Routine.create({
    name: faker.name.firstName(),
    activityType: faker.random.arrayElement([
      'running',
      'walking',
      'jumping jacks',
      'push-ups',
      'stairs',
      'rowing',
      'swimming',
      'dancing',
      'playing music',
      'breathing',
      'combo'
    ]),
    public: faker.random.boolean()
  })
}

const createInterval = async () => {
  return await Interval.create({
    activityType: faker.random.arrayElement([
      'running',
      'walking',
      'jumping jacks',
      'push-ups',
      'stairs',
      'rowing',
      'swimming',
      'dancing',
      'playing music',
      'breathing'
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
    timestamp: new Date()
  })
}
const createClass = async () => {
  return await Class.create({
    name: `Class # ${faker.random.number()}`,
    canEnroll: true,
    live: true
  })
}

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

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
      })
    )
  )

  const workouts = await Promise.all(
    Array.from({length: workoutCount}, () =>
      createWorkout().then(d => {
        d.setClass(faker.random.arrayElement([...classes, null]))
        d.setRoutine(faker.random.arrayElement(routinesnm))
        d.setUser(
          faker.random.arrayElement(users.filter(d => d.role === 'leader'))
        )
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
      createWorkoutstamp().then(d => d.setWorkout(i + 1))
    )
  )

  // for (let i = 1; i <= routineCount; i++) {
  //   let currentRoutine = await createRoutine()
  //   await currentRoutine.setUser(Math.ceil(Math.random() * (userCount - 1)))
  // }

  // for (let i = 1; i <= intervalCount; i++) {
  //   let currentInterval = await createInterval()
  //   await currentInterval.setRoutine(
  //     Math.ceil(Math.random() * (routineCount - 1))
  //   )
  // }

  // for (let i = 1; i <= classCount; i++) {
  //   let currentClass = await createClass()
  //   await currentClass.setRoutine(Math.ceil(Math.random() * (routineCount - 1)))
  //   let randomLeaders = await User.findAll({
  //     where: {
  //       role: 'leader'
  //     }
  //   })
  //     .filter(leader => leader.id > 0)
  //     .map(leader => leader.id)
  //   await currentClass.setUser(
  //     randomLeaders[Math.floor(Math.random() * randomLeaders.length)]
  //   )
  // }

  // for (let i = 1; i < workoutCount; i++) {
  //   let currentWorkout = await createWorkout()
  //   await currentWorkout.setClass(Math.ceil(Math.random() * (classCount - 1)))
  //   await currentWorkout.setRoutine(
  //     Math.ceil(Math.random() * (routineCount - 1))
  //   )
  //   await currentWorkout.setUser(Math.ceil(Math.random() * (userCount - 1)))
  // }

  // for (let i = 1; i <= WorkoutTimestampCount; i++) {
  //   let currentTimeStamp = await createWorkoutstamp()
  //   await currentTimeStamp.setWorkout(
  //     Math.ceil(Math.random() * (workoutCount - 1))
  //   )
  // }

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

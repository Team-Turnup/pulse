const io = require('socket.io-client')

const socket = io('http://localhost:8080')
const user = {
  id: 105,
  role: 'follower',
  email: 'b@b.com',
  password: 'fd3ee990fe86b316e5a9ef14b7d39acad177a212d5fd7cc8cfaf19e39ba6b7d7',
  salt: 'OB9o52JPdxT581vc8xBrCA==',
  googleId: null,
  spotifyId: null,
  playlistGenrePrefs: null,
  playlistArtistPrefs: null,
  name: 'hdhdh',
  age: 4,
  gender: 'non-binary',
  height: 6,
  weight: 10,
  image: null
}
// socket.on('connect', () => {
//   console.log('Connected!')
// })

module.exports = {socket, user}

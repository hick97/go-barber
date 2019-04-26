const server = require('./server')

const port = process.env.PORT || 3000

server.listen(port, err => {
  if (err) {
    console.log('Error')
  } else {
    console.log('Server is running on port 3000...')
  }
})

const http = require('http')
const PORT = 4000

const requestHandler = (request, response) => {
  console.log(request.url)
  response.end('Hello Node.js Server!')
}

const server = http.createServer(requestHandler)

server.listen(PORT, (err) => {
  if (err) (console.log('something bad happened', err))

  console.log("Server listening on: http://localhost:%s", PORT);
})

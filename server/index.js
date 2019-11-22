const consola = require('consola')
const Hapi = require('@hapi/hapi')
const HapiNuxt = require('@nuxtjs/hapi')
const DateUtils = require('date-utils')
const fs = require('fs')

async function start () {
  const options = {
  	  key: fs.readFileSync('/etc/letsencrypt/live/z9n.net/privkey.pem')
  	, cert: fs.readFileSync('/etc/letsencrypt/live/z9n.net/cert.pem')
  	, ca: fs.readFileSync('/etc/letsencrypt/live/z9n.net/chain.pem')
  }

  const server = new Hapi.Server({
    port: process.env.PORT || 7777,
    tls: options
  })

  await server.register({
    plugin: HapiNuxt,
    options: {}
  })

  socket_start(server) // 추가
  await server.start()

  consola.ready({
    message: `Server running at: ${server.info.uri}`,
    badge: true
  })
}


// 추가
function socket_start(server) {
  const io = require('socket.io').listen(server.listener)
  const soc = io.of('/')
  soc.use(function(socket, next) {
    let userID = socket.handshake.query.user
    if(userID) {
      socket.join(userID)
    }
    else {
      socket.on('disconnect', function(){})
    }
    next()
  })

  server.route([
    {
      method: ['POST', 'GET'],
      path: '/log/{user}',
      handler: function (request, h) {
        var ip = request.headers['x-real-ip'] || request.info.remoteAddress
        var user = encodeURIComponent(request.params.user)
        var date = new Date().toFormat('YYYY-MM-DD HH24:MI:SS');
        var data = request.payload
        if(data == null) data = request.query
        var method = request.method

        var sendData = {sender: ip, date: date, method:method, data: data}
        soc.in(user).emit('log', JSON.stringify(sendData));
        return { result: true }
      },
      config: {
        cors: {
          origin: ['*'],
          additionalHeaders: ['cache-control', 'x-requested-with']
        }
      }
    }
  ])
}

process.on('unhandledRejection', error => consola.error(error))

start()

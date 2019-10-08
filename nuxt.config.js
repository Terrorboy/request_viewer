import bodyParser from 'body-parser'
require('dotenv').config()

module.exports = {
  mode: 'universal',
  env: {
    site_name: 'Z9N',
    site_url: 'https://www.z9n.net',
    server_host: process.env.HOST,
    server_port: process.env.PORT
  },
  /*
  ** Headers of the page
  */
  head: {
    title: 'Request Viewer',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,300i,400,400i,500,500i,600,600i,700,700i&amp;subset=latin-ext' },
      { rel: 'stylesheet', href: '/css/dashboard.css' },
      { rel: 'stylesheet', href: '/css/jquery.json-view.min.css' }
    ],
    script: [
        { src: '/js/jquery-3.2.1.min.js' },
        { src: '/js/core.js' },
        { src: '/js/bootstrap.bundle.min.js' },
        { src: '/js/pasteimage.js' },
        { src: '/js/html2canvas.min.js' },
        { src: '/js/jquery.json-view.min.js' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/socket.io.js'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
  ],

  serverMiddleware: [
    bodyParser.json()
  ],

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}

import path from 'path'
import fs from 'fs'

export default {
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'dev.key')),
      cert: fs.readFileSync(path.resolve(__dirname, 'dev.crt'))
    }
  },

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'hugword',
    mode: 'spa',
    target: 'static',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: ''},
      {name: 'apple-mobile-web-app-capable', content: 'yes'},
      {name: 'apple-touch-fullscreen', content: 'yes'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.png'}
    ]
  },

  // export default {
  //   router: {
  //     // extendRoutes(routes) {
  //     //   // routes.push({
  //     //   //   name: 'topic-topic',
  //     //   //   path: '/topic/:topic',
  //     //   //   component: '~/pages/index.vue'
  //     //   // });
  //     // }
  //   },
  // },


  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'custom',
        path: '*',
        component: resolve(__dirname, 'pages/404.vue')
      })
    }
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    {src: '~/assets/scss/index.scss', lang: 'scss'},
    'vue-image-lightbox/dist/vue-image-lightbox.min.css',
    'vue-select/src/scss/vue-select.scss'
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '~/plugins/core',
    '~/plugins/vendor',
    '~/plugins/core.client',
    '~/plugins/vendor.client',
    '~/plugins/route.client',
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/dotenv'
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    'cookie-universal-nuxt',
    ['nuxt-vuex-localstorage', {
      mode: 'debug', localStorage: ['local']
    }]
  ],

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    transpile: [
      'nuxt-vuex-localstorage'
    ],
  }
}

// export default {
module.exports = {
  publicRuntimeConfig: {
    /** @type {import('io/types').NuxtSocketIoRuntimeOptions} */
    io: {
      sockets: [
        {
          name: 'publicSocket',
          url: 'url1'
        }
      ]
    }
  },
  privateRuntimeConfig: {
    /** @type {import('io/types').NuxtSocketIoRuntimeOptions} */
    io: {
      sockets: [
        {
          name: 'privateSocket',
          url: 'url2'
        }
      ]
    }
  },
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: '%s | ' + 'MyLancer',
    title: 'Welcome',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1' },
      { hid: 'description', name: 'description', content: 'Mylancer' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/4.4.95/css/materialdesignicons.min.css' }
    ],
    script: [
      { src: "/js/jquery-3.4.1.min.js" },
      { src: "/js/jquery-migrate-3.1.0.min.js" },
      { src: "/js/mmenu.min.js" },
      { src: "/js/tippy.all.min.js" },
      { src: "/js/simplebar.min.js" },
      { src: "/js/bootstrap-slider.min.js" },
      { src: "/js/bootstrap-select.min.js" },
      { src: "/js/snackbar.js" },
      { src: "/js/clipboard.min.js" },
      { src: "/js/counterup.min.js" },
      { src: "/js/magnific-popup.min.js" },
      { src: "/js/slick.min.js" },
      { src: "/js/custom.js" },
      { src: "/js/my.js" },
      { src: "/js/RTCMultiConnection.min.js" },
      { src: "/js/socket.io.js" },
    ],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    // 'element-ui/lib/theme-chalk/index.css',
    '~/assets/sass/_variables.scss',
    '~/assets/sass/index.scss',
    'quill/dist/quill.snow.css',
    'quill/dist/quill.bubble.css',
    'quill/dist/quill.core.css'
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    // { src: '@/plugins/socket.client' },
    // { src: '@/plugins/vuetify' },
    // { src: '@/plugins/axios' },
    { src: '@/plugins/ckeditor', mode: 'client' },
    { src: '@/plugins/element-ui', mode: 'client' },
    { src: '@/plugins/extended-vue-beautiful-chat', mode: 'client' },
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://nuxtjs.org/blog/going-dark-with-nuxtjs-color-mode/
    '@nuxtjs/color-mode',
    // https://tailwindcss.com/docs/guides/nuxtjs
    '@nuxtjs/tailwindcss',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://github.com/nuxt-community/proxy-module
    '@nuxtjs/proxy',
    // https://dev.auth.nuxtjs.org/guide/setup/
    '@nuxtjs/auth-next',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://www.npmjs.com/package/nuxt-socket-io
    'nuxt-socket-io',
    // https://www.npmjs.com/package/nuxt-moment
    'nuxt-moment',
  ],

  /** @type {import('io/types').NuxtSocketIoOptions} */
  io: {
    sockets: [
      {
        name: 'home',
        url: 'http://localhost:3000',
        vuex: {
          mutations: [{ progress: 'examples/SET_PROGRESS' }],
          actions: [{ chatMessage: 'FORMAT_MESSAGE' }],
          emitBacks: [
            'examples/someObj',
            'examples/sample',
            { 'examples/sample2': 'sample2' },
            'titleFromUser'
          ]
        },
        namespaces: {
          '/index': {
            emitters: ['getMessage2 + testMsg --> message2Rxd'],
            listeners: ['chatMessage2', 'chatMessage3 --> message3Rxd']
          },
          '/examples': {
            emitBacks: ['sample3', 'sample4 <-- myObj.sample4'],
            emitters: [
              'reset] getProgress + refreshInfo --> progress [handleDone'
            ],
            listeners: ['progress']
          }
        }
      },
      {
        name: 'chat_messaging',
        url: 'http://localhost:3000',
        namespaces: {
          '/chat_messaging': {
            emitters: ['getMessage2 + testMsg --> message2Rxd'],
            listeners: ['chatMessage2', 'chatMessage3 --> message3Rxd']
          },

        }
      },
    ]
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    transpile: [/^element-ui/],
    extend(config, { isDev, isClient }) {
      // extend webpack config
    },
  },

  serverMiddleware: ['~/middleware/api/logger'],

  router: {
    middleware: ['auth'],
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'not-found',
        path: '*',
        component: resolve(__dirname, 'pages/errors/404.vue')
      })
      routes.push({
        path: '/sign-in',
        components: {
          default: resolve(__dirname, 'pages/auth/signin.vue'),
        },
      })
      routes.push({
        path: '/sign-up',
        components: {
          default: resolve(__dirname, 'pages/auth/signup.vue'),
        },
      })
      routes.push({
        path: '/new-freelancer',
        redirect: '/new-freelancer/skill-select'
      })
      routes.push({
        path: '/projects/:slug',
        components: {
          default: resolve(__dirname, 'pages/projects/_slug/details.vue'), // or routes[index].component
          // modal: resolve(__dirname, 'components/modal.vue')
        },
        // chunkNames: {
        //   modal: 'components/modal'
        // }
      })
    }
  },

  axios: {
    proxy: true
  },

  proxy: {
    '/api': 'http://localhost:8000',  // server
    '/mylancer_upload_cdn': {
      target: 'https://mylancer.nyc3.digitaloceanspaces.com/',
      pathRewrite: { '^/mylancer_upload_cdn': '/' }
    },
    '/server': {  // for example
      target: 'http://localhost:8000/api',
      pathRewrite: { '^/server': '/' }
    },
    '/main-socket': {  // for example
      target: 'http://localhost:3100',
      pathRewrite: { '^/main-socket': '/' }
    }
  },

  auth: {
    plugins: ['~/plugins/auth.js'],
    redirect: {
      login: '/sign-in',
      logout: '/',
      callback: '/',
      home: '/browse/projects'
    },
    strategies: {
      laravelJWT: {
        provider: 'laravel/jwt',
        url: '/api',
        endpoints: {
          login: {
            url: '/api/auth/login'
          },
          refresh: {
            url: '/api/auth/refresh'
          },
          logout: {
            url: '/api/auth/logout'
          },
          user: {
            url: '/api/auth/user'
          }
        },
        token: {
          property: 'access_token',
          maxAge: 600 * 60
        },
        refreshToken: {
          maxAge: 201600 * 60
        },
      },
    }
  },
  telemetry: false,
  server: {
    port: 3030 // default: 3000
  }
}

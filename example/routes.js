module.exports = {

  '/inbox': {

    component: require('./components/inbox/index.vue'),
    alwaysRefresh: true,

    before: function (to, from) {
      console.log('before')
      console.log(to.path, from && from.path)
      if (from && from.path === '/about') {
        alert('not allowed')
        return false
      }
    },

    after: function (to, from) {
      console.log('after')
      console.log(to.path, from && from.path)
    },

    subRoutes: {
      '/message/:messageId': {
        component: require('./components/inbox/message.vue'),
        data: function (route) {
          return new Promise(function (resolve, reject) {
            setTimeout(function () {
              resolve({
                id: route.params.messageId
              })
            }, 1000)
          })
        }
      },
      '/archived': {
        component: require('./components/inbox/archive.vue')
      }
    }
  },

  '/user/:userId': {
    component: require('./components/user/index.vue'),
    subRoutes: {
      'profile/:something': {
        component: require('./components/user/profile.vue')
      },
      'posts': {
        component: require('./components/user/posts.vue')
      },
      'settings': {
        component: require('./components/user/settings.vue')
      }
    }
  },

  '/about': {
    component: require('./components/about.vue')
  },

  '/named': {
    namedViews: {
      a: {
        component: require('./components/named/a.vue')
      },
      b: {
        component: require('./components/named/b.vue')
      }
    }
  },

  '*': {
    component: require('./components/not-found.vue')
  }
}

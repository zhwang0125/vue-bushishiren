import Vue from 'vue'
import Router from 'vue-router'
import { fromNow, idToFromNow, idToDay } from './filters'
import App from './App.vue'
import signin from './views/signin.vue'
import signup from './views/signup.vue'

import poems from './views/poems.vue'
import poem from './views/poem.vue'
import poemCreate from './views/poem-create.vue'
import poemEdit from './views/poem-edit.vue'

import poetries from './views/poetries.vue'
import poetry from './views/poetry.vue'
import poetryCreate from './views/poetry-create.vue'
import poetryEdit from './views/poetry-edit.vue'

import users from './views/users.vue'
import userEdit from './views/user-edit.vue'
import userPoems from './views/user-poems.vue'
import userPoetries from './views/user-poetries.vue'
import userGroups from './views/user-groups.vue'
import userArchive from './views/user-archive.vue'
import userMessages from './views/user-messages.vue'

import groups from './views/groups.vue'
import group from './views/group.vue'
import groupCreate from './views/group-create.vue'
import groupEdit from './views/group-edit.vue'

import announcements from './views/announcements.vue'

import messageCreate from './views/message-create.vue'

Vue.use(Router)

Vue.filter('fromNow', fromNow)
Vue.filter('idToFromNow', idToFromNow)
Vue.filter('idToDay', idToDay)

var router = new Router()

router.map({
  '/': {
    component: poems
  },
  '/signin': {
    component: signin
  },
  '/signup': {
    component: signup
  },
  '/poems': {
    component: poems,
    subRoutes: {
    }
  },
  '/poems/create': {
    auth: true,
    component: poemCreate
  },
  '/poems/:poemId': {
    component: poem
  },
  '/poems/:poemId/edit': {
    auth: true,
    component: poemEdit
  },
  '/poetries': {
    component: poetries,
    // subRoutes: {
    //   '/:poemId': {
    //     component: poem
    //   },
    // }
  },
  '/poetries/create': {
    auth: true,
    component: poetryCreate
  },
  '/poetries/:poetryId': {
    component: poetry
  },
  '/poetries/:poetryId/edit': {
    component: poetryEdit
  },
  '/users': {
    component: users,
    // subRoutes: {
    //   '/:uid': {
    //     component: user
    //   }
    // }
  },
  '/users/:uid': {
    component: userPoems,
    // subRoutes: {
    //   'poems': {
    //     component: userPoems
    //   },
    //   'poetries': {
    //     component: userPoetries
    //   },
    //   '/groups': {
    //     component: userGroups
    //   },
    //   '/archive': {
    //     component: userArchive
    //   },
    // }
  },
  '/users/:uid/poems': {
    component: userPoems
  },
  '/users/:uid/poetries': {
    component: userPoetries
  },
  '/users/:uid/groups': {
    component: userGroups
  },
  '/users/:uid/archive': {
    component: userArchive
  },
  '/users/:uid/edit': {
    auth: true,
    component: userEdit
  },
  '/users/:uid/messages': {
    auth: true,
    component: userMessages
  },
  '/users/:uid/message': {
    auth: true,
    component: messageCreate
  },
  '/groups': {
    component: groups
  },
  '/groups/create': {
    auth: true,
    component: groupCreate
  },
  '/groups/:groupId': {
    component: group
  },
  '/groups/:groupId/edit': {
    auth: true,
    component: groupEdit
  },
  '/announcements': {
    component: announcements
  },
})

router.beforeEach(transition => {
  if (transition.to.auth) {
    if (localStorage.uid) {
      transition.next()
    } else {
      var redirect = encodeURIComponent(transition.to.path)
      transition.redirect('/signin?redirect=' + redirect)
    }
  } else {
    transition.next()
  }
  window.scrollTo(0, 0)
})

router.redirect({
  '*': '/'
})

router.start(App, '#app')

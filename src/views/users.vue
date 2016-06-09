<template>
  <div class="v-users">
    <nav-menu></nav-menu>
    <user-setting-menu></user-setting-menu>
    <div v-for="user in users">
      <user :user="user"></user>
    </div>
  </div>
</div>
</template>

<style lang="stylus">
@import "../variables.styl"

.v-users
  width $width
  margin 0 auto
</style>

<script>
import API from '../services/API'
import LoadMore from '../mixins/LoadMore'

export default {
  mixins: [LoadMore],
  data() {
    return {
      users: []
    }
  },
  route: {
    data() {
      return {
        users: API.getUserList()
      }
    }
  },
  methods: {
    loadMore: function () {
      const users = this.users
      const limit = 20
      if (!users.length) return
      return API.getUserList(limit, users[users.length - 1]._id).then(_users => {
        this.users = users.concat(_users)
        if (_users.length === limit) {
          this.loading = false
        }
      })
    }
  },
  components: {
    'UserSettingMenu': require('../components/User-Setting-Menu.vue'),
    'NavMenu': require('../components/Nav-Menu.vue'),
    'User': require('../components/User.vue')
  }
}
</script>

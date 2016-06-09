<template>
  <div class="v-group">
    <nav-menu></nav-menu>
    <user-setting-menu></user-setting-menu>
    <group :group="group"></group>
  </div>
</div>
</template>

<style lang="stylus">

</style>

<script>
import API from '../services/API'
import User from '../mixins/User'

export default {
  mixins: [User],
  data() {
    return {
      group: {
        _id: ''
      }
    }
  },
  route: {
    data() {
      const groupId = this.$route.params.groupId
      return {
        group: API.getGroup(groupId)
      }
    }
  },
  methods: {
  },
  events: {
    // 'Group:delete': function () {
    //   return this.redirect.call(this)
    // }
  },
  components: {
    'UserSettingMenu': require('../components/User-Setting-Menu.vue'),
    'NavMenu': require('../components/Nav-Menu.vue'),
    'Group': require('../components/Group.vue')
  }
}
</script>
<template>
  <div class="v-groups">
    <nav-menu></nav-menu>
    <user-setting-menu></user-setting-menu>
    <div v-for="group in groups">
      <group :group="group"></poetry>
    </div>
  </div>
</div>
</template>

<style lang="stylus">

</style>

<script>
import API from '../services/API'
import LoadMore from '../mixins/LoadMore'

export default {
  mixins: [LoadMore],
  data() {
    return {
      groups: []
    }
  },
  route: {
    data() {
      return {
        groups: API.getGroups()
      }
    }
  },
  methods: {
    loadMore: function () {
      const groups = this.groups
      const limit = 20
      if (!groups.length) return
      return API.getGroups(null, limit, groups[groups.length - 1]._id).then(_groups => {
        this.groups = groups.concat(_groups)
        if (_groups.length === limit) {
          this.loading = false
        }
      })
    }
  },
  components: {
    'UserSettingMenu': require('../components/User-Setting-Menu.vue'),
    'NavMenu': require('../components/Nav-Menu.vue'),
    'Group': require('../components/Group.vue')
  }
}
</script>
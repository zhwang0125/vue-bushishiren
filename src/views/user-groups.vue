<template>
  <div class="v-user-groups">
    <nav-menu></nav-menu>
    <user-setting-menu></user-setting-menu>
    <div v-for="group in groups">
      <group :group="group.group"></group>
    </div>
    <user-side-menu :user="user"></user-side-menu>
  </div>
</template>

<script>
import API from '../services/API'
import LoadMore from '../mixins/LoadMore'

export default {
  mixins: [LoadMore],
  data() {
    return {
      user: {},
      groups: []
    }
  },
  route: {
    data() {
      const uid = this.$route.params.uid
      return {
        user: API.getUser(uid),
        groups: API.getGroups(uid)
      }
    }
  },
  methods: {
    loadMore: function () {
      const uid = this.$route.params.uid
      const groups = this.groups
      const limit = 20
      if (!groups.length) return
      return API.getGroups(uid, limit, groups[groups.length - 1]._id).then(_groups => {
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
    'Group': require('../components/Group.vue'),
    'UserSideMenu': require('../components/User-Side-Menu.vue')
  }
}
</script>

<style lang="stylus">
@import "../variables.styl"

.v-user-groups
  width $width
  margin 0 auto
  .photo
    width 100%
  .title a
    color #000 !important
  .avatar
    border-radius 3px
    width 64px
    height 64px
    box-shadow  0 1px 2px #aaa
    float right
  .tag
    font-family $menuFont
    font-size 13px
    margin-right 5px
    color #999
    &.right
      float right
      margin-right 0
      a
        color #999
.sideMenu
  width $width
  margin 0 auto
  position fixed
  top 127px
  z-index -1
</style>

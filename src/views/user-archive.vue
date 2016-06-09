<template>
  <div class="v-user-archive">
    <nav-menu></nav-menu>
    <user-setting-menu></user-setting-menu>
    <user-archive :poems="poems"></user-archive>
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
      poems: []
    }
  },
  route: {
    data() {
      const uid = this.$route.params.uid
      return {
        user: API.getUser(uid),
        poems: API.getPoems(uid, 50)
      }
    }
  },
  methods: {
    loadMore: function () {
      const uid = this.$route.params.uid
      const poems = this.poems
      const limit = 50
      if (!poems.length) return
      return API.getPoems(uid, limit, poems[poems.length - 1]._id).then(_poems => {
        this.poems = poems.concat(_poems)
        if (_poems.length === limit) {
          this.loading = false
        }
      })
    }
  },
  components: {
    'UserSettingMenu': require('../components/User-Setting-Menu.vue'),
    'NavMenu': require('../components/Nav-Menu.vue'),
    'UserArchive': require('../components/User-Archive.vue'),
    'UserSideMenu': require('../components/User-Side-Menu.vue')
  }
}
</script>

<style lang="stylus">
@import "../variables.styl"

.v-user-archive
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

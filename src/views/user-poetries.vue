<template>
  <div class="v-user-poetries">
    <nav-menu></nav-menu>
    <user-setting-menu></user-setting-menu>
    <div v-for="poetry in poetries">
      <poetry :poetry="poetry"></poetry>
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
      poetries: []
    }
  },
  route: {
    data() {
      const uid = this.$route.params.uid
      return {
        user: API.getUser(uid),
        poetries: API.getPoetries(uid)
      }
    }
  },
  methods: {
    loadMore: function () {
      const uid = this.$route.params.uid
      const poetries = this.poetries
      const limit = 20
      if (!poetries.length) return
      return API.getPoetries(uid, limit, poetries[poetries.length - 1]._id).then(_poetries => {
        this.poetries = poetries.concat(_poetries)
        if (_poetries.length === limit) {
          this.loading = false
        }
      })
    }
  },
  components: {
    'UserSettingMenu': require('../components/User-Setting-Menu.vue'),
    'NavMenu': require('../components/Nav-Menu.vue'),
    'Poetry': require('../components/Poetry.vue'),
    'UserSideMenu': require('../components/User-Side-Menu.vue')
  }
}
</script>

<style lang="stylus">
@import "../variables.styl"

.v-user-poetries
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

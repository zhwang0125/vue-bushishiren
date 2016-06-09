<template>
  <div class="v-poetries">
    <nav-menu></nav-menu>
    <user-setting-menu></user-setting-menu>
    <div v-for="poetry in poetries">
      <poetry :poetry="poetry"></poetry>
    </div>
  </div>
</div>
</template>

<style lang="stylus">

</style>

<script>
import API from '../services/API'
import User from '../mixins/User'
import LoadMore from '../mixins/LoadMore'

export default {
  mixins: [User, LoadMore],
  data() {
    return {
      poetries: []
    }
  },
  route: {
    data() {
      return {
        poetries: API.getPoetries()
      }
    }
  },
  methods: {
    loadMore: function () {
      const poetries = this.poetries
      const limit = 20
      if (!poetries.length) return
      return API.getPoetries(null, limit, poetries[poetries.length - 1]._id).then(_poetries => {
        this.poetries = poetries.concat(_poetries)
        if (_poetries.length === limit) {
          this.loading = false
        }
      })
    }
  },
  events: {
    'Poetry:delete': function (poetryId) {
      this.poetries = this.poetries.filter(poetry => {
        return poetry._id !== poetryId
      })
    }
  },
  components: {
    'UserSettingMenu': require('../components/User-Setting-Menu.vue'),
    'NavMenu': require('../components/Nav-Menu.vue'),
    'Poetry': require('../components/Poetry.vue')
  }
}
</script>
<template>
  <div class="v-poems">
    <nav-menu></nav-menu>
    <user-setting-menu></user-setting-menu>
    <div v-for="poem in poems">
      <poem :poem="poem" :poetries="poetries"></poem>
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
      poems: [],
      poetries: []
    }
  },
  route: {
    data() {
      return {
        poems: API.getPoems(),
        poetries: this.uid ? API.getPoetries(this.uid) : []
      }
    }
  },
  methods: {
    loadMore: function () {
      const poems = this.poems
      const limit = 20
      if (!poems.length) return
      return API.getPoems(null, limit, poems[poems.length - 1]._id).then(_poems => {
        this.poems = poems.concat(_poems)
        if (_poems.length === limit) {
          this.loading = false
        }
      })
    }
  },
  events: {
    'Poem:delete': function (poemId) {
      this.poems = this.poems.filter(poem => {
        return poem._id !== poemId
      })
    }
  },
  components: {
    'UserSettingMenu': require('../components/User-Setting-Menu.vue'),
    'NavMenu': require('../components/Nav-Menu.vue'),
    'Poem': require('../components/Poem.vue'),
  }
}
</script>
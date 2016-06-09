<template>
  <div class="v-announcements">
    <nav-menu></nav-menu>
    <user-setting-menu></user-setting-menu>
    <div v-for="announcement in announcements">
      <announcement :announcement="announcement"></announcement>
    </div>
  </div>
</template>

<script>
import API from '../services/API'
import LoadMore from '../mixins/LoadMore'

export default {
  mixins: [LoadMore],
  data() {
    return {
      announcements: []
    }
  },
  route: {
    data() {
      return {
        announcements: API.getAnnouncements()
      }
    }
  },
  methods: {
    loadMore: function () {
      const announcements = this.announcements
      const limit = 20
      if (!announcements.length) return
      return API.getAnnouncements(limit, announcements[announcements.length - 1]._id).then(_announcements => {
        this.announcements = announcements.concat(_announcements)
        if (_announcements.length === limit) {
          this.loading = false
        }
      })
    }
  },
  components: {
    'UserSettingMenu': require('../components/User-Setting-Menu.vue'),
    'NavMenu': require('../components/Nav-Menu.vue'),
    'Announcement': require('../components/Announcement.vue'),
  }
}
</script>

<style lang="stylus">
</style>

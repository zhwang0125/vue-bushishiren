
export default {
  methods: {
    redirect: function (path) {
      if (path) {
        this.$route.router.go({
          path: path,
          force: true
        })
        return
      }
      const _currentTransition = this.$route.router._currentTransition;
      if (_currentTransition && _currentTransition.from && _currentTransition.from.path
        && !(_currentTransition.from.path.match('^\/sign'))) {
        this.$route.router.go(_currentTransition.from.path)
      } else {
        this.$route.router.go('/')
      }
    }
  }  
}


export default {
  computed: {
    uid: function () {
      return localStorage.uid
    },
    name: function () {
      return localStorage.name
    },
    avatar: function () {
      return localStorage.avatar
    },
    token: function () {
      return localStorage.token
    }
  }  
}

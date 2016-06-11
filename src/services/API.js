import { Promise } from 'es6-promise'

const API = {}
const URL = API.URL = 'http://115.28.53.197:3000'

export default API

API.ajaxSetup = function () {
  $.ajaxSetup({
    headers: {
      Authorization: localStorage.token,
      dataType: 'json'
    }
  })
}
API.ajaxSetup()

API.signin = (mobile, password) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'POST',
      url: `${URL}/signin`,
      data: {
        mobile: mobile,
        password: password
      },
      success: function (res) {
        toastr.success('登录成功')
        resolve(res.data)
      },
      error: function (err) {
        toastr.error(err.responseJSON && err.responseJSON.message)
        reject(err)
      }
    })
  })
}

API.signup = (mobile, password, repassword) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'POST',
      url: `${URL}/signup`,
      data: {
        mobile: mobile,
        password: password,
        repassword: repassword
      },
      success: function (res) {
        toastr.success('注册成功')
        resolve(res.data)
      },
      error: function (err) {
        toastr.error(err.responseJSON && err.responseJSON.message)
        reject(err)
      }
    })
  })
}

API.getPoems = (uid, limit, lastId) => {
  uid = uid || ''
  limit = limit || 20
  lastId = lastId || ''
  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'GET',
      url: `${URL}/poems/?uid=${uid}&limit=${limit}&lastId=${lastId}`,
      success: function (res) {
        resolve(res.data)
      },
      error: function (err) {
        toastr.error(err.responseJSON && err.responseJSON.message)
        reject(err)
      }
    })
  })
}

API.getPoem = (poemId) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'GET',
      url: `${URL}/poems/${poemId}`,
      success: function (res) {
        resolve(res.data)
      },
      error: function (err) {
        toastr.error(err.responseJSON && err.responseJSON.message)
        reject(err)
      }
    })
  })
}

API.getPoetries = (uid, limit, lastId) => {
  uid = uid || ''
  limit = limit || 20
  lastId = lastId || ''
  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'GET',
      url: `${URL}/poetries/?uid=${uid}&limit=${limit}&lastId=${lastId}`,
      success: function (res) {
        resolve(res.data)
      },
      error: function (err) {
        toastr.error(err.responseJSON && err.responseJSON.message)
        reject(err)
      }
    })
  })
}

API.getPoetry = (poetryId) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'GET',
      url: `${URL}/poetries/${poetryId}`,
      success: function (res) {
        resolve(res.data)
      },
      error: function (err) {
        toastr.error(err.responseJSON && err.responseJSON.message)
        reject(err)
      }
    })
  })
}

API.getPoemsByPoetryId = (poetryId, limit, lastId) => {
  limit = limit || 200
  lastId = lastId || ''
  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'GET',
      url: `${URL}/poetries/${poetryId}/poems?limit=${limit}&lastId=${lastId}`,
      success: function (res) {
        resolve(res.data)
      },
      error: function (err) {
        toastr.error(err.responseJSON && err.responseJSON.message)
        reject(err)
      }
    })
  })
}

API.getCommentsByPoemId = (poemId) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'GET',
      url: `${URL}/poems/${poemId}/comments`,
      success: function (res) {
        resolve(res.data)
      },
      error: function (err) {
        toastr.error(err.responseJSON && err.responseJSON.message)
        reject(err)
      }
    })
  })
}

API.getCommentsByPoetryId = (poetryId) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'GET',
      url: `${URL}/poetries/${poetryId}/comments`,
      success: function (res) {
        resolve(res.data)
      },
      error: function (err) {
        toastr.error(err.responseJSON && err.responseJSON.message)
        reject(err)
      }
    })
  })
}

API.getUsers = (limit, lastId) => {
  limit = limit || 20
  lastId = lastId || ''
  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'GET',
      url: `${URL}/users?limit=${limit}&lastId=${lastId}`,
      success: function (res) {
        resolve(res.data)
      },
      error: function (err) {
        toastr.error(err.responseJSON && err.responseJSON.message)
        reject(err)
      }
    })
  })
}

API.getUserList = (limit, lastId) => {
  limit = limit || 20
  lastId = lastId || ''
  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'GET',
      url: `${URL}/users/list?limit=${limit}&lastId=${lastId}`,
      success: function (res) {
        resolve(res.data)
      },
      error: function (err) {
        toastr.error(err.responseJSON && err.responseJSON.message)
        reject(err)
      }
    })
  })
}

API.getUser = (uid) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'GET',
      url: `${URL}/users/${uid}`,
      success: function (res) {
        resolve(res.data)
      },
      error: function (err) {
        toastr.error(err.responseJSON && err.responseJSON.message)
        reject(err)
      }
    })
  })
}

API.updateUser = (uid, payload) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'POST',
      url: `${URL}/users/${uid}`,
      data: payload,
      success: function (res) {
        toastr.success('修改成功')
        resolve(res.data)
      },
      error: function (err) {
        toastr.error(err.responseJSON && err.responseJSON.message)
        reject(err)
      }
    })
  })
}

API.getGroups = (uid, limit, lastId) => {
  uid = uid || ''
  limit = limit || 20
  lastId = lastId || ''
  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'GET',
      url: `${URL}/groups?uid=${uid}&limit=${limit}&lastId=${lastId}`,
      success: function (res) {
        resolve(res.data)
      },
      error: function (err) {
        toastr.error(err.responseJSON && err.responseJSON.message)
        reject(err)
      }
    })
  })
}

API.getGroup = (groupId) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'GET',
      url: `${URL}/groups/${groupId}`,
      success: function (res) {
        resolve(res.data)
      },
      error: function (err) {
        toastr.error(err.responseJSON && err.responseJSON.message)
        reject(err)
      }
    })
  })
}

API.getAnnouncements = (limit, lastId) => {
  limit = limit || 20
  lastId = lastId || ''
  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'GET',
      url: `${URL}/announcements?limit=${limit}&lastId=${lastId}`,
      success: function (res) {
        resolve(res.data)
      },
      error: function (err) {
        toastr.error(err.responseJSON && err.responseJSON.message)
        reject(err)
      }
    })
  })
}

API.upload = (payload) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'POST',
      url: `${URL}/qiniu`,
      processData: false,
      contentType: false,
      data: payload,
      success: function (res) {
        resolve(res.data)
      },
      error: function (err) {
        toastr.error(err.responseJSON && err.responseJSON.message)
        reject(err)
      }
    })
  })
}

API.createPoem = (payload) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'POST',
      url: `${URL}/poems`,
      data: payload,
      success: function (res) {
        toastr.success('发布成功')
        resolve(res.data)
      },
      error: function (err) {
        toastr.error(err.responseJSON && err.responseJSON.message)
        reject(err)
      }
    })
  })
}

API.updatePoem = (poemId, payload) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'POST',
      url: `${URL}/poems/${poemId}`,
      data: payload,
      success: function (res) {
        toastr.success('修改成功')
        resolve(res.data)
      },
      error: function (err) {
        toastr.error(err.responseJSON && err.responseJSON.message)
        reject(err)
      }
    })
  })
}

API.deletePoem = (poemId) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'DELETE',
      url: `${URL}/poems/${poemId}`,
      success: function (res) {
        toastr.success('删除成功')
        resolve(res.data)
      },
      error: function (err) {
        toastr.error(err.responseJSON && err.responseJSON.message)
        reject(err)
      }
    })
  })
}

API.createPoetry = (payload) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'POST',
      url: `${URL}/poetries`,
      data: payload,
      success: function (res) {
        toastr.success('创建成功')
        resolve(res.data)
      },
      error: function (err) {
        toastr.error(err.responseJSON && err.responseJSON.message)
        reject(err)
      }
    })
  })
}

API.updatePoetry = (poetryId, payload) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'POST',
      url: `${URL}/poetries/${poetryId}`,
      data: payload,
      success: function (res) {
        toastr.success('修改成功')
        resolve(res.data)
      },
      error: function (err) {
        toastr.error(err.responseJSON && err.responseJSON.message)
        reject(err)
      }
    })
  })
}

API.deletePoetry = (poetryId) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'DELETE',
      url: `${URL}/poetries/${poetryId}`,
      success: function (res) {
        toastr.success('删除成功')
        resolve(res.data)
      },
      error: function (err) {
        toastr.error(err.responseJSON && err.responseJSON.message)
        reject(err)
      }
    })
  })
}

API.createGroup = (payload) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'POST',
      url: `${URL}/groups`,
      data: payload,
      success: function (res) {
        toastr.success('创建成功')
        resolve(res.data)
      },
      error: function (err) {
        toastr.error(err.responseJSON && err.responseJSON.message)
        reject(err)
      }
    })
  })
}

API.updateGroup = (groupId, payload) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'POST',
      url: `${URL}/groups/${groupId}`,
      data: payload,
      success: function (res) {
        toastr.success('修改成功')
        resolve(res.data)
      },
      error: function (err) {
        toastr.error(err.responseJSON && err.responseJSON.message)
        reject(err)
      }
    })
  })
}

API.addPoemToPoetry = (poemId, poetryId) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'POST',
      url: `${URL}/poems/${poemId}/collect`,
      data: { poetry: poetryId },
      success: function (res) {
        toastr.success('收藏成功')
        resolve(res.data)
      },
      error: function (err) {
        toastr.error(err.responseJSON && err.responseJSON.message)
        reject(err)
      }
    })
  })
}

API.removePoemFromPoetry = (poemId, poetryId) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'POST',
      url: `${URL}/poems/${poemId}/cancelCollect`,
      data: { poetry: poetryId },
      success: function (res) {
        toastr.success('移除成功')
        resolve(res.data)
      },
      error: function (err) {
        toastr.error(err.responseJSON && err.responseJSON.message)
        reject(err)
      }
    })
  })
}

API.recommend = (type, id) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'POST',
      url: `${URL}/recommend`,
      data: {
        type: type,
        id: id
      },
      success: function (res) {
        toastr.success('推荐成功')
        resolve(res.data)
      },
      error: function (err) {
        toastr.error(err.responseJSON && err.responseJSON.message)
        reject(err)
      }
    })
  })
}

API.createComment = (payload) => {
  let url;
  if (payload.type == 'poem') {
    url = `${URL}/poems/${payload.refe}/comments`
  }
  if (payload.type == 'poetry') {
    url = `${URL}/poetries/${payload.refe}/comments`
  }
  if (!payload.reply) {
    delete payload.reply
  }
  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'POST',
      url: url,
      data: payload,
      success: function (res) {
        toastr.success('留言成功')
        resolve(res.data)
      },
      error: function (err) {
        toastr.error(err.responseJSON && err.responseJSON.message)
        reject(err)
      }
    })
  })
}

API.deleteComment = (commentId) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'DELETE',
      url: `${URL}/comments/${commentId}`,
      success: function (res) {
        toastr.success('删除成功')
        resolve(res.data)
      },
      error: function (err) {
        toastr.error(err.responseJSON && err.responseJSON.message)
        reject(err)
      }
    })
  })
}

API.report = (type, refe, reason) => {
  reason = reason || 'other'
  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'POST',
      url: `${URL}/reports`,
      data: {
        type: type,
        refe: refe,
        reason: reason
      },
      success: function (res) {
        toastr.success('举报成功')
        resolve(res.data)
      },
      error: function (err) {
        toastr.error(err.responseJSON && err.responseJSON.message)
        reject(err)
      }
    })
  })
}

API.followUser = (to) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'POST',
      url: `${URL}/users/${to}/follow`,
      success: function (res) {
        toastr.success('关注成功')
        resolve(res.data)
      },
      error: function (err) {
        toastr.error(err.responseJSON && err.responseJSON.message)
        reject(err)
      }
    })
  })
}

API.unfollowUser = (to) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'POST',
      url: `${URL}/users/${to}/unfollow`,
      success: function (res) {
        toastr.success('取消关注成功')
        resolve(res.data)
      },
      error: function (err) {
        toastr.error(err.responseJSON && err.responseJSON.message)
        reject(err)
      }
    })
  })
}

API.createMessage = (to, content) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'POST',
      url: `${URL}/messages`,
      data: {
        to: to,
        content: content
      },
      success: function (res) {
        toastr.success('发送私信成功')
        resolve(res.data)
      },
      error: function (err) {
        toastr.error(err.responseJSON && err.responseJSON.message)
        reject(err)
      }
    })
  })
}

API.getMessages = (limit, lastId) => {
  limit = limit || 20
  lastId = lastId || ''
  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'GET',
      url: `${URL}/messages?limit=${limit}&lastId=${lastId}`,
      success: function (res) {
        resolve(res.data)
      },
      error: function (err) {
        toastr.error(err.responseJSON && err.responseJSON.message)
        reject(err)
      }
    })
  })
}

API.deleteMessage = (messageId) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'DELETE',
      url: `${URL}/messages/${messageId}`,
      success: function (res) {
        toastr.success('删除私信成功')
        resolve(res.data)
      },
      error: function (err) {
        toastr.error(err.responseJSON && err.responseJSON.message)
        reject(err)
      }
    })
  })
}
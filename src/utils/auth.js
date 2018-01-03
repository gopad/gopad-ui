import router from '../router'

const LOGIN_URL = '/auth/login'
const LOGOUT_URL = '/auth/logout'

export default {
  user: {
    authenticated: false
  },

  login (context, creds, redirect) {
    context.$http.post(LOGIN_URL, creds, (data) => {
      localStorage.setItem('token', data.token)
      this.user.authenticated = true

      if (redirect) {
        router.go(redirect)
      }
    }).error((err) => {
      context.error = err
    })
  },

  logout (context) {
    context.$http.get(LOGOUT_URL, (data) => {
      localStorage.removeItem('token')
      this.user.authenticated = false
    }).error((err) => {
      context.error = err
    })
  },

  check (context) {
    var jwt = localStorage.getItem('token')

    if (jwt) {
      this.user.authenticated = true
    } else {
      this.user.authenticated = false
    }
  },

  header (context) {
    return {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  }
}

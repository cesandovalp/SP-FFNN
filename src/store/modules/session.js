import * as firebase from 'firebase'
import * as constants from '@/store/constants'

const state = {
  user: {
    name          : '',
    email         : '',
    emailVerified : '',
    photoURL      : '',
    isAnonymous   : '',
    uid           : ''
  },
  error: {}
}

const actions = {
  [constants.SESSION_SIGN_IN]: ({commit}, data) => {
    firebase.auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then( user => {
        commit(constants.SESSION_SET_USER, user)
        commit(constants.SESSION_SET_ERROR, {})
      })
      .catch(error => {
        console.error(error)
        commit(constants.SESSION_SET_ERROR, error)
      })
  },
  [constants.SESSION_SIGN_OUT]: ({commit}) => {
    firebase.auth()
      .signOut()
      .then( response => {
        commit(constants.SESSION_SET_USER, false)
        commit(constants.SESSION_SET_ERROR, {})
      })
      .catch(error => {
        console.error(error)
        commit(constants.SESSION_SET_ERROR, error)
      })
  },
  [constants.SESSION_AUTH_CHANGES]: ({commit}) => {
    firebase.auth()
      .onAuthStateChanged ( user => {
        commit(constants.SESSION_SET_USER, user)
      })
  }
}

const mutations = {
  [constants.SESSION_SET_USER]: (state, user) => {
    if(user) {
      state.user.name          = user.displayName
      state.user.email         = user.email
      state.user.emailVerified = user.emailVerified
      state.user.photoURL      = user.photoURL
      state.user.isAnonymous   = user.isAnonymous
      state.user.uid           = user.uid
    } else {
      state.user.name          = ''
      state.user.email         = ''
      state.user.emailVerified = ''
      state.user.photoURL      = ''
      state.user.isAnonymous   = ''
      state.user.uid           = ''
    }
  },
  [constants.SESSION_SET_ERROR]: (state, error) => {
    state.error = error
  }
}

const getters = {
  [constants.SESSION_IS_LOGGED]: state => {
    return state.user.email !== ''
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}

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
}

const mutations = {
}

const getters = {
}

export default {
  state,
  actions,
  mutations,
  getters
}

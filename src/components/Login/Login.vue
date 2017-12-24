<template>
  <div class="container_time">
    <form v-if="!isLogged()" style="width:50%; padding:5%;">
      <div class="form-group">
        <label for="email">Correo</label>
        <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" v-model="email">
        <small id="emailHelp" class="form-text text-muted">No compartirémos tu correo con nadie más.</small>
      </div>
      <div class="form-group">
        <label for="password">Contraseña</label>
        <input type="password" class="form-control" id="password" placeholder="Password" v-model="password">
      </div>
      <button type="button" class="btn btn-primary" @click="login">Iniciar sesión</button>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import * as constants from '@/store/constants'

export default {
  data () {
    return {
      email: '',
      password: ''

    }
  },
  methods: {
    ...mapActions({
      signIn: constants.SESSION_SIGN_IN
    }),
    login () {
      this.signIn({ email: this.email, password: this.password })
    },
    ...mapGetters({
      isLogged: constants.SESSION_IS_LOGGED
    })
  }
}
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light" style="background-color:#000 !important; color:#fff !important;">
    <a class="navbar-brand" style="color:#fff !important; padding-left: 1%; padding-right: 6%;" href="#">SP FFNN</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent" style="background:#000 !important; color:#fff !important;">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link class="nav-link" :to="{ name: 'Home' }" style="color:#fff !important;">HOME</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{ name: 'Examples' }" style="color:#fff !important;">EXAMPLES</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{ name: 'Custom' }" style="color:#fff !important;">CUSTOM</router-link>
        </li>
        <li class="nav-item" v-if="isLogged()">
          <router-link class="nav-link" :to="{ name: 'MyData' }" style="color:#fff !important;">MY DATASETS</router-link>
        </li>
        <li class="nav-item" v-if="isLogged()">
          <a class="nav-link" href="javascript:void(0)" @click="logout" style="color:#fff !important;">LOGOUT</a>
        </li>
        <li class="nav-item" v-else>
          <router-link class="nav-link" :to="{ name: 'Login' }" style="color:#fff !important;">LOGIN</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import * as constants from '@/store/constants'

export default {
  methods: {
    ...mapActions({
         logout: constants.SESSION_SIGN_OUT
    }),
    ...mapGetters({
      isLogged: constants.SESSION_IS_LOGGED
    })
  }
}
</script>

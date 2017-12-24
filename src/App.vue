<template>
  <div id="app">
    <top-menu class="container-fluid"></top-menu>
    <router-view class="container"/>
    <Footer></Footer>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import * as constants from '@/store/constants'

import TopMenu from '@/components/TopMenu/TopMenu'
import Footer from '@/components/Footer/Footer'

export default {
  name: 'app',
  created () {
    this.authChanged()
  },
  methods:{
    ...mapActions({
      authChanged: constants.SESSION_AUTH_CHANGES
    })
  },
  components: {
    TopMenu,
    Footer
  },
  mounted() {
     document.body.style.background = "#f0f0f0"; 
  }
}
</script>

<style lang="scss">
@import "./styles/custom.scss";
@import "../node_modules/bootstrap/scss/bootstrap.scss";
</style>

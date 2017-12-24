<template>
  <div class="footer" style="background:#000; color:#fff !important;"">
    <div style="float:left; width:25%; text-align: left; padding: 1%;">
    </div>
    <div style="float:left; width:50%; padding: 1%;">© Cristian Sandoval-Pineda</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import * as constants from '@/store/constants'

export default {
  methods: {
    ...mapGetters({
      isLogged: constants.SESSION_IS_LOGGED
    })
  }
}
</script>

<template>
  <div class="aboutwrapper" v-bind:aboutState="aboutState" v-if="aboutState">
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      aboutState: false
    }
  },
  computed: {
    ...mapState({
      navName: 'navName'
    }),
    charactersState () {
      if (this.navName === 'About') {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/var.scss';

.aboutwrapper {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vh;
  border: 5px solid #d8ba7e;
  border-radius: 25px;
  background-color: #f7deab;
}
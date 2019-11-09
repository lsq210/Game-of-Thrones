<template>
  <div id="app">
    <img
    src="@/assets/logo.png"
    class="logo"
    :style="{top: logoTop + 'px'}"
    @click="returnHome"/>
    <map-component/>
    <nav-bar/>
    <families/>
    <events/>
    <characters/>
  </div>
</template>

<script>
import MapComponent from '@/components/Map'
import NavBar from '@/components/NavBar'
import Families from '@/components/Families'
import Events from '@/components/Events'
import Characters from '@/components/Characters'

export default {
  name: 'App',
  components: {
    MapComponent,
    NavBar,
    Families,
    Events,
    Characters
  },
  data () {
    return {
      logoTop: -80
    }
  },
  mounted () {
    setTimeout(() => { this.logoTop = 30 }, 1200)
  },
  methods: {
    returnHome: function () {
      this.$store.commit('changeNav', null)
    }
  }
}
</script>

<style lang="scss" scoped>
@import './styles/var.scss';
#app {
  .logo {
    position: fixed;
    z-index: 1;
    width: 40vw;
    margin: 0 30vw;
    filter: drop-shadow(2px 4px 6px black);
    transition: top 1.5s cubic-bezier(0.19, 1, 0.22, 1);
    cursor: pointer;
  }
  .map {
    position: fixed;
  }
}
</style>

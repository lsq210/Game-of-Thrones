<template>
  <div id="app">
    <img src="@/assets/logo.png" class="logo"/>
    <map-component class=""/>
  </div>
</template>

<script>
import MapComponent from '@/components/Map'

export default {
  name: 'App',
  components: {
    MapComponent
  }
}
</script>

<style lang="scss" scoped>
@import './styles/var.scss';
#app {
  .logo {
    position: fixed;
    z-index: 1;
    width: 100vw;
    padding: 20px 30vw 0 30vw;
    filter: drop-shadow(2px 4px 6px black);
  }
  .map {
    position: fixed;
  }
}
</style>

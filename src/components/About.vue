<template>
  <div class="about-wrapper" v-if="AboutState">
    <div class="contributor">
      <span class="title">contributors:</span>
      <br/>
      <img class="avatar" :src="'/static/characters/Arya.jpg'"/>
      <a class="web" href="https://github.com/lsq210/">&nbsp;&nbsp;SHIQI LUO&nbsp;&nbsp;</a>
      <span class="words">"What do we say to the god of dead?"</span><br/>
      <img class="avatar" :src="'/static/ao.jpg'"/>
      <a class="web" href="https://github.com/Mosuyun">&nbsp;&nbsp;YONGXUAN GUO&nbsp;&nbsp;</a>
      <span class="words">"Not today."</span><br/>
      <img class="avatar" :src="'/static/characters/Davos.jpg'"/>
      <a class="web" href="https://github.com/YBstory">&nbsp;&nbsp;YIBO ZHOU&nbsp;&nbsp;</a>
      <span class="words">"You know nothing."</span><br/>
      <img class="avatar" :src="'/static/characters/TheNightKing.jpg'"/>
      <a class="web" href="https://github.com/Rurambar">&nbsp;&nbsp;BAOXIN TENG&nbsp;&nbsp;</a>
      <span class="words">"You know nothing."</span><br/>
      <div class="re">
          <span class="title">Reference:</span>
          <br/>
          <a class="web" href="https://gameofthrones.fandom.com/wiki/Game_of_Thrones_Wiki/">Data Source&nbsp;&nbsp;</a>
          <a class="web" href="https://sketchfab.com/">Models&nbsp;&nbsp;</a>
          <a class="web" href="https://www.mapbox.com/">Map&nbsp;&nbsp;</a>
          <a class="web" href="https://www.vizofthrones.com/">Inspired by&nbsp;&nbsp;</a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      navName: 'navName'
    }),
    AboutState () {
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
.about-wrapper {
  position: fixed;
  display: flex;
  top: 25vh;
  left: 68vh;
  height: 50vh;
  width: 72vh;
  border-radius: 25px;
  font-weight: bold;
  background-image:url('/static/about3.jpg');
  .contributor {
    position: absolute;
    top: 1vh;
    left: 5vh;
    line-height: 3;
    font-family: "Palatino Linotype", "Book Antiqua", Palatino, serif;
    .avatar {
      vertical-align: middle;
      width: 4vh;
      height: 4vh;
      border-radius: 50%;
    }
    .web {
      text-decoration: none;
      color: black;
    }
    .web:hover {
      color: #2f6acc;
    }
    .title {
      font-size:3vh;
      font-weight: bold;
      font-style: italic;
    }
    .re {
      line-height: 2;
      font-size: 2vh;
    }
    .words {
      font-style: italic;
      color: #7d2020;
    }
  }
}
</style>

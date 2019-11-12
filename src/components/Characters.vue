<template>
<!--滚动条-->
  <div class="characters-wrapper" v-if="charactersState">
    <character-card v-bind:characterId="tempID" v-bind:cardState="charactersState"/>
    <div
        v-for="(character, index) in Characters"
        :key="'character-' + character.name + index"
        class="character">
        <img class="character-avatar" :src="character.avatar"
        @mouseenter="tempInfo(character.id)" @mouseleave="restoreInfo(character.id)"
        @click="selectCharacter(character.id)"/>
        <div class="character-name"><span>{{ character.name }}</span></div>
    </div>
    <div class="about-wrapper" v-if="charactersState">
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
  </div>
</template>

<script>
import CharacterCard from './CharacterCard'
import { mapState } from 'vuex'
import Characters from '@/data/characters.json'
import Events from '@/data/events.json'

export default {
  data () {
    return {
      tempID: 0,
      stage: true,
      Characters,
      Events,
      selectedCharacterEvents: []
    }
  },
  components: {
    CharacterCard
  },
  computed: {
    ...mapState({
      navName: 'navName'
    }),
    charactersState () {
      if (this.navName === 'Characters') {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    tempInfo: function (id) {
      this.stage = true
      this.tempID = id
    },
    restoreInfo: function (id) {
      if (this.stage) {
        this.tempID = id
      }
    },
    selectCharacter: function (selectedId) {
      var selectedCharacter = Characters[selectedId]
      this.selectedCharacterEvents = []
      for (let eventId in selectedCharacter.events) {
        this.selectedCharacterEvents.push(Events[eventId])
      }
      console.log('changeCharacter', this.selectedCharacterEvents)
      this.$store.commit('changeCharacter', this.selectedCharacterEvents)
    }
  }
}

</script>

<style lang="scss" scoped>
@import '@/styles/var.scss';

.characters-wrapper {
  right: 0;
  bottom: 0;
  width: 100vw;
  display: flex;
  z-index: 5;
  overflow: auto;
  background: none;
  position: fixed;
  flex-direction: row;
  height: 15vh;
  .character {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100vw;
    margin: 2px 10px 2px 10px;
    cursor: pointer;
    float: left;
    vertical-align:top;
    .character-avatar {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      border: 3px solid #333;
      transition: 0.2s;
      margin-top:0;
    }
    .character-avatar:hover {
      width: 100px;
      height: 100px;
    }
    .character-name {
      // margin-top: 10px;
      line-height: 20px;
      color: #f7deab;
      font-weight: bold;
      font-family: cursive;
      font-size: 2vh;
      min-width: 10vh;
      text-align: center;
    }
  }
}
.about-wrapper {
  position: fixed;
  display: flex;
  top: 25vh;
  left: 60vh;
  height: 50vh;
  width: 70vh;
  border: 5px solid #d8ba7e;
  border-radius: 25px;
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
      // background-color: #f4ff49e8;
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

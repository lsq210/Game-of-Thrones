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
      selectedCharacterEvents: [],
      videoState: false
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
      this.$store.commit('showVideo', false)
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
</style>

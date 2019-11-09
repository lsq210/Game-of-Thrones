<template>
<!--滚动条-->
  <div class="characters-wrapper" v-if="$store.state.charactersShow">
    <character-card v-bind:characterId="tempID"/>
    <div
        v-for="(character, index) in characters"
        :key="'character-' + character.name + index"
        class="character">
        <img class="character-avatar" :src="character.avatar"
        v-on:mouseenter="tempInfo(character.id)" v-on:mouseleave="restoreInfo(character.id)"
        v-on:click="showInfo(character.id)"/>
        <span class="character-name">{{ character.name }}</span>
      </div>
  </div>
</template>

<script>
import characters from '@/data/characters'
import CharacterCard from './CharacterCard'

export default {
  data () {
    return {
      characters: characters,
      tempID: 0,
      stage: true
    }
  },
  components: {
    CharacterCard
  },
  methods: {
    showInfo: function (id) {
      this.tempID = id
      this.stage = false
    },
    tempInfo: function (id) {
      this.stage = true
      this.tempID = id
    },
    restoreInfo: function (id) {
      if (this.stage) {
        this.tempID = id
      }
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
  align-items: flex-end;
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
    margin: 2px 10px 2px 10px;
    cursor: pointer;
    float: left;
    .character-avatar {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      border: 3px solid #333;
      transition: 0.2s;
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
    }
  }
}

</style>

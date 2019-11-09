<template>
  <div class="CharacterCard" v-if="$store.state.characterCardShow">
    <div class="basicinfo">
      <img class="avatar" :src="characters[characterId].avatar"/>
      <div class="nameand">
      <span class="name">{{characters[characterId].name}}</span>
      <embed>
      </div>
    </div>
      <hr class="line">
      <div class="info">
      <span v-if="characters[characterId].male!=null">Gender: {{male}}<br/></span>
      <span v-if="characters[characterId].dateofBirth!=null">Date of Birth: {{characters[characterId].dateofBirth}}<br/></span>
      <span v-if="characters[characterId].Age!=null">Age: {{characters[characterId].Age}}<br/></span>
      <span v-if="characters[characterId].origin!=null">Origin: <span
      v-for="(org, index) in characters[characterId].origin"
      :key="'origin-' + index"
      class="origin">{{org}}<br/></span>
      </span>
      <span v-if="characters[characterId].nickname!=null">Nickname: <span
      v-for="(nick, index) in characters[characterId].nickname"
      :key="'nickname-' + index"
      class="nickname">{{nick}}<br/></span>
      </span>
      <span v-if="characters[characterId].titles!=null">Titles: <span
      v-for="(title, index) in characters[characterId].titles"
      :key="'title-' + index"
      class="title">{{title}}<br/></span>
      </span>
      <span v-if="characters[characterId].allegiance!=null">Allegiance: <span
      v-for="(allegiance, index) in characters[characterId].allegiance"
      :key="'allegiance-' + index"
      class="nickname">{{allegiance}}<br/></span>
      </span>
      <span v-if="characters[characterId].religion!=null">Religion: <span
      v-for="(religion, index) in characters[characterId].religion"
      :key="'religion-' + index"
      class="religion">{{religion}}<br/></span>
      </span>
      <span v-if="characters[characterId].culture!=null">Culture: <span
      v-for="(culture, index) in characters[characterId].culture"
      :key="'culture-' + index"
      class="culture">{{culture}}<br/></span>
      </span>
      <span v-if="characters[characterId].houses!=null">Houses: <span
      v-for="(house, index) in characters[characterId].houses"
      :key="'house-' + index"
      class="house">{{house}}<br/></span>
      </span>
      <span v-if="characters[characterId].father!=null">Father: <span
      v-for="(father, index) in characters[characterId].father"
      :key="'father-' + index"
      class="father">{{father}}<br/></span>
      </span>
      <span v-if="characters[characterId].mother!=null">Mother: {{characters[characterId].mother}}<br/></span>
      <span v-if="characters[characterId].children!=null">Children: <span
      v-for="(child, index) in characters[characterId].children"
      :key="'child-' + index"
      class="child">{{child}}<br/></span>
      </span>
      <span v-if="characters[characterId].siblings!=null">Siblings: <span
      v-for="(sibling, index) in characters[characterId].siblings"
      :key="'sibling-' + index"
      class="sibling">{{sibling}}<br/></span>
      </span>
      <span v-if="characters[characterId].loversOrspouse!=null">Lover/Spouse: <span
      v-for="(lover, index) in characters[characterId].loversOrspouse"
      :key="'lover-' + index"
      class="lover">{{lover}}<br/></span>
      </span>
      <span v-if="characters[characterId].Status!=null">Status: {{characters[characterId].Status}}<br/></span>
      <span v-if="characters[characterId].Events!=null">Events: <span
      v-for="(event, index) in characters[characterId].Events"
      :key="'event-' + index"
      class="event">{{event}}<br/></span>
      </span>
      <span v-if="characters[characterId].episodes!=null">Episodes: {{characters[characterId].episodes}}<br/></span>
    </div>
  </div>
</template>

<script>
import characters from '@/data/characters'

export default {
  data () {
    return {
      characters: characters
    }
  },
  props: {
    characterId: {
      default: 0,
      type: Number
    }
  },
  computed: {
    select: function () {
      for (var i = 0; i < 2; i++) {
        if (this.characters[i].id === this.characterId) {
          return this.characters[i]
        }
      }
    },
    male: function () {
      var id = this.characterId
      if (this.characters[id].male === 0) {
        return 'male'
      } else {
        return 'female'
      }
    }
  }
}

</script>

<style lang="scss" scoped>
@import '@/styles/var.scss';

.CharacterCard {
  position: fixed;
  bottom: 22vh;
  left: 70px;
  height: 65vh;
  width: 45vh;
  border: 5px solid #d8ba7e;
  border-radius: 25px;
  background-color: #f7deab;
  opacity: 90%;
  .line {
    color: #d8ba7e;
  }
  .basicinfo{
    height: 15vh;
    margin-top: 0;
    display: flex;
    flex-direction: row;
    &::-webkit-scrollbar {
      background-color: transparent;
    }
    .avatar {
      width: 10vh;
      height: 10vh;
      border-radius: 50%;
      border: 3px solid #333;
      margin: 20px;
    }
    .nameand {
      width: 35vh;
      height: 10vh;
      padding: 1vh;
      text-align: center;
      font-family: "Times New Roman", Times, serif;
      .name {
        font-size: 40px;
        color: #ffff00;
        text-shadow: 2px 2px #ffcc00;
        font-style: italic;
      }
    }
  }
  .info {
    margin-top: 20px;
    padding: 0 20px 20px 20px;
    line-height: 110%;
    font-family: "Palatino Linotype", "Book Antiqua", Palatino, serif;
    font-size: 20px;
    height: 45vh;
    text-align: left;
    overflow: auto;
  }
}

</style>

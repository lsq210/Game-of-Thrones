<template>
  <div class="CharacterCard" v-if="$store.state.characterCardShow">
  <div class="basicinfo">
    <img class="avatar" :src="characters[$store.state.characterID].avatar"/>
    <div class="nameand">
    <span class="name">{{characters[$store.state.characterID].name}}</span>
    <embed>
    </div>
  </div>
    <hr class="line">
    <div class="info">
    <span v-if="characters[$store.state.characterID].male!=null">Gender: {{male}}<br/></span>
    <span v-if="characters[$store.state.characterID].dateofBirth!=null">Date of Birth: {{characters[$store.state.characterID].dateofBirth}}<br/></span>
    <span v-if="characters[$store.state.characterID].Age!=null">Age: {{characters[$store.state.characterID].Age}}<br/></span>
    <span v-if="characters[$store.state.characterID].origin!=null">Origin: <span
    v-for="(org, index) in characters[$store.state.characterID].origin"
    :key="'origin-' + index"
    class="origin">{{org}}<br/></span>
    </span>
    <span v-if="characters[$store.state.characterID].nickname!=null">Nickname: <span
    v-for="(nick, index) in characters[$store.state.characterID].nickname"
    :key="'nickname-' + index"
    class="nickname">{{nick}}<br/></span>
    </span>
    <span v-if="characters[$store.state.characterID].titles!=null">Titles: <span
    v-for="(title, index) in characters[$store.state.characterID].titles"
    :key="'title-' + index"
    class="title">{{title}}<br/></span>
    </span>
    <span v-if="characters[$store.state.characterID].allegiance!=null">Allegiance: <span
    v-for="(allegiance, index) in characters[$store.state.characterID].allegiance"
    :key="'allegiance-' + index"
    class="nickname">{{allegiance}}<br/></span>
    </span>
    <span v-if="characters[$store.state.characterID].religion!=null">Religion: <span
    v-for="(religion, index) in characters[$store.state.characterID].religion"
    :key="'religion-' + index"
    class="religion">{{religion}}<br/></span>
    </span>
    <span v-if="characters[$store.state.characterID].culture!=null">Culture: <span
    v-for="(culture, index) in characters[$store.state.characterID].culture"
    :key="'culture-' + index"
    class="culture">{{culture}}<br/></span>
    </span>
    <span v-if="characters[$store.state.characterID].houses!=null">Houses: <span
    v-for="(house, index) in characters[$store.state.characterID].houses"
    :key="'house-' + index"
    class="house">{{house}}<br/></span>
    </span>
    <span v-if="characters[$store.state.characterID].father!=null">Father: <span
    v-for="(father, index) in characters[$store.state.characterID].father"
    :key="'father-' + index"
    class="father">{{father}}<br/></span>
    </span>
    <span v-if="characters[$store.state.characterID].mother!=null">Mother: {{characters[$store.state.characterID].mother}}<br/></span>
    <span v-if="characters[$store.state.characterID].children!=null">Children: <span
    v-for="(child, index) in characters[$store.state.characterID].children"
    :key="'child-' + index"
    class="child">{{child}}<br/></span>
    </span>
    <span v-if="characters[$store.state.characterID].siblings!=null">Siblings: <span
    v-for="(sibling, index) in characters[$store.state.characterID].siblings"
    :key="'sibling-' + index"
    class="sibling">{{sibling}}<br/></span>
    </span>
    <span v-if="characters[$store.state.characterID].loversOrspouse!=null">Lover/Spouse: <span
    v-for="(lover, index) in characters[$store.state.characterID].loversOrspouse"
    :key="'lover-' + index"
    class="lover">{{lover}}<br/></span>
    </span>
    <span v-if="characters[$store.state.characterID].Status!=null">Status: {{characters[$store.state.characterID].Status}}<br/></span>
    <span v-if="characters[$store.state.characterID].Events!=null">Events: <span
    v-for="(event, index) in characters[$store.state.characterID].Events"
    :key="'event-' + index"
    class="event">{{event}}<br/></span>
    </span>
    <span v-if="characters[$store.state.characterID].episodes!=null">Episodes: {{characters[$store.state.characterID].episodes}}<br/></span>
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
  computed: {
    select: function () {
      for (var i = 0; i < 2; i++) {
        if (this.characters[i].id === this.$store.state.characterID) {
          return this.characters[i]
        }
      }
    },
    male: function () {
      var id = this.$store.state.characterID
      if (this.characters[id].male === 0) {
        console.log(this.characters[id].culture.length)
        return 'male'
      } else {
        return 'female'
      }
      // return 'male'
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
    .avatar {
      width: 10vh;
      height: 10vh;
      border-radius: 50%;
      border: 3px solid #333;
      margin: 50px;
    }
    .nameand {
      width: 35vh;
      height: 10vh;
      padding: 1vh;
      text-align: center;
      font-family: "Times New Roman", Times, serif;
      .name {
        font-size: 5em;
        color: #ffff00;
        text-shadow: 2px 2px #ffcc00;
        font-style: italic;
      }
    }
  }
  .info {
    margin: 40px;
    line-hight: 110%;
    font-faimly: "Palatino Linotype", "Book Antiqua", Palatino, serif;
    font-size: 2em;
    height: 45vh;
    text-align: left;
    overflow: auto;
  }
}

</style>

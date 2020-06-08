<template>
<div>
  <div class="CharacterCard" v-if="cardState">
    <!--头像，姓名，生日，状态-->
    <div class="basicinfo">
      <img class="avatar" :src="characters[characterId].avatar"/>
      <div class="nameand">
      <span v-if="characters[characterId].video != ''"><img class="player" :src="'/static/icon/play.png'" @click="showVideo()"/></span>
      <span class="name">{{characters[characterId].name}}</span><br/>
      <div style="text-align:left;padding:7px 0 10px 0;">
      <span v-if="characters[characterId].male!=null">Gender: <img class="gender" :src="'/static/icon/nan.png'" v-if="characters[characterId].male === 0"/>
      <img class="gender" :src="'/static/icon/nv.png'" v-else><br/></span>
      <span v-if="characters[characterId].dateofBirth!=''" style="vertical-align:middle;">Date of Birth: {{characters[characterId].dateofBirth}}</span>
      <img :src="'/static/icon/birthday.png'" v-if="characters[characterId].dateofBirth!=''" style="vertical-align:middle;"/><br/>
      <span v-if="characters[characterId].Age!=''">Age: {{characters[characterId].Age}}<br/></span>
      <div style="padding:7px 0 10px 0;"><span v-if="characters[characterId].status!=''">Status: {{characters[characterId].status}}<br/></span></div>
      </div>
      </div>
    </div>
      <hr class="line">
    <!--可滚动区域-->
      <div class="info">
    <!--杀人和屏幕时间-->
      <div class="killAndTime">
        <div style="display:flex;flex-direction:column;"><img class="kAT" :src="'/static/icon/sword.png'"/><span class="KAT">Kill: {{characters[characterId].kill}}</span></div>
        <div style="display:flex;flex-direction:column;"><img class="kAT" :src="'/static/icon/clock.png'"/><span class="KAT">Screen Time: {{characters[characterId].screentime}}</span></div>
      </div>
      <br/>
    <!--别名，头衔-->
      <div class="subinfo">
        <img class="illustration" :src="'/static/icon/title.png'"/>
        <div style="margin-left:10px;">
        <div style="display:flex;" v-if="characters[characterId].nickname.length!=0">
          <span>Nickname:&nbsp;</span>
          <div style="text-align:left;"><span
          v-for="(nick, index) in characters[characterId].nickname"
          :key="'nickname-' + index">{{nick}}<br/></span>
          </div></div>
        <div style="display:flex;width35vh" v-if="characters[characterId].titles.length!=0">
          <span v-if="characters[characterId].titles.length!=0" style="display:flex;">Titles:&nbsp;</span>
          <div style="text-align:left;"><span
          v-for="(title, index) in characters[characterId].titles"
          :key="'title-' + index">{{title}}<br/></span>
          </div></div>
        </div>
      </div>
      <br/>
    <!--出生地，信仰，效忠于，文化-->
      <div class="subinfo">
        <img class="illustration" :src="'/static/icon/culture.png'"/>
        <div style="margin-left:10px;">
        <div style="display:flex;" v-if="characters[characterId].origin.length!=0">
          <span>Origin:&nbsp;</span>
          <div style="text-align:left;"><span
          v-for="(org, index) in characters[characterId].origin"
          :key="'origin-' + index">{{org}}<br/></span>
          </div></div>
        <div style="display:flex;" v-if="characters[characterId].allegiance.length!=0">
          <span>Allegiance:&nbsp;</span>
          <div style="text-align:left;"><span
          v-for="(allegiance, index) in characters[characterId].allegiance"
          :key="'allegiance-' + index">{{allegiance}}<br/></span>
          </div></div>
        <div style="display:flex;" v-if="characters[characterId].religion.length!=0">
          <span>Religion:&nbsp;</span>
          <div style="text-align:left;"><span
          v-for="(religion, index) in characters[characterId].religion"
          :key="'religion-' + index">{{religion}}<br/></span>
          </div></div>
        <div style="display:flex;" v-if="characters[characterId].culture.length!=0">
          <span>Culture:&nbsp;</span>
          <div style="text-align:left;"><span
          v-for="(culture, index) in characters[characterId].culture"
          :key="'culture-' + index">{{culture}}<br/></span>
          </div></div>
        </div>
      </div>
      <br/>
    <!--家族，家人，爱人-->
      <div class="subinfo">
        <img class="illustration" :src="'/static/icon/relationship.png'"/>
        <div style="margin-left:10px;">
        <span v-if="characters[characterId].houses!=null">House: {{characters[characterId].houses}}<br/></span>
        <div style="display:flex;" v-if="characters[characterId].father.length!=0">
          <span>Father:&nbsp;</span>
          <div style="text-align:left;"><span
          v-for="(father, index) in characters[characterId].father"
          :key="'father-' + index">{{father}}<br/></span>
          </div></div>
        <span v-if="characters[characterId].mother!=null">Mother: {{characters[characterId].mother}}<br/></span>
        <div style="display:flex;" v-if="characters[characterId].children.length!=0">
          <span>Children:&nbsp;</span>
          <div style="text-align:left;"><span
          v-for="(child, index) in characters[characterId].children"
          :key="'child-' + index">{{child}}<br/></span>
          </div></div>
        <div style="display:flex;" v-if="characters[characterId].siblings.length!=0">
          <span>Siblings:&nbsp;</span>
          <div style="text-align:left;"><span
          v-for="(sibling, index) in characters[characterId].siblings"
          :key="'sibling-' + index">{{sibling}}<br/></span>
          </div></div>
        <div style="display:flex;" v-if="characters[characterId].children.length!=0">
          <span>Children:&nbsp;</span>
          <div style="text-align:left;"><span
          v-for="(child, index) in characters[characterId].children"
          :key="'child-' + index">{{child}}<br/></span>
          </div></div>
        <div style="display:flex;" v-if="characters[characterId].loversOrspouse.length!=0">
          <span>Lover/Spouse:&nbsp;</span>
          <div style="text-align:left;"><span
          v-for="(lover, index) in characters[characterId].loversOrspouse"
          :key="'lover-' + index">{{lover}}<br/></span>
          </div></div>
        </div>
      </div>
      <br/>
    <!--事件-->
      <div class="subinfo">
        <img class="illustration" :src="'/static/icon/event.png'"/>
        <div style="display:flex;" v-if="characters[characterId].events.length!=0">
          <span>Events:&nbsp;</span>
          <div style="text-align:left;"><span
          v-for="(event, index) in characters[characterId].events"
          :key="'event-' + index">{{Events[event].name}}<br/></span>
          </div></div>
      </div>
    </div>
  </div>
  <div class="character-video" v-if="videoState()">
    <iframe :src="`${characters[characterId].video}&danmaku=0`" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" height="300px" width="400px"> </iframe>
  </div>
</div>
</template>

<script>
import characters from '@/data/characters.json'
import Events from '@/data/events.json'

export default {
  data () {
    return {
      Events,
      characters: characters
    }
  },
  props: {
    characterId: {
      default: 0,
      type: Number
    },
    cardState: {
      default: false,
      type: Boolean
    }
  },
  methods: {
    showVideo: function () {
      this.$store.commit('showVideo', true)
    },
    videoState: function () {
      return this.$store.state.videoState
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
  left: 20px;
  height: 70vh;
  width: 45vh;
  border: 5px solid #d8ba7e;
  border-radius: 25px;
  background-color: #f7deab;
  opacity: 90%;
  .line {
    color: #525685;
  }
  .basicinfo{
    height: 20vh;
    margin-top: 0;
    display: flex;
    flex-direction: row;
    font-size: 20px;
    &::-webkit-scrollbar {
      background-color: transparent;
    }
    .avatar {
      width: 12vh;
      height: 12vh;
      border-radius: 50%;
      border: 3px solid #333;
      margin: 42px 7px 42px 20px;
    }
    .nameand {
      width: 35vh;
      height: 10vh;
      padding: 1vh;
      text-align: center;
      font-family: "Times New Roman", Times, serif;
      .name {
        font-size: 25px;
        color: #132275;
        font-style: italic;
        font-weight: bold;
      }
      .gender {
        vertical-align: middle;
      }
      .player {
        cursor: pointer;
      }
    }
  }
  .info {
    padding: 0 20px 20px 20px;
    line-height: 120%;
    font-family: "Palatino Linotype", "Book Antiqua", Palatino, serif;
    font-size: 18px;
    height: 45vh;
    text-align: left;
    overflow: auto;
    .killAndTime {
      display: flex;
      .kAT {
        width:12vh;
        height:12vh;
        margin:3vh;
      }
      .KAT {
        text-align: center;
      }
    }
    .illustration {
      width:5vh;
      height:5vh;
      vertical-align: text-top;
      margin-right:10px;
    }
    .subinfo {
      width: 45vh;
      display: flex;
    }
  }
}
.character-video {
  position: fixed;
  right: 50px;
  top: 60px;
}
</style>

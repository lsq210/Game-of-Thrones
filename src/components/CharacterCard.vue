<template>
  <div class="CharacterCard" v-if="cardState">
  <!--头像，姓名，生日，状态-->
    <div class="basicinfo">
      <img class="avatar" :src="characters[characterId].avatar"/>
      <div class="nameand">
      <span class="name">{{characters[characterId].name}}</span><br/>
      <div style="text-align:left;padding:7px 0 10px 0;">
      <span v-if="characters[characterId].male!=null">Gender: <img class="gender" :src="'/static/icon/nan.png'" v-if="characters[characterId].male === 0"/>
      <img class="gender" :src="'/static/icon/nv.png'" v-else><br/></span>
      <span v-if="characters[characterId].dateofBirth!=null" style="vertical-align:middle;">Date of Birth: {{characters[characterId].dateofBirth}}</span>
      <img :src="'/static/icon/birthday.png'" v-if="characters[characterId].dateofBirth!=null" style="vertical-align:middle;"/><br/>
      <span v-if="characters[characterId].Age!=null">Age: {{characters[characterId].Age}}<br/></span>
      <div style="padding:7px 0 10px 0;"><span v-if="characters[characterId].Status!=null">Status: {{characters[characterId].Status}}<br/></span></div>
      </div>
      </div>
    </div>
      <hr class="line">
  <!--可滚动区域-->
      <div class="info">
    <!--杀人和屏幕时间-->
      <div class="killAndTime">
        <div style="display:flex;flex-direction:column;"><img class="kAT" :src="'/static/icon/sword.png'"/><span class="KAT">Kill: name</span></div>
        <div style="display:flex;flex-direction:column;"><img class="kAT" :src="'/static/icon/clock.png'"/><span class="KAT">Kill: name</span></div>
      </div>
      <br/>
    <!--别名，头衔-->
      <div class="subinfo">
        <img class="illustration" :src="'/static/icon/title.png'"/>
        <div style="margin-left:10px;">
        <div style="display:flex;" v-if="characters[characterId].nickname!=null">
          <span>Nickname:&nbsp;</span>
          <div style="text-align:left;"><span
          v-for="(nick, index) in characters[characterId].nickname"
          :key="'nickname-' + index">{{nick}}<br/></span>
          </div></div>
        <div style="display:flex;width35vh" v-if="characters[characterId].titles!=null">
          <span v-if="characters[characterId].titles!=null" style="display:flex;">Titles:&nbsp;</span>
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
        <div style="display:flex;" v-if="characters[characterId].origin!=null">
          <span>Origin:&nbsp;</span>
          <div style="text-align:left;"><span
          v-for="(org, index) in characters[characterId].origin"
          :key="'origin-' + index">{{org}}<br/></span>
          </div></div>
        <div style="display:flex;" v-if="characters[characterId].allegiance!=null">
          <span>Allegiance:&nbsp;</span>
          <div style="text-align:left;"><span
          v-for="(allegiance, index) in characters[characterId].allegiance"
          :key="'allegiance-' + index">{{allegiance}}<br/></span>
          </div></div>
        <div style="display:flex;" v-if="characters[characterId].religion!=null">
          <span>Religion:&nbsp;</span>
          <div style="text-align:left;"><span
          v-for="(religion, index) in characters[characterId].religion"
          :key="'religion-' + index">{{religion}}<br/></span>
          </div></div>
        <div style="display:flex;" v-if="characters[characterId].culture!=null">
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
        <div style="display:flex;" v-if="characters[characterId].houses!=null">
          <span>House:&nbsp;</span>
          <div style="text-align:left;"><span
          v-for="(house, index) in characters[characterId].houses"
          :key="'house-' + index">{{house}}<br/></span>
          </div></div>
        <div style="display:flex;" v-if="characters[characterId].father!=null">
          <span>Father:&nbsp;</span>
          <div style="text-align:left;"><span
          v-for="(father, index) in characters[characterId].father"
          :key="'father-' + index">{{father}}<br/></span>
          </div></div>
        <span v-if="characters[characterId].mother!=null">Mother: {{characters[characterId].mother}}<br/></span>
        <div style="display:flex;" v-if="characters[characterId].children!=null">
          <span>Children:&nbsp;</span>
          <div style="text-align:left;"><span
          v-for="(child, index) in characters[characterId].children"
          :key="'child-' + index">{{child}}<br/></span>
          </div></div>
        <div style="display:flex;" v-if="characters[characterId].sibling!=null">
          <span>Siblings:&nbsp;</span>
          <div style="text-align:left;"><span
          v-for="(sibling, index) in characters[characterId].siblings"
          :key="'sibling-' + index">{{sibling}}<br/></span>
          </div></div>
        <div style="display:flex;" v-if="characters[characterId].children!=null">
          <span>Children:&nbsp;</span>
          <div style="text-align:left;"><span
          v-for="(child, index) in characters[characterId].children"
          :key="'child-' + index">{{child}}<br/></span>
          </div></div>
        <div style="display:flex;" v-if="characters[characterId].loversOrspouse!=null">
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
        <div style="display:flex;" v-if="characters[characterId].Events!=null">
          <span>Events:&nbsp;</span>
          <div style="text-align:left;"><span
          v-for="(event, index) in characters[characterId].Events"
          :key="'event-' + index">{{event}}<br/></span>
          </div></div>
      </div>
    </div>
  </div>
</template>

<script>
import characters from '@/data/characters.json'

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
    },
    cardState: {
      default: false,
      type: Boolean
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
      margin: 42px 20px 42px 20px;
    }
    .nameand {
      width: 35vh;
      height: 10vh;
      padding: 1vh;
      text-align: center;
      font-family: "Times New Roman", Times, serif;
      .name {
        font-size: 40px;
        color: #306ed2;
        text-shadow: 2px 2px #173c79;
        font-style: italic;
      }
      .gender {
        vertical-align: middle;
      }
    }
  }
  .info {
    margin-top: 20px;
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
      width:7vh;
      height:7vh;
      vertical-align: text-top;
      margin-right:10px;
    }
    .subinfo {
      width: 45vh;
      display: flex;
    }
  }
}

</style>

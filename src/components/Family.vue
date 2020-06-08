/* eslint-disable */
<template>
  <div class="family-info-wrapper" v-if="familyState">
      <div class="family-card">
        <div class="family-info-show">
          <img class="close-button" src="@/assets/icons-close.png" height="32" width="32" v-on:click="familyClose"/>
          <img class="family-info-img" :src="family.img"/>
          <span class="family-name">{{family.name}}</span>
        </div>
        <div class="family-info">
          <span class="family-info-words">{{family.words}}</span>
          <div class="allegiance-card" v-if="allegianceState">
            <span class="allegiance">Allegiance</span>
            <div
              v-for="index in family.allegiance"
              :key="'family-'+index"
              class="allegiance-info">
              <span class="family-allegiance-name" @click="changeFamilyData(Families[index])">{{Families[index].name}}</span>
            </div>
          </div>
          <div class="vassals-card" v-if="vassalsState">
            <span class="vassals">Vassals</span>
            <div
              v-for="index in family.vassals"
              :key="'family-'+index"
              class="vassals-info">
              <span class="family-vassals-name" @click="changeFamilyData(Families[index])">{{Families[index].name}}</span>
            </div>
          </div>
          <div class='characters-card'>
            <span class="characters">Members</span>
            <div
              v-for="(member,index) in family.members"
              :key="'family-'+index"
              class="members-info">
              <span class="member-name">{{member}}</span>
              </div>
          </div>
          <div class="videocard">
            <span class="videoname">Introduction video</span>
            <iframe class="video"  :src="`${family.video}&danmaku=0`" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import Families from '@/data/families.json'

export default {
  data () {
    return {
      Families,
      change_data: this.Object
    }
  },
  props: {
    family: Object,
    familyState: Boolean,
    allegianceState: Boolean,
    vassalsState: Boolean
  },
  watch: {
    familyState: function () {
      console.log('aaaaa', this.familyState)
    }
  },
  methods: {
    familyClose: function () {
      console.log('close')
      this.$emit('close')
    },
    changeFamilyData: function (newfamily) {
      console.log(newfamily)
      this.$emit('showFamily', newfamily)
    },
    changeFamilyVideo: function () {
      document.getElementById('video')
    }
  }
}
</script>

<style lang="scss" scoped>
.family-info-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: width 5s;
  z-index: 100;
  .family-card{
    left: 0;
    width: 340px;
    height: 90vh;
    background-color: #9f997f;
    border-radius: 0 8px 8px 0;
    filter: drop-shadow(2px 4px 6px black);
    display: flex;
    flex-wrap: wrap;
    overflow: auto;
    justify-content: center;
    &::-webkit-scrollbar {
      background-color: transparent;
    }
    .family-info-show{
      position:relative;
      left: 20px;
      width: 200px;
      height: 150px;
      margin: 10px 10px;
      .close-button{
        position:relative;
        top:-70px;
        left: 200px;
      }
      .family-info-img{
        position: relative;
        //top:-30px;
        left: -5px;
        margin: 15px 10px;
        width: 80px;
        height: 80px;
        border-radius: 8px;
      }
      .family-name{
        position: relative;
        top:10px;
        //left: px;
        line-height: 20px;
        color: #11274b;
        font-size: 200%;
        font-family: 'Times New Roman', Times, serif;
        font-style: italic;
        font-weight: bold;
        text-align: center;
      }
    }
    .family-info{
      position: relative;
      width: 200px;
      height: 50px;
      top: -200px;
      //left: -45px;
      text-align: center;
      .family-info-words{
        position:relative;
        top: -15px;
        margin: auto;
        text-align: center;
        font-size: 150%;
        font-family: Old English text MT;
      }
      .allegiance-card{
        border: #CCCC66;
        border-width: 3px;
        border-top-style:dotted;
        .allegiance{
          position: relative;
          left: -120px;
          top: 20px;
          margin-top: 6px;
          line-height: 20px;
          color: black;
          font-weight: bold;
          align-items: flex-start;
        }
        .allegiance-info{
          border-bottom: dotted 1px;
          padding-bottom: 5px;
          position: relative;
          left:40px;
          top:-20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 15px 10px;
          min-width: 120px;
          cursor: pointer;
        .family-allegiance-name{
          line-height:15px;
          color: #11274b;
          font-weight: bold;
        font-family: 'Times New Roman', Times, serif;
        font-style: italic;
                font-size: 120%;

        }
        }
      }
      .vassals-card{
        border: #CCCC66;
        border-width: 3px;
        border-top-style:dotted;
        .vassals{
          position: relative;
          left: -120px;
          top: 20px;
          margin-top: 6px;
          line-height: 20px;
          color: black;
          font-weight: bold;
          align-items: flex-start;
        }
        .vassals-info{
          border-bottom: dotted 1px;
          padding-bottom: 5px;
          position: relative;
          left:40px;
          top:-20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 15px 10px;
          min-width: 120px;
          cursor: pointer;
          .family-vassals-name{
            line-height:15px;
            color: #11274b;
            font-weight: bold;
        font-family: 'Times New Roman', Times, serif;
        font-style: italic;
        font-size: 120%;
          }
        }
      }
      .characters-card{
        border: #CCCC66;
        border-width: 3px;
        border-top-style:dotted;
      }
      .characters{
          position: relative;
          left: -120px;
          top: 20px;
          margin-top: 6px;
          line-height: 20px;
          color: black;
          font-weight: bold;
          align-items: flex-start;
      }
      .members-info{
        position: relative;
        left: 30px;
        .member-name{
        font-family: 'Times New Roman', Times, serif;
        font-style: italic;
        font-size: 100%;
        color: #11274b;
        }
      }
      .videocard{
                border: #CCCC66;
        border-width: 3px;
        border-top-style:dotted;
        top:-10px;

      }
      .videoname{
                  position: relative;
          left: -85px;
          top: 20px;
          margin-top: 6px;
          line-height: 20px;
          color: black;
          font-weight: bold;
          align-items: flex-start;

      }
      .video{
        position: relative;
        left:-50px;
        top:40px;
      }
    }
  }
}
</style>

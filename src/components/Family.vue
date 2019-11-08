<template>
  <div class="family-info-wrapper" v-if="$store.state.familyInfoShow">
      <div class="family-card">
        <div class="family-info-show">
          <img class="close-button" src="@/assets/icons-close.png" height="32" width="32" v-on:click="changefamilyClose"/>
          <img class='family-info-img' :src="families[$store.state.familyInfoID].img"/>
          <span class='family-name'>{{families[$store.state.familyInfoID].name}}</span>
        </div>
        <div class="family-info">
          <span class="family-info-words">{{families[$store.state.familyInfoID].words}}</span>
          <div class='allegiance-card' v-if="$store.state.familyAllegiance">
            <span class="allegiance">Allegiance</span>
            <div
              v-for="index in families[$store.state.familyInfoID].allegiance"
              :key="'family-'+index"
              class="allegiance-info">
              <span class="family-allegiance-name" v-on:click="changefamily(index)">{{families[index].name}}</span>
            </div>
          </div>
          <div class='vassals-card' v-if="$store.state.familyVassals">
            <span class='vassals'>Vassals</span>
            <div
              v-for="index in families[$store.state.familyInfoID].vassals"
              :key="'family-'+index"
              class="vassals-info">
              <span class='family-vassals-name' v-on:click="changefamily(index)">{{families[index].name}}</span>
            </div>
          </div>
          <div class='characters-card'>
            <span class='characters'>Members</span>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import Utils from '@/utils.js'
import families from '@/data/families'

export default {
  data () {
    return {
      families: families
    }
  },
  mounted () {
    var that = this
    Utils.$on('event', function (family) {
      that.show(family)
    })
  },
  methods: {
    show: function (family) {
      alert(family)
      console.log(family)
    },
    emitEvent () {},
    changefamily: function (item) {
      this.$store.state.familyInfoID = item
      if (families[this.$store.state.familyInfoID].allegiance.length > 0) { this.$store.state.familyAllegiance = true } else { this.$store.state.familyAllegiance = false }
      if (families[this.$store.state.familyInfoID].vassals.length > 0) { this.$store.state.familyVassals = true } else { this.$store.state.familyVassals = false }
    },
    changefamilyClose: function (item) {
      this.$store.state.familyInfoShow = false
    }

  }
}
</script>

<style lang="scss" scoped>
.family-info-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  // width: 400px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: width 5s;
  // background-color: red;
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
      left: 105px;
      width: 100px;
      height: 150px;
      margin: 10px 10px;
      .close-button{
        position:relative;
        left: 170px;
      }
      .family-info-img{
        position: relative;
        top:-30px;
        margin: 15px 10px;
        width: 80px;
        height: 80px;
        border-radius: 8px;
      }
      .family-name{
        position: relative;
        top:-30px;
        margin-top: 6px;
        line-height: 20px;
        color: #11274b;
        font-size: 200%;
        font-family: Georgia, serif;
        font-weight: bold;
        text-align: center;
      }
    }
    .family-info{
      position: relative;
      width: 200px;
      height: 50px;
      top: 200px;
      left: -45px;
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
          font-family: cursive;
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
            font-family: cursive;
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
    }
  }
}
</style>

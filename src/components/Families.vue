<template>
  <div class="families-wrapper">
    <family
      v-bind:family="selectedFamily"
      v-bind:familyState="familyState"
      v-bind:allegianceState="allegianceState"
      v-bind:vassalsState="vassalsState"
      @close="close"/>
    <div class="families" v-if="familiesState">
      <div
        v-for="(family, index) in Families"
        :key="'family-' + family.name + index"
        class="family">
        <img class="family-img" :src="family.img" v-on:click="changefamily(family)" />
        <span class="family-name">{{ family.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Families from '@/data/families'
import Family from './Family'

export default {
  data () {
    return {
      Families,
      selectedFamily: null,
      familyState: false,
      allegianceState: false,
      vassalsState: false
    }
  },
  components: {
    Family
  },
  computed: {
    ...mapState({
      navName: 'navName'
    }),
    familiesState () {
      if (this.navName === 'Families') {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    changefamily: function (family) {
      this.selectedFamily = family
      this.familyState = true
      if (family.allegiance.length > 0) {
        this.allegianceState = true
      } else {
        this.allegianceState = false
      }
      if (family.vassals.length > 0) {
        this.vassalsState = true
      } else {
        this.vassalsState = false
      }
    },
    close: function () {
      this.familyState = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/var.scss';

.families-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .families {
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
    .family {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 15px 10px;
      min-width: 120px;
      cursor: pointer;
      .family-img {
        width: 80px;
        height: 80px;
        border-radius: 8px;
      }
      .family-name {
        margin-top: 6px;
        line-height: 20px;
        color: #11274b;
        font-weight: bold;
        font-family: cursive;
      }
    }
  }
}
</style>

<template>
  <div class="families-wrapper">
    <div class="families" v-if="$store.state.familiesShow">
      <div
        v-for="(family, index) in families"
        :key="'family-' + family.name + index"
        class="family">
        <img class="family-img" :src="family.img" v-on:click="buttonclick(family.name)" />
        <span class="family-name">{{ family.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import families from '@/data/families'
import Utils from '@/utils.js'

export default {
  data () {
    return {
      families: families
    }
  },
  methods: {
    buttonclick: function (family) {
      Utils.$emit('event', family)
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

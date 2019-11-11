<template>
  <div class="three-d">
    <button class="threed-button" @click="changeListState">3D</button>
    <div class="models" v-if="modelListState">
      <div class="content">
        <span
        v-for="(model, index) in threeDModels"
        v-bind:key="`models-${index}`"
        @click="sendCenter(model.position)">
        {{ model.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import threeDModels from '@/data/threeDModels'
export default {
  data () {
    return {
      modelListState: false,
      threeDModels
    }
  },
  methods: {
    changeListState: function () {
      if (this.modelListState) {
        this.modelListState = false
        this.$store.commit('changeThreeLayer', false)
      } else {
        this.modelListState = true
        this.$store.commit('changeThreeLayer', true)
      }
    },
    sendCenter: function (center) {
      this.$store.commit('sendModelCenter', center)
    }
  }
}
</script>

<style lang='scss' scoped>
@import '@/styles/var.scss';
.three-d {
  .threed-button {
    display: flex;
    position: fixed;
    right: 10px;
    top: 120px;
    height: 30px;
    width: 30px;
    border-radius: 4px;
    background-color: #ffffff;
  }
  .models {
    position: fixed;
    right: 50px;
    top: 120px;
    border-radius: 10px;
    background-color: whitesmoke;
    background-size: 200px;
    height: 120px;
    width: 126px;
    padding: 20px;
    .content {
      overflow-y :auto;
      height: 80px;
      width: 100px;
      span {
        display: block;
        color: $text-color;
        font-size: 18px;
        font-family: "Palatino Linotype", "Book Antiqua", Palatino, serif;
        cursor: pointer;
        &:hover {
          color: $primer-color;
        }
      }
    }
  }
}
</style>

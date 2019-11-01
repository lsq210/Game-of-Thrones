<template>
  <div class="events-wrapper" v-if="$store.state.eventsShow">
    <div class="events-select">
      <v-select :options="seasons" style="width: 40%"></v-select>
      <v-select :options="episodes" style="width: 40%"></v-select>
    </div>
    <div class="event-details">
      事件详情
    </div>
  </div>
</template>
<script>
export default {
  data: function () {
    return {
      seasons: [1, 2, 3, 4, 5, 6, 7],
      episodes: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/var.scss';
.events-wrapper {
  position: fixed;
  top: 10vh;
  left: 2vw;
  // height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .events-select {
    display: flex;
    height: 30vh;
    width: 20vw;
    background-color: $primer-color;
  }
  .event-details {
    height: 30vh;
    background-color: $text-color;
  }
}
</style>

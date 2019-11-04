<template>
  <div class="events-wrapper" v-if="$store.state.eventsShow">
    <div class="title">Select Events!</div>
    <div>
      <div class="select-way" @click="chooseWay(0)">Series</div>
      <div class="select-way" @click="chooseWay(1)">Timeline</div>
    </div>
    <div class="events-select" v-if="$store.state.waysShow.seriesShow">
      <div>seasons</div>
      <v-select :options="seasons" style="width: 30%" v-model="season"></v-select>
      <div>episodes</div>
      <v-select :options="episodes" style="width: 30%" v-model="episode"></v-select>
    </div>
    <div class="events-list">
      <div v-for="(event, index) in selectedEvents"
        :key="`selectedEvents-${index}`"
        @click="showDetails(event.id)">
        {{ event.name }}
      </div>
    </div>
    <div class="event-details">
      <div class="item" v-for="(item, index) in itemList" :key="`itemList-${index}`">
        {{ item }} : {{ eventDetails[index] }}
      </div>
      <button @click="fly">Fly to</button>
    </div>
  </div>
</template>
<script>
import Events from '@/data/events.js'
export default {
  data: function () {
    return {
      seasons: [1, 2, 3, 4, 5, 6, 7],
      episodes: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      allEvents: Events,
      season: 1,
      episode: 1,
      itemList: ['Name', 'Place', 'Position', 'Begin', 'End', 'Families', 'Organizations', 'Characters', 'Death'],
      eventDetails: []
    }
  },
  computed: {
    selectedEvents () {
      return this.allEvents.filter(event => {
        return event.source_season === this.season & event.source_episode === this.episode
      })
    }
  },
  methods: {
    showDetails: function (id) {
      this.eventDetails = []
      var event = this.selectedEvents.filter(event => {
        return event.id === id
      })
      this.eventDetails.push(event[0].name)
      this.eventDetails.push(event[0].place)
      this.eventDetails.push(event[0].position)
      this.eventDetails.push(event[0].beginTime)
      this.eventDetails.push(event[0].endTime)
      this.eventDetails.push(event[0].families)
      this.eventDetails.push(event[0].organizations)
      this.eventDetails.push(event[0].characters)
      this.eventDetails.push(event[0].death)
      console.log(this.eventDetails)
    },
    fly: function () {
      var center = this.eventDetails[2]
      this.$store.commit('fly', center)
    },
    chooseWay: function (way) {
      switch (way) {
        case 0:
          this.$store.commit('changeEventWay', {
            series: true,
            timeLine: false
          })
          break
        case 1:
          this.$store.commit('changeEventWay', {
            series: false,
            timeLine: true
          })
          break
        default:
          break
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/var.scss';
.events-wrapper {
  position: fixed;
  top: 12vh;
  left: 2vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .title {
    display: flex;
    justify-content: center;
    font-size: 30px;
    color: $primer-color;
    margin-bottom: 10px;
  }
  .events-select {
    display: flex;
    width: 18vw;
    background-color: $primer-color;
  }
  .select-way {
    color: $primer-color;
    line-height: 2.4rem;
    cursor: pointer;
  }
  .events-list {
    background-color: $primer-color;
    cursor: pointer;
  }
  .event-details {
    margin-top: 24px;
    height: 30vh;
    background-color: $primer-color;
    max-width: 18vw;
    .item {
      border-top: 1px solid $text-color;
    }
  }
}
</style>

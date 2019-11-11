<template>
  <div class="events-wrapper" v-if="eventsState">
    <div class="series" v-if="seriesState">
      <div class="title">Select Events!</div>
      <div class="select">
        <div>seasons </div>
        <v-select :options="seasons" style="width: 30%;" v-model="season"></v-select>
        <div>episodes </div>
        <v-select :options="episodes" style="width: 30%;" v-model="episode"></v-select>
      </div>
    </div>
    <time-line @changeSelectWay="changeSelectWay" @changeTime="changeTime"/>
    <div class="events-list" v-if="eventListState">
      <div class="content">
        <span
          v-for="(event, index) in selectedEvents"
          :key="`selectedEvents-${index}`"
          @click="showDetails(event.id)">
          {{ event.name }}
        </span>
      </div>
    </div>
    <div class="event-details" v-if="eventDetailsState">
      <div class="name" @click="fly">{{ eventName }}</div>
      <div class="details">
        <div class="item" v-for="(item, index) in itemList" :key="`itemList-${index}`">
        <span style="margin-right: 10px">{{ item }}:</span>
        <span>{{ eventDetails[index] }}</span>
      </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import Events from '@/data/events.json'
import TimeLine from '@/components/TimeLine'
export default {
  data: function () {
    return {
      Events,
      seasons: [1, 2, 3, 4, 5, 6, 7, 8],
      episodes: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      season: null,
      episode: null,
      itemList: [],
      eventDetails: [],
      time: null,
      seriesState: true,
      eventName: null
    }
  },
  components: {
    TimeLine
  },
  computed: {
    ...mapState({
      navName: 'navName'
    }),
    selectedEvents () {
      if (this.seriesState) {
        return this.Events.filter(event => {
          return event.source_season === this.season & event.source_episode === this.episode
        })
      } else {
        return this.Events.filter(event => {
          return event.beginTime <= this.time && event.endTime >= this.time
        })
      }
    },
    eventsState () {
      if (this.navName === 'Events') {
        return true
      } else {
        return false
      }
    },
    eventListState () {
      if (this.selectedEvents.length > 0) {
        return true
      } else {
        return false
      }
    },
    eventDetailsState () {
      if (this.eventName) {
        return true
      } else {
        return false
      }
    }
  },
  watch: {
    selectedEvents: function () {
      this.$store.commit('changeEvents', this.selectedEvents)
    }
  },
  methods: {
    showDetails: function (id) {
      this.eventDetails = []
      this.itemList = ['Place', 'Position', 'BeginTime', 'EndTime', 'Families', 'Organizations', 'Characters', 'Death']
      var event = this.selectedEvents.filter(event => {
        return event.id === id
      })
      this.eventName = event[0].name
      this.eventDetails.push(event[0].place)
      this.eventDetails.push(event[0].position)
      this.eventDetails.push(event[0].beginTime + ' AC')
      this.eventDetails.push(event[0].endTime + ' AC')
      this.eventDetails.push(event[0].families.join(', '))
      this.eventDetails.push(event[0].organizations.join(', '))
      this.eventDetails.push(event[0].characters.join(', '))
      this.eventDetails.push(event[0].death.join(','))
    },
    fly: function () {
      var center = this.eventDetails[1]
      this.$store.commit('fly', center)
    },
    changeTime: function (time) {
      this.time = time
    },
    changeSelectWay: function (timeLineState) {
      if (timeLineState) {
        this.seriesState = false
      } else {
        this.seriesState = true
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
  .series {
    width: 17.4vw;
    height: 108px;
    background: url('/static/img/paper3.png');
    font-family: "Palatino Linotype", "Book Antiqua", Palatino, serif;
    .title {
      display: flex;
      justify-content: center;
      font-size: 30px;
      color: $text-color;
      text-shadow: 6px 6px 6px #6500007d;
      margin-bottom: 20px;
    }
    .select {
      display: flex;
    }
  }
  .events-list {
    margin-top: 24px;
    height: 200px;
    width: 300px;
    background: url('/static/img/paper2.png');
    background-size: 300px;
    padding: 36px 14px 30px 22px;
    line-height: 2rem;
    font-family: "Palatino Linotype", "Book Antiqua", Palatino, serif;
    .content {
      overflow-y: auto;
      height: 130px;
      width: 250px;
      span {
        cursor: pointer;
        display: block;
        &:hover {
          color: $second-color;
        }
      }
    }
    &::-webkit-scrollbar {
      width: 0
    }
  }
  .event-details {
    height: 380px;
    width: 300px;
    background: url('/static/img/paper.png');
    background-size: 300px;
    position: fixed;
    top: 14vh;
    right: 6vw;
    padding: 60px 26px 40px 26px;
    font-family: "Palatino Linotype", "Book Antiqua", Palatino, serif;
    .name {
      font-size: 20px;
      display: flex;
      justify-content: center;
      cursor: pointer;
      &:hover {
        color: $second-color;
      }
    }
    .details {
      height: 230px;
      width: 240px;
      overflow-y: auto;
      .item {
        font-size: 16px;
        line-height: 1.8rem;
      }
    }
  }
}
</style>

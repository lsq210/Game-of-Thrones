<template>
  <div class="nav-wrapper" :style="{bottom: bottom + 'px'}">
    <div class="nav-bar">
      <div
        v-for="(navItem, index) in navList"
        :key="'nav-item-' + index"
        class="nav-item">
        <img class="nav-img" :src="navItem.img"/>
        <span class="nav-title">{{ navItem.title }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      bottom: -100,
      navList: [
        {
          title: 'Families',
          img: '/static/houses/Stark.webp'
        },
        {
          title: 'Characters',
          img: '/static/characters/JonSnow.webp'
        },
        {
          title: 'Cities',
          img: '/static/cities/Braavos.webp'
        },
        {
          title: 'Events',
          img: '/static/events/RedWedding.webp'
        },
        {
          title: 'Wars',
          img: '/static/wars/ConquestOfDorne.webp'
        }
      ]
    }
  },
  mounted () {
    setTimeout(() => { this.bottom = 36 }, 2000)
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/var.scss';

$nav-height: 100px;

.nav-wrapper {
  position: fixed;
  width: 100vw;
  transition: bottom 1.5s cubic-bezier(0.19, 1, 0.22, 1);
  display: flex;
  justify-content: center;
  .nav-bar {
    height: $nav-height;
    background-color: #e7d9ce;
    background-image: url('/static/envelope.png');
    background-size: contain;
    border-radius: 8px;
    filter: drop-shadow(2px 4px 6px black);
    display: flex;
    .nav-item {
      margin: 12px 30px;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      filter: drop-shadow(2px 4px 6px black);
      &:hover {
        filter: drop-shadow(4px 6px 8px black);
      }
      &:first-child {
        margin-left: 40px;
      }
      &:last-child {
        margin-right: 40px;
      }
      .nav-img {
        width: $nav-height - 46px;
        height: $nav-height - 40px;
        border-radius: 8px;
      }
      .nav-title {
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

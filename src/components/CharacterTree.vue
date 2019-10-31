<template>
  <div class="CharacterTree-wrapper" v-if="$store.state.charactersShow">
    <div class="CharacterTree">
    </div>
  </div>
</template>

<script>
import characters from '@/data/characters'

export default {
  data () {
    return {
      characters: characters
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/var.scss';

.CharacterTree-wrapper {
  position: fixed;
  top: 10;
  left: 10;
  height: 100vh;
  width: 300vh;
  border: 3px;
  background-color: #9f997f;
}
</style>

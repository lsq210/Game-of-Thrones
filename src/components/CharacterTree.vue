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
  top: 10px;
  left: 10px;
  height: 80vh;
  width: 30vh;
  border: 3px;
  background-color: #9f997f;
}
</style>

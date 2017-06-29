<template>
  <div class="top_panel">
    <search/>
    <div>
      <bell/>
      <user-name/>
    </div>
  </div>
</template>

<script>
import Search from './Search.vue';
import Bell from './Bell.vue';
import UserName from './UserName.vue';

export default {
  components: {
    Search,
    Bell,
    UserName
  }
}
</script>

<style lang="sass">

  @import "../../../configs/styles_config.sass"

  .top_panel
    width: calc(100% - 260px)
    display: flex
    position: fixed
    align-items: center
    justify-content: space-between
    top: 0
    right: 0
    background: #fff
    box-shadow: 1px 2px 5px $trans-black
    z-index: 1

    & > div
      display: flex
      justify-content: space-between

</style>

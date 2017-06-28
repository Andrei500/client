<template>
<label
  @click="toggleActive()"
  :class="['vue-switcher', { 'vue-switcher--unchecked': !enabled, 'vue-switcher--disabled': disabled }]">
  <input type="checkbox" :disabled="disabled" v-model="enabled">
  <div></div>
</label>
</template>

<script>
export default {
  props: {
    selected: {
      default: false
    },

    disabled: {
      default: false
    }
  },

  data() {
    return {
      enabled: !!this.selected
    }
  },

  watch: {
    enabled(val) {
      this.$emit('input', val);
    },

    selected(val) {
      this.enabled = !!val;
    }
  },

  methods: {
    toggleActive() {
      this.enabled = !this.enabled;
    }
  }
}
</script>


<style lang="sass">

@import "../../configs/styles_config.sass"

.vue-switcher
    position: relative
    display: inline-block

    & input
      opacity: 0
      width: 100%
      height: 100%
      position: absolute
      z-index: 1
      cursor: pointer


    & div
      height: 20px
      width: 40px
      position: relative
      border-radius: 30px
      display: flex
      align-items: center
      justify-content: flex-start
      cursor: pointer
      transition: all ease .4s
      background-color: $primary-color

      &:after
        content: ''
        height: 16px
        width: 16px
        border-radius: 50%
        display: block
        transition: all ease .3s
        position: absolute
        left: 21px
        cursor: pointer
        top: 2px
        background-color: #fff

    &--unchecked
      div
        justify-content: flex-end
        background-color: $hard

        &:after
          left: 3px
          background-color: #fff

    &--disabled
      div
        opacity: .3

      input
        cursor: not-allowed

</style>

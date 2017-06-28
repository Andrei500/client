<template>
  <div>
    <button @click="dec()">-</button>
    <input
      type="number"
      min="1"
      v-model="count"
      @keydown.right="inc()"
      @keydown.left="dec()">
    <button @click="inc()">+</button>
    <span>{{ title }}</span>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: Number,
      default: 0
    },
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      count: 0
    }
  },
  watch: {
    count(value) {
      this.$emit('input', value);
    }
  },
  methods: {
    inc() {
      if (this.count >= 0) this.count++;
    },
    dec() {
      if (this.count > 1) this.count--;
    }
  },
  mounted() {
    this.count = this.value;
  }
}
</script>
<style lang="sass" scoped>

@import "../../configs/styles_config.sass"

div
  display: inline-flex
  flex-wrap: wrap
  align-items: center
  margin-left: 20px

  & span
    margin-left: 10px

  & input
    width: 25px
    height: 25px
    outline: none
    border: none
    border-top: 1px solid $medium
    border-bottom: 1px solid $medium
    text-align: center

    &::-webkit-inner-spin-button
      -webkit-appearance: none


  & button
    border: 1px solid $medium
    outline: none
    background: $light
    height: 25px
    width: 20px
    cursor: pointer
    transition: all .3s ease

    &:hover
      background: $medium

    &:first-of-type
      border-radius: 5px 0 0 5px

    &:last-of-type
      border-radius: 0 5px 5px 0

</style>

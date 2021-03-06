<template>

  <!-- # Кастомный select -->

<div :style="{ width }">

  <!-- Выбранное значение -->
  <a href="#" ref="select" :class="['select', { 'active': showList }]"
    @mousedown.prevent="onClick()"
    @focus="onFocus()"
    @blur="onBlur()"
    @keydown.down="onDownKey()"
    @keydown.up="onUpKey()"
    @keydown.enter="onEnterKey()"
    @keydown.esc="onEscape()">
    <span>{{ selected.name }}</span>
    <i class="icon-chevron"></i>
  </a>

  <!-- Список вариантов -->
  <div class="list_wrap">
    <transition name="to-bottom">

      <ul v-if="showList" ref="list">
        <li
          v-for="(option, index) in options"
          :class="[selectIndex === index ? 'active_item': '']"
          @mousedown.prevent="select(option)">
          {{ option.name }}
        </li>
      </ul>

    </transition>
  </div>
</div>
</template>

<script>
export default {
  props: {
    autofocus: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: '100%'
    },
    options: {
      type: Array,
      default() {
        return [
          { value: 1, name: 'Option 1' },
          { value: 2, name: 'Option 2' },
          { value: 1, name: 'Option 3' }
        ];
      }
    }
  },

  data() {
    return {
      showList: false,
      selected: {
        value: 0,
        name: ''
      },
      selectIndex: 0
    }
  },

  watch: {
    options(options) {
      this.select(options[0]);
    }
  },

  methods: {
    select(option) {
      this.selected = option;
      this.$emit('input', option);
      this.$refs.select.blur();
    },
    onFocus() {
      this.showList = true;
    },
    onBlur() {
      this.selectIndex = 0;
      this.showList = false;
    },
    onClick() {
      if (!this.showList) this.$refs.select.focus();
      else this.$refs.select.blur();
    },

    onDownKey() {
      if (this.options.length -1 > this.selectIndex) this.selectIndex++;
    },
    onUpKey() {
      if (this.selectIndex > 0) this.selectIndex--;
    },
    onEnterKey() {
      this.select(this.options[this.selectIndex]);
    },
    onEscape() {
      this.$refs.select.blur();
    }
  },

  mounted() {
    this.select(this.options[0]);
    if (this.autofocus) this.$refs.select.focus();
  },

  destroyed() {
    this.$emit('destroy');
  }
}
</script>

<style lang="sass" scoped>

@import "../../configs/styles_config.sass"

.to-bottom-enter-active, .to-bottom-leave-active
  transition: all .2s linear

.to-bottom-enter, .to-bottom-leave-to
  transform: translateY(-100%)

div
  position: relative
  display: inline-block

.select
  display: flex
  justify-content: space-between
  align-items: center
  text-decoration: none
  background: #fff
  border-radius: 3px
  padding: 12px 15px
  font-weight: 500
  border: 1px solid $medium
  height: 40px
  color: $dark

  & span
    display: inline-block
    font-weight: 500
    width: calc(100% - 20px)
    white-space: nowrap
    overflow: hidden
    text-overflow: ellipsis

  &:focus
    outline: none

  &.active
    border-radius: 3px 3px 0 0
    border-bottom-color: transparent
    z-index: 7

    & i::before
      transform: rotate(-180deg)

.list_wrap
  position: absolute
  width: 100%
  overflow: hidden
  z-index: 7
  transition: all .3s linear

ul
  list-style: none
  background: #fff
  z-index: 5
  border: 1px solid $medium
  border-top: none
  border-radius: 0 0 3px 3px
  overflow: hidden

  & li
    padding: 10px 15px
    cursor: pointer
    height: 38px
    border-top: 1px solid $medium
    white-space: nowrap
    overflow: hidden
    text-overflow: ellipsis
    z-index: 5

    &:hover
      background: $light

.active_item
  background: $light

i
  margin-left: 6px

  &::before
    transition: all .3s ease

</style>

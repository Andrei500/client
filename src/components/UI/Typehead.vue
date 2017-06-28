<template>
<div :style="{ width }">
  <input
    type="text"
    ref="select"
    :class="['select', { 'active': showList }]"
    @input="onInput()"
    @mousedown.prevent="onClick()"
    @focus="onFocus()"
    @blur="onBlur()"
    @keydown.down="onDownKey()"
    @keydown.up="onUpKey()"
    @keydown.enter="onEnterKey()"
    @keydown.esc="onEscape()"
    v-model="search">
  <span @mousedown.prevent="onClick()" v-if="!showList" ref="text">{{ selected.name }}
    <sup class="extendValue" v-if="extendValue">{{ selected[extendValue] }}</sup>
  </span>
  <i @mousedown.prevent="onClick()" class="icon-chevron"></i>

  <div class="list_wrap">
    <transition name="to-bottom">
      <ul v-if="showList" ref="list">
        <li :class="[selectIndex === index ? 'active_item': '']"
          v-for="(option, index) in filteredOptions"
          @mousedown.prevent="select(option)">
          {{ option.name }}
          <sup class="extendValue" v-if="extendValue">{{ option[extendValue] }}</sup>
        </li>
        <li v-if="!filteredOptions">Город не найден...</li>
      </ul>
    </transition>
  </div>
</div>
</template>

<script>
export default {
  props: {
    width: {
      type: String,
      default: '100%'
    },
    options: {
      type: Array,
      default() {
        return [
          {
            name: 'Option 1',
            value: 1
          },
          {
            name: 'Option 2',
            value: 2
          },
          {
            name: 'Option 3',
            value: 3
          }
        ];
      }
    },
    extendValue: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      showList: false,
      search: '',
      selected: {},
      selectIndex: 0
    }
  },

  watch: {
    options(options) {
      this.select(options[0]);
    }
  },

  computed: {
    filteredOptions() {
      const
        search = this.search,
        filteredOptions = this.options.filter((option) => {
            const pathOfCityName = option.name.split('').slice(0, search.length).join('');
            if (search.toLowerCase() === pathOfCityName.toLowerCase()) return option;
        });

      return (filteredOptions.length) ? filteredOptions : false;
    }
  },

  methods: {
    select(option) {
      this.selected = option;
      this.$emit('input', option);
      this.$refs.select.blur();
    },
    onClick() {
      if (this.showList) this.$refs.select.blur();
      else this.$refs.select.focus();
    },
    onFocus() {
      this.showList = true;
    },
    onBlur() {
      this.search = '';
      this.selectIndex = 0;
      this.$refs.list.scrollTop = 0;
      this.showList = false;
    },
    onDownKey() {
      if (this.filteredOptions.length -1 > this.selectIndex) {
        this.selectIndex++;
        if (this.selectIndex > 2) this.$refs.list.scrollTop += this.$refs.list.children[0].clientHeight;
      }
    },
    onUpKey() {
      if (this.selectIndex > 0) {
        this.selectIndex--;
        if (this.selectIndex < (this.filteredOptions.length -2 )) this.$refs.list.scrollTop -= this.$refs.list.children[0].clientHeight;
      }
    },
    onEnterKey() {
      this.select(this.filteredOptions[this.selectIndex]);
    },
    onEscape() {
      this.$refs.select.blur();
    },
    onInput() {
      this.selectIndex = 0;
      this.$refs.list.scrollTop = 0;
    }
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
  width: 100%
  cursor: pointer

  &:focus
    outline: none

  &.active
    border-radius: 3px 3px 0 0
    border-bottom: none
    z-index: 7

    & + i::before
      transform: rotate(-180deg)

i
  position: absolute
  margin-left: 6px
  top: 13px
  right: 16px
  cursor: pointer

  &::before
    transition: all .3s ease

span
  font-weight: 500
  position: absolute
  top: 13px
  left: 16px
  cursor: pointer

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
  overflow-x: hidden
  overflow-y: auto
  max-height: 190px

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

.extendValue
  color: $hard
  font-size: 10px

</style>

<template>
<div :style="{ width }">
  <input
    ref="input"
    autocomplete="off"
    :disabled="disabled"
    :type="type"
    :min="(type === 'number') ? 0 : false"
    v-mask="regEx"
    :value="value || ''"
    @focus="addPlus()"
    @input="setValue($event.target.value)">
  <label
    @click="focusToInput()"
    :class="{ active : !!value  }">
    {{ placeholder }}
  </label>
</div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: ''
    },
    mask: {
      type: String,
      default: ''
    },
    autofocus: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: '100%'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: [Number, String],
      default: ''
    }
  },
  computed: {
    regEx() {
      const mask = this.mask;
      if (mask) {
        let exp;
        switch (mask) {
          case 'tel':
            exp = (this.value[1] == 3) ? '+## (###) ###-##-##' : '+# (###) ###-##-##';
            break;
        }
        return exp;
      } else return false;
    }
  },
  methods: {
    setValue(value) {
      this.$emit('input', value);
    },
    addPlus() {
      if (this.mask == 'tel') {
        if (!this.value) this.setValue('+');
        else return;
      } else return;
    },
    focusToInput() {
      this.$refs.input.focus();
    }
  },
  mounted() {
    if (this.autofocus) this.focusToInput();
  },
  destroyed() {
    this.$emit('destroy');
  }
}
</script>

<style lang="sass" scoped>

@import "../../configs/styles_config.sass"

div
  position: relative
  height: 40px
  line-height: 40px
  display: inline-block

input
  border: none
  box-shadow: none
  border-bottom: 1px solid $medium
  outline: none
  width: 100%
  background: transparent
  padding: 17px 0 7px
  height: 40px
  transition: all .3s ease
  text-overflow: ellipsis

  &:focus
    padding: 17px 0 6px
    border-bottom: 2px solid $primary-color

  &:disabled
    color: $hard

    & + label
      opacity: .5
      cursor: default

label
  top: 16px
  line-height: 16px
  color: $hard
  position: absolute
  left: 0
  cursor: text
  transition: .2s ease-out

input:focus + label
  color: $primary-color

input:focus + label, .active
  font-size: 11px
  position: absolute
  top: -2px
  cursor: text

</style>

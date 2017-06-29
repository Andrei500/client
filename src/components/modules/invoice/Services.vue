<template>

  <!-- # Форма ввода доп услуги и доп информации -->

<div class="field_wrap">

  <div class="title">
    <h4>Дополнительно</h4>
  </div>

  <div class="checkbox_wrap">
    <checkbox
      title="Упаковка"
      v-model="more.pack">
    </checkbox>
    <checkbox
      title="Обратная доставка"
      v-model="more.sendBack.active">
    </checkbox>
  </div>

  <select-comp
    v-if="more.sendBack.active"
    autofocus
    :options="typesOfLoad"
    v-model="more.sendBack.type"
    @destroy="more.sendBack.type = {}"
    width="210px">
  </select-comp>

  <transition name="to-down">
    <field
      v-if="more.sendBack.type.value === 2"
      type="text"
      placeholder="Сумма, р"
      autofocus
      v-model.number="more.sendBack.sum"
      @destroy="more.sendBack.sum = 0"
      width="210px">
    </field>
  </transition>

  <textarea
    :class="{ active: more.sendBack.active }"
    v-model="more.description"
    placeholder="Дополнительная информация...">
  </textarea>
</div>
</template>

<script>
import Field from '../../UI/Field.vue';
import SelectComp from '../../UI/SelectComp.vue';
import Checkbox from '../../UI/Checkbox.vue';

export default {
  data() {
    return {
      more: {
        pack: false,
        sendBack: {
          active: false,
          type: {
            name: '',
            value: 0
          },
          sum: 0
        },
        description: ''
      }
    }
  },

  watch: {
    more: {
      handler() {
        this.$emit('input', this.more);
      },
      deep: true
    }
  },

  computed: {
    typesOfLoad() {
      return [
        { value: 0, name: 'Груз' },
        { value: 1, name: 'Документ' },
        { value: 2, name: 'Ценные бумаги' }
      ];
    }
  },

  components: {
    Field,
    SelectComp,
    Checkbox
  }
}
</script>

<style lang="sass" scoped>

@import "../../../configs/styles_config.sass"

.checkbox_wrap
  width: 210px
  margin-top: -7px

  & > div
    margin-bottom: 8px

textarea
  width: 440px
  outline: none
  padding: 10px 15px
  border-radius: 5px
  border: 1px solid $medium
  margin-bottom: 0
  resize: none
  transition: all .3s ease
  height: 100px
  position: absolute
  left: 20px
  bottom: 20px

  &.active
    height: 40px

  &:focus
    border-color: $primary-color

</style>

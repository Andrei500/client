<template>
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
    v-if="more.sendBack.active.value"
    autofocus
    width="210px"
    :options="typesOfLoad"
    v-model="more.sendBack.type"
    @destroy="more.sendBack.type = {}">
  </select-comp>
  <transition name="to-down">
    <field
      v-if="more.sendBack.type.value === 2"
      width="210px"
      type="text"
      placeholder="Сумма, р"
      autofocus
      v-model="more.sendBack.sum"
      @destroy="more.sendBack.sum = 0">
    </field>
  </transition>
  <textarea
    :class="{ active: more.sendBack.active.value }"
    v-model="more.description"
    placeholder="Дополнительная информация...">
  </textarea>
</div>
</template>

<script>
import Field from '../UI/Field.vue';
import SelectComp from '../UI/SelectComp.vue';
import Checkbox from '../UI/Checkbox.vue';

export default {
  data() {
    return {
      more: {
        pack: false,
        sendBack: {
          active: false,
          type: {},
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
        {
          name: 'Груз',
          value: 0
        },
        {
          name: 'Документ',
          value: 1
        },
        {
          name: 'Ценные бумаги',
          value: 2
        }
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

@import "../../configs/styles_config.sass"

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
  bottom: 20px

  &.active
    height: 40px

  &:focus
    border-color: $primary-color

</style>

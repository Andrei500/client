<template>

  <!-- # Форма ввода данных о грузе -->

<div class="field_wrap">

  <div class="title">
    <h4>Груз</h4>
    <number v-model="load.countOfSeats" :title="formOfWord"></number>
  </div>

  <select-comp
    :options="typesOfLoad"
    v-model="load.type"
    @input="changeType($event); focusToNext('description')"
    width="210px">
  </select-comp>

  <field
    ref="description"
    type="text"
    placeholder="Описание"
    v-model="load.description">
  </field>

  <field
    type="number"
    placeholder="Вес, кг"
    :disabled="load.type.value !== 0"
    v-model.number="load.weight"
    width="72px">
  </field>

  <field
    type="number"
    placeholder="Д, см"
    :disabled="load.type.value !== 0"
    v-model.number="load.length"
    width="72px">
  </field>

  <field
    type="number"
    placeholder="Ш, см"
    :disabled="load.type.value !== 0"
    v-model.number="load.width"
    width="72px">
  </field>

  <field
    type="number"
    placeholder="В, см"
    :disabled="load.type.value !== 0"
    v-model.number="load.height"
    width="72px">
  </field>

  <field
    type="number"
    placeholder="Цена, р"
    :disabled="load.type.value === 1"
    v-model.number="load.price"
    width="72px">
  </field>

</div>
</template>

<script>
import Field from '../../UI/Field.vue';
import SelectComp from '../../UI/SelectComp.vue';
import Number from '../../UI/Number.vue';

export default {
  data() {
    return {
      load: {
        countOfSeats: 1,
        type: {},
        description: '',
        weight: 0,
        length: 0,
        width: 0,
        height: 0,
        price: 0
      }
    }
  },

  watch: {
    load: {
      handler(load) {
        this.$emit('input', load);
      },
      deep: true
    }
  },

  computed: {
    formOfWord() {
      let word = 'мест';
      if (this.load.countOfSeats === 1) word = 'место';
      if (this.load.countOfSeats > 1 && this.load.countOfSeats < 5) word = 'места';

      return word;
    },
    typesOfLoad() {
      return [
        { value: 0, name: 'Груз' },
        { value: 1, name: 'Документ' },
        { value: 2, name: 'Ценные бумаги' }
      ];
    }
  },
  methods: {
    changeType(type) {
      if (type.value === 0 || type.value === 2) {
        this.load.weight = 0;
        this.load.length = 0;
        this.load.width = 0;
        this.load.height = 0;
        this.load.price = 500;
      }
      if (type.value === 1) {
        this.load.weight = 1;
        this.load.length = 30;
        this.load.width = 21;
        this.load.height = 1;
        this.load.price = 100;
      }
    }
  },
  components: {
    Field,
    SelectComp,
    Number
  }
}
</script>

<template>
<div class="field_wrap">

  <div class="title">
    <h4>{{ title }}</h4>
    <checkbox
      @focus="focusToNext('phone')"
      size="12px"
      title="юр. лицо"
      v-model="client.jur.is">
    </checkbox>
  </div>

  <field
    ref="phone"
    width="210px"
    type="text"
    placeholder="Телефон"
    v-model="client.phone"
    mask="tel">
  </field>

  <field
    v-if="client.jur.is.value"
    :width="(client.jur.is.value) ? '210px' : ''"
    type="text"
    placeholder="Организация"
    v-model="client.jur.org">
  </field>

  <field
    :width="(client.jur.is.value) ? '210px' : '100%'"
    type="text"
    :placeholder="(client.jur.is.value) ? 'Представитель' : 'Фамилия Имя Отчество'"
    v-model="client.name">
  </field>

  <typehead
    extendValue="region"
    width="210px"
    :options="cities"
    v-model="client.adress.city"
    @input="focusToNext('adress')">
  </typehead>

  <field
    v-if="isCur"
    ref="adress"
    width="210px"
    type="text"
    placeholder="Адрес"
    v-model="client.adress.adress.name">
  </field>

  <select-comp
    v-else
    ref="adress"
    width="210px"
    :options="terminals"
    v-model="client.adress.adress"
    @destroy="client.adress.adress.name = ''">
  </select-comp>

  <template v-if="!hiddenDocsFields">
    <select-comp
      width="210px"
      :options="docsToSelect"
      v-model="client.docs.type"
      @input="focusToNext('series')">
    </select-comp>

    <field
      ref="series"
      width="95px"
      type="text"
      placeholder="Серия"
      v-model="client.docs.series">
    </field>

    <field
      width="95px"
      type="text"
      placeholder="Номер"
      v-model="client.docs.number">
    </field>
  </template>

</div>
</template>

<script>
import Field from '../UI/Field.vue';
import SelectComp from '../UI/SelectComp.vue';
import Checkbox from '../UI/Checkbox.vue';
import Typehead from '../UI/Typehead.vue';

export default {
  props: {
    title: {
      type: String,
      default: 'Заголовок'
    },
    cities: {
      type: Array,
      default () {
        return [];
      }
    },
    isCur: {
      type: Boolean,
      default: false
    },
    hiddenDocsFields: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      client: {
        jur: {
          is: {},
          org: ''
        },
        phone: '+',
        name: '',
        docs: {
          type: {},
          series: '',
          number: 0
        },
        adress: {
          city: {},
          adress: ''
        }
      },
      docsToSelect: [{
          name: 'Паспорт',
          value: 1
        },
        {
          name: 'Водительские права',
          value: 2
        },
        {
          name: 'Пенсионное',
          value: 3
        },
        {
          name: 'Военный билет',
          value: 4
        },
        {
          name: 'Студенческий билет',
          value: 5
        }
      ]
    }
  },
  computed: {
    terminals() {
      if (this.client.adress.city.terminals) {
        return this.client.adress.city.terminals.map((terminal) => {
          return {
            name: 'отд. №' + terminal.num + ', ' + terminal.adress
          };
        });
      }
    }
  },

  methods: {
    addOffset(who, val) {
      const
        el = this.$refs[who],
        className = 'with_offset';

      if (val) el.classList.add(className);
      else el.classList.remove(className);
    }
  },
  components: {
    Field,
    SelectComp,
    Checkbox,
    Typehead
  },
  updated() {
    this.$emit('input', this.client);
  }
}
</script>

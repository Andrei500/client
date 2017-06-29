<template>

  <!-- # Форма ввода данных отправителя/получателя -->

<div class="field_wrap">

  <div class="title">
    <h4>{{ title }}</h4>
    <checkbox
      @focus="focusToNext('phone')"
      font-size="12px"
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
    v-if="!!client.jur.is.value"
    type="text"
    placeholder="Организация"
    v-model="client.jur.org"
    :width="(!!client.jur.is.value) ? '210px' : ''">
  </field>

  <field
    type="text"
    :placeholder="(client.jur.is.value) ? 'Представитель' : 'Фамилия Имя Отчество'"
    v-model="client.name"
    :width="(client.jur.is.value) ? '210px' : '100%'">
  </field>

  <typehead
    extendValue="region"
    :options="cities"
    v-model="client.adress.city"
    @input="focusToNext('adress')"
    width="210px">
  </typehead>

    <field
      v-if="isCur"
      ref="adress"
      type="text"
      placeholder="Адрес"
      v-model="client.adress.adress.name"
      width="210px">
    </field>

    <select-comp
      v-else
      ref="adress"
      width="210px"
      :options="terminals"
      v-model="client.adress.adress"
      @destroy="client.adress.adress.name = ''">
    </select-comp>

  <!-- Поля для докуентов -->
  <template v-if="!hiddenDocsFields">
    <select-comp
      width="210px"
      :options="docsToSelect"
      v-model="client.docs.type"
      @input="focusToNext('series')">
    </select-comp>

    <field
      ref="series"
      type="text"
      placeholder="Серия"
      v-model="client.docs.series"
      width="95px">
    </field>

    <field
      type="text"
      placeholder="Номер"
      v-model.number="client.docs.number"
      width="95px">
    </field>
  </template>

</div>
</template>

<script>
import Field from '../../UI/Field.vue';
import SelectComp from '../../UI/SelectComp.vue';
import Checkbox from '../../UI/Checkbox.vue';
import Typehead from '../../UI/Typehead.vue';

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
          is: {
            name: '',
            value: 0
          },
          org: ''
        },

        phone: '+',
        name: '',
        docs: {
          type: {
            name: '',
            value: 0
          },
          series: '',
          number: 0
        },

        adress: {
          city: {
            name: '',
            value: 0
          },
          adress: ''
        }
      },
      docsToSelect: [
        { value: 1, name: 'Паспорт' },
        { value: 2, name: 'Водительские права' },
        { value: 3, name: 'Пенсионное' },
        { value: 4, name: 'Военный билет' },
        { value: 5, name: 'Студенческий билет' }
      ]
    }
  },

  watch: {
    client: {
      handler(client) {
        this.$emit('input', client);
      },
      deep: true
    }
  },

  computed: {

    // Список отделений выбранного города
    terminals() {
      const terminals = this.client.adress.city.terminals;

      if (!!terminals.length) {
        return terminals.map(terminal => {
          return {
            name: `отд. №${terminal.num}, ${terminal.adress}`
          };
        });
      } else return [];
    }
  },

  components: {
    Field,
    SelectComp,
    Checkbox,
    Typehead
  }
}
</script>

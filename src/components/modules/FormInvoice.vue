<template>
<div ref="invoice_form" class="invoice_form">
  <div class="header">
    <div class="title_wrap">
      <h3><i class="icon-add_ttn"></i>Создание накладной</h3>
        <p>Доставка:</p>
        <select-comp
          width="170px"
          :options="typesOfDelivery"
          v-model="typeOfDelivery">
        </select-comp>

        <p>Оплата:</p>
        <select-comp
          width="170px"
          :options="typesOfPayer"
          v-model="payer.who">
        </select-comp>

        <p style="margin: 0 20px 0 0"></p>

        <transition name="to-down">
          <field
            v-if="payer.who.value === 3"
            width="160px"
            type="text"
            placeholder="Организация"
            v-model="payer.name"
            autofocus>
          </field>
        </transition>
    </div>
    <button @click="$emit('close')"><i class="icon-close"></i></button>
  </div>
  <div class="clients_wrap">
    <client
      title="Отправитель"
      v-model="sender"
      :isCur="isCurFrom"
      :cities="(isCurFrom) ? cities : citiesWithTerminals">
    </client>
    <client
      title="Получатель"
      v-model="getter"
      :isCur="isCurTo"
      :cities="(isCurTo) ? cities : citiesWithTerminals"
      hiddenDocsFields>
    </client>
    <load
      v-model="load"
      @addedPlace="scrollDown($refs.invoice_form, 40)">
    </load>
    <services v-model="more"></services>
  </div>

  <div class="footer">
    <div class="calc-panel">
      <span>{{ resultOfCalc.total + ' р' }}</span>
      <div v-for="sum in resultOfCalc.filteredSums" :key="sum">
        <span>{{ sum.name }}</span>
        <p>{{ sum.value + ' р'}}</p>
      </div>
    </div>
    <button-comp
      text="Распечатать"
      icon="print"
      small
      :disabled="!isValid"
      @click.native="print()">
    </button-comp>
  </div>

  <!-- <div class="invoice">
    <div class="invoice_head">
      <img src="../../assets/img/logo_invoice.jpg">
      <h2>Экспресс-накладная <br /><strong>№2030001261</strong></h2>
    </div>
    <table cellspacing="0">
      <tr>
          <td><span>Дата приема:</span> 21.06.17</td>
          <td><span>Дата доставки:</span> 23.06.17</td>
      </tr>
      <tr>
        <td>
          <table>
            <h4>Отправитель</h4>
            <tr>
              <td>Город</td><td>{{ sender.adress.city.name }}</td>
            </tr>
            <tr>
              <td>Адрес</td><td>{{ sender.adress.adress.name }}</td>
            </tr>
            <tr>
              <td>ФИО</td><td>{{ sender.name }}</td>
            </tr>
            <tr>
              <td>Телефон</td><td>{{ sender.phone }}</td>
            </tr>
          </table>
        </td>
        <td>
          <h4>Получатель</h4>
          <span>Город:</span> {{ getter.adress.city.name }} <br>
          <span>Адрес:</span> {{ getter.adress.adress.name }} <br>
          <span>ФИО:</span> {{ getter.name }} <br>
          <span>Телефон:</span> {{ getter.phone }}
        </td>
      </tr>
    </table>
  </div> -->

</div>
</template>

<script>
import config from '../../configs/main_app_config.js';
import Field from '../UI/Field.vue';
import Client from '../modules/Client.vue';
import Load from '../modules/Load.vue';
import Services from '../modules/Services.vue';
import SelectComp from '../UI/SelectComp.vue';
import ButtonComp from '../UI/ButtonComp.vue';

export default {
  data() {
    return {
      typeOfDelivery: {},
      payer: {
        who: {},
        name: ''
      },
      sender: {
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
          city: {
            name: '',
            value: 0
          },
          adress: ''
        }
      },
      getter: {
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
          city: {
            name: '',
            value: 0
          },
          adress: ''
        }
      },
      load: {
        countOfSeats: 1,
        type: {},
        description: '',
        weight: 0,
        length: 0,
        width: 0,
        height: 0,
        price: 0
      },
      more: {
        pack: {
          name: '',
          value: false
        },
        sendBack: {
          active: false,
          type: {},
          sum: 0
        },
        description: ''
      },

      tables: {
        TZ: [
     //    0  1  2  3  4  5  6  7  8  9  10 11 12 13 14 15 16 17 18 19 20 21 22 23
          [1, 3, 4, 4, 4, 3, 3, 3, 2, 3, 3, 3, 4, 3, 4, 3, 3, 4, 3, 4, 3, 3, 3, 7], // 0  Амвросиевка
          [3, 1, 2, 4, 3, 2, 2, 2, 3, 2, 3, 4, 5, 4, 5, 3, 4, 5, 3, 2, 3, 3, 3, 7], // 1  Горловка
          [4, 2, 1, 4, 3, 2, 2, 2, 4, 2, 3, 4, 5, 4, 5, 3, 4, 5, 3, 2, 3, 3, 3, 7], // 2  Дебальцево
          [4, 4, 4, 1, 2, 4, 4, 4, 4, 4, 3, 2, 4, 2, 4, 4, 2, 4, 4, 4, 3, 4, 3, 7], // 3  Докучаевск
          [4, 3, 3, 2, 1, 3, 3, 3, 4, 3, 1, 2, 4, 2, 4, 3, 2, 4, 3, 3, 2, 3, 1, 7], // 4  Донецк
          [3, 2, 2, 4, 3, 1, 2, 2, 3, 2, 3, 4, 4, 4, 4, 3, 4, 4, 3, 2, 2, 2, 2, 7], // 5  Енакиево
          [3, 2, 2, 4, 3, 2, 1, 3, 3, 2, 3, 4, 4, 4, 4, 3, 4, 4, 3, 2, 2, 2, 2, 7], // 6  Ждановка
          [3, 2, 2, 4, 3, 2, 3, 1, 3, 3, 3, 4, 4, 4, 4, 3, 4, 4, 3, 2, 2, 2, 2, 7], // 7  Зугрес
          [2, 3, 4, 4, 4, 3, 3, 3, 1, 3, 3, 3, 4, 3, 4, 3, 3, 4, 3, 4, 3, 3, 3, 7], // 8  Иловайск
          [3, 2, 2, 4, 3, 2, 2, 3, 3, 1, 3, 4, 5, 4, 5, 3, 4, 5, 3, 2, 2, 2, 2, 7], // 9  Кировское
          [3, 3, 3, 3, 1, 3, 3, 3, 3, 3, 1, 3, 4, 3, 4, 3, 3, 4, 3, 3, 1, 3, 1, 7], // 10 Макеевка
          [3, 4, 4, 2, 2, 4, 4, 4, 3, 4, 3, 1, 4, 2, 4, 4, 2, 4, 3, 4, 3, 3, 3, 7], // 11 Моспино
          [4, 5, 5, 4, 4, 4, 4, 4, 4, 5, 4, 4, 1, 4, 2, 5, 4, 1, 5, 5, 4, 4, 4, 7], // 12 Новоазовск
          [3, 4, 4, 2, 2, 4, 4, 4, 3, 4, 3, 2, 4, 1, 4, 4, 2, 4, 3, 4, 3, 3, 3, 7], // 13 Новый свет
          [4, 5, 5, 4, 4, 4, 4, 4, 4, 5, 4, 4, 2, 4, 1, 5, 4, 2, 5, 5, 4, 4, 4, 7], // 14 Седово
          [3, 3, 3, 4, 3, 3, 3, 3, 3, 3, 3, 4, 5, 4, 5, 1, 4, 5, 2, 3, 3, 2, 3, 7], // 15 Снежное
          [3, 4, 4, 2, 2, 4, 4, 4, 3, 4, 3, 2, 4, 2, 4, 4, 1, 4, 3, 4, 3, 3, 3, 7], // 16 Старобешево
          [4, 5, 5, 4, 4, 4, 4, 4, 4, 5, 4, 4, 3, 4, 2, 5, 4, 1, 5, 5, 4, 4, 4, 7], // 17 Тельманово
          [3, 3, 3, 4, 3, 3, 3, 3, 3, 3, 3, 3, 5, 3, 5, 2, 3, 5, 1, 3, 2, 2, 3, 7], // 18 Торез
          [4, 2, 2, 4, 3, 2, 2, 2, 4, 2, 3, 4, 5, 4, 5, 3, 4, 5, 3, 1, 3, 3, 3, 7], // 19 Углегорск
          [3, 3, 3, 3, 2, 2, 2, 2, 3, 2, 1, 3, 4, 3, 4, 3, 3, 4, 2, 3, 1, 2, 2, 7], // 20 Харцызск
          [3, 3, 3, 4, 3, 2, 2, 2, 3, 2, 3, 3, 4, 3, 4, 2, 3, 4, 2, 3, 2, 1, 3, 7], // 21 Шахтерск
          [3, 3, 3, 3, 1, 2, 2, 2, 3, 2, 1, 3, 4, 3, 4, 3, 3, 4, 3, 3, 2, 3, 1, 7], // 22 Ясиноватая
          [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 1]  // 23 Ростов-на-Дону
        ],

        periods: [
     //    0  1  2  3  4  5  6  7  8  9  10 11 12 13 14 15 16 17 18 19 20 21 22 23
          [1, 3, 4, 4, 4, 3, 3, 3, 2, 3, 3, 3, 4, 3, 4, 3, 3, 4, 3, 4, 3, 3, 3, 7], // 0  Амвросиевка
          [3, 1, 2, 4, 3, 2, 2, 2, 3, 2, 3, 4, 5, 4, 5, 3, 4, 5, 3, 2, 3, 3, 3, 7], // 1  Горловка
          [4, 2, 1, 4, 3, 2, 2, 2, 4, 2, 3, 4, 5, 4, 5, 3, 4, 5, 3, 2, 3, 3, 3, 7], // 2  Дебальцево
          [4, 4, 4, 1, 2, 4, 4, 4, 4, 4, 3, 2, 4, 2, 4, 4, 2, 4, 4, 4, 3, 4, 3, 7], // 3  Докучаевск
          [4, 3, 3, 2, 1, 3, 3, 3, 4, 3, 1, 2, 4, 2, 4, 3, 2, 4, 3, 3, 2, 3, 1, 7], // 4  Донецк
          [3, 2, 2, 4, 3, 1, 2, 2, 3, 2, 3, 4, 4, 4, 4, 3, 4, 4, 3, 2, 2, 2, 2, 7], // 5  Енакиево
          [3, 2, 2, 4, 3, 2, 1, 3, 3, 2, 3, 4, 4, 4, 4, 3, 4, 4, 3, 2, 2, 2, 2, 7], // 6  Ждановка
          [3, 2, 2, 4, 3, 2, 3, 1, 3, 3, 3, 4, 4, 4, 4, 3, 4, 4, 3, 2, 2, 2, 2, 7], // 7  Зугрес
          [2, 3, 4, 4, 4, 3, 3, 3, 1, 3, 3, 3, 4, 3, 4, 3, 3, 4, 3, 4, 3, 3, 3, 7], // 8  Иловайск
          [3, 2, 2, 4, 3, 2, 2, 3, 3, 1, 3, 4, 5, 4, 5, 3, 4, 5, 3, 2, 2, 2, 2, 7], // 9  Кировское
          [3, 3, 3, 3, 1, 3, 3, 3, 3, 3, 1, 3, 4, 3, 4, 3, 3, 4, 3, 3, 1, 3, 1, 7], // 10 Макеевка
          [3, 4, 4, 2, 2, 4, 4, 4, 3, 4, 3, 1, 4, 2, 4, 4, 2, 4, 3, 4, 3, 3, 3, 7], // 11 Моспино
          [4, 5, 5, 4, 4, 4, 4, 4, 4, 5, 4, 4, 1, 4, 2, 5, 4, 1, 5, 5, 4, 4, 4, 7], // 12 Новоазовск
          [3, 4, 4, 2, 2, 4, 4, 4, 3, 4, 3, 2, 4, 1, 4, 4, 2, 4, 3, 4, 3, 3, 3, 7], // 13 Новый свет
          [4, 5, 5, 4, 4, 4, 4, 4, 4, 5, 4, 4, 2, 4, 1, 5, 4, 2, 5, 5, 4, 4, 4, 7], // 14 Седово
          [3, 3, 3, 4, 3, 3, 3, 3, 3, 3, 3, 4, 5, 4, 5, 1, 4, 5, 2, 3, 3, 2, 3, 7], // 15 Снежное
          [3, 4, 4, 2, 2, 4, 4, 4, 3, 4, 3, 2, 4, 2, 4, 4, 1, 4, 3, 4, 3, 3, 3, 7], // 16 Старобешево
          [4, 5, 5, 4, 4, 4, 4, 4, 4, 5, 4, 4, 3, 4, 2, 5, 4, 1, 5, 5, 4, 4, 4, 7], // 17 Тельманово
          [3, 3, 3, 4, 3, 3, 3, 3, 3, 3, 3, 3, 5, 3, 5, 2, 3, 5, 1, 3, 2, 2, 3, 7], // 18 Торез
          [4, 2, 2, 4, 3, 2, 2, 2, 4, 2, 3, 4, 5, 4, 5, 3, 4, 5, 3, 1, 3, 3, 3, 7], // 19 Углегорск
          [3, 3, 3, 3, 2, 2, 2, 2, 3, 2, 1, 3, 4, 3, 4, 3, 3, 4, 2, 3, 1, 2, 2, 7], // 20 Харцызск
          [3, 3, 3, 4, 3, 2, 2, 2, 3, 2, 3, 3, 4, 3, 4, 2, 3, 4, 2, 3, 2, 1, 3, 7], // 21 Шахтерск
          [3, 3, 3, 3, 1, 2, 2, 2, 3, 2, 1, 3, 4, 3, 4, 3, 3, 4, 3, 3, 2, 3, 1, 7], // 22 Ясиноватая
          [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 1]  // 23 Ростов-на-Дону
        ],

        tariff: [
          {
            min: 0,
            max: 1,
            prices: [0, 50, 55, 61, 68, 75, 83, 400],
            courierPrice: 30
          },
          {
            min: 1,
            max: 5,
            prices: [0, 65, 72, 80, 88, 97, 107, 500],
            courierPrice: 50
          },
          {
            min: 5,
            max: 10,
            prices: [0, 75, 83, 92, 102, 113, 125, 575],
            courierPrice: 60
          },
          {
            min: 10,
            max: 20,
            prices: [0, 100, 110, 121, 134, 148, 163, 700],
            courierPrice: 70
          },
          {
            min: 20,
            max: 35,
            prices: [0, 130, 143, 172, 190, 228, 251, 800],
            courierPrice: 80
          },
          {
            min: 35,
            max: 50,
            prices: [0, 150, 165, 198, 218, 262, 289, 900],
            courierPrice: 100
          },
          {
            min: 50,
            max: Infinity,
            prices: [
              [0, 0],
              [150, 0.7],
              [165, 0.8],
              [198, 1],
              [218, 1.3],
              [262, 1.5],
              [289, 1.7],
              [900, 8]
            ],
            courierPrice: 200
          }
        ]
      }
    }
  },
  computed: {
    isValid() {
      if (this.load.places) {
        const
          isValidLoad = this.load.places.every((place) => {
            return (place.type.value !== 2)  ? place.weight && place.length && place.width && place.height && place.price : !!place.price;
          }),
          s = this.sender,
          g = this.getter;

        return s.phone && s.name && s.docs.series && s.docs.number && s.adress.adress && g.phone && g.name && g.adress.adress && isValidLoad;
      }
    },
    typesOfDelivery() {
      const types = [];
      for (var i = 0; i < config.typesOfDelivery.length; i++) {
        types.push({
          name: config.typesOfDelivery[i],
          value: (i + 1)
        });
      }
      return types;
    },
    typesOfPayer() {
      return [
        {
          name: 'Отправитель',
          value: 1
        },
        {
          name: 'Получатель',
          value: 2
        },
        {
          name: 'Третье лицо...',
          value: 3
        }
      ]
    },
    cities() {
        return [{
                value: 1,
                name: 'Амвросиевка',
                region: 'ДНР',
                terminals: null
            },
            {
                value: 2,
                name: 'Горловка',
                region: 'ДНР',
                terminals: null
            },
            {
                value: 3,
                name: 'Дебальцево',
                region: 'ДНР',
                terminals: null
            },
            {
                value: 4,
                name: 'Докучаевск',
                region: 'ДНР',
                terminals: null
            },
            {
                value: 5,
                name: 'Донецк',
                region: 'ДНР',
                terminals: null
            },
            {
                value: 6,
                name: 'Енакиево',
                region: 'ДНР',
                terminals: null
            },
            {
                value: 7,
                name: 'Ждановка',
                region: 'ДНР',
                terminals: null
            },
            {
                value: 8,
                name: 'Зугрес',
                region: 'ДНР',
                terminals: null
            },
            {
                value: 9,
                name: 'Иловайск',
                region: 'ДНР',
                terminals: null
            },
            {
                value: 10,
                name: 'Кировское',
                region: 'ДНР',
                terminals: null
            },
            {
                value: 11,
                name: 'Макеевка',
                region: 'ДНР',
                terminals: [
                    {
                        num: 1,
                        adress: 'ул. 250-летия Донбасса, ост. "Универмаг"'
                    }
                ]
            },
            {
                value: 12,
                name: 'Моспино',
                region: 'ДНР',
                terminals: null
            },
            {
                value: 13,
                name: 'Новоазовск',
                region: 'ДНР',
                terminals: null
            },
            {
                value: 14,
                name: 'Новый свет',
                region: 'ДНР',
                terminals: null
            },
            {
                value: 15,
                name: 'Седово',
                region: 'ДНР',
                terminals: null
            },
            {
                value: 16,
                name: 'Снежное',
                region: 'ДНР',
                terminals: null
            },
            {
                value: 17,
                name: 'Старобешево',
                region: 'ДНР',
                terminals: null
            },
            {
                value: 18,
                name: 'Тельманово',
                region: 'ДНР',
                terminals: null
            },
            {
                value: 19,
                name: 'Торез',
                region: 'ДНР',
                terminals: null
            },
            {
                value: 20,
                name: 'Углегорск',
                region: 'ДНР',
                terminals: null
            },
            {
                value: 21,
                name: 'Харцызск',
                region: 'ДНР',
                terminals: null
            },
            {
                value: 22,
                name: 'Шахтерск',
                region: 'ДНР',
                terminals: null
            },
            {
                value: 23,
                name: 'Ясиноватая',
                region: 'ДНР',
                terminals: null
            },
            {
                value: 24,
                name: 'Ростов-на-Дону',
                region: 'РФ',
                terminals: [
                    {
                        num: 1,
                        adress: 'ул. Доватора, 148'
                    }
                ]
            }
        ]
    },
    isCurFrom() {
      return (this.typeOfDelivery.value === 1 || this.typeOfDelivery.value === 2) ? false : true;
    },
    isCurTo() {
      return (this.typeOfDelivery.value === 1 || this.typeOfDelivery.value === 3) ? false : true;
    },
    citiesWithTerminals() {
      return this.cities.filter((city) => city.terminals !== null);
    },

    //  Расчет стоимости доставки
    resultOfCalc() {

      let
        TZ = 0,                         //  Тарифная зона
        period = 0,                     //  Срок доставки
        tariff = this.tables.tariff[0], //  Тариф по умолчанию
        isFixedPrice = true;            //  По умолчанию цена фиксирована, тоесть груз < 50 кг

      //  Тарифная зона и срок доставки по выбранному направлению
      if (this.sender.adress.city.value > 0 && this.getter.adress.city.value > 0) {
        TZ     = this.tables.TZ[this.sender.adress.city.value - 1][this.getter.adress.city.value - 1],
        period = this.tables.periods[this.sender.adress.city.value - 1][this.getter.adress.city.value - 1];
      }

      //  Выбираем максимальное значение веса между фактическим и объемным весами
      const weight = (() => {
        const
          volumeWeight = (this.load.width * this.load.height * this.load.length) / 5000,
          factWeight   = this.load.weight,
          maxWeight    = (volumeWeight >= factWeight) ? volumeWeight : factWeight;

        return this.round(maxWeight);
      })();

      // Тариф по рассчитанному весу
      if (weight > 0) {
        tariff = this.tables.tariff.find((item, index, array) => {
          //  Если выбран последний тариф - значит вес > 50 кг и цена уже не фиксированная
          if ((index + 1) === array.length) isFixedPrice = false;
          return (weight > item.min && weight <= item.max);
        });
      }

      //  Суммы
      const sums = [
        {
          name: 'Транспортировка',
          value: (() => {
            if (weight > 0) {
              const
                price = tariff.prices[TZ],
                totalPrice = (isFixedPrice) ? price : (price[0] + (weight - 50) * price[1]);

              return this.round(totalPrice);
            } else return 0;
          })()
        },

        {
          name: 'Комиссия',
          value: (() => {
            if (this.load.price > 0) {
              const comissSum = this.load.price * 0.005;
              return this.round((comissSum > 5) ? comissSum : 5);
            } else return 0;
          })()
        },

        {
          name: 'Забор с адреса',
          value: (() => {
            return (this.isCurFrom) ? tariff.courierPrice : 0;
          })()
        },

        {
          name: 'Доставка на адрес',
          value: (() => {
            return (this.isCurTo) ? tariff.courierPrice : 0;
          })()
        },

        {
          name: this.more.pack.name,
          value: (() => {
            return (this.more.pack.value) ? 100 : 0;
          })()
        }
      ];

      const
        filteredSums = sums.filter(sum => sum.value > 0),
        total = filteredSums.map(sum => sum.value)
                            .reduce((p, c) => p + c, 0);

      return { filteredSums, total, period };
    }
  },
  methods: {
    print() {
      window.print();
    }
  },
  components: {
    Field,
    SelectComp,
    Client,
    Load,
    ButtonComp,
    Services
  }
}
</script>

<style lang="sass">

@import "../../configs/styles_config.sass"

.invoice_form
  position: absolute
  height: 100vh
  width: 1020px
  right: 0
  top: 0
  z-index: 3
  background: $light
  overflow-y: scroll
  overflow-x: hidden
  padding: 80px 20px
  box-shadow: 1px 2px 10px rgba(0, 0, 0, .3)

  &::-webkit-scrollbar
    width: 0

.header, .footer
  position: fixed
  left: 260px
  height: 60px
  background: #fff
  display: flex
  align-items: center
  padding: 0 20px
  justify-content: space-between
  z-index: 6
  width: 1020px
  transition: all .3s ease

.footer
  bottom: 0
  box-shadow: 5px -2px 10px $trans-black

.header
  top: 0
  box-shadow: 5px 2px 10px $trans-black

  & .title_wrap
    display: flex
    align-items: center

    & h3
      font-weight: 600
      height: 60px
      line-height: 60px
      width: 230px
      border-right: 1px solid $medium

      & i
        font-size: 18px
        margin-right: 5px
        color: $primary-color

        &:hover
          color: $primary-color

    & p
      margin: 0 10px 0 20px
      color: $hard

  & button
    border: none
    outline: none
    background: none
    cursor: pointer
    padding: 0

  & i
    font-size: 12px
    color: $hard
    transition: all .3s ease

    &:hover
      color: $dark

.clients_wrap
  display: flex
  justify-content: space-between
  flex-wrap: wrap
  margin-bottom: 15px

  & > div
    position: relative
    width: 480px
    display: flex
    justify-content: space-between
    align-content: flex-start
    margin-bottom: 20px
    flex-wrap: wrap
    transition: all .3s linear
    background: #fff
    border-radius: 5px
    padding: 20px 20px 0
    border: 1px solid $medium
    box-shadow: 0 3px 10px rgba(0, 0, 0, .1)

    & .title
      width: 230px
      height: 60px
      line-height: 22px
      padding: 20px 0 20px 20px
      border-bottom: 1px solid $medium
      border-right: 1px solid $medium
      margin-left: -20px
      margin-top: -20px
      background: $light
      border-radius: 5px 0 0 0

      & h4
        display: inline-block
        margin-right: 10px
        font-weight: 500

    & div + div
      margin-bottom: 20px

    &.with_offset
      margin-bottom: 110px


.calc-panel
  & > span
    font-size: 16px
    font-weight: 700
    display: inline-block
    height: 60px
    line-height: 60px
    padding: 0 30px
    border-right: 1px solid $medium
    width: 120px
    padding-top: 4px
    margin-right: 10px

  & > div
    display: inline-block
    margin: 13px 10px 0 10px
    vertical-align: top

    & > span
      font-size: 10px
      color: $hard
      margin-bottom: 4px
      display: block

.to-down-enter-active, .to-down-leave-active,
  transition: all .3s ease

.to-down-enter, .to-down-leave-to
  transform: translateY(-10px)
  opacity: 0

</style>

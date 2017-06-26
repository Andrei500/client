<template>
    <div class="wrap">
        <span>{{ total + ' р' }}</span>
        <div v-for="sum in sums" :key="sum">
            <span>{{ sum.name }}</span>
            <p>{{ sum.value + ' р'}}</p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        from: {
            type: Object,
            default() {
                return {
                    city: {
                        value: 0,
                        name: ''
                    }
                };
            }
        },
        to: {
            type: Object,
            default() {
                return {
                    city: {
                        value: 0,
                        name: ''
                    }
                };
            }
        },
        typeOfDelivery: {
            type: Number,
            default: 1
        },
        load: {
            type: Object
        }
    },
    data() {
        return {
            sums: [],
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
                    [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 1] // 23 Ростов-на-Дону
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
                    [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 1] // 23 Ростов-на-Дону
                ],

                tariff: [
                    {
                        min: 0,
                        max: 1,
                        prices: [ 0, 50, 55, 61, 68, 75, 83, 400 ],
                        courierPrice: 30
                    },
                    {
                        min: 1,
                        max: 5,
                        prices: [ 0, 65, 72, 80, 88, 97, 107, 500 ],
                        courierPrice: 50
                    },
                    {
                        min: 5,
                        max: 10,
                        prices: [ 0, 75, 83, 92, 102, 113, 125, 575 ],
                        courierPrice: 60
                    },
                    {
                        min: 10,
                        max: 20,
                        prices: [ 0, 100, 110, 121, 134, 148, 163, 700 ],
                        courierPrice: 70
                    },
                    {
                        min: 20,
                        max: 35,
                        prices: [ 0, 130, 143, 172, 190, 228, 251, 800 ],
                        courierPrice: 80
                    },
                    {
                        min: 35,
                        max: 50,
                        prices: [ 0, 150, 165, 198, 218, 262, 289, 900 ],
                        courierPrice: 100
                    },
                    {
                        min: 50,
                        max: Infinity,
                        prices: [ [0, 0], [150, 0.7], [165, 0.8], [198, 1], [218, 1.3], [262, 1.5], [289, 1.7], [900, 8] ],
                        courierPrice: 200
                    }
                ]
            },

        }
    },
    watch: {
        load: {
            handler() {
                this.trans();
                this.comiss();
                this.pack();
            },
            deep: true
       },
       typeOfDelivery() {
           this.trans();
       }
    },
    computed: {
        TZ() {
            return this.tables.TZ[this.from.city.value - 1][this.to.city.value - 1];
        },
        period() {
            return this.tables.periods[this.from.city.value - 1][this.to.city.value - 1];
        },
        total() {
            if (this.sums.length) {
                return this.sums.reduce((prev, cur) => {
                    return prev + cur.value;
                }, 0);
            } else return 0;
        }
    },
    methods: {
        calcMaxWeight(load) {
            const
                volumeWeight = (load.width * load.height * load.length) / 5000,
                factWeight = load.weight,
                maxWeight = (volumeWeight >= factWeight) ? volumeWeight : factWeight;

            return this.round(maxWeight);
        },
        addSum(sum) {
            const index = this.sums.findIndex(item => item.name === sum.name);
            (index === -1) ? this.sums.push(sum) : this.sums[index].value = sum.value;
        },
        delSum(sum) {
            const index = this.sums.findIndex(item => item.name === sum.name);
            if (index !== -1) this.sums.splice(index, 1);
        },
        trans() {
            const
                weight = this.load.places
                                        .map(place => this.calcMaxWeight(place))
                                        .reduce((prevVal, curVal) => prevVal + curVal),
                trans = { name: 'Транспортировка', value: 0 },
                curFrom = { name: 'Забор с адреса', value: 0},
                curTo = { name: 'Доставка на адрес', value: 0};

            if (weight > 0) {
                let isFixedPrice = true;
                const
                    tariff = this.tables.tariff.find((item, index, array) => {
                        if ((index + 1) === array.length) isFixedPrice = false;
                        return (weight > item.min && weight <= item.max);
                    }),
                    price = tariff.prices[this.TZ],
                    totalPrice = (isFixedPrice) ? price : (price[0] + (weight - 50) * price[1]);

                trans.value = this.round(totalPrice);
                this.addSum(trans);

                if (this.typeOfDelivery === 3 || this.typeOfDelivery === 4) {
                    curFrom.value = tariff.courierPrice;
                    this.addSum(curFrom);
                } else this.delSum(curFrom);

                if (this.typeOfDelivery === 2 || this.typeOfDelivery === 4) {
                    curTo.value = tariff.courierPrice;
                    this.addSum(curTo);
                } else this.delSum(curTo);

            } else this.delSum(trans);

        },
        comiss() {
            const
                summ = this.load.places.reduce((prev, cur) => {
                    return prev + cur.price;
                }, 0),
                comiss = { name: 'Комиссия', value: 0 };

            if (summ > 0) {
                const comissSum = summ * 0.005;
                comiss.value = this.round((comissSum > 5) ? comissSum : 5);
                this.addSum(comiss);
            }
            else this.delSum(comiss);
        },
        pack() {
            const pack =  { name: this.load.services.pack.name, value: 100 };
            if (this.load.services.pack.value) this.addSum(pack);
            else this.delSum(pack);
        }
    }
}
</script>

<style lang="sass" scoped>

    @import "../../configs/styles_config.sass"

    .wrap
        & > span
            font: 16px 'Medium'
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


</style>

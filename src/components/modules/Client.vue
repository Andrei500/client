<template>
    <div class="field_wrap" ref="sender">

        <div class="title">
            <h4>{{ title }}</h4>

                <checkbox
                    @focus="focusToNext('phone')"
                    size="12px"
                    title="юр. лицо"
                    v-model="client.jur">
                </checkbox>
        </div>

        <field
            ref="phone"
            width="200px"
            type="text"
            placeholder="Телефон"
            v-model="client.phone"
            mask="tel"
            autofocus>
        </field>

        <field
            v-if="client.jur"
            :width="(client.jur) ? '200px' : ''"
            type="text"
            placeholder="Организация"
            v-model="client.name">
        </field>

        <field
            :width="(client.jur) ? '200px' : '100%'"
            type="text"
            :placeholder="(client.jur) ? 'Представитель' : 'Фамилия Имя Отчество'"
            v-model="client.name">
        </field>

        <typehead
            extendValue="region"
            width="200px"
            :options="cities"
            v-model="client.adress.city"
            @input="focusToNext('adress')">
        </typehead>

        <field
            ref="adress"
            width="200px"
            type="text"
            placeholder="Адрес"
            v-model="client.adress">
        </field>

        <select-comp
            width="200px"
            :options="docsToSelect"
            v-model="client.docs.type"
            @input="focusToNext('series')">
        </select-comp>

        <field
            ref="series"
            width="90px"
            type="text"
            placeholder="Серия"
            v-model="client.docs.series">
        </field>

        <field
            width="90px"
            type="text"
            placeholder="Номер"
            v-model="client.docs.number">
        </field>
{{ returnClient }}
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
        }
    },

    data() {
        return {
            client: {
                jur: false,
                phone: '+',
                name: '',
                docs: {
                    type: {},
                    series: '',
                    number: 0
                },
                adress: {
                    city: ''
                }
            },
            docsToSelect: [
                {
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
        cities() {
            return [{
                    value: 1,
                    name: 'Амвросиевка',
                    region: 'ДНР',
                    terminal: false
                },
                {
                    value: 2,
                    name: 'Горловка',
                    region: 'ДНР',
                    terminal: false
                },
                {
                    value: 3,
                    name: 'Дебальцево',
                    region: 'ДНР',
                    terminal: false
                },
                {
                    value: 4,
                    name: 'Докучаевск',
                    region: 'ДНР',
                    terminal: false
                },
                {
                    value: 5,
                    name: 'Донецк',
                    region: 'ДНР',
                    terminal: true
                },
                {
                    value: 6,
                    name: 'Енакиево',
                    region: 'ДНР',
                    terminal: false
                },
                {
                    value: 7,
                    name: 'Ждановка',
                    region: 'ДНР',
                    terminal: false
                },
                {
                    value: 8,
                    name: 'Зугрес',
                    region: 'ДНР',
                    terminal: false
                },
                {
                    value: 9,
                    name: 'Иловайск',
                    region: 'ДНР',
                    terminal: false
                },
                {
                    value: 10,
                    name: 'Кировское',
                    region: 'ДНР',
                    terminal: false
                },
                {
                    value: 11,
                    name: 'Макеевка',
                    region: 'ДНР',
                    terminal: true
                },
                {
                    value: 12,
                    name: 'Моспино',
                    region: 'ДНР',
                    terminal: false
                },
                {
                    value: 13,
                    name: 'Новоазовск',
                    region: 'ДНР',
                    terminal: false
                },
                {
                    value: 14,
                    name: 'Новый свет',
                    region: 'ДНР',
                    terminal: false
                },
                {
                    value: 15,
                    name: 'Седово',
                    region: 'ДНР',
                    terminal: false
                },
                {
                    value: 16,
                    name: 'Снежное',
                    region: 'ДНР',
                    terminal: false
                },
                {
                    value: 17,
                    name: 'Старобешево',
                    region: 'ДНР',
                    terminal: false
                },
                {
                    value: 18,
                    name: 'Тельманово',
                    region: 'ДНР',
                    terminal: false
                },
                {
                    value: 19,
                    name: 'Торез',
                    region: 'ДНР',
                    terminal: false
                },
                {
                    value: 20,
                    name: 'Углегорск',
                    region: 'ДНР',
                    terminal: false
                },
                {
                    value: 21,
                    name: 'Харцызск',
                    region: 'ДНР',
                    terminal: false
                },
                {
                    value: 22,
                    name: 'Шахтерск',
                    region: 'ДНР',
                    terminal: false
                },
                {
                    value: 23,
                    name: 'Ясиноватая',
                    region: 'ДНР',
                    terminal: false
                },
                {
                    value: 24,
                    name: 'Ростов-на-Дону',
                    region: 'РФ',
                    terminal: true
                }
            ]
        },
        returnClient() {
            this.$emit('input', this.client);
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
    }

}
</script>

<style lang="sass" scoped>

    @import "../../configs/styles_config.sass"

    .field_wrap
        display: flex
        justify-content: space-between
        align-items: flex-start
        margin-bottom: 20px
        flex-wrap: wrap
        transition: all .3s linear
        background: #fff
        border-radius: 5px
        padding: 20px 20px 0
        border: 1px solid $medium


        & .title
            width: 220px
            height: 60px
            line-height: 22px
            padding: 20px 0 20px 20px
            font-family: 'Regular'
            border-bottom: 1px solid $medium
            border-right: 1px solid $medium
            margin-left: -20px
            margin-top: -20px
            background: $light
            border-radius: 5px 0 0 0

            & h4
                display: inline-block
                margin-right: 10px

        & div + div
            margin-bottom: 20px

        &.with_offset
            margin-bottom: 110px


</style>

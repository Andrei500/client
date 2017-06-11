<template>
    <div class="field_wrap" ref="sender">

        <div class="title">
            <h4>{{ title }}</h4>

                 <checkbox
                    size="12px"
                    title="юр. лицо"
                    v-model="client.jur">
                </checkbox>
        </div>

        <field
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

        <select-comp width="200px" :options="cities" v-model="adress.city"></select-comp>

        <field
            width="200px"
            type="text"
            placeholder="Адрес"
            v-model="client.adress">
        </field>

        <select-comp width="200px" :options="docsToSelect" v-model="client.docs.type"></select-comp>

        <field
            width="92px"
            type="text"
            placeholder="Серия"
            v-model="client.docs.series">
        </field>

        <field
            width="92px"
            type="text"
            placeholder="Номер"
            v-model="client.docs.number">
        </field>

    </div>
</template>

<script>

import Field from '../UI/Field.vue';
import SelectComp from '../UI/SelectComp.vue';
import Checkbox from '../UI/Checkbox.vue';

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
                }
            },
            adress: {
                city: ''
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
            return [
                {
                    name: 'Макеевка',
                    value: 1,
                },
                {
                    name: 'Донецк',
                    value: 2
                }
            ]
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
        Checkbox
    }

}
</script>

<style lang="sass" scoped>

    @import "../../configs/styles_config.sass"

    .field_wrap
        display: flex
        justify-content: space-between
        align-items: flex-start
        margin-bottom: 30px
        flex-wrap: wrap
        transition: all .3s linear
        background: #fff
        border-radius: 5px
        padding: 20px 25px 8px
        border: 1px solid $medium


        & .title
            width: 225px
            height: 60px
            line-height: 22px
            padding: 20px 0 20px 25px
            font-family: 'Regular'
            border-bottom: 1px solid $medium
            border-right: 1px solid $medium
            margin-left: -25px
            margin-top: -20px
            background: $light
            border-radius: 5px 0 0 0

            & h4
                display: inline-block
                margin-right: 10px

        & div + div
            margin-bottom: 15px

        &.with_offset
            margin-bottom: 110px


</style>

<template>
    <div class="field_wrap" ref="sender">

        <div class="title">
            <h4>{{ title }}</h4>
            <label>
                  <input type="checkbox" value="true">
                  юр. лицо
            </label>
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
            type="text"
            placeholder="ФИО"
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

    </div>
</template>

<script>

import Field from '../UI/Field.vue';
import SelectComp from '../UI/SelectComp.vue';

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
                    name: 'Пенсионное удостоверение',
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
        SelectComp
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
        padding: 20px 30px
        width: 490px

        & .title
            width: 50%
            padding: 3px 20px 3px 27px
            font-family: 'Regular'
            border-left: 3px solid $primary-color
            margin-left: -30px

            & label
                font: 12px 'Light'
                color: $hard
                display: block
                margin-top: 5px
                cursor: pointer
                transition: all .3s ease

                &:hover
                    color: $dark

        & div


            &:first-of-type
                width: 50%
                margin-top: 15px

            & + div
            margin-top: 20px

        &.with_offset
            margin-bottom: 110px


</style>

<template>
    <div class="field_wrap">
        <div class="title">
            <h4>Груз</h4>
        </div>
        <div class="services">
            <checkbox
                title="Хрупкость"
                v-model="load.services.fragile">
            </checkbox>
            <checkbox
                title="Срочность"
                v-model="load.services.urgent">
            </checkbox>
            <checkbox
                title="Упаковка"
                v-model="load.services.pack">
            </checkbox>
            <checkbox
                title="Наложенный платеж"
                v-model="load.services.cashpay.active">
            </checkbox>
            <transition name="to-down">
                <field
                    v-if="load.services.cashpay.active.value"
                    width="90px"
                    type="text"
                    placeholder="Сумма, р"
                    autofocus
                    v-model="load.services.cashpay.sum">
                </field>
            </transition>
        </div>

    <transition-group name="list" tag="div">
        <div class="places_list_wrap" v-for="(place, index) in load.places" :key="place">
            <select-comp
                width="200px"
                :options="typesOfLoad"
                v-model="place.type"
                @input="focusToNext('description' + index)">
            </select-comp>
            <field
                :ref="'description' + index"
                width="200px"
                type="text"
                placeholder="Описание"
                v-model="place.description">
            </field>
            <field
                width="70px"
                type="text"
                placeholder="Вес, кг"
                :disabled="{ isTrue: place.type.value === 1 || place.type.value === 2 }"
                v-model="place.weight">
            </field>
            <field
                width="70px"
                type="text"
                placeholder="Д, см"
                :disabled="{ isTrue: place.type.value === 1 || place.type.value === 2 }"
                v-model="place.length">
            </field>
            <field
                width="70px"
                type="text"
                placeholder="Ш, см"
                :disabled="{ isTrue: place.type.value === 1 || place.type.value === 2 }"
                v-model="place.width">
            </field>
            <field
                width="70px"
                type="text"
                placeholder="В, см"
                :disabled="{ isTrue: place.type.value === 1 || place.type.value === 2 }"
                v-model="place.height">
            </field>
            <field
                width="70px"
                type="text"
                placeholder="Цена, р"
                v-model="place.price">
            </field>
            <button
                v-tooltip.left="(load.places.length > 1) ? 'Убрать место' : false"
                :disabled="!(load.places.length > 1)"
                @click="delPlace(index)">
                <i class="icon-close"></i>
            </button>
        </div>
    </transition-group>

    <div class="add_btn_wrap">
        <button @click="addPlace($event)">+ Добавить место</button>
    </div>
    {{ returnLoad }}
    </div>
</template>

<script>

import ButtonComp from '../UI/ButtonComp.vue';
import Field from '../UI/Field.vue';
import SelectComp from '../UI/SelectComp.vue';
import Checkbox from '../UI/Checkbox.vue';

export default {

    data() {
        return {
            load: {
                places: [],
                services: {
                    fragile: false,
                    urgent: false,
                    pack: false,
                    cashpay: {
                        active: false,
                        sum: 0
                    }
                }
            },
            loadParams: {
                type: {},
                weight: 0,
                length: 0,
                width: 0,
                height: 0,
                price: 0,
                description: ''
            }

        }
    },
    computed: {
        returnLoad() {
            this.$emit('input', this.load);
        },
        typesOfLoad: function () {
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
    methods: {
        addPlace(event) {
            const loadParams = Object.assign({}, this.loadParams);
            this.load.places.push(loadParams);
            if (event !== undefined) this.$emit('addedPlace');
        },
        delPlace(index) {
            this.load.places.splice(index, 1);
        }
    },
    components: {
        ButtonComp,
        Field,
        SelectComp,
        Checkbox
    },
    created() {
        this.addPlace();
    }

}
</script>

<style lang="sass" scoped>

    @import "../../configs/styles_config.sass"

    .field_wrap
        display: flex
        justify-content: space-between
        align-items: flex-start
        margin-bottom: 10px
        flex-wrap: wrap
        transition: all .3s linear
        background: #fff
        border-radius: 5px
        padding: 20px
        border: 1px solid $medium


        & .title
            width: 220px
            height: 60px
            line-height: 22px
            padding: 20px 0 20px 25px
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

        & .services
            width: calc(100% - 180px)
            height: 60px
            margin-top: -20px
            margin-right: -20px
            line-height: 60px
            border-bottom: 1px solid $medium
            display: flex
            align-items: center

            & > div
                margin-left: 20px

        & button
            border: none
            outline: none
            background: none
            cursor: pointer
            padding: 0
            margin-left: 20px

            &:disabled

                &:hover
                    cursor: default

                & i
                    color: $medium

                &:hover
                    color: $medium
                    cursor: default


        & i
            color: $hard
            transition: all .3s ease

            &:hover
                color: $dark

    .places_list_wrap
        width: 100%
        display: flex
        justify-content: space-between
        margin-top: 20px
        transition: all .3s linear

        & > div + div
            margin-left: 20px

    .add_btn_wrap
        width: 100%
        text-align: right
        padding-top: 20px

        & button
            background: $medium
            border: none
            outline: none
            padding: 10px 15px
            border-radius: 3px
            transition: all .3s ease
            cursor: pointer

            &:hover
                background: $primary-color


    .list-enter, .list-leave-to
        opacity: 0

    .to-down-enter-active, .to-down-leave-active,
        transition: all .3s ease

    .to-down-enter, .to-down-leave-to
        transform: translateY(-10px)
        opacity: 0


</style>

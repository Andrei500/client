<template>
    <div class="field_wrap">
        <div class="title">
            <h4>Груз</h4>
        </div>
        <div class="services">
            <checkbox
                title="Упаковка"
                v-model="load.services.pack">
            </checkbox>
            <checkbox
                title="Обратная доставка"
                v-model="load.services.sendBack.active">
            </checkbox>
            <transition name="to-down">
                <select-comp
                    v-if="load.services.sendBack.active.value"
                    autofocus
                    width="140px"
                    :options="typesOfLoad"
                    v-model="load.services.sendBack.type"
                    @destroy="load.services.sendBack.type = {}">
                </select-comp>
            </transition>
            <transition name="to-down">
                <field
                    v-if="load.services.sendBack.type.value === 2"
                    width="120px"
                    type="text"
                    placeholder="Сумма, р"
                    autofocus
                    v-model="load.services.sendBack.sum"
                    @destroy="load.services.sendBack.sum = 0">
                </field>
            </transition>
        </div>

    <transition-group name="list" tag="div">
        <div class="places_list_wrap" v-for="(place, index) in load.places" :key="place">
            <select-comp
                :ref="'typeOfLoad' + index"
                width="210px"
                :options="typesOfLoad"
                v-model="place.type"
                @input="changeType($event, index); focusToNext('description' + index)">
            </select-comp>
            <field
                :ref="'description' + index"
                width="210px"
                type="text"
                placeholder="Описание"
                v-model="place.description">
            </field>
            <field
                width="70px"
                type="number"
                placeholder="Вес, кг"
                :disabled="!!place.type.value"
                v-model.number="place.weight">
            </field>
            <field
                width="70px"
                type="number"
                placeholder="Д, см"
                :disabled="!!place.type.value"
                v-model.number="place.length">
            </field>
            <field
                width="70px"
                type="number"
                placeholder="Ш, см"
                :disabled="!!place.type.value"
                v-model.number="place.width">
            </field>
            <field
                width="70px"
                type="number"
                placeholder="В, см"
                :disabled="!!place.type.value"
                v-model.number="place.height">
            </field>
            <field
                width="70px"
                type="number"
                placeholder="Цена, р"
                :disabled="place.type.value === 1"
                v-model.number="place.price">
            </field>
            <button
                v-tooltip.left="(load.places.length > 1) ? 'Убрать место' : false"
                :disabled="!(load.places.length > 1)"
                @mousedown="delPlace(index)">
                <i class="icon-close"></i>
            </button>
        </div>
    </transition-group>

    <div class="add_btn_wrap">
        <button @mousedown="addPlace($event)">+ Добавить место</button>
    </div>
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
                    pack: false,
                    sendBack: {
                        active: false,
                        type: {},
                        sum: 0
                    }
                }
            },
            params: {
                default: {
                    type: {},
                    weight: 0,
                    length: 0,
                    width: 0,
                    height: 0,
                    price: 0,
                    description: ''
                },
                load: {
                    weight: 0,
                    length: 0,
                    width: 0,
                    height: 0,
                    price: 0
                },
                doc: {
                    weight: 1,
                    length: 30,
                    width: 21,
                    height: 1,
                    price: 100
                },
                money: {
                    weight: 0,
                    length: 0,
                    width: 0,
                    height: 0,
                    price: 500
                }
            }

        }
    },
    computed: {
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
            const loadParams = Object.assign({}, this.params.default);
            this.load.places.push(loadParams);
            if (event !== undefined) this.$emit('addedPlace');
        },
        delPlace(index) {
            this.load.places.splice(index, 1);
        },
        changeType(type, index) {
            let typeOfLoad;
            switch (type.value) {
                case 0: typeOfLoad = 'load'; break;
                case 1: typeOfLoad = 'doc'; break;
                case 2: typeOfLoad = 'money'; break;
            }
            const params = this.params[typeOfLoad];

            Object.keys(params).forEach((key) => {
                this.load.places[index][key] = params[key];
            });
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
    },
    updated() {
        this.$emit('input', this.load);
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
        padding: 20px
        border: 1px solid $medium


        & .title
            width: 230px
            height: 60px
            line-height: 22px
            padding: 20px 0 20px 25px
            font-weight: 500
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
            width: calc(100% - 190px)
            height: 60px
            margin-top: -20px
            margin-right: -20px
            border-bottom: 1px solid $medium
            display: flex
            align-items: center

            & > div
                margin-left: 20px

            & + div
                width: 100%

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
            font-family: 'Light'

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

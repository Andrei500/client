<template>
    <div class="field_wrap">
        <div class="title">
            <h4>Груз</h4>
        </div>
        <div class="services">
            <checkbox
                title="Хрупкость">
            </checkbox>
            <checkbox
                title="Срочность">
            </checkbox>
            <checkbox
                title="Опасность">
            </checkbox>
            <checkbox
                title="Упаковка">
            </checkbox>
        </div>

    <transition-group name="list" tag="div">
        <div class="loads_list_wrap" v-for="(load, index) in loads" :key="load">
            <select-comp
                width="200px"
                :options="typesOfLoad"
                v-model="load.type"
                @input="focusToNext('description' + index)">
            </select-comp>
            <field
                :ref="'description' + index"
                width="200px"
                type="text"
                placeholder="Описание"
                v-model="load.description">
            </field>
            <field
                width="68px"
                type="text"
                placeholder="Вес, кг"
                :disabled="{ isTrue: load.type.value === 1 || load.type.value === 2 }"
                v-model="load.weight">
            </field>
            <field
                width="68px"
                type="text"
                placeholder="Д, см"
                :disabled="{ isTrue: load.type.value === 1 || load.type.value === 2 }"
                v-model="load.length">
            </field>
            <field
                width="68px"
                type="text"
                placeholder="Ш, см"
                :disabled="{ isTrue: load.type.value === 1 || load.type.value === 2 }"
                v-model="load.width">
            </field>
            <field
                width="68px"
                type="text"
                placeholder="В, см"
                :disabled="{ isTrue: load.type.value === 1 || load.type.value === 2 }"
                v-model="load.height">
            </field>
            <field
                width="68px"
                type="text"
                placeholder="Цена, р"
                v-model="load.price">
            </field>
            <button
                v-tooltip.left="(loads.length > 1) ? 'Убрать место' : false"
                :disabled="!(loads.length > 1)"
                @click="delPlace(index)">
                <i class="icon-close"></i>
            </button>
        </div>
    </transition-group>

    <div class="add_btn_wrap">
        <button @click="addPlace($event)">+ Добавить место</button>
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
            loads: [],
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
            this.loads.push(loadParams);
            if (event !== undefined) this.$emit('addedPlace');
        },
        delPlace(index) {
            this.loads.splice(index, 1);
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

            & > div
                margin-left: 20px

        & button
            border: none
            outline: none
            background: none
            cursor: pointer
            padding: 0
            margin-left: 20px

            &:disabled i
                color: $medium

                &:hover
                    color: $medium
                    cursor: default


        & i
            color: $hard
            transition: all .3s ease

            &:hover
                color: $dark

    .loads_list_wrap
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
        transform: translateX(-100%)

    .list-leave-active
        position: absolute

</style>

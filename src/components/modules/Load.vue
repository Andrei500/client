<template>
    <div class="field_wrap">
        <div class="title">
            <h4>Груз</h4>
            <number v-model="load.countOfSeats" :title="sits"></number>
        </div>
        <select-comp
            width="210px"
            :options="typesOfLoad"
            v-model="load.type"
            @input="changeType($event); focusToNext('description')">
        </select-comp>
        <field
            ref="description"
            type="text"
            placeholder="Описание"
            v-model="load.description">
        </field>
        <field
            width="72px"
            type="number"
            placeholder="Вес, кг"
            :disabled="!!load.type.value"
            v-model.number="load.weight">
        </field>
        <field
            width="72px"
            type="number"
            placeholder="Д, см"
            :disabled="!!load.type.value"
            v-model.number="load.length">
        </field>
        <field
            width="72px"
            type="number"
            placeholder="Ш, см"
            :disabled="!!load.type.value"
            v-model.number="load.width">
        </field>
        <field
            width="72px"
            type="number"
            placeholder="В, см"
            :disabled="!!load.type.value"
            v-model.number="load.height">
        </field>
        <field
            width="72px"
            type="number"
            placeholder="Цена, р"
            :disabled="load.type.value === 1"
            v-model.number="load.price">
        </field>
    </div>
</template>

<script>

import Field from '../UI/Field.vue';
import SelectComp from '../UI/SelectComp.vue';
import Number from '../UI/Number.vue';

export default {

    data() {
        return {
            load: {
                countOfSeats: 1,
                type: {},
                description: '',
                weight: 0,
                length: 0,
                width: 0,
                height: 0,
                price: 0
            }
        }
    },
    computed: {
        sits() {
            let word = 'мест';
            if (this.load.countOfSeats === 1) word = 'место';
            if (this.load.countOfSeats > 1 && this.load.countOfSeats < 5) word = 'места';

            return word;
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
        changeType(type) {
            if (type.value === 0 || type.value === 2) {
                this.load.weight = 0;
                this.load.length = 0;
                this.load.width = 0;
                this.load.height = 0;
                this.load.price = 500;
            }
            if (type.value === 1) {
                this.load.weight = 1;
                this.load.length = 30;
                this.load.width = 21;
                this.load.height = 1;
                this.load.price = 100;
            }
        }
    },
    components: {
        Field,
        SelectComp,
        Number
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
        align-content: flex-start
        margin-bottom: 20px
        flex-wrap: wrap
        transition: all .3s linear
        background: #fff
        border-radius: 5px
        padding: 20px 20px 0
        border: 1px solid $medium


        & .title
            width: 230px
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

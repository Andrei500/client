<template>
    <div @keydown.up.prevent @keydown.down.prevent ref="invoice_form" class="invoice_form">
        <div class="header">
            <div class="title_wrap">
                <h3>Создание накладной для доставки:</h3>
                <div style="width: 220px">
                    <select-comp
                        :options="typesOfDelivery"
                        v-model="typeOfDelivery">
                    </select-comp>
                </div>
            </div>
            <button @click="$emit('close')"><i class="icon-close"></i></button>
        </div>

        <div class="clients_wrap">
            <client
                title="Отправитель">
            </client>
            <client
                title="Получатель">
            </client>
        </div>

        <load></load>

        <div class="footer">
            730 р
            <button-comp
                text="Распечатать"
                icon="print"
                small="true"
                :disabled="valid">
            </button-comp>
        </div>
    </div>
</template>

<script>
import config from '../../configs/main_app_config.js';
import ButtonComp from '../UI/ButtonComp.vue';
import Field from '../UI/Field.vue';
import Client from '../modules/Client.vue';
import Load from '../modules/Load.vue';
import SelectComp from '../UI/SelectComp.vue';

export default {
    data() {
        return {
            valid: '',
            typeOfDelivery: {},
            sender: {},
            getter: {}
        }
    },
    computed: {
        typesOfDelivery: function () {
            const types = [];
            for (var i = 0; i < config.typesOfDelivery.length; i++) {
                types.push({
                    name: config.typesOfDelivery[i],
                    value: (i + 1)
                });
            }
            return types;
        }
    },
    components: {
        ButtonComp,
        Field,
        SelectComp,
        Client,
        Load
    }
}
</script>

<style lang="sass" scoped>

    @import "../../configs/styles_config.sass"

    .invoice_form
        position: absolute
        width: calc(100vw - 300px)
        height: 100vh
        right: 0
        top: 0
        z-index: 3
        background: $light
        overflow: scroll
        padding: 80px 30px 80px 20px
        box-shadow: 1px 2px 10px lighten($hard, 20%)

    .header, .footer
        position: fixed
        width: calc(100vw - 300px)
        height: 60px
        background: #fff
        display: flex
        align-items: center
        padding: 0 20px
        justify-content: space-between
        z-index: 6

    .footer
        bottom: 0
        right: 0
        box-shadow: -1px -2px 10px $medium

    .header
        top: 0
        right: 0
        box-shadow: 1px 2px 10px $medium

        & .title_wrap
            display: flex
            align-items: center

            & h3
                font-weight: normal
                font-size: 16px
                margin: 0 10px 0 0

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

        & > div
            width: 470px


</style>

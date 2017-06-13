<template>
    <div @keydown.up.prevent @keydown.down.prevent ref="invoice_form" class="invoice_form">
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
                            v-model="payer.who.name"
                            autofocus>
                        </field>
                    </transition>
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

        <load @addedPlace="scrollDown($refs.invoice_form, 40)"></load>

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
            payer: {
                who: {
                    name: '',
                    value: 1
                },
                name: ''
            },
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
        },
        typesOfPayer: function () {
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
        height: 100vh
        width: 995px
        right: 0
        top: 0
        z-index: 3
        background: lighten($light, 5%)
        overflow-y: scroll
        overflow-x: hidden
        padding: 80px 20px
        box-shadow: 1px 2px 10px rgba(0, 0, 0, .3)

    .header, .footer
        position: fixed
        height: 60px
        background: #fff
        display: flex
        align-items: center
        padding: 0 20px
        justify-content: space-between
        z-index: 6
        width: 995px

    .footer
        bottom: 0
        right: 0
        box-shadow: 5px -2px 10px $trans-black

    .header
        top: 0
        right: 0
        box-shadow: 5px 2px 10px $trans-black

        & .title_wrap
            display: flex
            align-items: center

            & h3
                font-weight: normal
                font: 14px 'Medium'
                height: 60px
                line-height: 60px
                width: 220px
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

        & > div
            width: 460px


    .to-down-enter-active, .to-down-leave-active,
        transition: all .3s ease

    .to-down-enter, .to-down-leave-to
        transform: translateY(-10px)
        opacity: 0


</style>

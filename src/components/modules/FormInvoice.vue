<template>
    <div ref="invoice_form" class="invoice_form">
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
                            v-model="payer.name"
                            autofocus>
                        </field>
                    </transition>
            </div>
            <button @click="$emit('close')"><i class="icon-close"></i></button>
        </div>

        <div class="clients_wrap">
            <client
                title="Отправитель"
                v-model="sender"
                :cities="citiesFrom">
            </client>
            <client
                title="Получатель"
                v-model="getter"
                :cities="citiesTo"
                hiddenDocsFields>
            </client>
        </div>

        <load
            v-model="load"
            @addedPlace="scrollDown($refs.invoice_form, 40)">
        </load>

        <textarea v-model="description" rows="2" placeholder="Дополнительная информация..."></textarea>

        <div class="footer">
            <calc-panel
                :from="sender.adress"
                :to="getter.adress"
                :load="load"
                :typeOfDelivery="typeOfDelivery.value">
            </calc-panel>
            <button-comp
                text="Распечатать"
                icon="print"
                small="true"
                :disabled="!valid">
            </button-comp>
        </div>

    </div>
</template>

<script>
import config from '../../configs/main_app_config.js';
import Field from '../UI/Field.vue';
import Client from '../modules/Client.vue';
import Load from '../modules/Load.vue';
import SelectComp from '../UI/SelectComp.vue';
import CalcPanel from '../modules/CalcPanel.vue';
import ButtonComp from '../UI/ButtonComp.vue';

export default {
    data() {
        return {
            valid: false,
            typeOfDelivery: {},
            payer: {
                who: {},
                name: ''
            },
            sender: {},
            getter: {},
            load: {},
            description: ''
        }
    },
    computed: {
        isValid() {
            return { isValid: false }
        },
        typesOfDelivery() {
            const types = [];
            for (var i = 0; i < config.typesOfDelivery.length; i++) {
                types.push({
                    name: config.typesOfDelivery[i],
                    value: (i + 1)
                });
            }
            return types;
        },
        typesOfPayer() {
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
        },
        cities() {
            return [{
                    value: 1,
                    name: 'Амвросиевка',
                    region: 'ДНР',
                    terminals: null
                },
                {
                    value: 2,
                    name: 'Горловка',
                    region: 'ДНР',
                    terminals: null
                },
                {
                    value: 3,
                    name: 'Дебальцево',
                    region: 'ДНР',
                    terminals: null
                },
                {
                    value: 4,
                    name: 'Докучаевск',
                    region: 'ДНР',
                    terminals: null
                },
                {
                    value: 5,
                    name: 'Донецк',
                    region: 'ДНР',
                    terminals: null
                },
                {
                    value: 6,
                    name: 'Енакиево',
                    region: 'ДНР',
                    terminals: null
                },
                {
                    value: 7,
                    name: 'Ждановка',
                    region: 'ДНР',
                    terminals: null
                },
                {
                    value: 8,
                    name: 'Зугрес',
                    region: 'ДНР',
                    terminals: null
                },
                {
                    value: 9,
                    name: 'Иловайск',
                    region: 'ДНР',
                    terminals: null
                },
                {
                    value: 10,
                    name: 'Кировское',
                    region: 'ДНР',
                    terminals: null
                },
                {
                    value: 11,
                    name: 'Макеевка',
                    region: 'ДНР',
                    terminals: [
                        {
                            value: 1,
                            name: 'ул. 250-летия Донбасса, ост. "Универмаг"'
                        }
                    ]
                },
                {
                    value: 12,
                    name: 'Моспино',
                    region: 'ДНР',
                    terminals: null
                },
                {
                    value: 13,
                    name: 'Новоазовск',
                    region: 'ДНР',
                    terminals: null
                },
                {
                    value: 14,
                    name: 'Новый свет',
                    region: 'ДНР',
                    terminals: null
                },
                {
                    value: 15,
                    name: 'Седово',
                    region: 'ДНР',
                    terminals: null
                },
                {
                    value: 16,
                    name: 'Снежное',
                    region: 'ДНР',
                    terminals: null
                },
                {
                    value: 17,
                    name: 'Старобешево',
                    region: 'ДНР',
                    terminals: null
                },
                {
                    value: 18,
                    name: 'Тельманово',
                    region: 'ДНР',
                    terminals: null
                },
                {
                    value: 19,
                    name: 'Торез',
                    region: 'ДНР',
                    terminals: null
                },
                {
                    value: 20,
                    name: 'Углегорск',
                    region: 'ДНР',
                    terminals: null
                },
                {
                    value: 21,
                    name: 'Харцызск',
                    region: 'ДНР',
                    terminals: null
                },
                {
                    value: 22,
                    name: 'Шахтерск',
                    region: 'ДНР',
                    terminals: null
                },
                {
                    value: 23,
                    name: 'Ясиноватая',
                    region: 'ДНР',
                    terminals: null
                },
                {
                    value: 24,
                    name: 'Ростов-на-Дону',
                    region: 'РФ',
                    terminals: [
                        {
                            value: 1,
                            name: 'ул. Доватора, 148'
                        }
                    ]
                }
            ]
        },
        citiesFrom() {
            if (this.typeOfDelivery.value === 1 || this.typeOfDelivery.value === 2) {
                return this.cities.filter((city) => city.terminals !== null);
            } else return this.cities;
        },
        citiesTo() {
            if (this.typeOfDelivery.value === 1 || this.typeOfDelivery.value === 3) {
                return this.cities.filter((city) => city.terminals !== null);
            } else return this.cities;
        }
    },
    components: {
        Field,
        SelectComp,
        Client,
        Load,
        CalcPanel,
        ButtonComp
    }
}
</script>

<style lang="sass" scoped>

    @import "../../configs/styles_config.sass"

    .invoice_form
        position: absolute
        height: 100vh
        width: 1035px
        right: 0
        top: 0
        z-index: 3
        background: $light
        overflow-y: scroll
        overflow-x: hidden
        padding: 80px 20px
        box-shadow: 1px 2px 10px rgba(0, 0, 0, .3)


    .header, .footer
        position: fixed
        left: 260px
        height: 60px
        background: #fff
        display: flex
        align-items: center
        padding: 0 35px 0 20px
        justify-content: space-between
        z-index: 6
        width: 1035px

    .footer
        bottom: 0
        box-shadow: 5px -2px 10px $trans-black

    .header
        top: 0
        box-shadow: 5px 2px 10px $trans-black

        & .title_wrap
            display: flex
            align-items: center

            & h3
                font-weight: normal
                font: 14px 'Medium'
                height: 60px
                line-height: 60px
                width: 230px
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
            width: 480px

    textarea
        width: 100%
        outline: none
        padding: 20px
        font: 14px 'Light'
        border-radius: 5px
        border: 1px solid $medium
        margin-bottom: 30px
        resize: none
        transition: all .3s ease

        &:focus
            border-color: $primary-color

    .to-down-enter-active, .to-down-leave-active,
        transition: all .3s ease

    .to-down-enter, .to-down-leave-to
        transform: translateY(-10px)
        opacity: 0


</style>

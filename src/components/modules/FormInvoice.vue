<template>
    <div class="invoice_form">
        <div class="header">
            <h3>Создание накладной</h3>
            <button @click="closeForm()"><i class="icon-close"></i></button>
        </div>

        <h4>1. Отправитель</h4>
        <div class="field_wrap" ref="sender">
            <div style="width: 200px">
                <field
                    type="text"
                    id="phone_sender"
                    placeholder="Телефон"
                    v-model="sender.phone"
                    mask="tel"
                    autofocus>
                </field>
            </div>
            <div style="width: 320px">
                <field
                    type="text"
                    id="name_sender"
                    placeholder="ФИО"
                    v-model="sender.name">
                </field>
            </div>
            <div style="width: 320px">
                <field
                    type="text"
                    id="adress_sender"
                    placeholder="Адрес"
                    v-model="sender.adress">
                </field>
            </div>
            <div class="button_doc_wrap">
                <passport @select="sender.docs = $event" @open="addOffset('sender', $event)"></passport>
            </div>
        </div>

        <h4>2. Получатель</h4>
        <div class="field_wrap" ref="getter">
            <div style="width: 200px">
                <field
                    type="text"
                    id="phone_getter"
                    placeholder="Телефон"
                    v-model="getter.phone"
                    mask="tel">
                </field>
            </div>
            <div style="width: 320px">
                <field
                    type="text"
                    id="name_getter"
                    placeholder="ФИО"
                    v-model="getter.name">
                </field>
            </div>
            <div style="width: 320px">
                <field
                    type="text"
                    id="adress_getter"
                    placeholder="Адрес"
                    v-model="getter.adress">
                </field>
            </div>
            <div class="button_doc_wrap">
                <passport @select="getter.docs = $event" @open="addOffset('getter', $event)"></passport>
            </div>
        </div>

        <h4>3. Груз</h4>
        <div class="field_wrap">
            <div style="width: 200px">
                <select-comp :options="typesOfLoad" @select="changeTypeOfLoad($event)"></select-comp>
            </div>
            <div style="width: 65px">
                <field
                    type="text"
                    id="weight"
                    placeholder="Вес, кг"
                    v-model="load.weight">
                </field>
            </div>
            <div style="width: 65px">
                <field
                    type="text"
                    id="length"
                    placeholder="Д, см"
                    v-model="load.length">
                </field>
            </div>
            <div style="width: 65px">
                <field
                    type="text"
                    id="width"
                    placeholder="Ш, см"
                    v-model="load.width">
                </field>
            </div>
            <div style="width: 65px">
                <field
                    type="text"
                    id="height"
                    placeholder="В, см"
                    v-model="load.height">
                </field>
            </div>
            <div style="width: 100px">
                <field
                    type="text"
                    id="price"
                    placeholder="Цена, р"
                    v-model="load.price">
                </field>
            </div>
            <div style="width: 200px">
                <field
                    type="text"
                    id="description"
                    placeholder="Описание"
                    v-model="load.description">
                </field>
            </div>
            <div class="button_doc_wrap">
                <passport @select="getter.docs = $event" @open="addOffset('getter', $event)"></passport>
            </div>
        </div>


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
import Passport from '../modules/Passport.vue';
import SelectComp from '../UI/SelectComp.vue';

export default {
    data() {
        return {
            valid: '',
            sender: {
                phone: '+',
                name: '',
                adress: '',
                docs: {}
            },
            getter: {
                phone: '+',
                name: '',
                adress: '',
                docs: {}
            },
            load: {
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
            const types = [];
            for (var i = 0; i < config.typesOfLoad.length; i++) {
                types.push({
                    name: config.typesOfLoad[i]
                });
            }
            return types;
        }
    },
    methods: {
        closeForm() {
            this.$emit('close');
        },
        addOffset(who, val) {
            const
                el = this.$refs[who],
                className = 'with_offset';

            if (val) el.classList.add(className);
            else el.classList.remove(className);
        }
    },
    components: {
        ButtonComp,
        Field,
        Passport,
        SelectComp
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
        padding: 80px 20px
        box-shadow: 1px 2px 10px lighten($hard, 20%)

        & h4
            font-family: 'Regular'
            margin-bottom: 5px

    .header, .footer
        position: fixed
        width: calc(100vw - 300px)
        height: 60px
        background: #fff
        display: flex
        align-items: center
        padding: 0 20px
        justify-content: space-between

    .footer
        bottom: 0
        right: 0
        box-shadow: -1px -2px 10px $medium

    .header
        top: 0
        right: 0
        box-shadow: 1px 2px 10px $medium

        & h3
            font-weight: normal
            font-size: 16px
            margin: 0

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

    .field_wrap
        display: flex
        justify-content: space-between
        align-items: flex-end
        margin-bottom: 30px

        & div + div
            margin-left: 20px

        &.with_offset
            margin-bottom: 100px


    .button_doc_wrap



</style>

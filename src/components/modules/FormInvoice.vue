<template>
    <div class="invoice_form">
        <div class="header">
            <h3>Создание накладной</h3>
            <button @click="closeForm()"><i class="icon-close"></i></button>
        </div>

        <h4>1. Отправитель</h4>
        <div class="field_wrap">
            <div style="width: 210px">
                <field
                    type="text"
                    id="phone_sender"
                    placeholder="Телефон"
                    v-model="phone_sender"
                    mask="tel"
                    autofocus>
                </field>
            </div>
            <div style="width: 330px">
                <field
                    type="text"
                    id="name_sender"
                    placeholder="ФИО"
                    v-model="name_sender">
                </field>
            </div>
            <div style="width: 330px">
                <field
                    type="text"
                    id="adress_sender"
                    placeholder="Адрес"
                    v-model="adress_sender">
                </field>
            </div>
            <div class="button_doc_wrap">
                <passport></passport>
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
import ButtonComp from '../UI/ButtonComp.vue';
import Field from '../UI/Field.vue';
import Passport from '../modules/Passport.vue';

export default {
    data() {
        return {
            valid: '',
            phone_sender: '+',
            name_sender: '',
            adress_sender: ''
        }
    },
    methods: {
        closeForm() {
            this.$emit('close');
        }
    },
    components: {
        ButtonComp,
        Field,
        Passport
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
            margin: 0 0 20px 0

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
        align-items: center

        & div + div
            margin-left: 20px


    .button_doc_wrap



</style>

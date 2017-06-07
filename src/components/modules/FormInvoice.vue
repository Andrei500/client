<template>
    <div class="invoice_form">
        <div class="header">
            <h3>Создание накладной</h3>
            <button @click="closeForm()"><i class="icon-close"></i></button>
        </div>

        <h4>1. Отправитель</h4>
        <field
            type="text"
            id="phone_sender"
            placeholder="Телефон"
            v-model="phone_sender"
            mask="tel"
            autofocus>
        </field>

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

export default {
    data() {
        return {
            valid: '',
            phone_sender: '+'
        }
    },
    methods: {
        closeForm() {
            this.$emit('close');
        }
    },
    components: {
        ButtonComp,
        Field
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

        & h4
            font-family: 'Regular'
            margin-bottom: 20px

    .header, .footer
        position: fixed
        width: calc(100vw - 300px)
        height: 60px
        background: $medium
        display: flex
        align-items: center
        padding: 0 20px
        justify-content: space-between

    .footer
        bottom: 0
        right: 0

    .header
        top: 0
        right: 0

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

            &:hover
                color: $dark


</style>

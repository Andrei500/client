<template>
    <div class="field_wrap" ref="sender">

        <div class="title">
            <h4>{{ title }}</h4>
            <label>
                  <input type="checkbox" value="true">
                  юр. лицо
            </label>
        </div>

        <field
            width="50%"
            type="text"
            placeholder="Телефон"
            v-model="client.phone"
            mask="tel"
            autofocus>
        </field>

        <field
            type="text"
            placeholder="ФИО"
            v-model="client.name">
        </field>

        <field
            width="50%"
            type="text"
            placeholder="Адрес"
            v-model="client.adress">
        </field>

        <div class="button_doc_wrap">
            <passport v-model="client.docs" @open="addOffset('sender', $event)"></passport>
        </div>
    </div>
</template>

<script>

import Field from '../UI/Field.vue';
import Passport from './Passport.vue';
import SelectComp from '../UI/SelectComp.vue';

export default {

    props: {
        title: {
            type: String,
            default: 'Заголовок'
        }
    },

    data() {
        return {
            client: {
                phone: '+',
                name: '',
                adress: '',
                docs: {}
            }
        }
    },

    methods: {
        addOffset(who, val) {
            const
                el = this.$refs[who],
                className = 'with_offset';

            if (val) el.classList.add(className);
            else el.classList.remove(className);
        }
    },
    components: {
        Field,
        Passport,
        SelectComp
    }

}
</script>

<style lang="sass">

    @import "../../configs/styles_config.sass"

    .field_wrap
        display: flex
        justify-content: space-between
        align-items: flex-start
        margin-bottom: 30px
        flex-wrap: wrap
        transition: all .3s linear
        background: #fff
        border-radius: 5px
        padding: 20px 30px

        & .title
            width: 50%
            padding: 3px 20px 3px 27px
            font-family: 'Regular'
            border-left: 3px solid $primary-color
            margin-left: -30px

            & label
                font: 12px 'Light'
                color: $hard
                display: block
                margin-top: 5px
                cursor: pointer
                transition: all .3s ease

                &:hover
                    color: $dark

        & div
            width: 100%

            &:first-of-type
                width: 50%
                margin-top: 15px

            & + div
            margin-top: 20px

        &.with_offset
            margin-bottom: 110px


</style>

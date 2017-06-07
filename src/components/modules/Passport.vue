<template>
    <div style="position: relative">
        <button @click="toggleActive()" :class="{ 'active': active }"><i class="icon-passport"></i></button>
        <div v-if="active" class="doc_fields_wrap">

            <div style="width: 230px">
                <select-comp></select-comp>
            </div>

            <div style="width: 230px">
                <field
                    type="text"
                    id="adress_sender"
                    placeholder="Адрес"
                    v-model="adress_sender">
                </field>
            </div>

        </div>
    </div>
</template>

<script>

import Field from '../UI/Field.vue';
import SelectComp from '../UI/SelectComp.vue';

export default {
    data() {
        return {
            active: false,
            adress_sender: ''
        }
    },
    methods: {
        toggleActive() {
            this.active = !this.active;
        }
    },
    components: {
        Field,
        SelectComp
    }
}
</script>

<style lang="sass" scoped>

    @import "../../configs/styles_config.sass"

    button
        background: none
        border: none
        outline: none
        cursor: pointer
        padding: 15px

        &.active
            background: $medium
            border-radius: 3px

            & i
                color: $dark

        & i
            color: $hard
            font-size: 20px
            transition: all .3s ease

            &:hover
                color: $dark

    .doc_fields_wrap
        position: absolute
        width: calc(100vw - 340px)
        background: $medium
        right: 0
        top: 62px
        border-radius: 3px
        padding: 25px 20px 20px 20px
        display: flex
        justify-content: space-between
        align-items: center

        & div + div
            margin-left: 20px

        &::before
            content: ''
            position: absolute
            right: 20px
            top: -20px
            border: 10px solid transparent
            border-bottom: 10px solid $medium


</style>

<template>

    <div>

        <div class="top_panel">

            <div class="left">
                <img src="../../assets/img/logo.png" height="40" alt="">
                <h2>{{shortName}}</h2>
                <p>кабинет оператора</p>
            </div>

            <div class="right">

                <search/>
                <div>
                    <bell/>
                    <user-name/>
                </div>

            </div>
        </div>

        <sidebar-comp
            @openFormInvoice="showFormInvoice = true"
            :disabledButton="showFormInvoice">
        </sidebar-comp>

        <transition name="fade-in-left">
            <form-invoice v-if="showFormInvoice" @close="showFormInvoice = false"></form-invoice>
        </transition>
    </div>

</template>

<script>
import config from '../../configs/main_app_config.js';

import Search from '../modules/Search.vue';
import Bell from '../modules/Bell.vue';
import UserName from '../modules/UserName.vue';
import SidebarComp from '../modules/SidebarComp.vue';
import FormInvoice from '../modules/FormInvoice.vue';

export default {
    data() {
        return {
            shortName: config.shortName,
            showFormInvoice: false
        }
    },
    components: {
        Search,
        Bell,
        UserName,
        SidebarComp,
        FormInvoice
    }
}
</script>

<style lang="sass" scoped>

    @import "../../configs/styles_config.sass"

    .fade-in-left-enter-active
        transition: all .3s ease

    .fade-in-left-leave-active
        transition: all .3s ease

    .fade-in-left-enter
        opacity: 0
        transform: translate(200px)

    .fade-in-left-leave-to
        opacity: 0
        transform: translate(200px)

    .top_panel
        width: 100%
        display: flex
        position: fixed
        top: 0
        left: 0
        background: #fff
        box-shadow: 1px 2px 10px $trans-black
        z-index: 1

    .left
        width: 260px
        padding: 10px 20px
        border-right: 1px solid $medium

        & img
            float: left
            margin-right: 15px

        & h2
            margin: 0
            font: 20px 'Light'

        & p
            margin: 0
            font: 12px 'Light'
            color: $hard

    .right
        display: flex
        align-items: center
        width: calc(100% - 260px)
        justify-content: space-between

        & > div
            display: flex
            justify-content: space-between

</style>

<template>

    <div class="top_panel">

        <div class="left">
            <img src="../../assets/img/logo.png" height="40" alt="">
            <h2>{{shortName}}</h2>
            <p>кабинет оператора</p>
        </div>

        <div class="right">

            <search/>
            <bell/>
            <user-name/>

        </div>
    </div>

</template>

<script>
import config from '../../configs/main_app_config.js';

import Search from '../modules/Search.vue';
import Bell from '../modules/Bell.vue';
import UserName from '../modules/UserName.vue';

export default {
    data() {
        return {
            shortName: config.shortName
        }
    },
    components: {
        Search,
        Bell,
        UserName
    }
}
</script>

<style lang="sass" scoped>
    @import "../../configs/styles_config.sass"

    *
        box-sizing: border-box

    .top_panel
        width: 100%
        display: flex
        position: fixed
        top: 0
        left: 0
        background: #fff
        box-shadow: 1px 5px 10px $medium

    .left
        width: 300px
        padding: 10px 30px
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
        width: calc(100% - 300px)
        justify-content: space-between

</style>

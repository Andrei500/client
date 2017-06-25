<template>
        <router-view></router-view>
</template>

<script>
export default {

}
</script>

<style lang="sass">
@import "./assets/css/normalize.css"
@import "./assets/css/fonts.css"
@import "./assets/css/icon-font.css"
@import "./assets/css/print.sass"

@import "./configs/styles_config.sass"

*
    box-sizing: border-box
    margin: 0
    padding: 0

h1, h2, h3, h4, h5, h6
    font-weight: normal

body
    height: 100vh
    font-size: 14px
    line-height: 120%
    font-family: "Light"
    color: $dark
    background: $light
    margin: 0
    padding: 0
    overflow: hidden

    .tooltip
        position: absolute
        z-index: 10000
        background: rgba(0, 0, 0, .8)
        transition: all .3s ease 0
        padding: 5px 10px
        height: 24px
        font: 12px 'Light'
        color: #fff
        border-radius: 3px
        white-space: nowrap
        opacity: 0

        &:hover
            opacity: 0

        &.active
            transition: all .3s ease .3s
            opacity: 1

        &.left::before
            content: ''
            position: absolute
            right: -12px
            top: 6px
            border: 6px solid transparent
            border-left: 6px solid rgba(0, 0, 0, .8)

        &.right::before
            content: ''
            position: absolute
            left: -12px
            top: 6px
            border: 6px solid transparent
            border-right: 6px solid rgba(0, 0, 0, .8)

        &.top::before
            content: ''
            position: absolute
            left: calc(50% - 6px)
            top: 26px
            border: 6px solid transparent
            border-top: 6px solid rgba(0, 0, 0, .8)

        &.bottom::before
            content: ''
            position: absolute
            left: calc(50% - 6px)
            top: -12px
            border: 6px solid transparent
            border-bottom: 6px solid rgba(0, 0, 0, .8)

</style>

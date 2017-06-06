<template>
    <button type="submit" :disabled="disabled">{{text}}</button>
</template>

<script>
export default {
    props: {
        text: {
            type: String,
            default: 'OK'
        },
        disabled: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style lang="sass" scoped>

    @import "../../configs/styles_config.sass"

    button
        width: 100%
        box-sizing: border-box
        padding: 15px 0
        border: none
        border-radius: 3px
        background: $primary-color
        color: #fff
        cursor: pointer
        position: relative
        overflow: hidden
        outline: none

        &:disabled
            background: $hard
            cursor: default

            &:hover::before
                left: -700px

            &:active
                background: $hard

        &::before
            position: absolute
            content: ''
            width: 500px
            height: 500px
            left: -700px
            top: -225px
            background: rgba(0, 0, 0, 0.07)
            transform: rotate(45deg)
            transition: all .3s ease-in-out
            opacity: 0

        &:hover::before
            left: -400px
            opacity: 1

        &:active
            background: #f64a46




</style>

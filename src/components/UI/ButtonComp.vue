<template>
    <button :class="{'small': small}" :disabled="disabled"><i :class="'icon-' + icon"></i> {{ text }}</button>
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
        },
        icon: {
            type: String,
            default: ''
        },
        small: {
            default: false
        }
    }
}
</script>

<style lang="sass" scoped>
    @import "../../configs/styles_config.sass"

    *
        box-sizing: border-box

    button
        width: 100%
        max-width: 260px
        height: 50px
        border: none
        outline: none
        transition: all .3s ease
        cursor: pointer
        font-family: 'Regular'
        border-radius: 3px
        background: $primary-color
        @if $primary-color == #ffc107 { color: $dark } @else { color: #fff }

        &.small
            width: initial
            height: 40px
            padding: 0 15px

        &:hover
            background: lighten($primary-color, 12%)

        &:active
            background: $primary-color

        & i:before
            font-size: 18px
            line-height: 19px

        &:disabled
            background: $medium
            cursor: default

</style>

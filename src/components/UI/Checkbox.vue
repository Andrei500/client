<template lang="html">
    <div :style="{ fontSize: size }">
          <input @focus="$emit('focus')" type="checkbox" id="we" v-model="value">
          <label @click="value = !value">юр. лицо</label>
    </div>
</template>

<script>
export default {
    props: {
        size: {
            type: String,
            default: '14px'
        },
        title: {
            type: String,
            default: 'Заголовок'
        }
    },
    data() {
        return {
            value: false
        }
    },
    watch: {
        value(val) {
            this.$emit('input', val);
        }
    }
}
</script>

<style lang="sass" scoped>

    @import "../../configs/styles_config.sass"

    div
        display: inline-block

    [type="checkbox"]

        &:not(:checked),
        &:checked
            position: absolute
            left: -9999px

        &:not(:checked) + label,
        &:checked + label
            position: relative
            padding-left: 1.75rem
            cursor: pointer
            color: $hard
            font: 1em 'Light'
            transition: all .3s ease
            display: inline-block
            height: 17px
            line-height: 17px

        &:not(:checked) + label:hover,
        &:checked + label
            color: $dark

        &:not(:checked) + label::before,
        &:checked + label::before
            content: ''
            position: absolute
            left: 0; top: 0
            width: 15px
            height: 15px
            border: 1px solid $medium
            background: #fff
            border-radius: 2px

        &:not(:checked) + label::after,
        &:checked + label::after
            content: '\e802'
            position: absolute
            top: 0
            left: 0
            width: 17px
            height: 17px
            font: 16px 'fontello'
            color: $primary-color
            transition: all .2s

        &:not(:checked) + label::after
            opacity: 0
            transform: scale(.5)

        &:checked + label::after
            opacity: 1
            transform: scale(1)

        &:disabled:not(:checked) + label::before,
        &:disabled:checked + label::before
            box-shadow: none
            border-color: #bbb
            background-color: #ddd

        &:disabled:checked + label:after
            color: #999

        &:disabled + label
            color: #aaa


    label:hover
        color: $dark


</style>

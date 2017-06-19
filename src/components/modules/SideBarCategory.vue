<template>

    <div>
        <h5>{{ title }}</h5>
        <ul>
            <li v-for="item in menuItems">
                <a href="#" slot="title">
                    {{ item.name }}
                    <span v-if="item.value">{{ item.value }}</span>
                </a>
            </li>
        </ul>
    </div>

</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: 'Заголовок'
        },
        menuItems: {
            type: Array,
            default() {
                return [
                    {
                        name: 'Пункт 1',
                        value: 1
                    },
                    {
                        name: 'Пункт 2',
                        value: 2
                    },
                    {
                        name: 'Пункт 3',
                        value: 3
                    }
                ]
            }
        }
    },
    components: {

    }
}
</script>

<style lang="sass" scoped>

    @import "../../configs/styles_config.sass"

    h5
        font-size: 12px
        color: $hard
        margin-bottom: 10px

    ul
        list-style: none

        & li a
            display: flex
            justify-content: space-between
            height: 40px
            line-height: 40px
            padding: 0 20px
            color: $dark
            text-decoration: none
            border-radius: 3px
            transition: all .3s ease

            &:hover, &.active
                background: $light

            &.active
                font-family: 'Regular'

            & span
                color: $primary-color
                font-family: 'Regular'


</style>

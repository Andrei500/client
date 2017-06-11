<template>
    <div :style="{ width }">
        <span v-if="title">{{ title }}</span>
        <a href="#" ref="select" :class="['select', { 'active': showList }]"
            @click="toggleList()"
            @keydown.down="onDownKey()"
            @keydown.up="onUpKey()"
            @keyup.enter="onEnterKey()">
            {{ selected.name }}
            <i class="icon-chevron"></i>
        </a>
        <div class="list_wrap">
            <transition name="to-bottom">
                <ul v-if="showList">
                    <li
                        v-for="(option, index) in options"
                        @click="select(index)"
                        :class="[selectIndex === index ? 'active_item': '']">
                        {{ option.name }}
                    </li>
                </ul>
            </transition>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: ''
        },
        width: {
            type: String,
            default: '100%'
        },
        options: {
            type: Array,
            default() {
                return [
                    {
                        name: 'Option 1',
                        value: 1
                    },
                    {
                        name: 'Option 2',
                        value: 2
                    },
                    {
                        name: 'Option 3',
                        value: 3
                    }
                ];
            }
        }
    },
    data() {
        return {
            showList: false,
            selected: {
                name: '',
                value: 0
            },
            selectIndex: 0
        }
    },
    methods: {
        select(index) {
            this.selected.value = this.options[index].value;
            this.selected.name = this.options[index].name;
            this.selectIndex = index;
            this.toggleList(false);
            this.$refs.select.blur();
            this.$emit('input', this.selected)
        },
        toggleList(is) {
            if (!this.showList) document.addEventListener('click', this.closeSelect, false);
            else document.removeEventListener('click', this.closeSelect, false);

            const value = (is !== undefined) ? is : !this.showList;
            this.showList = value;
        },
        closeSelect: function(e) {
            // if (!e.target == this.$refs.select) {
            //     this.showList = false;
            // }
        },
        onDownKey() {
            if (this.selectIndex < this.options.length - 1) this.selectIndex++;
        },
        onUpKey() {
            if (this.selectIndex > 0) this.selectIndex--;
        },
        onEnterKey() {
            this.select(this.selectIndex);
        }
    },
    mounted() {
        this.select(0);
    }
}
</script>

<style lang="sass" scoped>

    @import "../../configs/styles_config.sass"

    .to-bottom-enter-active
        transition: all .2s linear

    .to-bottom-leave-active
        transition: all .2s linear

    .to-bottom-enter, .to-bottom-leave-to
        transform: translateY(-100%)

    div
        position: relative

    .select
        display: flex
        justify-content: space-between
        align-items: center
        padding: 12px 15px
        color: $dark
        text-decoration: none
        background: #fff
        border-radius: 3px
        font: 14px 'Regular'
        white-space: nowrap
        overflow: hidden
        text-overflow: ellipsis
        border: 1px solid $medium
        height: 40px

        &.active
            border-radius: 3px 3px 0 0
            border-bottom: none
            z-index: 7
            // box-shadow: 1px 1px 10px rgba(0, 0, 0, .05)

            & i::before
                transform: rotate(-180deg)

            & + .list_wrap
                // box-shadow: 1px 1px 10px rgba(0, 0, 0, .05)

    .list_wrap
        position: absolute
        width: 100%
        overflow: hidden
        z-index: 7
        transition: all .3s linear


    ul
        list-style: none
        background: #fff
        font-size: 14px
        z-index: 5

        & li
            padding: 10px 15px
            cursor: pointer
            border-top: 1px solid $medium
            white-space: nowrap
            overflow: hidden
            text-overflow: ellipsis
            z-index: 5

            &:hover
                background: $light


    .active_item
        background: $light

    span
        font-size: 11px
        color: $hard
        display: block
        margin-bottom: 3px

    i
        margin-left: 10px

        &::before
            transition: all .3s ease


</style>

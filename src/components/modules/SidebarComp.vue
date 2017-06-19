<template>

    <div class="sidebar">
        <div class="sidebar_child">
            <button-comp
                text="Создать накладную"
                :disabled="disabledButton"
                @click.native="$emit('openFormInvoice')">
            </button-comp>
        </div>
        <div class="sidebar_child" v-for="item in menu">
            <sidebar-category
                :title="item.title"
                :menuItems="item.menuItems">
            </sidebar-category>
        </div>
    </div>

</template>

<script>
import ButtonComp from '../UI/ButtonComp.vue';
import SidebarCategory from './SidebarCategory.vue';

export default {
    props: {
        disabledButton: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            menu: [
                {
                    title: 'Накладные',
                    menuItems: [
                        {
                            name: 'К отправлению',
                            value: 7
                        },
                        {
                            name: 'К получению',
                            value: 12
                        },
                        {
                            name: 'К выдаче',
                            value: 5
                        }
                    ]
                },
                {
                    title: 'Ведомости',
                    menuItems: [
                        {
                            name: 'Погрузочные',
                            value: 7
                        },
                        {
                            name: 'Выгрузочные',
                            value: 12
                        },
                        {
                            name: 'Касса',
                            value: '3750 р'
                        }
                    ]
                },
                {
                    title: 'Справка',
                    menuItems: [
                        {
                            name: 'Документы для работы'
                        },
                        {
                            name: 'Как работать в системе'
                        }
                    ]
                }
            ]
        }
    },
    methods: {

    },
    components: {
        ButtonComp,
        SidebarCategory
    }
}
</script>

<style lang="sass">

    @import "../../configs/styles_config.sass"

    .sidebar
        position: fixed
        width: 260px
        height: 900px
        top: 60px
        left: 0
        background: #fff
        z-index: 0

        &_child
            padding: 15px 20px

            & + &
                border-top: 1px solid $medium

</style>

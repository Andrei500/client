<template>
<div class="sidebar">
  <div class="logo_head">
    <img src="../../assets/img/logo.png" height="40" alt="">
    <h2>{{ shortName }}</h2>
    <p>кабинет оператора</p>
  </div>
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
import config from '../../configs/main_app_config.js';
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
      shortName: config.shortName,
      menu: [
        {
          title: 'Накладные',
          menuItems: [{
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
          menuItems: [{
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
  height: 100vh
  top: 0
  left: 0
  background: #fff
  z-index: 1
  box-shadow: 1px 0 20px $trans-black
  overflow-y: scroll

  &::-webkit-scrollbar
    width: 0


  &_child
    padding: 15px 20px
    border-top: 1px solid $medium

.logo_head
  width: 260px
  height: 60px
  padding: 10px 20px

  & img
    float: left
    margin-right: 15px

  & h2
    margin: 0
    font-size: 20px

  & p
    margin: 0
    font-size: 12px
    color: $hard

</style>

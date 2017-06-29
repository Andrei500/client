<template>

  <!-- # Имя и меню пользователя -->

<div class="name_wrap">

  <a @mousedown.prevent="toggleMenu()" href="#" :class="['name', { 'active': active }]">
    <div>
      <h4>{{ userName }}</h4>
      <span>{{ city + ', отд. #' + number }}</span>
    </div>
    <button><i class="icon-chevron"></i></button>
  </a>

  <ul v-if="active">
    <li @mousedown.stop="darkMode = !darkMode">
      Темный режим
      <switcher v-model="darkMode" :selected="darkMode" />
    </li>
    <router-link tag="li" to="/login">Выйти</router-link>
  </ul>

</div>
</template>

<script>
import Switcher from '../../UI/Switcher.vue';

export default {
  data() {
    return {
      userName: 'Виолетта Хведынко',
      city: 'Макеевка',
      number: 1,
      active: false,
      darkMode: false
    }
  },

  methods: {
    toggleMenu() {
      if (!this.active) document.addEventListener('click', this.closeUserMenu, false);
      else document.removeEventListener('click', this.closeBell, false);
      this.active = !this.active;
    },
    closeUserMenu: function(e) {
      if (!e.target.closest(".name_wrap")) {
        this.active = false;
      }
    }
  },

  components: {
    Switcher
  }
}
</script>

<style lang="sass" scoped>

@import "../../../configs/styles_config.sass"

.name_wrap
  position: relative

button
  border: none
  outline: none
  background: none
  position: relative
  cursor: pointer
  padding: 0 5px 0 10px
  top: -8px

.name
  display: block
  height: 60px
  text-decoration: none
  padding: 10px 20px
  color: $dark

  & div
    display: inline-block

    & h4
      font-weight: 500
      font-weight: normal
      margin: 5px 0 0 0

    & span
      color: $hard
      font-size: 12px

    & button i
      font-size: 12px

      &::before
        transition: all .3s ease

.active
    background: $medium

    & button i::before
      transform: rotate(-180deg)

ul
  position: absolute
  width: 100%
  min-width: 195px
  background: #fff
  margin: 0
  box-shadow: 1px 2px 10px $trans-black
  list-style: none
  padding: 0
  cursor: pointer
  right: 0

  &::before
    content: ''
    position: absolute
    right: 24px
    top: -20px
    border: 10px solid transparent
    border-bottom: 10px solid #fff

  & li
    padding: 0 25px 0 20px
    text-decoration: none
    color: $dark
    height: 40px
    display: flex
    align-items: center
    justify-content: space-between

    &:hover
      background: $light

    & + li
      border-top: 1px solid $light

</style>

<template>

  <!-- Колокольчик для уведомлений -->

<div class="bell_wrap">

  <button @mousedown="toggleActive()" :class="['bell', { 'active': active }]">
    <i class="icon-bell"></i>
    <span v-if="!active && news.length" class="counter">{{ news.length }}</span>
  </button>

  <!-- Выавдающее меню новостей -->
  <ul v-if="active">
    <span class="news_title">Оповещения</span>

    <template v-if="!!news.length">
      <li v-for="item in news">
        <a href="#">{{ item.title }}</a>
      </li>
      <a class="see_all" href="#">Посмотреть все<i class="icon-chevron"></i></a>
    </template>

    <p v-else>Нет новых оповещений...</p>
  </ul>

</div>
</template>

<script>
export default {
  data() {
    return {
      active: false,
      news: [
        { title: 'Новая инструкция по приему груза' },
        { title: 'Изменения в тарификаторах' },
        { title: 'Новые правила оформления накладной' }
      ]
    }
  },

  methods: {
    toggleActive() {
      if (!this.active) {
        document.addEventListener('click', this.closeBell, false);
      } else document.removeEventListener('click', this.closeBell, false);

      this.active = !this.active;
    },
    closeBell: function(e) {
      if (!e.target.closest(".bell_wrap") && !e.target.closest(".counter")) {
        this.active = false;
      }
    }
  }
}
</script>

<style lang="sass" scoped>
@import "../../../configs/styles_config.sass"

.bell_wrap
  position: relative

.bell
  border: none
  outline: none
  background: none
  position: relative
  cursor: pointer
  width: 60px
  height: 60px

  & i
    color: $hard
    font-size: 22px
    line-height: 22px
    transition: all .3s ease

  & .counter
    position: absolute
    width: 15px
    height: 15px
    background: $primary-color
    @if $primary-color == #ffc107 { color: $dark } @else { color: #fff }
    border-radius: 50%
    font-size: 11px
    line-height: 16px
    top: 16px
    right: 16px

  &.active
    background: $medium

ul
  position: absolute
  width: 320px
  background: #fff
  margin: 0
  right: -30px
  box-shadow: 1px 2px 10px $trans-black
  list-style: none
  padding: 0

  &::before
    content: ''
    position: absolute
    right: 50px
    top: -20px
    border: 10px solid transparent
    border-bottom: 10px solid #fff

  & li

    & + li
      border-top: 1px solid $light

    & a
      display: block
      padding: 10px 25px 10px 20px
      text-decoration: none
      color: $dark
      position: relative
      text-indent: 20px
      white-space: nowrap
      overflow: hidden
      text-overflow: ellipsis

      &:before
        color: $primary-color
        content: "•"
        font-size: 28px
        position: absolute
        left: -5px
        top: 9px

      &:hover
        background: $light

  & p
    text-align: center


.news_title
  color: $hard
  border-bottom: 1px solid $medium
  display: block
  padding: 10px 15px

.see_all
  display: block
  text-align: right
  color: $dark
  font-weight: 500
  border-top: 1px solid $medium
  padding: 10px 15px
  text-decoration: none

  & i::before
    margin-left: 5px
    transform: rotate(-90deg)
    font-size: 12px
    transition: all .3s ease

  &:hover i::before
    transform: rotate(-90deg) translateY(3px)

</style>

<template>
<div>
  <h5>{{ title }}</h5>
  <ul>
    <li v-for="item in menuItems">
      <a href="#" slot="title">{{ item.name }}
        <span v-if="item.count > 0">{{ item.count }}</span>
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
      default () {
        return [{
            name: 'Пункт 1',
            count: 1
          },
          {
            name: 'Пункт 2',
            count: 2
          },
          {
            name: 'Пункт 3',
            count: 3
          }
        ]
      }
    }
  }
}
</script>

<style lang="sass" scoped>

@import "../../../configs/styles_config.sass"

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
    padding: 0 30px 0 27px
    border-left: 3px solid transparent
    margin: 0 -20px
    color: $dark
    text-decoration: none
    transition: all .3s ease

    &:hover, &.active
      background: $light

    &.active
      font-weight: 500
      border-left-color: $primary-color

    & span
      color: $primary-color
      font-weight: 600
      line-height: 40px

</style>

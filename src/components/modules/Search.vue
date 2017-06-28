<template>
<form @submit="search($event)" class="search">
  <input placeholder="Поиск накладных по номеру, имени, телефону..." type="text" v-model.trim="query">
  <button><i class="icon-search"></i></button>
</form>
</template>

<script>
export default {
  data() {
    return {
      query: ''
    }
  },
  methods: {
    search(e) {
      e.preventDefault();
      if (this.query) {
        this.$router.push({
          path: '/results',
          query: {
            q: this.query
          }
        });
      }
    }
  }
}
// this.$route.query.q
</script>

<style lang="sass">

@import "../../configs/styles_config.sass"

.search
  height: 40px
  display: flex
  align-items: center
  width: 100%
  max-width: 560px
  margin: 10px 0 10px 20px

  & input
    height: 100%
    background: $light
    border: none
    outline: none
    border-radius: 3px 0 0 3px
    padding: 20px
    font-weight: 500
    width: 100%

    &::-webkit-input-placeholder
      font-weight: 400

  & button
    background: $medium
    height: 100%
    border: none
    outline: none
    padding: 10px 20px
    border-radius: 0 3px 3px 0
    transition: all .3s ease

    & i
      color: $hard
      font-size: 20px
      line-height: 20px
      transition: all .3s ease

    &:hover
      cursor: pointer
      background: $hard

    &:hover i
      color: #fff

</style>

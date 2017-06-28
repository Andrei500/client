<template>
  <router-view></router-view>
</template>

<script>
  document.body.style.zoom = (window.innerWidth * 100 / 1280) + "%";
</script>

<style lang="sass">

@import "./assets/css/normalize.css"
@import "./assets/css/fonts.css"
@import "./assets/css/icon-font.css"
@import "./assets/css/print.sass"
@import "./plugins/v-tooltip/styles.sass"

@import "./configs/styles_config.sass"

*
  box-sizing: border-box
  margin: 0
  padding: 0
  font: 400 14px/120% 'SF'
  letter-spacing: .015em

h1, h2, h3, h4, h5, h6
  font-weight: normal

body
  display: flex
  align-items: center
  justify-content: center
  height: 100vh
  overflow: hidden

  background: $light
  color: $dark

</style>

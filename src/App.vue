<template>
    <router-view></router-view>
</template>

<script>
export default {

}
</script>

<style lang="sass">
@import "./assets/css/normalize.css"
@import "./assets/css/fonts.css"
@import "./assets/css/icon-font.css"

@import "./configs/styles_config.sass"

*
    box-sizing: border-box
    margin: 0
    padding: 0

h1, h2, h3, h4, h5, h6
    font-weight: normal

body
    height: 100vh
    font: 14px/120% "Light"
    color: $dark
    background: $light
    margin: 0
    padding: 0
    overflow: hidden

</style>

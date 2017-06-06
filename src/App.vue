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

body
    height: 100vh
    font: 14px/120% "Light"
    color: $dark
    background: $light
    margin: 0
    padding: 0

</style>

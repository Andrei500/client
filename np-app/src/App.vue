<template>

    <Auth/>

</template>

<script>
import Auth from './components/modules/Auth.vue';


export default {
    name: 'app',
    components: {
        Auth
    }
}
</script>

<style>
@import "./assets/css/normalize.css";
@import "./assets/css/fonts.css";

body {
    height: 100vh;
    font: 16px/120% "Light";
    color: rgba(0, 0, 0, .8);
    background: rgba(0, 0, 0, .02);
    margin: 0;
    padding: 0;
}

</style>

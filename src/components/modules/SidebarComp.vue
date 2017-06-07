<template>

    <div class="sidebar">
        <slot></slot>
    </div>

</template>

<script>
export default {
}
</script>

<style lang="sass">

    @import "../../configs/styles_config.sass"

    *
        box-sizing: border-box

    .sidebar
        position: fixed
        width: 300px
        height: 900px
        top: 60px
        left: 0
        background: #fff
        z-index: 0

</style>

<template>
    <button type="submit" :disabled="disabled">{{text}}</button>
</template>

<script>
export default {
    props: {
        text: {
            type: String,
            default: 'OK'
        },
        disabled: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style scoped>

    button {
        width: 100%;
        box-sizing: border-box;
        padding: 15px 0;
        border: none;
        border-radius: 3px;
        background: #e53935;
        color: #fff;
        cursor: pointer;
        margin-top: 10px;
        position: relative;
        overflow: hidden;
        outline: none;
    }
    button:disabled {
        background: #aaa;
        cursor: default;
    }
    button:disabled:hover::before {
        left: -700px;
    }
    button::before {
        position: absolute;
        content: '';
        width: 500px;
        height: 500px;
        left: -700px;
        top: -225px;
        background: rgba(0, 0, 0, 0.07);
        transform: rotate(45deg);
        transition: all .3s ease-in-out;
        opacity: 0;
    }
    button:hover::before {
        left: -400px;
        opacity: 1;
    }
    button:active {
        background: #f64a46;
    }
    button:disabled:active {
        background: #aaa;
    }

</style>

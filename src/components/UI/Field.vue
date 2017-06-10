<template>
    <div>
        <input
            autocomplete="off"
            :autofocus="autofocus"
            :type="type"
            v-mask="regEx"
            :value="value"
            @focus="addPlus()"
            @input="setValue($event.target.value)"
        >
        <label
            @click="focusToInput($event)"
            :class="{ active : !!value }"
        >{{placeholder}}</label>

    </div>
</template>

<script>
export default {
    props: {
        type: {
            type: String,
            default: 'text'
        },
        placeholder: {
            type: String,
            default: ''
        },
        mask: {
            type: String,
            default: ''
        },
        autofocus: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            value: ''
        }
    },
    computed: {
        regEx() {
            const mask = this.mask;
            if (mask) {
                let exp;

                switch (mask) {
                    case 'tel':
                        exp = (this.value[1] == 3) ? '+## (###) ###-##-##' : '+# (###) ###-##-##';
                        break;
                }

                return exp;
            }   else return false;
        }
    },
    methods: {
        setValue(value) {
            this.value = value;
            this.$emit('input', value);
        },
        addPlus() {
            if (this.mask == 'tel') {
                if (!this.value) this.setValue('+');
                else return;
            }   else return;
        },
        focusToInput(e) {
            e.target.previousElementSibling.focus();
        }
    }
}
</script>

<style lang="sass" scoped>

    @import "../../configs/styles_config.sass"

    div
        position: relative


    input
        border: none
        box-shadow: none
        border-bottom: 1px solid $medium
        outline: none
        height: 30px
        width: 100%
        background: transparent


    input:focus
        box-shadow: 0 1px 0 $primary-color
        border-bottom: 1px solid $primary-color


    label
        top: 0.4rem
        color: $hard
        position: absolute
        left: 0
        cursor: text
        transition: .2s ease-out


    input:focus + label
        color: $primary-color


    input:focus + label,
    .active
        font-size: 11px
        position: absolute
        top: -0.8rem
        cursor: text

</style>

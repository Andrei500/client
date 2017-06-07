<template>
    <div>
        <input
            autocomplete="off"
            :autofocus="autofocus"
            :type="type"
            :id="id"
            v-mask="regEx"
            :value="value"
            @focus="addPlus()"
            @input="setValue($event.target.value)"
        >
        <label
            :for="id"
            :class="{ active : !!value }"
        >{{placeholder}}</label>

    </div>
</template>

<script>
export default {
    props: {
        id: {
            type: String,
            default: 'input'
        },
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
        }
    }
}
</script>

<style lang="sass" scoped>

    @import "../../configs/styles_config.sass"

    div
        position: relative
        margin-bottom: 30px


    input
        border: none
        box-shadow: none
        border-bottom: 1px solid $hard
        outline: none
        height: 30px
        width: 100%
        background: transparent


    input:focus
        box-shadow: 0 1px 0 $primary-color
        border-bottom: 1px solid $primary-color


    label
        top: 0.5rem
        color: $hard
        position: absolute
        left: 0
        cursor: text
        transition: .2s ease-out


    input:focus + label
        color: $primary-color


    input:focus + label,
    .active
        font-size: 12px
        position: absolute
        top: -0.9rem
        cursor: text

</style>

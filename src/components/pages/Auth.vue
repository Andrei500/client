<template>

    <div ref="parallax" class="bg_parallax" @mousemove="move($event)">
        <form action="#" @mousemove="move($event)">
            <img src="../../assets/img/logo.svg" alt="Наша Почта Online">
            <h2>Наша Почта Online</h2>

            <field
                type="text"
                id="phone"
                placeholder="Телефон"
                v-model="phone"
                mask="tel"
                autofocus
                @input="focusToPassword($event)">
            </field>

            <field
                ref="password"
                type="password"
                id="password"
                placeholder="Пароль"
                v-model.trim="password"
                @input="cutLength($event)">
            </field>

            <submit text="Войти" :disabled="!isValid"></submit>

        </form>
    </div>

</template>

<script>
import Field from '../UI/Field.vue';
import Submit from '../UI/Submit.vue';

export default {
    data() {
        return {
            phone: '',
            password: ''
        }
    },
    components: {
        Field,
        Submit
    },
    computed: {
        isValid() {
            const isValidPhone = (this.phone.length >= 18),
                  isValidPass = (this.password.length == 8);

            return isValidPhone && isValidPass;
        }
    },
    methods: {
        move(e) {
            const movementStrength = 25,
                  height = movementStrength / window.screen.height,
                  width = movementStrength / window.screen.width,
                  pageX = e.pageX - (window.screen.width / 2),
                  pageY = e.pageY - (window.screen.height / 2),
                  newvalueX = width * pageX * -1 - 25,
                  newvalueY = height * pageY * -1 - 50;

            this.$refs.parallax.style.backgroundPosition = newvalueX + "px " + newvalueY + "px";
        },
        focusToPassword(value) {
            if (value[1] == 3) {
                if (value.length == 19) this.$refs.password.$el.children.password.focus();
            }   else {
                if (value.length == 18) this.$refs.password.$el.children.password.focus();
            }
        },
        cutLength(value) {
            if (value.length > 8) this.password = this.$refs.password.value = value.substring(0, 8);
        }
    }
}
</script>

<style scoped>

    .bg_parallax {
        background: url('../../assets/img/red.jpeg') -25px -50px no-repeat;
        width: 100%;
        height:100%;
        position: fixed;
        top: 0;
        z-index:0;
        background-size: 110% 110%;
    }

    div {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
    }

    form {
        width: 350px;
        background: #fff;
        text-align: center;
        padding: 50px;
        box-sizing: border-box;
        box-shadow: 3px 3px 15px rgba(0, 0, 0, .2);
        border-radius: 5px;
        animation: scale-in .8s ease-in-out;
    }

    img {
        width: 150px;
        margin-bottom: 10px;

        animation: rotate 1.5s ease;
        animation-delay: .8s;
    }

    h2 {
        text-align: center;
        margin-bottom: 40px;
        letter-spacing: -1px;
        font-size: 24px;
    }

    @keyframes scale-in {
      0% {
        transform: scale(1.2);
        opacity: 0;
      }
      100% {
        transform: scale(1);
        opacity: 1;
      }
    }
    @keyframes rotate {
        from {
            transform: rotateY(0);
        }
        to {
            transform: rotateY(180deg);
        }
    }

</style>

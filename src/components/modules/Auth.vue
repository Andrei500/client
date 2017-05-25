<template>

    <div style="background: url('https://pp.userapi.com/c836521/v836521740/37270/iRO5akibeI4.jpg') center center no-repeat; background-size: 105%;">
        <form action="#">
            <img src="../../assets/img/logo.svg" alt="Наша Почта Online">
            <h2>Наша Почта Online</h2>

            <field
                type="text"
                id="phone"
                placeholder="Телефон"
                v-model="phone"
                mask="tel">
            </field>

            <field
                type="password"
                id="password"
                placeholder="Пароль"
                v-model.trim="password">
            </field>

            <submit text="Войти" :disabled="!phone || !password"></submit>

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
    }
}
</script>

<style scoped>
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
    }

    img {
        width: 150px;
    }

    h2 {
        text-align: center;
        margin-bottom: 40px;
        letter-spacing: -1px;
        font-size: 22px;
    }

</style>

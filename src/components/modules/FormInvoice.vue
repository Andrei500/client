<template>
    <div ref="invoice_form" class="invoice_form">
        <div class="header">
            <div class="title_wrap">
                <h3>Создание накладной для доставки:</h3>
                <div style="width: 220px">
                    <select-comp
                        :options="typesOfDelivery"
                        v-model="typeOfDelivery">
                    </select-comp>
                </div>
            </div>
            <button @click="closeForm()"><i class="icon-close"></i></button>
        </div>


        <div class="field_wrap" style="width: 50%" ref="sender">
            <h4 style="width: 50%; padding: 10px 20px 10px 10px">Отправитель</h4>
            <div style="width: 50%; padding: 10px 20px 0px 0; margin-bottom: 20px">
                <field
                    type="text"
                    placeholder="Телефон"
                    v-model="sender.phone"
                    mask="tel"
                    autofocus>
                </field>
            </div>
            <div style="width: 100%; padding: 10px 20px 10px 0">
                <field
                    type="text"
                    placeholder="ФИО"
                    v-model="sender.name">
                </field>
            </div>
            <div style="width: 100%; padding: 10px 20px 10px 0">
                <field
                    type="text"
                    placeholder="Адрес"
                    v-model="sender.adress">
                </field>
            </div>
            <div class="button_doc_wrap">
                <passport v-model="sender.docs" @open="addOffset('sender', $event)"></passport>
            </div>
        </div>

        <h4>2. Получатель</h4>
        <div class="field_wrap" ref="getter">
            <div style="width: 200px">
                <field
                    type="text"
                    placeholder="Телефон"
                    v-model="getter.phone"
                    mask="tel">
                </field>
            </div>
            <div style="width: 320px">
                <field
                    type="text"
                    placeholder="ФИО"
                    v-model="getter.name">
                </field>
            </div>
            <div style="width: 150px">
                <select-comp :options="typesOfLoad"></select-comp>
            </div>
            <div style="width: 150px">
                <field
                    type="text"
                    placeholder="Адрес"
                    v-model="getter.adress">
                </field>
            </div>
            <div class="button_doc_wrap">
                <passport v-model="getter.docs" @open="addOffset('getter', $event)"></passport>
            </div>
        </div>

        <h4 style="margin-bottom: 15px">3. Груз</h4>
        <transition-group name="list" tag="div">
        <div style="margin-bottom: 15px" class="field_wrap" v-for="(load, index) in loads" :key="load">
            <div style="width: 200px">
                <select-comp :options="typesOfLoad" v-model="load.type"></select-comp>
            </div>
            <div style="width: 65px">
                <field
                    type="text"
                    placeholder="Вес, кг"
                    v-model="load.weight">
                </field>
            </div>
            <div style="width: 65px">
                <field
                    type="text"
                    placeholder="Д, см"
                    v-model="load.length">
                </field>
            </div>
            <div style="width: 65px">
                <field
                    type="text"
                    placeholder="Ш, см"
                    v-model="load.width">
                </field>
            </div>
            <div style="width: 65px">
                <field
                    type="text"
                    placeholder="В, см"
                    v-model="load.height">
                </field>
            </div>
            <div style="width: 100px">
                <field
                    type="text"
                    placeholder="Цена, р"
                    v-model="load.price">
                </field>
            </div>
            <div style="width: 200px">
                <field
                    type="text"
                    placeholder="Описание"
                    v-model="load.description">
                </field>
            </div>
            <div class="button_doc_wrap">
                <button :disabled="!(loads.length > 1)" @click="delPlace(index)"><i class="icon-close"></i></button>
            </div>
        </div>
        </transition-group>

        <div class="add_btn_wrap">
            <button @click="addPlace($event)">+ Добавить место</button>
        </div>

        <div class="footer">
            730 р
            <button-comp
                text="Распечатать"
                icon="print"
                small="true"
                :disabled="valid">
            </button-comp>
        </div>
    </div>
</template>

<script>
import config from '../../configs/main_app_config.js';
import ButtonComp from '../UI/ButtonComp.vue';
import Field from '../UI/Field.vue';
import Passport from '../modules/Passport.vue';
import SelectComp from '../UI/SelectComp.vue';

export default {
    data() {
        return {
            valid: '',
            typeOfDelivery: {},
            sender: {
                phone: '+',
                name: '',
                adress: '',
                docs: {}
            },
            getter: {
                phone: '+',
                name: '',
                adress: '',
                docs: {}
            },
            loads: [],
            loadParams: {
                type: {},
                weight: 0,
                length: 0,
                width: 0,
                height: 0,
                price: 0,
                description: ''
            }
        }
    },
    computed: {
        typesOfLoad: function () {
            const types = [];
            for (var i = 0; i < config.typesOfLoad.length; i++) {
                types.push({
                    name: config.typesOfLoad[i],
                    value: (i + 1)
                });
            }
            return types;
        },
        typesOfDelivery: function () {
            const types = [];
            for (var i = 0; i < config.typesOfDelivery.length; i++) {
                types.push({
                    name: config.typesOfDelivery[i],
                    value: (i + 1)
                });
            }
            return types;
        }
    },
    methods: {
        closeForm() {
            this.$emit('close');
        },
        addOffset(who, val) {
            const
                el = this.$refs[who],
                className = 'with_offset';

            if (val) el.classList.add(className);
            else el.classList.remove(className);
        },
        scrollDown(el, height) {
            let start = 0;

            const scr = setInterval(() => {
                start += 1;
                el.scrollTop += start;

                if (start > height) clearInterval(scr);

            }, 17);
        },
        addPlace(event) {
            const loadParams = Object.assign({}, this.loadParams);
            this.loads.push(loadParams);

            if (event !== undefined) this.scrollDown(this.$refs.invoice_form, 40);

        },
        delPlace(index) {
            this.loads.splice(index, 1);
        }
    },
    components: {
        ButtonComp,
        Field,
        Passport,
        SelectComp
    },
    created() {
        this.addPlace();
    }
}
</script>

<style lang="sass" scoped>

    @import "../../configs/styles_config.sass"

    .invoice_form
        position: absolute
        width: calc(100vw - 300px)
        height: 100vh
        right: 0
        top: 0
        z-index: 3
        background: $light
        overflow: scroll
        padding: 80px 20px
        box-shadow: 1px 2px 10px lighten($hard, 20%)

        & h4
            font-family: 'Regular'
            margin: 0
            padding: 10px
            border-left: 3px solid $primary-color

    .header, .footer
        position: fixed
        width: calc(100vw - 300px)
        height: 60px
        background: #fff
        display: flex
        align-items: center
        padding: 0 20px
        justify-content: space-between
        z-index: 6

    .footer
        bottom: 0
        right: 0
        box-shadow: -1px -2px 10px $medium

    .header
        top: 0
        right: 0
        box-shadow: 1px 2px 10px $medium

        & .title_wrap
            display: flex
            align-items: center

            & h3
                font-weight: normal
                font-size: 16px
                margin: 0 10px 0 0

        & button
            border: none
            outline: none
            background: none
            cursor: pointer
            padding: 0

        & i
            font-size: 12px
            color: $hard
            transition: all .3s ease

            &:hover
                color: $dark

    .field_wrap
        display: flex
        justify-content: space-between
        align-items: flex-end
        margin-bottom: 30px
        flex-wrap: wrap

        & div + div
            margin-left: 20px

        &.with_offset
            margin-bottom: 110px


    .button_doc_wrap

        & button
            background: none
            outline: none
            border: none
            padding: 0 19px
            color: $hard
            padding: 5px 20px
            cursor: pointer

            &:disabled
                & i
                    color: lighten($hard, 10%)

                &:hover
                    cursor: default

                    & i
                        color: lighten($hard, 10%)

            & i
                transition: all .3s ease

            &:hover i
                color: $dark

    .add_btn_wrap
        text-align: right

        & button
            background: $medium
            border: none
            outline: none
            padding: 10px 15px
            border-radius: 3px
            margin: 10px 20px
            transition: all .3s ease
            cursor: pointer

            &:hover
                background: $primary-color


    .field_wrap
        transition: all .3s linear

    .list-enter, .list-leave-to
        opacity: 0
        transform: translateX(-100%)

    .list-leave-active
        position: absolute



</style>

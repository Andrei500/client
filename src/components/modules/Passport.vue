<template>
    <div style="position: relative">
        <button @click="toggleActive()" :class="{ 'active': active }"><i class="icon-passport"></i></button>
        <div v-if="active" class="doc_fields_wrap">

            <div style="width: 180px">
                Документ, подтверждаю-<br>щий личность:
            </div>
            <div style="width: 320px">
                <select-comp :options="docsToSelect" @select="changeDoc($event)"></select-comp>
            </div>

            <div style="width: 150px">
                <field
                    type="text"
                    ref="series"
                    id="series"
                    placeholder="Серия"
                    v-model="docData.series"
                    @input="returnData()">
                </field>
            </div>
            <div style="width: 150px">
                <field
                    type="text"
                    id="number"
                    placeholder="Номер"
                    v-model="docData.number"
                    @input="returnData()">
                </field>
            </div>

        </div>
    </div>
</template>

<script>

import Field from '../UI/Field.vue';
import SelectComp from '../UI/SelectComp.vue';

export default {
    data() {
        return {
            active: false,
            docsToSelect: [
                {
                    name: 'Паспорт',
                },
                {
                    name: 'Водительские права',
                },
                {
                    name: 'Пенсионное удостоверение',
                },
                {
                    name: 'Военный билет',
                },
                {
                    name: 'Студенческий билет',
                }
            ],
            docData: {
                selectedDoc: 1,
                series: '',
                number: ''
            }
        }
    },
    methods: {
        toggleActive() {
            this.active = !this.active;
            this.$emit('open', this.active);
        },
        changeDoc(selectedDoc) {
            this.docData.selectedDoc = selectedDoc.name;
            this.$refs.series.$el.children.series.focus();
            this.returnData();
        },
        returnData() {
            this.$emit('select', this.docData);
        }
    },
    components: {
        Field,
        SelectComp
    }
}
</script>

<style lang="sass" scoped>

    @import "../../configs/styles_config.sass"

    button
        background: none
        border: none
        outline: none
        cursor: pointer
        padding: 15px

        &.active
            background: $medium
            border-radius: 3px

            & i
                color: $dark

        & i
            color: $hard
            font-size: 20px
            transition: all .3s ease

            &:hover
                color: $dark

    .doc_fields_wrap
        position: absolute
        width: calc(100vw - 340px)
        background: $medium
        right: 0
        top: 62px
        border-radius: 3px
        padding: 20px 80px 20px 20px
        display: flex
        justify-content: space-between
        align-items: flex-end

        & div + div
            margin-left: 20px

        &::before
            content: ''
            position: absolute
            right: 20px
            top: -20px
            border: 10px solid transparent
            border-bottom: 10px solid $medium


</style>

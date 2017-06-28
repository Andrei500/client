<template>
<div>
  <div class="top_panel">
    <search/>
    <div>
      <bell/>
      <user-name/>
    </div>
  </div>

  <sidebar-comp
    @openFormInvoice="showFormInvoice = true"
    :disabledButton="showFormInvoice">
  </sidebar-comp>

  <form-invoice
    v-if="showFormInvoice"
    @close="showFormInvoice = false">
  </form-invoice>
</div>
</template>

<script>
import config from '../../configs/main_app_config.js';
import Search from '../modules/Search.vue';
import Bell from '../modules/Bell.vue';
import UserName from '../modules/UserName.vue';
import SidebarComp from '../modules/SidebarComp.vue';
import FormInvoice from '../modules/FormInvoice.vue';

export default {
  data() {
    return {
      showFormInvoice: false
    }
  },
  components: {
    Search,
    Bell,
    UserName,
    SidebarComp,
    FormInvoice
  }
}
</script>

<style lang="sass">

@import "../../configs/styles_config.sass"

.top_panel
  width: calc(100% - 260px)
  display: flex
  position: fixed
  align-items: center
  justify-content: space-between
  top: 0
  right: 0
  background: #fff
  box-shadow: 1px 2px 5px $trans-black
  z-index: 1

  & > div
    display: flex
    justify-content: space-between

</style>

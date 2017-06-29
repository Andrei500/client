<template>
<div>

  <top-panel></top-panel>

  <sidebar
    @openFormInvoice="showFormInvoice = true"
    :disabledButton="showFormInvoice">
  </sidebar>

  <invoice
    v-if="showFormInvoice"
    @close="showFormInvoice = false">
  </invoice>
  
</div>
</template>

<script>
import TopPanel from '../modules/header/Index.vue';
import Sidebar from '../modules/sidebar/Index.vue';
import Invoice from '../modules/invoice/Index.vue';

export default {
  data() {
    return {
      showFormInvoice: false
    }
  },
  components: {
    TopPanel,
    Sidebar,
    Invoice
  }
}
</script>

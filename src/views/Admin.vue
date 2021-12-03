<template>
  <div class="page admin">
    <TableAdmin></TableAdmin>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import TableAdmin from '@/components/TableAdmin.vue';

@Options({
  components: {
    TableAdmin,
  },
})
export default class Admin extends Vue {}
</script>

<style scoped>

</style>

<template>
  <div class="page admin">
    <TableAdmin></TableAdmin>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import TableAdmin from '@/components/TableAdmin.vue';
import { IsUserAdmin } from '@/utils/FirebaseInterface';

@Options({
  components: {
    TableAdmin,
  },
})
export default class Admin extends Vue {
  beforeMount() {
    if (!IsUserAdmin()) {
      this.$router.replace('/');
    }
  }
}
</script>

<style scoped>

</style>

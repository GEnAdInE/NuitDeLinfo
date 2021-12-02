<template>
  <div class="page home">
    <Navbar></Navbar>
    <div class="home__search">
      <input type="text" placeholder="Martin Matin">
    </div>
    <section>
      Lorem Ipsum
    </section>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Navbar from '@/components/Navbar.vue';

@Options({
  components: {
    Navbar,
  },
})
export default class Home extends Vue {
}
</script>

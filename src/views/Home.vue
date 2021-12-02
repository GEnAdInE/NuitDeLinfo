<template>
  <div class="page home">
    <Navbar></Navbar>
    <div class="home__search">
      <input type="text" class="home__search__bar" placeholder="Martin Matin">
      <v-select class="home__search__selector"
                v-model="selected"
                :options="selectOptions"
                :clearable="false"
                label="country"/>
      <button class="home__search__button">
        <font-awesome-icon :icon="['fas', 'ship']" style="opacity: .7"/>
      </button>
    </div>
    <section class="home__informations">
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
  selectOptions = ['Canada', 'Test'];

  selected = this.selectOptions[0]
}
</script>
<style lang="scss">
@import "/node_modules/vue-select/src/scss/vue-select.scss";

  .home {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .home__search {
    width: 50%;
    border: 1px solid blue;
    border-radius: 15px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }
  .home__search__bar {
    width: calc(70% - 2rem);
    height: calc(100% - 2rem);
    padding: 1rem;
    line-height: 100%;
    background-color: #e5e5e5;
    border-radius: 15px 0 0 15px;
  }
  .home__search__selector {
    width: 20%;
    height: 100%;
    background: linear-gradient(90deg,
      rgb(229,229,229) 0%,
      rgb(194, 194, 194) 45%,
      rgb(194,194,194) 100%);
    .vs__dropdown-toggle, .vs__selected {
      height: 100%;
    }
    div {
      border: none;
    }
  }
  .home__search__button {
    border-radius: 0 15px 15px 0;
    height: 100%;
    width: 10%;
    cursor: pointer;
    background-color: aqua;
  }
  .home__informations {
    margin-top: 2rem;
    padding: 1rem;
    width: calc(50% - 2rem);
    height: 300px;
    border-radius: 15px;
    background-color: #3285C97F;
    text-align: left;
  }
</style>

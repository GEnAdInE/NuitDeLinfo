<template>
  <div class="page home">
    <video class="home__background" src="videos/sea.webm" muted loop autoplay></video>
    <Navbar :logged="userLogged" :admin="userAdmin"></Navbar>
    <div v-if="!resultMode" class="home__search">
      <input v-model="searchedName" type="text"
             class="home__search__bar" placeholder="Martin Matin">
      <v-select class="home__search__selector"
                v-model="selectedCategory"
                :options="selectOptions"
                :clearable="false"
                :searchable="false"
                label="country"/>
      <button @click="search" class="home__search__button">
        <font-awesome-icon :icon="['fas', 'ship']" style="opacity: .7; font-size: 1.5rem"/>
      </button>
    </div>
    <div v-if="resultMode" class="home__result">
      <h1 class="home__result__title">Nous avons trouvé ces résultats pour la recherche</h1>
      <SearchResult v-for="article in articles" :key="article.Titre" :article="article" />
      <button class="button__primary home__result__button" @click="clear">Retour</button>
    </div>
    <section v-if="!resultMode" class="home__informations">
      <p>Bienvenue sur le site des sauveteurs du dunkerquois.</p>
      <br>
      <p>Ce site rend hommage aux femmes, hommes et enfants qui ont réalisé
        des actes de sauvetages en milieu aquatique.</p>
      <br>
      <p>Ces sauveteurs, habitants du dunkerquois (de Bray-Dunes à Grand-Fort-Philippe),
        ont participé à plus de 900 sauvetages en mer et plus de 1100 sauvetages individuels.</p>
      <br>
      <p>Œuvrant avec courage, abnégation et souvent au mépris du risque ils méritent amplement que
        leurs actes soient pérennisés.</p>
    </section>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Navbar from '@/components/Navbar.vue';
import {
  Article, getAllArticle, IsUserAdmin, IsUserLogin,
} from '@/utils/FirebaseInterface';
import SearchResult from '@/components/SearchResult.vue';

@Options({
  components: {
    SearchResult,
    Navbar,
  },
})
export default class Home extends Vue {
  selectOptions = ['Sauveteurs', 'Bateaux'];

  searchedName = '';

  selectedCategory = this.selectOptions[0];

  resultMode = false;

  articles!: Article[];

  userLogged = false;

  userAdmin = false;

  mounted():void {
    this.userLogged = IsUserLogin();
    IsUserAdmin().then((result: boolean | undefined) => {
      if (result) {
        this.userAdmin = true;
      } else {
        this.userAdmin = false;
      }
    });
  }

  async search(): Promise<void> {
    await getAllArticle().then((articles:Article[]) => {
      this.articles = [];
      this.articles = this.findArticles(articles);
      this.resultMode = true;
    });
  }

  clear(): void {
    this.resultMode = false;
  }

  findArticles(articles: Article[]): Article[] {
    return articles.filter((article: Article) => {
      switch (this.selectedCategory) {
        case this.selectOptions[0]:
          return article.Sauveteurs.search(this.searchedName) !== -1;
        case this.selectOptions[1]:
          return article.Titre.search(this.searchedName) !== -1;
        default:
          return false;
      }
    });
  }
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

.home__background {
  position: absolute;
  z-index: 1;
  filter: brightness(80%);
  width: 100vw;
  min-height: 100vh;
}

.home__search {
  width: 50%;
  border: 1px solid blue;
  border-radius: 15px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  z-index: 1;
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
  width: 40%;
  height: 100%;
  background-color: #e5e5e5;

  .vs__dropdown-toggle {
    padding: 0;
  }

  .vs__actions {
    margin-right: 10px !important;
  }

  .vs__dropdown-toggle, .vs__selected, .vs__actions {
    height: 100%;
    margin: 0;
    line-height: 1;
  }

  .vs__dropdown-menu {
    background-color: #e5e5e5;
    border: none;
    box-shadow: none;
    z-index: 2;
  }

  .vs__dropdown-option {
    padding-left: 8px;
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
.home__result {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
  width: 50%;
  padding-block: 1rem;
  z-index: 1;
  gap: 1rem;
}
.home__result__title {
  font-size: 1.3rem;
  text-align: left;
  width: 100%;
  color: white;
}
.home__result__button {
  color: white;
}
.home__informations {
  margin-top: 5rem;
  padding: 1rem;
  width: calc(50% - 2rem);
  border-radius: 15px;
  background-color: rgba(50, 133, 201, 0.8);
  color: white;
  text-align: left;
  z-index: 1;
}
</style>

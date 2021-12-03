<template>
  <div class="page article-viewer ">
    <h1 v-if="!edit" class="article-viewer__title">{{ article.Titre }}</h1>
    <input v-if="edit" v-model="article.Titre" type="text"
           class="article-viewer__title-edit">
    <div class="article-viewer__content">
      <p class="article-viewer__savers">Sauveteurs : {{ article.Sauveteurs }}</p>
      <p class="article-viewer__description">{{ article.Description }}</p>
    </div>
    <div class="article-viewer__footer">
      <button @click="switchMode" class="article-viewer__button">
        <font-awesome-icon v-if="edit" :icon="['fas', 'check']"/>
        <font-awesome-icon v-if="!edit" :icon="['fas', 'pen']"/>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Article, getArticle, updateArticle } from '@/utils/FirebaseInterface';

@Options({
  name: 'ArticleViewer',
  props: { articleID: String },
  components: {},
})
export default class ArticleViewer extends Vue {
  // ***********************************************************************************************
  // PROPS
  // -----------------------------------------------------------------------------------------------
  articleID!: string;

  article: Article = {
    ID: '',
    Titre: '',
    Description: '',
    Sauveteurs: '',
  };

  edit = false;
  // -----------------------------------------------------------------------------------------------

  // ***********************************************************************************************
  // VARIABLES
  // -----------------------------------------------------------------------------------------------
  async mounted(): Promise<void> {
    await getArticle(this.articleID)
      .then((article: Article | null) => {
        if (article) {
          this.article = article;
        }
      });
  }

  async switchMode(): Promise<void> {
    if (this.edit) {
      await updateArticle(this.articleID, this.article);
    }
    this.edit = !this.edit;
  }
  // -----------------------------------------------------------------------------------------------

  // ***********************************************************************************************
  // FONCTIONS
  // -----------------------------------------------------------------------------------------------
  // -----------------------------------------------------------------------------------------------
}
</script>

<style lang="scss" scoped>
// ***********************************************************************************************
// KEYFRAMES
// -----------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------

// ***********************************************************************************************
// TAGS
// -----------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------

// ***********************************************************************************************
// CLASSES
// -----------------------------------------------------------------------------------------------
.article-viewer {
  padding: 3rem;
}
.article-viewer__title {
  width: 100%;
  padding-top: 1rem;
  text-align: left;
  margin-bottom: 5rem;
  &-edit {
    width: 100%;
    height: 2.01rem;
    font-size: 2.01rem;
    padding-left: 0;
    padding-top: 1rem;
    margin-bottom: 5rem;
    font-weight: bolder;
    background-color: transparent;
    color: gray;
  }
}
.article-viewer__content {
  display: flex;
}
.article-viewer__description {
  margin-top: 5rem;
}
.article-viewer__footer {
  position: fixed;
  height: 4rem;
  bottom: 0;
  width: calc(100% - 3rem);
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.article-viewer__button {
  margin-right: 2rem;
  width: 50px;
  height: 50px;
  font-size: 1rem;
  background-color: rgba(18, 131, 131, 0.5);
  border-radius: 15px;
  color: white;
  cursor: pointer;
}
// -----------------------------------------------------------------------------------------------
</style>

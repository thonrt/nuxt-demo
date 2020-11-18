<template>
  <button
    class="favorite-btn btn btn-sm btn-outline-primary"
    :class="{
      active: article.favorited,
    }"
    @click="onFavorite"
  >
    <i class="ion-heart"></i>
    <label v-if="showingText">
      {{
        this.article.author.following ? "Favorite Article" : "Favorite Article"
      }}</label
    >

    <span class="counter">({{ article.favoritesCount }})</span>
  </button>
</template>

<script>
  import { addFavorite, deleteFavorite } from "@/api/article";
  export default {
    name: "ArticleMeta",
    props: {
      article: {
        type: Object,
        required: true,
      },
      showingText: false,
    },
    methods: {
      async onFavorite() {
        const article = this.article;
        this.article.favoriteDisabled = true;
        if (article.favorited) {
          // 取消点赞
          await deleteFavorite(article.slug);
          article.favorited = false;
          article.favoritesCount += -1;
        } else {
          // 添加点赞
          await addFavorite(article.slug);
          article.favorited = true;
          article.favoritesCount += 1;
        }
        article.favoriteDisabled = false;
      },
    },
  };
</script>

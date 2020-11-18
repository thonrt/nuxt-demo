<template>
  <div class="single-article-preview">
    <div class="article-meta">
      <nuxt-link
        :to="{
          name: 'profile',
          params: {
            username: article.author.username,
          },
        }"
      >
        <img :src="article.author.image" />
      </nuxt-link>
      <div class="info">
        <nuxt-link
          class="author"
          :to="{
            name: 'profile',
            params: {
              username: article.author.username,
            },
          }"
        >
          {{ article.author.username }}
        </nuxt-link>
        <span class="date">{{ article.createdAt | date("MMM DD, YYYY") }}</span>
      </div>

      <favorite-button style="float: right" :article="article" />
    </div>

    <nuxt-link
      class="preview-link"
      :to="{
        name: 'article',
        params: {
          slug: article.slug,
        },
      }"
    >
      <h1>{{ article.title }}</h1>
      <p>{{ article.description }}</p>
      <span>Read more...</span>
    </nuxt-link>
  </div>
</template>
<script>
  import FavoriteButton from "../base/favorite-button";
  export default {
    name: "SingleArticle",
    components: { FavoriteButton },
    props: {
      article: Object,
    },
  };
</script>
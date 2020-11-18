<template>
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

    <template v-if="user && user.username === article.author.username">
      <edit-article-button :article="article" />
      <delete-article-button :article="article" />
    </template>
    <template v-else>
      <follow-button :article="article" />
      <favorite-button :article="article" showingText="true" />
    </template>
  </div>
</template>

<script>
  import { follow, unFollow } from "@/api/user";
  import { addFavorite, deleteFavorite } from "@/api/article";
  import { mapState } from "vuex";
  import {
    EditArticleButton,
    DeleteArticleButton,
    FollowButton,
    FavoriteButton,
  } from "../../base";
  export default {
    name: "ArticleMeta",
    props: {
      article: {
        type: Object,
        default: () => {
          return {
            author: {},
          };
        },
        required: true,
      },
    },
    components: {
      FavoriteButton,
      FollowButton,
      EditArticleButton,
      DeleteArticleButton,
    },
    computed: {
      ...mapState(["user"]),
    },
    methods: {
      async onFollow() {
        try {
          const following = this.article.author.following;
          const request = following ? unFollow : follow;
          await request(this.article.author.username);
          this.article.author.following = !following;
        } catch (error) {
          console.dir(error);
        }
      },
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

<style>

</style>

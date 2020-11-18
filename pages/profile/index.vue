<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="profile.image" class="user-img" />
            <h4>{{ profile.username }}</h4>
            <p>
              {{ profile.bio }}
            </p>
            <nuxt-link
              class="btn btn-sm btn-outline-secondary action-btn"
              to="/settings"
              >Edit Profile Settings</nuxt-link
            >
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  exact
                  :class="{
                    active: tab === 'myArticle',
                  }"
                  :to="{
                    name: 'profile',
                    query: {
                      tab: 'myArticle',
                    },
                  }"
                  >My Articles</nuxt-link
                >
              </li>
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{
                    active: tab === 'favoritedArticle',
                  }"
                  exact
                  :to="{
                    name: 'profile',
                    query: {
                      tab: 'favoritedArticle',
                    },
                  }"
                  >Favorited Articles</nuxt-link
                >
              </li>
            </ul>
          </div>

          <div
            class="article-preview"
            v-for="article in articles"
            :key="article.slug"
          >
            <single-article :article="article" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { getProfile } from "@/api/user";
  import { getArticles } from "@/api/article";
  import FavoriteButton from "../base/favorite-button";
  import SingleArticle from "../article/article-item";
  export default {
    name: "profile",
    components: { FavoriteButton, SingleArticle },
    // 在路由匹配组件渲染之前会先执行中间件处理
    middleware: "authenticated",
    watchQuery: ["tab"],
    async asyncData({ params, query }) {
      const username = params.username;
      const tab = query.tab || "myArticle";

      const { profile } = await getProfile(username);
      const options =
        tab === "myArticle"
          ? {
              author: params.username,
            }
          : {
              favorited: params.username,
            };
      const { articles } = await getArticles(options);
      return {
        profile,
        articles: articles,
        tab,
      };
    },
  };
</script>
<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">Nuxt Test Demo</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li v-if="user" class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{
                    active: tab === 'your_feed',
                  }"
                  exact
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'your_feed',
                    },
                  }"
                  >Your Feed</nuxt-link
                >
              </li>
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{
                    active: tab === 'global_feed',
                  }"
                  exact
                  :to="{
                    name: 'home',
                  }"
                  >Global Feed</nuxt-link
                >
              </li>
              <li v-if="tag" class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{
                    active: tab === 'tag',
                  }"
                  exact
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'tag',
                      tag: tag,
                    },
                  }"
                  ># {{ tag }}</nuxt-link
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

          <!-- 分页列表 -->
          <nav>
            <ul class="pagination">
              <li
                class="page-item"
                :class="{
                  active: item === page,
                }"
                v-for="item in totalPage"
                :key="item"
              >
                <nuxt-link
                  class="page-link"
                  :to="{
                    name: 'home',
                    query: {
                      page: item,
                      tag: $route.query.tag,
                      tab: tab,
                    },
                  }"
                  >{{ item }}</nuxt-link
                >
              </li>
            </ul>
          </nav>
          <!-- /分页列表 -->
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <nuxt-link
                :to="{
                  name: 'home',
                  query: {
                    tab: 'tag',
                    tag: item,
                  },
                }"
                class="tag-pill tag-default"
                v-for="item in currentPageTags"
                :key="item"
                >{{ item }}</nuxt-link
              >
            </div>
            <!-- 分页列表 -->
            <nav>
              <ul class="pagination">
                <li
                  class="tag-page-item page-item"
                  :class="{
                    active: tagPage === item,
                  }"
                  v-for="item in tagTotalPage"
                  :key="item"
                  @click="changeTagPage(item)"
                >
                  <span class="page-link">{{ item }}</span>
                </li>
              </ul>
            </nav>
            <!-- /分页列表 -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    getArticles,
    getYourFeedArticles,
    addFavorite,
    deleteFavorite,
  } from "@/api/article";
  import { getTags } from "@/api/tag";
  import { mapState } from "vuex";
  import FavoriteButton from "../base/favorite-button";
  import SingleArticle from "../article/article-item";

  export default {
    name: "HomeIndex",
    components: { FavoriteButton, SingleArticle },
    async asyncData({ query }) {
      const page = Number.parseInt(query.page || 1);
      const limit = 20;
      const tagLimit = 20;
      const tagPage = 1;
      const tab = query.tab || "global_feed";
      const tag = query.tag;

      const loadArticles =
        tab === "global_feed" ? getArticles : getYourFeedArticles;
      let articleRes;
      let tagRes;
      if (tab === "your_feed") {
        try {
          articleRes = await getYourFeedArticles({
            limit,
            offset: (page - 1) * limit,
            tag,
          });
        } catch (error) {
          console.log(this);
          this.$router.push("/login");
        }
        tagRes = await getTags();
      } else {
        [articleRes, tagRes] = await Promise.all([
          loadArticles({
            limit,
            offset: (page - 1) * limit,
            tag,
          }),
          getTags(),
        ]);
      }
      const { articles, articlesCount } = articleRes;
      const { tags } = tagRes;

      articles.forEach((article) => (article.favoriteDisabled = false));
      return {
        articles, // 文章列表
        articlesCount, // 文章总数
        tags, // 标签列表
        limit, // 每页大小
        page, // 页码
        tab, // 选项卡
        tag, // 数据标签
        tagLimit, //标签每页大小
        tagPage, //标签当前页
      };
    },
    watchQuery: ["page", "tag", "tab"],
    computed: {
      ...mapState(["user"]),
      totalPage() {
        return Math.ceil(this.articlesCount / this.limit);
      },
      tagTotalPage() {
        return Math.ceil(this.tags.length / this.tagLimit);
      },
      currentPageTags() {
        return this.tags.slice(
          (this.tagPage - 1) * this.tagLimit,
          this.tagPage * this.tagLimit
        );
      },
    },

    methods: {
      async onFavorite(article) {
        article.favoriteDisabled = true;
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
      changeTagPage(page) {
        this.tagPage = page;
      },
    },
  };
</script>

<style scoped>
  .tag-page-item {
    cursor: pointer;
  }

  .home-favorite-btn {
    float: right;
  }
</style>

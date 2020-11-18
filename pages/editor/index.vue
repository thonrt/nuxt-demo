<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <form @submit.prevent="onSubmit">
            <fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Article Title"
                  v-model="article.title"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="What's this article about?"
                  v-model="article.description"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                  v-model="article.body"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter tags"
                  v-model="tag"
                />
                <div class="tag-list"></div>
              </fieldset>
              <button
                class="btn btn-lg pull-xs-right btn-primary"
                type="button"
                @click="onSubmit"
              >
                Publish Article
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { createArticles } from "@/api/article";
  import { mapState } from "vuex";
  export default {
    name: "editor",
    // 在路由匹配组件渲染之前会先执行中间件处理
    middleware: "authenticated",
    data() {
      return {
        article: {},
        tag: "",
      };
    },
    computed: {
      ...mapState(["currentArticle"]),
    },
    created() {
      this.article = JSON.parse(JSON.stringify(this.currentArticle));
    },
    methods: {
      async onSubmit() {
        try {
          //create
          let postData = this.article;
          //edit
          if (this.article.slug) {
            postData = {
              body: this.article.body,
              description: this.article.description,
              tagList: this.article.tagList,
              title: this.article.title,
            };
          }
          const { article } = await createArticles({
            article: postData,
          });
          this.addTag();
          this.$store.commit("setCurrentArticle", {
            body: "",
            description: "",
            title: "",
            tagList: [],
          });
          this.$router.push(`/article/${article.slug}`);
        } catch (error) {}
      },

      addTag() {
        if (!this.tag) {
          return;
        }
        if (!Array.isArray(this.article.tagList)) {
          this.article.tagList = [];
        }
        this.article.tagList.push(this.tag);
      },
    },
  };
</script>
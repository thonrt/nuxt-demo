<template>
  <button
    class="delete-article-btn btn btn-sm btn-outline-primary"
    @click="deleteArticle"
  >
    <i class="ion-trash-a"></i>
    Delete Article
  </button>
</template>

<script>
  import { deleteArticle } from "@/api/article";
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
      deleteArticle() {
        deleteArticle(this.article.slug).then((res) => {
          this.$router.push("/");
        });
      },
    },
  };
</script>

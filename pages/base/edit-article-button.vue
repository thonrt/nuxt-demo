<template>
  <nuxt-link
    class="edit-article-btn btn btn-sm btn-outline-secondary"
    :to="{
      name: 'editor',
      params: {
        slug: article.slug,
      },
    }"
  >
    <i class="ion-edit"></i>
    Edit Article
  </nuxt-link>
</template>

<script>
  export default {
    name: "ArticleMeta",
    props: {
      article: {
        type: Object,
        required: true,
      },
    },
  };
</script>

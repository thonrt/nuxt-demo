<template>
  <button
    class="follow-btn btn btn-sm btn-outline-secondary"
    :class="{
      active: article.author.following,
    }"
    @click="onFollow"
  >
    <i class="ion-plus-round"></i>
    {{ this.article.author.following ? "Unfollow" : "Follow" }}
    {{ article.author.username }}
    <span class="counter">({{ article.followCount || 0 }})</span>
  </button>
</template>

<script>
  import { follow, unFollow } from "@/api/user";
  export default {
    name: "ArticleMeta",
    props: {
      article: {
        type: Object,
        required: true,
      },
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
    },
  };
</script>

<style>
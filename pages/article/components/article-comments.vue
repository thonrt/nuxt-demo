<template>
  <div>
    <form class="card comment-form">
      <div class="card-block">
        <textarea
          ref="currentComment"
          class="form-control"
          placeholder="Write a comment..."
          rows="3"
        ></textarea>
      </div>
      <div class="card-footer">
        <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img" />
        <button class="btn btn-sm btn-primary" @click="addComment">
          Post Comment
        </button>
      </div>
    </form>

    <div class="card" v-for="comment in comments" :key="comment.id">
      <div class="card-block">
        <p class="card-text">{{ comment.body }}</p>
      </div>
      <div class="card-footer">
        <nuxt-link
          class="comment-author"
          :to="{
            name: 'profile',
            params: {
              username: comment.author.username,
            },
          }"
        >
          <img :src="comment.author.image" class="comment-author-img" />
        </nuxt-link>
        &nbsp;
        <nuxt-link
          class="comment-author"
          :to="{
            name: 'profile',
            params: {
              username: comment.author.username,
            },
          }"
        >
          {{ comment.author.username }}
        </nuxt-link>
        <span class="date-posted">{{
          comment.createdAt | date("MMM DD, YYYY")
        }}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import { getComments, addComments, deleteComments } from "@/api/article";
  import { mapState } from "vuex";
  export default {
    name: "ArticleComments",
    props: {
      article: {
        type: Object,
        required: true,
        default: () => {
          return {
            author: {},
          };
        },
      },
    },
    data() {
      return {
        comments: [],
        comment: "",
      };
    },
    computed: {
      ...mapState(["user"]),
    },
    async mounted() {
      const { comments } = await getComments(this.article.slug);
      this.comments = comments;
    },
    methods: {
      async getComments() {
        const { comments } = await getComments(this.article.slug);
        this.comments = comments;
      },
      async addComment() {
        try {
          const comment = this.$refs.currentComment.value;
          await addComments({
            slug: this.article.slug,
            comment,
          });
        } catch (error) {
          console.dir(error);
        }
      },
      async deleteComment(id) {
        try {
          await deleteComments({ slug: this.article.slug, id });
        } catch (error) {
          console.dir(error);
        }
      },
    },
  };
</script>

<style>

</style>

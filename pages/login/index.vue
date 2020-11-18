<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">{{ isLogin ? "Sign in" : "Sign up" }}</h1>
          <p class="text-xs-center">
            <nuxt-link v-if="isLogin" to="/register"
              >Need an account?</nuxt-link
            >
            <nuxt-link v-else to="/login">Have an account?</nuxt-link>
          </p>

          <ul class="error-messages">
            <template v-for="(messages, field) in errors">
              <li v-for="(msg, index) in messages" :key="index">
                {{ field }} {{ msg }}
              </li>
            </template>
          </ul>

          <form @submit.prevent="onSubmit">
            <fieldset v-if="!isLogin" class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Your Name"
                required
                v-model="user.username"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                v-model="user.email"
                placeholder="Email"
                required
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                v-model="user.password"
                placeholder="Password"
                required
                minlength="8"
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              {{ isLogin ? "Sign in" : "Sign up" }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { login, register } from "../../api/user";

  // 仅在客户端加载 js-cookie 包
  const Cookie = process.client ? require("js-cookie") : undefined;

  export default {
    name: "login",
    // 在路由匹配组件渲染之前会先执行中间件处理
    middleware: "notAuthenticated",
    data() {
      return {
        user: {
          username: "",
          email: "",
          password: "",
        },
        errors: {},
      };
    },
    computed: {
      isLogin() {
        return this.$route.name === "login";
      },
    },
    methods: {
      rondom() {},
      async onSubmit() {
        try {
          //提交表单请求登录
          const { user } = this.isLogin
            ? await login({ user: this.user })
            : await register({ user: this.user });
          //保存用户信息
          this.$store.commit("setUser", user);
          //为
          Cookie.set("user", user);
          //跳转到首页
          this.$router.push("/");
        } catch (error) {
          this.errors = error.response.data.errors;
        }
      },
    },
  };
</script>
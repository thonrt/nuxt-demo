/**
 * Nuxt.js 配置文件
 * TOKEN: b85b75102e0bc3d8997907c6b159b7ad806e8894
 */


module.exports = {
    router: {
        linkActiveClass: "active",
        extendRoutes(routes, resolve) {
            //清楚Nuxt.js基于Pages默认的路由规则
            routes.splice(0);
            routes.push(...[{
                path: "/",
                component: resolve(__dirname, "pages/layout/"),
                children: [
                    {
                        // 默认子路由
                        path: "",
                        name: "home",
                        component: resolve(__dirname, "pages/home/")
                    },
                    {
                        path: "/login",
                        name: "login",
                        component: resolve(__dirname, "pages/login/")
                    },
                    {
                        path: "/register",
                        name: "register",
                        component: resolve(__dirname, "pages/login/")
                    },
                    {
                        path: "/profile/:username",
                        name: "profile",
                        component: resolve(__dirname, "pages/profile/")
                    },
                    {
                        path: "/settings",
                        name: "settings",
                        component: resolve(__dirname, "pages/settings/")
                    },
                    {
                        path: "/editor",
                        name: "editor",
                        component: resolve(__dirname, "pages/editor/")
                    },
                    {
                        path: "/article/:slug",
                        name: "article",
                        component: resolve(__dirname, "pages/article/")
                    }
                ]
            }
            ]);
        }
    },
    server: {
        host: "0.0.0.0",
        port: 4010
    },
    // 注册插件
    plugins: [
        "~/plugins/request.js",
        "~/plugins/filters.js"
    ]
};
import Vue from "vue";
import Router from "vue-router";

// Components
import App from '../App'
import Home from '../components/Home.vue'
import Post from '../components/Post'
// import Page from "../components/Page/Page.vue"
import NotFound from '../components/NotFound'

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: "/",
            name: "Home",
            component: Home
        },
        {
            path: "/:page?",
            name: "Posts",
            component: Home
        },
        {
            // wordpressのパーマリンク設定に依存する
            path: "/:year/:month/:day/:postSlug",
            name: "Post",
            component: Post
        },
        {
            path: "/error/404",
            component: NotFound
        },
        {
            path: "*",
            redirect: "/error/404"
        }
        // {
        //     path: "/:pageSlug",
        //     name: "Page",
        //     component: Page
        // }
    ],
    mode: "history",
    base: "",

    // Prevents window from scrolling back to top
    // when navigating between components/views
    // scrollBehavior(to, from, savedPosition) {
    //     if (savedPosition) {
    //         return savedPosition;
    //     } else {
    //         return { x: 0, y: 0 };
    //     }
    // }
});

export default router;

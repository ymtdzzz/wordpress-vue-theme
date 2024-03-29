import Vue from 'vue/dist/vue.runtime.esm'
import Router from "vue-router";

// Components
import App from '../App'
import Home from '../components/Home.vue'
import Post from '../components/Post'
import Category from '../components/Category'
import Page from "../components/Page"
import NotFound from '../components/NotFound'
import Search from "../components/Search"
import Tag from "../components/Tag"

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: "/:page([0-9]+)?",
            name: "Posts",
            component: Home,
        },
        {
            // wordpressのパーマリンク設定に依存する
            path: "/:postSlug",
            name: "Post",
            component: Post,
        },
        {
            path: "/category/:category/:page?",
            name: "Category",
            component: Category
        },
        {
            path: "/tag/:tag/:page?",
            name: "Tag",
            component: Tag
        },
        {
            path: "/search/:search_keyword/:page?",
            name: "Search",
            component: Search
        },
        {
            path: "/error/404",
            component: NotFound
        },
        {
            path: "*",
            redirect: "/error/404"
        },
        {
            path: "/page/:pageSlug",
            name: "Page",
            component: Page
        }
    ],
	scrollBehavior (to, from, savedPosition) {
		return { x: 0, y: 0 }
	},
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

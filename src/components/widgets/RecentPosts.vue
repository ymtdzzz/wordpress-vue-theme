<template>
    <div class="recent-posts">
<!--        <ul v-if="recentPostsLoaded">-->
<!--            <li v-for="post in recentPosts(limit)" :key="post.id">-->
<!--                <router-link :to="post.slug">{{ post.title.rendered }}</router-link>-->
<!--            </li>-->
<!--        </ul>-->
<!--        <Loader v-else/>-->
        <transition name="slide-fade" mode="out-in">
            <div v-if="recentPostsLoaded">
                <div v-for="post in recentPosts(limit)" :key="post.id">
                    <post-card :post="post" />
                </div>
                <pager />
            </div>
            <Loader v-else/>
        </transition>
    </div>
</template>

<script>
    import _ from 'lodash'
    import { mapGetters } from 'vuex'
    import Loader from '../partials/Loader'
    import PostCard from '../partials/PostCard'
    import Pager from '../partials/Pager'
    import Post from "../Post";

    export default {
        props: ['limit'],
        computed: {
            ...mapGetters({
                recentPosts: "recentPosts",
                recentPostsLoaded: "recentPostsLoaded",
            })
        },
        mounted() {
            this.$store.dispatch("getPosts", { limit: this.limit })
        },
        components: {
            Post,
            Loader,
            PostCard,
            Pager,
        }
    }
</script>

<style lang="scss" scoped>
    .slide-fade-enter-active {
        transition: all .3s ease;
    }
    .slide-fade-leave-active {
        transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to
        /* .slide-fade-leave-active below version 2.1.8 */ {
        transform: translateX(10px);
        opacity: 0;
    }

    .recent-posts {
        width: 70%;
        max-width: 1000px;
        margin: 20px auto;
    }
</style>
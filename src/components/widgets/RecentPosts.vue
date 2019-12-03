<template>
    <div class="recent-posts">
        <transition name="slide-fade" mode="out-in">
            <div v-if="recentPostsLoaded">
                <div v-for="post in recentPosts(limit)" :key="post.id">
                    <post-card :post="post" />
                </div>
                <pager :total_pages="totalPages" :current_page="currentPage"/>
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
        props: [
            'limit',
            'page',
        ],
        computed: {
            ...mapGetters({
                recentPosts: "recentPosts",
                recentPostsLoaded: "recentPostsLoaded",
                totalPages: "totalPages",
                currentPage: "currentPage",
            })
        },
        mounted() {
            this.$store.dispatch("getPosts", { limit: this.limit, page: this.page })
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
</style>

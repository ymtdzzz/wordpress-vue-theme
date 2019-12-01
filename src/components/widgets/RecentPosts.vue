<template>
    <div class="recent-posts">
<!--        <ul v-if="recentPostsLoaded">-->
<!--            <li v-for="post in recentPosts(limit)" :key="post.id">-->
<!--                <router-link :to="post.slug">{{ post.title.rendered }}</router-link>-->
<!--            </li>-->
<!--        </ul>-->
<!--        <Loader v-else/>-->
        <post-card/>
        <post-card/>
        <post-card/>
        <post-card/>
        <pager />
    </div>
</template>

<script>
    import _ from 'lodash'
    import { mapGetters } from 'vuex'
    import Loader from '../partials/Loader'
    import PostCard from '../partials/PostCard'
    import Pager from '../partials/Pager'

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
            Loader,
            PostCard,
            Pager,
        }
    }
</script>

<style lang="scss" scoped>
    .recent-posts {
        width: 70%;
        max-width: 1000px;
        margin: 20px auto;
    }
</style>
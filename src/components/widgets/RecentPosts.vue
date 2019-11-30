<template>
    <div class="recent-posts">
<!--        <ul v-if="recentPostsLoaded">-->
<!--            <li v-for="post in recentPosts(limit)" :key="post.id">-->
<!--                <router-link :to="post.slug">{{ post.title.rendered }}</router-link>-->
<!--            </li>-->
<!--        </ul>-->
<!--        <Loader v-else/>-->
        <post-card/>
    </div>
</template>

<script>
    import _ from 'lodash'
    import { mapGetters } from 'vuex'
    import Loader from '../partials/Loader'
    import PostCard from '../partials/PostCard'

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
            PostCard
        }
    }
</script>

<style lang="scss" scoped>
    .recent-posts {
        width: 70%;
        margin: 20px auto;
    }
</style>
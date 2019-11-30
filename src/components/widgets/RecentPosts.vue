<template>
    <div class="recent-posts">
        <ul v-if="recentPostsLoaded">
            <li v-for="post in recentPosts(limit)" :key="post.id">
                <router-link :to="post.slug">{{ post.title.rendered }}</router-link>
            </li>
        </ul>
        <Loader v-else/>
    </div>
</template>

<script>
    import _ from 'lodash'
    import { mapGetters } from 'vuex'
    import Loader from '../partials/Loader'

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
            Loader
        }
    }
</script>

<style lang="scss" scoped>
    .recent-posts {
        width: 80%;
        background-color: #00A8EF;
        margin: 0 auto;
    }
</style>
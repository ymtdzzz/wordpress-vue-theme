<template>
    <div class="related-posts-container">
        <h1>Related Posts</h1>
        <div class="related-posts-main">
            <ul v-if="relatedLoaded" class="related-post">
                <li v-for="post in relatedPosts"><router-link :to="post.slug">{{ post.post_title }}</router-link></li>
            </ul>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        props: [
            'post_id'
        ],
        computed: {
            ...mapGetters({
                relatedPosts: 'relatedPosts',
                relatedLoaded: 'relatedLoaded'
            })
        },
        mounted() {
            this.$store.dispatch('getRelatedPostsById', { id: this.post_id })
        },
        watch: {
            '$route' (to, from) {
                this.$store.dispatch("getPostBySlug", { slug: to.params.postSlug })
            }
        }
    }

</script>

<style lang="scss">
</style>
<template>
    <div class="recent-posts">
        <transition name="slide-fade" mode="out-in">
            <div v-if="categoryPostsLoaded">
                <div v-for="post in categoryPosts(limit)" :key="post.id">
                    <post-card :post="post" />
                </div>
            </div>
            <Loader v-else/>
        </transition>
            <pager :total_pages="totalPages" :current_page="currentPage"/>
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
            'category_id',
        ],
        computed: {
            ...mapGetters({
                categoryPosts: "categoryPosts",
                categoryPostsLoaded: "categoryPostsLoaded",
                totalPages: "totalPages",
                currentPage: "currentPage",
            })
        },
        mounted() {
            if (!(this.currentPage === this.page)) {
              // 余計な通信防止
              this.$store.dispatch("getPostsByCategory", { limit: this.limit, page: this.page, category_id: this.category_id })
            }
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

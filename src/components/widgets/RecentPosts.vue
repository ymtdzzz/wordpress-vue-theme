<template>
    <div class="recent-posts">
        <transition name="slide-fade" mode="out-in">
            <div v-if="recentPostsLoaded">
                <div v-for="post in recentPosts(limit)" :key="post.id">
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
            'tag_id',
            'search_keyword',
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
            if (!(this.currentPage === this.page)) {
              // 余計な通信防止
              this.$store.dispatch("getPosts", {
                  limit: this.limit,
                  page: this.page,
                  category_id: this.category_id,
                  tag_id: this.tag_id,
                  search_keyword: this.search_keyword
              })
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

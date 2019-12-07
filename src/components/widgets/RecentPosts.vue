<template>
    <div class="recent-posts">
        <transition name="slide-fade" mode="out-in">
            <div v-if="recentPostsLoaded">
                <div v-for="post in recentPosts(limit)" :key="post.id">
                    <post-card :post="post" />
                </div>
                <div v-if="!isResult" class="no-result">検索結果が0件でした。</div>
            </div>
            <Loader v-else/>
        </transition>
            <pager v-if="recentPostsLoaded && isResult"/>
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
            'category_id',
            'tag_id',
            'search_keyword',
        ],
        data() {
            return {
                page: this.$route.params.page ? this.$route.params.page : '1',
            }
        },
        computed: {
            ...mapGetters({
                recentPosts: "recentPosts",
                recentPostsLoaded: "recentPostsLoaded",
                totalPages: "totalPages",
                currentPage: "currentPage",
            }),
            isResult: function () {
                return this.recentPosts(this.limit).length !== 0
            }
        },
        mounted() {
            if (!(this.currentPage === this.page)) {
              // 余計な通信防止
            }
              this.$store.dispatch("getPosts", {
                  limit: this.limit,
                  page: this.page,
                  category_id: this.category_id,
                  tag_id: this.tag_id,
                  search_keyword: this.search_keyword
              })
        },
        components: {
            Post,
            Loader,
            PostCard,
            Pager,
        },
        watch: {
            '$route' (to, from) {
                this.$store.dispatch("getPosts", {
                    limit: this.limit,
                    page: to.params.page,
                    category_id: this.category_id,
                    tag_id: this.tag_id,
                    search_keyword: this.search_keyword
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .recent-posts {
    width: 70%;
    max-width: 1000px;
    margin: 20px auto;
    }

    .no-result {
        height: 130px;
        text-align: center;
        padding-top: 80px;
    }

</style>

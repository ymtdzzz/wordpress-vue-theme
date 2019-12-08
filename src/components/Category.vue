<template>
    <div class="main-container">
        <h1 class="category-header">カテゴリ検索：<span v-if="categoryLoaded">{{ category[0].name }}</span></h1>
      <transition name="slide-fade" mode="out-in">
        <recent-posts v-if="categoryLoaded" :limit="limit" :category_id="category[0].id" />
        <loader v-else/>
      </transition>
    </div>
</template>

<script>
    import RecentPosts from "./widgets/RecentPosts"
    import Constants from "../Constants"
    import { mapGetters } from 'vuex'
    import Loader from '../components/partials/Loader'

    export default {
        computed: {
            ...mapGetters({
                category: 'category',
                categoryLoaded: 'categoryLoaded'
            }),
            breadCrumbs: function () {
                return [{
                    to: '/',
                    text: 'HOME'
                },{
                    to: '/',
                    text: 'カテゴリ検索'
                }]
            }
        },
        data() {
            return {
                limit: Constants.POSTS_LIST_LIMIT,
            }
        },
        components:{
            RecentPosts,
            Loader
        },
        mounted() {
            this.$store.dispatch('getCategoryBySlug', { slug: this.$route.params.category })
            this.$store.dispatch('updateBreadCrumbs', { breadCrumbs: this.breadCrumbs })
        },
        watch: {
            '$route.params.category' (to, from) {
                this.$store.dispatch('getCategoryBySlug', { slug: to })
                this.$store.dispatch('updateBreadCrumbs', { breadCrumbs: this.breadCrumbs })
            },
            categoryId (to, from) {
                this.$store.dispatch("getPosts", {
                    limit: this.limit,
                    page: this.page,
                    category_id: this.categoryId,
                    tag_id: '',
                    search_keyword: ''
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
  .category-header {
    font-size: 2.2rem;
    width: 70%;
    max-width: 1000px;
    margin: 40px auto;
  }
</style>

<template>
    <div class="main-container">
        <h1 class="category-header">単語検索：{{ $route.params.search_keyword }}</h1>
        <transition name="slide-fade" mode="out-in">
            <recent-posts :limit="limit" :search_keyword="$route.params.search_keyword"/>
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
            }),
            breadCrumbs: function () {
                return [{
                    to: '/',
                    text: 'HOME'
                },{
                    to: '/',
                    text: '単語検索'
                }]
            }
        },
        data() {
            return {
                limit: Constants.POSTS_LIST_LIMIT,
                search_keyword: this.$route.params.search_keyword,
            }
        },
        components:{
            RecentPosts,
            Loader
        },
        mounted() {
            this.$store.dispatch('updateBreadCrumbs', { breadCrumbs: this.breadCrumbs })
        }
    }
</script>

<style lang="scss" scoped>
</style>

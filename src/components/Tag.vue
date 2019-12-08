<template>
    <div class="main-container">
        <h1 class="category-header">タグ検索：<span v-if="TagLoaded">{{ tag[0].name }}</span></h1>
        <transition name="slide-fade" mode="out-in">
            <recent-posts v-if="TagLoaded" :limit="limit" :tag_id="tag[0].id" />
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
                TagLoaded: 'TagLoaded',
                tag: 'tag'
            }),
            breadCrumbs: function () {
                return [{
                    to: '/',
                    text: 'HOME'
                },{
                    to: '/',
                    text: 'タグ検索'
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
            this.$store.dispatch('getTagBySlug', { slug: this.$route.params.tag })
            this.$store.dispatch('updateBreadCrumbs', { breadCrumbs: this.breadCrumbs })
        },
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
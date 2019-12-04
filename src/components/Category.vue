<template>
    <div class="main-container">
        <recent-posts v-if=categoryLoaded :limit="limit" :category_id="categoryId" :page="page"/>
    </div>
</template>

<script>
    import RecentPosts from "./widgets/RecentPosts"
    import Constants from "../Constants";
    import { mapGetters } from 'vuex'

    export default {
        computed: {
            ...mapGetters({
                categoryId: 'categoryId',
                categoryLoaded: 'categoryLoaded'
            })
        },
        data() {
            return {
                page: this.$route.params.page ? this.$route.params.page : '1',
                limit: Constants.POSTS_LIST_LIMIT
            }
        },
        components:{
            RecentPosts
        },
        mounted() {
            this.$store.dispatch('getCategoryIdBySlug', { slug: this.$route.params.category })
        },
        watch: {
            '$route' (to, from) {
                this.$store.dispatch('getCategoryIdBySlug', { slug: this.$route.params.category })
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

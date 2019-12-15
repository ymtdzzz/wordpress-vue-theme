<template>
    <div class="page">

        <div class="article-header-container">
            <transition name="slide-fade" mode="out-in">
                <div class="article-header-image" v-if="pageLoaded" :style="{ backgroundImage: 'url(' + pageToShow.thumbnail_url + ')' }">
                    <div class="article-sub">
                      {{ pageToShow.date | moment }}
                    </div>
                    <div class="article-title">
                        {{ pageToShow.title.rendered }}
                    </div>
                    <div class="article-tags">
                        <a href="#" v-for="tag_name in pageToShow.tag_names" class="tag">#{{ tag_name }}</a>
                    </div>
                </div>
            </transition>
        </div>
        <transition name="slide-fade" mode="out-in">
            <div v-if="pageLoaded">
                <div class="article">
                    <div class="article-main" v-html="pageToShow.content.rendered"></div>
                </div>
            </div>
            <Loader v-else/>
        </transition>
    </div>
</template>

<script>
    import _ from 'lodash'
    import { mapGetters } from 'vuex'
    import Loader from './partials/Loader'

    export default {
        computed: {
            ...mapGetters({
                pageToShow: "pageToShow",
                pageLoaded: "pageLoaded",
            }),
            // category_name: function () {
            //     return _.get(this.pageToShow, '_embedded.wp:term.0.0.name')
            // },
            breadCrumbs: function () {
                return [{
                    to: '/',
                    text: 'HOME'
                },{
                    to: `/`,
                    text: '固定ページ'
                }]
            }
        },
        mounted() {
            this.$store.dispatch("getPageBySlug", { slug: this.$route.params.pageSlug })
            this.$store.dispatch('updateBreadCrumbs', { breadCrumbs: this.breadCrumbs })
        },
        components: {
            Loader
        },
        watch: {
            '$route' (to, from) {
                this.$store.dispatch("getPageBySlug", { slug: this.$route.params.pageSlug })
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>

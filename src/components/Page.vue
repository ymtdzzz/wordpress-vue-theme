<template>
    <div class="page">

        <div class="article-header-container">
            <transition name="slide-fade" mode="out-in">
                <div class="article-header-image" v-if="pageLoaded">
                    <div class="article-sub">
                      {{ pageToShow.date | moment }}
                    </div>
                    <div class="article-title">
                        {{ pageToShow.title.rendered }}
                    </div>
<!--                    <div class="article-tags">-->
<!--                        <a href="#" v-for="tag_name in pageToShow.tag_names" class="tag">#{{ tag_name }}</a>-->
<!--                    </div>-->
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
                    text: '固定ページ（後で一覧へのリンクにする？）'
                }]
            }
        },
        mounted() {
            this.$store.dispatch("getPageBySlug", { slug: this.$route.params.pageSlug })
            this.$store.dispatch('updateBreadCrumbs', { breadCrumbs: this.breadCrumbs })
        },
        components: {
            Loader
        }
    }
</script>

<style lang="scss" scoped>
    .page {

    }
    .article {
        width: 70%;
        margin: 20px auto;
        padding-bottom: 70px;
    }
    .article-header-container {
        color: white;
        height: 250px;
        background-color: black;

        .article-header-image {
          height: 180px;
          padding: 40px 15% 30px 15%;
          background-position: center center;
          background-size: cover;
          background-repeat: no-repeat;
          background-color:rgba(0,0,0,0.68);
          background-blend-mode:darken;
        }

        .article-title {
            font-size: 2.2rem;
        }

        .article-sub {
            font-size: 1.2rem;
            line-height: 2;
            color: #888;
        }

        .article-tags {

            .tag {
                display: inline-block;
                margin-right: 5px;
                padding: 3px 5px;
                color: #999;
                text-decoration: none;
                transition: color 0.25s ease;
                line-height: 3.5;

                &:hover {
                    color: white;
                }
            }
        }
    }
</style>

<template>
    <div class="post">
        <div class="article-header-container">
            <transition name="slide-fade" mode="out-in">
                <div class="article-header-image" v-if="postLoaded" :style="{ backgroundImage: 'url(' + postToShow.thumbnail_url + ')' }">
                    <div class="article-sub">
                      {{ postToShow.date | moment }}
                    </div>
                    <div class="article-title">
                        {{ postToShow.title.rendered }}
                    </div>
                    <div class="article-tags">
                        <span v-for="(tag_name, tag_slug) in postToShow.tag_names">
                            <router-link class="tag" :to="{ name: 'Tag', params: { tag: tag_slug } }">
                                #{{ tag_name }}
                            </router-link>
                        </span>
                    </div>
                </div>
            </transition>
        </div>
        <transition name="slide-fade" mode="out-in">
            <div v-if="postLoaded">
                <div class="article">
                    <div class="article-main" v-html="postToShow.content.rendered"></div>
                </div>
            </div>
            <Loader v-else/>
        </transition>
        <related-posts v-if="postLoaded" :post_id="postToShow.id"/>
        <comment :isOpen="true" :comments="getComments" :postId="postToShow.id" :commentStatus="postToShow.comment_status" />
    </div>
</template>

<script>
    import _ from 'lodash'
    import { mapGetters } from 'vuex'
    import Loader from './partials/Loader'
    import Comment from './partials/Comment'
    import RelatedPosts from "./widgets/RelatedPosts"

    export default {
        computed: {
            ...mapGetters({
                postToShow: "postToShow",
                postLoaded: "postLoaded",
                loadedPosts: "loadedPosts",
            }),
            category_name: function () {
                return _.get(this.postToShow, '_embedded.wp:term.0.0.name')
            },
            breadCrumbs: function () {
                return [{
                    to: '/',
                    text: 'HOME'
                },{
                    to: `/category/${this.category_name}`,
                    text: this.category_name
                }]
            },
            getComments: function () {
                return _.get(this.postToShow, '_embedded.replies.0')
            }
        },
        mounted() {
            if (this.loadedPosts.length) {
                // 選択した記事が既に読み込み済だった場合はそれを表示する
                this.loadedPosts.map((post, index) => {
                    const params = this.$route.params
                    const slug = `/${params.year}/${params.month}/${params.day}/${params.postSlug}/`
                    if (post.slug === slug) {
                      this.$store.dispatch("setPostToShow", { postToSave: post })
                    } else if (index === (this.loadedPosts.length - 1)) {
                        this.$store.dispatch("getPostBySlug", { slug: this.$route.params.postSlug })
                    }
                })
            } else {
              this.$store.dispatch("getPostBySlug", { slug: this.$route.params.postSlug })
            }
            this.$store.dispatch('updateBreadCrumbs', { breadCrumbs: this.breadCrumbs })
        },
        components: {
            Loader,
            Comment,
            RelatedPosts
        }
    }
</script>

<style lang="scss" scoped>
</style>

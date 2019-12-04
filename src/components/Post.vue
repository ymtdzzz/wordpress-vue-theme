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
                        <a href="#" v-for="tag_name in postToShow.tag_names" class="tag">#{{ tag_name }}</a>
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
    </div>
</template>

<script>
    import _ from 'lodash'
    import { mapGetters } from 'vuex'
    import Loader from './partials/Loader'
    import router from "../router"

    export default {
        computed: {
            ...mapGetters({
                postToShow: "postToShow",
                postLoaded: "postLoaded",
                loadedRecentPosts: "loadedRecentPosts",
                loadedCategoryPosts: "loadedCategoryPosts"
            })
        },
        mounted() {
            const path_name = router.currentRoute.name
            console.log(path_name)
            if (path_name === 'Post' || path_name === "Home") {
                if (this.loadedRecentPosts.length) {
                    this.loadedRecentPosts.map((post, index) => {
                        const params = this.$route.params
                        const slug = `/${params.year}/${params.month}/${params.day}/${params.postSlug}/`
                        if (post.slug === slug) {
                            this.$store.dispatch("setPostToShow", { postToSave: post })
                        }
                    })
                } else {
                    this.$store.dispatch("getPostBySlug", { slug: this.$route.params.postSlug })
                }
            } else if (path_name === 'Category') {
                if (this.loadedCategoryPosts.length) {
                    this.loadedCategoryPosts.map((post, index) => {
                        const params = this.$route.params
                        const slug = `/${params.year}/${params.month}/${params.day}/${params.postSlug}/`
                        if (post.slug === slug) {
                            this.$store.dispatch("setPostToShow", { postToSave: post })
                        }
                    })
                } else {
                    this.$store.dispatch("getPostBySlug", { slug: this.$route.params.postSlug })
                }
            }
        },
        components: {
            Loader
        }
    }
</script>

<style lang="scss" scoped>
    .post {

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

<template>
    <div class="post">

        <div class="article-header-container">
            <transition name="slide-fade" mode="out-in">
                <div v-if="postLoaded">
                    <div class="article-sub">
                        2019/12/12
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

    export default {
        computed: {
            ...mapGetters({
                postToShow: "postToShow",
                postLoaded: "postLoaded",
            })
        },
        mounted() {
            this.$store.dispatch("getPostBySlug", { slug: this.$route.params.postSlug })
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
        min-height: 150px;
        max-height: 300px;
        padding: 40px 15% 30px 15%;
        background-color: #000;

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
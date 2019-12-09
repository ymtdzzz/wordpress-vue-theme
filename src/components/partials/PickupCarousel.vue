<template>
    <div class="pickup-carousel-container">
        <transition name="slide-fade" mode="out-in">
            <Carousel v-if="popularLoaded" :per-page="1" paginationPosition="bottom-overlay">
                <Slide v-for="post in popularPosts" :key="post.id">
                    <div class="carousel-slide" :style="{ backgroundImage: 'url(' + post.thumbnail_url + ')' }">
                        <div class="article-container">
                            <span v-for="tag_name in post.tag_names" class="tag">{{ tag_name }}</span>
                            <p class="title">{{ post.title.rendered }}</p>
                            <p class="date">{{ post.date | moment }}</p>
                            <p class="category"><v-fa icon="folder"/> {{ post['_embedded']['wp:term'][0][0]['name'] }}</p>
                            <p class="read-more"><router-link :to="post.slug">続きを読む</router-link></p>
                        </div>
                    </div>
                </Slide>
            </Carousel>
        </transition>
    </div>
</template>

<script>
    import { Carousel, Slide } from 'vue-carousel'
    import { mapGetters } from 'vuex'

    export default {
        components: {
            Carousel,
            Slide
        },
        computed: {
            ...mapGetters({
                popularPosts: "popularPosts",
                popularLoaded: "popularLoaded"
            })
        },
        mounted() {
            this.$store.dispatch('getPopularPosts')
        },
        watch: {
            '$route' (to, from) {
                this.$store.dispatch("getPostBySlug", { slug: this.$route.params.postSlug })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .pickup-carousel-container {

        .carousel-slide {
            height: 230px;
            background-color: #666;
            padding: 20px 15%;
            color: white;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;

            .article-container {
                background-color: rgba(0, 0, 0, 0.8);
                padding: 20px 0 30px 20px;
                border-radius: 0 12px 12px 0;
                border-left: 6px solid red;
                width: 100%;

                .tag {
                }

                .title {
                    font-size: 1.8rem;
                    margin-top: 20px;
                }

                .date {
                    font-size: 1.0rem;
                    margin-top: 10px;
                }

                .category {
                    font-size: 1.1rem;
                    margin-top: 10px;
                }

                .read-more {
                    text-align: right;

                    a {
                        margin-top: 15px;
                        margin-left: 10px;
                        margin-right: 30px;
                        padding: 15px 30px;
                        color: white;
                        text-decoration: none;
                        background-color: black;
                        transition: background-color .3s;

                        &:hover {
                            background-color: #333;
                        }
                    }
                }
            }
        }
    }
</style>
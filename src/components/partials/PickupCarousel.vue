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
</style>

<template>
    <div class="pickup-carousel-container">
        <Carousel :per-page="1" paginationPosition="bottom-overlay">
            <span v-if="popularLoaded">{{popularPosts}}</span>
            <Slide>
                <div class="carousel-slide">
                    <span class="tag">tag</span>
                    <span class="tag">tag</span>
                    <span class="tag">tag</span>
                    <span class="tag">tag</span>
                    <p class="title">記事タイトル</p>
                    <p class="date">2019年11月22日</p>
                    <p class="category"><v-fa icon="folder"/></p>
                    <p class="description">記事の内容</p>
                </div>
            </Slide>
            <Slide>
                <div class="carousel-slide">SLIDE 2</div>
            </Slide>
            <Slide>
                <div class="carousel-slide">SLIDE 3</div>
            </Slide>
        </Carousel>
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
        }
    }
</script>

<style lang="scss" scoped>
    .pickup-carousel-container {

        .carousel-slide {
            height: 300px;
            background-color: #666;
        }
    }
</style>
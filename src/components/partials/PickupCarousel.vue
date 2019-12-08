<template>
    <div class="pickup-carousel-container">
        <Carousel :per-page="1" paginationPosition="bottom-overlay">
            <span v-if="popularLoaded">{{popularPosts}}</span>
            <Slide>
                <div class="carousel-slide">SLIDE 1</div>
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
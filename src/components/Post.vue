<template>
    <div class="post">
        <div v-if="postLoaded">
            {{ postToShow[0] }}
        </div>
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
        }
    }
</script>
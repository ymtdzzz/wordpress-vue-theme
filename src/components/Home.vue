<template>
  <div class="main-container">
    <pickup-carousel v-if="isHome" />
    <recent-posts :limit="limit" :page="page"/>
  </div>
</template>

<script>
  import RecentPosts from "./widgets/RecentPosts"
  import PickupCarousel from "./partials/PickupCarousel"
  import Constants from "../Constants"

  export default {
    computed: {
      breadCrumbs: function () {
          return [{
              to: '/',
              text: 'HOME'
          }]
      }
    },
    methods: {
      checkHome: function () {
        return !this.$route.params.page || this.$route.params.page === '1' || this.$route.params.page === 1
      }
    },
    data() {
      return {
        limit: Constants.POSTS_LIST_LIMIT,
        page: this.$route.params.page ? this.$route.params.page : '1',
        isHome: false
      }
    },
    components: {
      RecentPosts,
      PickupCarousel,
    },
    mounted() {
        this.$store.dispatch('updateBreadCrumbs', { breadCrumbs: this.breadCrumbs })
        this.isHome = this.checkHome()
    },
    watch: {
      '$route' (to, from) {
        this.isHome = this.checkHome()
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>

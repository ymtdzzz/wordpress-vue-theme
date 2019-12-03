<template>
  <div class="main-container">
    <pickup-carousel />
    <recent-posts :limit="limit" :page="this.$route.params.page"/>
  </div>
</template>

<script>
  import RecentPosts from "./widgets/RecentPosts"
  import PickupCarousel from "./partials/PickupCarousel"
  import Constants from "../Constants";

  export default {
    data: () => {
      return {
        limit: Constants.POSTS_LIST_LIMIT
      }
    },
    components: {
      RecentPosts,
      PickupCarousel,
    }
  }
</script>

<style lang="scss" scoped>
</style>

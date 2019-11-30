<template>
  <div class="main-container">
    <pickup-carousel />
<!--    <recent-posts limit="10"/>-->
  </div>
</template>

<script>
  import RecentPosts from "./widgets/RecentPosts";
  import PickupCarousel from "./partials/PickupCarousel";

  export default {
    components: {
      RecentPosts,
      PickupCarousel,
    }
  }
</script>

<style lang="scss" scoped>
</style>

<template>
  <div>
    <h1>H1のスタイル</h1>
    <recent-posts limit="30"/>
  </div>
</template>

<script>
  import RecentPosts from "./widgets/RecentPosts";

  export default {
    components: {
      RecentPosts
    }
  }
</script>

<style lang="scss" scoped>
</style>

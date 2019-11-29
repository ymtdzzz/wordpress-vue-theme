<template>
  <div>
    <h1>H1のスタイル</h1>
    <h2>H2のスタイル</h2>
    <ul v-if="recentPostsLoaded">
      <li v-for="post in recentPosts(10)" :key="post.id">
        {{ post.title.rendered }}
      </li>
    </ul>
    <Loader v-else/>
  </div>
</template>

<script>
  import _ from 'lodash'
  import { mapGetters } from 'vuex'
  import Loader from './partials/Loader'

  export default {
      computed: {
          ...mapGetters({
              recentPosts: "recentPosts",
              recentPostsLoaded: "recentPostsLoaded",
          })
      },
      mounted() {
          this.$store.dispatch("getPosts", { limit: 10 })
      },
      components: {
          Loader
      }
  }
</script>

<style lang="scss" scoped>
</style>

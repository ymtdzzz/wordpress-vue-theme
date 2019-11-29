<template>
  <div>
    <h1>H1のスタイル</h1>
    <h2>H2のスタイル</h2>
    <button @click="fetch">Fetch</button>
    <ul>
      <li v-for="post in posts">
        {{ post.title.rendered }}
      </li>
    </ul>
    <Loader v-if="isLoading"/>
  </div>
</template>

<script>
  import { RepositoryFactory } from "../api/RepositoryFactory"
  import Loader from './partials/Loader'
  const PostsRepository = RepositoryFactory.get('posts')

  export default {
      data() {
          return {
              isLoading: false,
              posts: [],
          }
      },
      methods: {
          async fetch () {
              this.isLoading = true
              this.posts = []
              const { data } = await PostsRepository.get()
              this.posts = data
              this.isLoading = false
          }
      },
      components: {
          Loader
      }
  }
</script>

<style lang="scss" scoped>
</style>

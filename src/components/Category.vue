<template>
  <div class="main-container">
    <category-posts :limit="5" page="1" category_id="12"/>
  </div>
</template>

<script>
  import CategoryPosts from "./widgets/CategoryPosts"

  export default {
    components: {
        CategoryPosts
    }
  }
</script>

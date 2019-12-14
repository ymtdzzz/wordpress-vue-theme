<template>
  <div class="breadcrumb-container">
    <ul v-if="breadCrumbs">
      <li v-for="(breadCrumb, index) in breadCrumbs" itemscope="itemscope" itemtype="http://data-vocabulary.org/Breadcrumb">
        <router-link :to="{ path: breadCrumb.to }" itemprop="url">
          <span class="bread-link" itemprop="title">{{ breadCrumb.text }}</span><span v-if="!(index === breadCrumbs.length - 1)" class="bread-space">></span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
      computed: {
          ...mapGetters({
              breadCrumbs: 'breadCrumbs'
          }),
      }
  }
</script>

<style lang="scss" scoped>
</style>

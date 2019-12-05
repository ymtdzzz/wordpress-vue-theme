<template>
  <div class="breadcrumb-container">
    <ul v-if="breadCrumbs">
      <li v-for="breadCrumb in breadCrumbs" itemscope="itemscope" itemtype="http://data-vocabulary.org/Breadcrumb">
        <router-link :to="{ path: breadCrumb.to }" itemprop="url">
          <span class="bread-link" itemprop="title">{{ breadCrumb.text }}</span><span class="bread-space">></span>
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
          })
      }
  }
</script>

<style lang="scss" scoped>
  .breadcrumb-container {
    margin-left: 10%;
    padding-left: 10px;
    background-color: rgba(0, 0, 0, 0.7);
    border-radius: 0 0 12px 12px;
    width: auto;
    position: absolute;
    z-index: 100;

    ul {
      margin: 0;
      padding: 10px;
      list-style: none;

      li {
        display: inline-block;
        padding: 5px;

        a {
          text-decoration: none;
          color: white;

          .bread-link {
            padding: 3px;
            border-radius: 5px;
            text-decoration: none;
            background-color: transparent;
            transition: background-color .3s;

            &:hover {
              background-color: #222;
            }
          }

          .bread-space {
            margin-left: 5px;
          }
        }
      }
    }
  }
</style>

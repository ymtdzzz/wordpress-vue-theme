<template>
    <div class="global-nav-container">
        <div class="global-nav">
            <ul class="nav">
                <li v-if="menuLoaded" v-for="menu in menus">
                  <router-link :to="{ name: 'Category', params: { category: urlToSlug(menu.url) } }">{{ menu.title }}</router-link>
                </li>
            </ul>
            <div class="search-container">
                <div class="search-form">
                    <input class="search-input" type="text" placeholder="Search" v-model="search_keyword">
                    <button class="search-button" @click="execSearch"><v-fa icon="search"/></button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Constants from "../../Constants"
  import router from "../../router"

  export default {
      computed: {
          ...mapGetters({
              menus: "menus",
              menuLoaded: "menuLoaded"
          })
      },
      data() {
          return {
              search_keyword: '',
          }
      },
      methods: {
          execSearch: function () {
              router.push({ name: 'Search', params: { search_keyword: this.search_keyword } })
          },
          urlToSlug: function (url) {
              const path = url.split('/')
              return path[path.length - 2]
          }
      },
      mounted() {
          this.$store.dispatch('getMenuBySlug', { slug: Constants.LOCATION_SLUG_HEADER_2, type: 2 })
      }
  }
</script>

<style lang="scss" scoped>
</style>

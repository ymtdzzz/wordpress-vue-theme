<template>
    <header>
        <div class="header-container">
<!--            <div class="header-left-container">-->
<!--                ソーシャルボタンとか-->
<!--            </div>-->
            <p class="site-title">Blog Title</p>
            <div class="header-right-container">
                <ul class="page-nav">
                  <li v-if="pageMenuLoaded" v-for="menu in pageMenus">
                    <router-link :to="{ name: 'Page', params: { pageSlug: menu.slug } }">{{ menu.title }}</router-link>
                  </li>
                </ul>
            </div>
        </div>
        <global-nav></global-nav>
    </header>
</template>

<script>
    import GlobalNav from './GlobalNav'
    import Constants from "../../Constants"
    import { mapGetters } from 'vuex'

    export default {
        components: {
            GlobalNav
        },
        computed: {
            ...mapGetters({
                pageMenus: "pageMenus",
                pageMenuLoaded: "pageMenuLoaded"
            })
        },
        mounted() {
            this.$store.dispatch('getMenuBySlug', { slug: Constants.LOCATION_SLUG_HEADER_1, type: 1 })
        }
    }
</script>

<style lang="scss" scoped>
    .header-container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px;
        height: 70px;
        background-color: black;
        color: white;
        text-align: center;

        .site-title {
            font-size: 1.5rem;
            flex: 1;
        }

        .header-left-container {
            flex: 1;
        }

        .header-right-container {
            flex: 1;
            height: 100%;
        }
    }
    .page-nav {
      display : flex;
      flex-flow: row wrap;
      height: 100%;
      margin: 0;
      padding: 0;
      li {
        height: 100%;
        width: 19%;
        list-style: none;
        display: table;
        text-align: center;
        &:last-child{
          border: none;
        }
        a {
          display: table-cell;
          height: 100%;
          vertical-align: middle;
          padding: 0 5px;
          transition: background-color 0.2s;
          text-decoration: none;
          color: white;

          &:hover {
            background-color: #333;
          }
        }
      }
    }
</style>

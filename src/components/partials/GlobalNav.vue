<template>
    <div class="global-nav-container">
        <div class="global-nav">
            <ul class="nav">
                <li v-if="menuLoaded" v-for="menu in menus">
                  <router-link :to="{ name: 'Category', params: { category: menu.title } }">{{ menu.title }}</router-link>
                </li>
            </ul>
            <div class="search-container">
                <div class="search-form">
                    <input class="search-input" type="text" placeholder="Search">
                    <button class="search-button"><v-fa icon="search"/></button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Constants from "../../Constants";

  export default {
      computed: {
          ...mapGetters({
              menus: "menus",
              menuLoaded: "menuLoaded"
          })
      },
      mounted() {
          this.$store.dispatch('getMenuBySlug', { slug: Constants.LOCATION_SLUG_HEADER_2, type: 2 })
      }
  }
</script>

<style lang="scss" scoped>
    .global-nav-container {
        background-color: #222;
        height: 60px;
        .global-nav {
            height: 100%;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            width: 80%;

            .nav {
                flex: 2;
            }

            .search-container {
                flex: 1;
            }
        }
    }

    .nav {
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
            border-right: 1px solid #777;
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
    .search-container {
        position: relative;

        .search-form {
            position: absolute;
            display: flex;
            top: 50%;
            left: 50%;
            transform: translateY(-50%) translateX(-50%);
            -webkit-transform: translateY(-50%) translateX(-50%);
            border: 1px solid #aaa;
            border-radius: 6px;
            width: 220px;

            .search-input {
                border: none;
                margin: 0;
                /*padding: 0;*/
                background: none;
                vertical-align: middle;
                height: 18px;
                width: 80%;
                padding: 5px;
                flex: 5;
                color: #aaa;
            }

            .search-button {
                flex: 1;
                background: none;
                color: white;
                border: none;
                cursor: pointer;
            }
        }
    }

</style>

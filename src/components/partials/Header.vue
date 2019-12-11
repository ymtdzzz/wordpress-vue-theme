<template>
    <header>
        <div class="header-container">
            <div class="nav-drawer">
                <input id="nav-input" type="checkbox" class="nav-unshown" ref="navinput">
                <label id="nav-open" for="nav-input"><span></span></label>
                <label class="nav-unshown" id="nav-close" for="nav-input"></label>
                <div id="nav-content">
                    <p class="nav-header">MENU</p>
                    <div class="search">
                        <div class="search-container">
                            <div class="search-form">
                                <input class="search-input" type="text" placeholder="Search" v-model="search_keyword">
                                <button class="search-button" @click="execSearch"><v-fa icon="search"/></button>
                            </div>
                        </div>
                    </div>
                    <div class="nav-title">CATEGORY</div>
                    <div class="nav-content">
                        カテゴリ
                    </div>

                </div>
            </div>
            <router-link :to="{ name: 'Posts' }" class="site-title" v-if="siteLoaded">{{ siteInfo.name }}</router-link>
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
    import router from "../../router"

    export default {
        components: {
            GlobalNav
        },
        computed: {
            ...mapGetters({
                pageMenus: "pageMenus",
                pageMenuLoaded: "pageMenuLoaded",
                siteInfo: "siteInfo",
                siteLoaded: "siteLoaded",
                // ハンバーガーメニュー対応
                menus: "menus",
                menuLoaded: "menuLoaded",
                user: 'user',
                UserLoaded: 'UserLoaded',
                footerMenus: "footerMenus",
                footerMenuLoaded: "footerMenuLoaded",
            })
        },
        data() {
            return {
                search_keyword: '',
            }
        },
        methods: {
            execSearch: function () {
                this.$refs.navinput.checked = false
                router.push({ name: 'Search', params: { search_keyword: this.search_keyword } })
            }
        },
        mounted() {
            this.$store.dispatch('getMenuBySlug', { slug: Constants.LOCATION_SLUG_HEADER_1, type: 1 })
            this.$store.dispatch('getSiteInfo')
        },
    }
</script>

<style lang="scss" scoped>
</style>

<template>
    <header>
        <div class="header-container">
<!--            <div class="header-left-container">-->
<!--                ソーシャルボタンとか-->
<!--            </div>-->
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
            })
        },
        mounted() {
            this.$store.dispatch('getMenuBySlug', { slug: Constants.LOCATION_SLUG_HEADER_1, type: 1 })
            this.$store.dispatch('getSiteInfo')
        },
    }
</script>

<style lang="scss" scoped>
</style>

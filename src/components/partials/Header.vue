<template>
    <header class="header-container" :class="{'sticky': position > 0}">
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
                            <button class="search-button" @click="execSearch" aria-label="search"><v-fa icon="search" aria-hidden="true"/></button>
                        </div>
                    </div>
                </div>
                <div class="nav-black">
                    <div class="nav-title">PAGES</div>
                    <ul class="nav-content">
                        <li v-if="pageMenuLoaded" v-for="menu in pageMenus">
                            <router-link :to="{ name: 'Page', params: { pageSlug: menu.slug } }">{{ menu.title }}</router-link>
                        </li>
                    </ul>
                    <div class="nav-title" style="margin-top: 20px">CATEGORY</div>
                    <ul v-if="footerMenuLoaded" class="nav-content">
                        <li v-for="menu in footerMenus" @click="closeNav">
                            <router-link :to="{ name: 'Category', params: { category: urlToSlug(menu.url) } }">{{ menu.title }}</router-link>
                            <ul v-if="menu.child_items" class="child-menu">
                                <li v-for="child_menu in menu.child_items" @click="closeNav">
                                    <router-link :to="{ name: 'Category', params: { category: urlToSlug(child_menu.url) } }">　＞{{ child_menu.title }}</router-link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <div class="nav-title" style="margin-top: 20px; margin-bottom: 15px;">PROFILE</div>
                    <img class="nav-profile-icon" :src="avatarUrl" alt="profile_icon">
                    <p class="nav-profile-name">{{ user.name }}</p>
                    <div class="nav-profile-description" v-html="user.description"></div>
                    <ul class="nav-links">
                        <li v-if="isSocial('github')"><a :href="`https://github.com/${user.user_meta.github}`" target="_blank"><v-fa :icon="['fab', 'github']"/></a></li>
                        <li v-if="isSocial('twitter')"><a href="#"><v-fa :icon="['fab', 'twitter']"/></a></li>
                        <li v-if="isSocial('facebook')"><a href="#"><v-fa :icon="['fab', 'facebook']"/></a></li>
                    </ul>
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
    </header>
</template>

<script>
    import Constants from "../../Constants"
    import { mapGetters } from 'vuex'
    import router from "../../router"
    import _get from 'lodash/get'

    export default {
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
            }),
            avatarUrl: function () {
                return _get(this.user, 'avatar_urls.96', '')
            }
        },
        data() {
            return {
                search_keyword: '',
                position: 0,
            }
        },
        methods: {
            closeNav: function () {
                this.$refs.navinput.checked = false
            },
            execSearch: function () {
                this.closeNav()
                router.push({ name: 'Search', params: { search_keyword: this.search_keyword } })
            },
            urlToSlug: function (url) {
                const path = url.split('/')
                return path[path.length - 2]
            },
            isSocial: function (service_name) {
                return (_get(this.user, 'user_meta.' + service_name, '') !== '') ? _get(this.user, 'user_meta.' + service_name) : false
            }
        },
        mounted() {
            document.onscroll = (e) => {
                this.position = document.documentElement.scrollTop || document.body.scrollTop;
            }
            this.$store.dispatch('getMenuBySlug', { slug: Constants.LOCATION_SLUG_HEADER_1, type: 1 })
            this.$store.dispatch('getSiteInfo')
        },
    }
</script>

<style lang="scss" scoped>
</style>

<template>
    <div class="footer-widget-container">
        <p class="footer-widget-header">
            Category
        </p>
        <ul v-if="footerMenuLoaded" class="menu">
            <li v-for="menu in footerMenus">
                <router-link :to="{ name: 'Category', params: { category: urlToSlug(menu.url) } }">{{ menu.title }}</router-link>
                <ul v-if="menu.child_items" class="child-menu">
                    <li v-for="child_menu in menu.child_items">
                        <router-link :to="{ name: 'Category', params: { category: urlToSlug(child_menu.url) } }">  {{ child_menu.title }}</router-link>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script>
    import Constants from "../../Constants"
    import { mapGetters } from 'vuex'

    export default {
        computed: {
            ...mapGetters({
                footerMenus: "footerMenus",
                footerMenuLoaded: "footerMenuLoaded",
            })
        },
        methods: {
            urlToSlug: function (url) {
                const path = url.split('/')
                return path[path.length - 2]
            }
        },
        mounted() {
            this.$store.dispatch('getMenuBySlug', { slug: Constants.LOCATION_SLUG_FOOTER_1, type: 3})
        },
    }
</script>

<style lang="scss" scoped>

</style>
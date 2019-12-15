<template>
    <div class="footer-widget-container">
        <p class="footer-widget-header">
            Profile
        </p>
        <img class="profile-icon" :src="avatarUrl" alt="profile_icon">
        <p class="profile-name">{{ user.name }}</p>
        <div class="profile-description" v-html="user.description"></div>
        <ul class="links">
            <li v-if="isSocial('github')"><a :href="`https://github.com/${user.user_meta.github}`" target="_blank"><v-fa :icon="['fab', 'github']"/></a></li>
            <li v-if="isSocial('twitter')"><a href="#"><v-fa :icon="['fab', 'twitter']"/></a></li>
            <li v-if="isSocial('facebook')"><a href="#"><v-fa :icon="['fab', 'facebook']"/></a></li>
        </ul>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import Constants from "../../Constants"
    import _get from 'lodash/get'

    export default {
        computed: {
            ...mapGetters({
                user: 'user',
                UserLoaded: 'UserLoaded',
            }),
            avatarUrl: function () {
                return _get(this.user, 'avatar_urls.96', '')
            }
        },
        methods: {
            isSocial: function (service_name) {
                return (_get(this.user, 'user_meta.' + service_name, '') !== '') ? _get(this.user, 'user_meta.' + service_name) : false
            }
        },
        mounted() {
            this.$store.dispatch("getUserById", { id: Constants.ADMIN_USER_ID })
        }
    }

</script>

<style lang="scss" scoped>
</style>
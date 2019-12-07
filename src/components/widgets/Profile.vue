<template>
    <div class="profile-container">
        <p class="profile-header">
            Profile
        </p>
        <img class="profile-icon" :src="avatarUrl" alt="profile_icon">
        <p class="profile-name">{{ user.name }}</p>
        <div class="profile-description" v-html="user.description"></div>
        <ul class="links">
            <li><a href="#"><v-fa :icon="['fab', 'github']"/></a></li>
            <li><a href="#"><v-fa :icon="['fab', 'twitter']"/></a></li>
            <li><a href="#"><v-fa :icon="['fab', 'facebook']"/></a></li>
        </ul>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import Constants from "../../Constants";

    export default {
        computed: {
            ...mapGetters({
                user: 'user',
                UserLoaded: 'UserLoaded',
            }),
            avatarUrl: function () {
                return _.get(this.user, 'avatar_urls.96', '')
            },
        },
        mounted() {
            this.$store.dispatch("getUserById", { id: Constants.ADMIN_USER_ID })
        }
    }

</script>

<style lang="scss" scoped>
    .profile-container {
        text-align: center;

        .profile-header {
            font-size: 1.4rem;
            margin-bottom: 20px;
            border-top: 1px solid white;
            border-bottom: 1px solid white;
            padding: 5px 0;
            color: white;
        }

        .profile-icon {
            display: block;
            margin: 0 auto;
        }

        .profile-name {
            padding: 12px 0;
            font-size: 1.2rem;
        }

        .profile-description {
            white-space: pre-line;
        }

        .links {
            font-size: 1.4rem;
            margin: 10px 0;

            li {
                display: inline-block;
                list-style: none;
                margin-right: 5px;

                &:last-child {
                    margin-right: 0;
                }

                a {
                    color: white;
                    transition: color .2s;

                    &:hover {
                        color: red;
                    }
                }
            }
        }
    }
</style>
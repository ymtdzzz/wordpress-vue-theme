<template>
    <div class="profile-container">
        <p class="profile-header">
            Profile
        </p>
        {{ user.name }}
        <div class="profile-description" v-html="user.description"></div>
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
            })
        },
        mounted() {
            this.$store.dispatch("getUserById", { id: Constants.ADMIN_USER_ID })
        }
    }

</script>

<style lang="scss" scoped>
    .profile-header {
        font-size: 1.5rem;
        margin-bottom: 20px;
    }
    .profile-description {
        white-space: pre-line;
    }
</style>
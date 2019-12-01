<template>
    <div>
        <app-header/>
        <div>
            <transition mode="out-in">
                <router-view></router-view>
            </transition>
        </div>
        <app-footer/>
    </div>
</template>

<script>
  import Header from './components/partials/Header'
  import Footer from './components/partials/Footer'

    export default {
        components: {
            appHeader: Header,
            appFooter: Footer
        }
    }
</script>

<style lang="scss">
    .v-enter-active, .v-leave-active {
        transition: opacity .5s;
    }
    .v-enter, .v-leave-to {
        opacity: 0;
    }
</style>

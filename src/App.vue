<template>
    <div>
        <app-header/>
        <div>
            <router-view></router-view>
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
</style>

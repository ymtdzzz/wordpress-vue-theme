<template>
    <div>
        <app-header/>
        <div>
            <router-view></router-view>
        </div>
        <app-footer/>
    </div>
<!--    <div id="my-app" class="page-wrapper">-->
<!--            <div class="site-content">-->
<!--                <router-view></router-view>-->
<!--            </div>-->
<!--    </div>-->
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

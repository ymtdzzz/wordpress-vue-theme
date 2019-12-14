<template>
    <div class="main-container">
        <app-header/>
        <breadcrumb v-if="showBreadCrumbs" />
        <div>
            <transition name="slide-fade">
                <router-view/>
            </transition>
        </div>
        <app-footer/>
    </div>
</template>

<script>
  import Header from './components/partials/Header'
  import Footer from './components/partials/Footer'
  import Breadcrumb from './components/partials/Breadcrumb'
  import { mapGetters } from 'vuex'

    export default {
        data() {
            return {
                prevHeight: 0,
            }
        },
        computed: {
            ...mapGetters({
                showBreadCrumbs: 'showBreadCrumbs'
            })
        },
        components: {
            appHeader: Header,
            appFooter: Footer,
            Breadcrumb
        },
        methods: {
            beforeLeave(element) {
                this.prevHeight = getComputedStyle(element).height
            },
            enter(element) {
                const { height } = getComputedStyle(element)
                element.style.height = this.prevHeight
                setTimeout(() => {
                    element.style.height = height
                })
            },
            afterEnter(element) {
                element.style.height = 'auto'
            }
        }
    }
</script>

<style lang="scss">
</style>

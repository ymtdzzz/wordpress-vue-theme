<template>
    <div>
        <app-header/>
        <div>
            <transition name="height-change" mode="out-in" @before-leave="beforeLeave" @enter="enter" @after-enter="afterEnter">
                <router-view/>
            </transition>
        </div>
        <app-footer/>
    </div>
</template>

<script>
  import Header from './components/partials/Header'
  import Footer from './components/partials/Footer'

    export default {
        data() {
            return {
                prevHeight: 0,
            }
        },
        components: {
            appHeader: Header,
            appFooter: Footer
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

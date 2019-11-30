<template>
    <header>
        <div class="header-container">
            <div class="header-left-container">
                ソーシャルボタンとか
            </div>
            <p class="site-title">Blog Title</p>
            <div class="header-right-container">
                アバウトとか
            </div>
        </div>
        <global-nav></global-nav>
    </header>
</template>

<script>
    import GlobalNav from './GlobalNav'

    export default {
        components: {
            GlobalNav
        }
    }
</script>

<style lang="scss" scoped>
    .header-container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px;
        height: 70px;
        background-color: black;
        color: white;
        text-align: center;

        .site-title {
            font-size: 1.5rem;
            flex: 1;
        }

        .header-left-container {
            flex: 1;
        }

        .header-right-container {
            flex: 1;
        }
    }
</style>
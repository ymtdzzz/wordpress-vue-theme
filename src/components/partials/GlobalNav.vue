<template>
    <div class="global-nav-container">
        <div class="global-nav">
            <ul class="nav">
                <li><a href="#">aaaaaaaaaaaaaaaaa</a></li>
                <li><a href="#">bbbbbbbbbbbbbbbbbbbbbb</a></li>
                <li><a href="#">cccccccccccccccccccccc</a></li>
            </ul>
            <div class="search-container">
                <div class="search-form">
                    search form
                </div>
            </div>
        </div>

    </div>
</template>

<style lang="scss" scoped>
    .global-nav-container {
        background-color :pink;
        height: 40px;
        .global-nav {
            width: 1000px;
            height: 100%;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
        }
    }

    .nav {
        display : flex;
        flex-flow: row wrap;
        width: 800px;
        height: 100%;
        margin: 0;
        padding: 0;
        li {
            height: 100%;
            width: 250px;
            list-style: none;
            display: table;
            text-align: center;
            border-left: 1px solid #fff;
            &:last-child{
                border-right: 1px solid #fff;
            }
            background-color : gray;
            a  {
                display: table-cell;
                height: 100%;
                vertical-align: middle;
                padding: 0 5px;
            }
        }
    }
    .search-container {
        display: table;
        height: 100%;
        text-align: right;

        .search-form {
            display: table-cell;
            vertical-align: middle;
        }
    }

</style>